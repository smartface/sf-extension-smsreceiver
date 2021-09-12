import AndroidConfig from "@smartface/native/util/Android/androidconfig";
//@ts-ignore
const NativeIntentFilter = requireClass("android.content.IntentFilter");
//@ts-ignore
const NativeBroadcastReceiver = requireClass(
    "android.content.BroadcastReceiver"
);
//@ts-ignore
const NativeBuild = requireClass("android.os.Build");
//@ts-ignore
const NativeTelephony = requireClass("android.provider.Telephony");
//@ts-ignore
const NativeSmsMessage = requireClass("android.telephony.SmsMessage");

let activity = AndroidConfig.activity;
let _myReceiver: any;
let _isRegistered = false;

/**
 * This extension is reading incoming sms content. Works for Android only.
 *
 *
 * @class SmsReceiver
 *
 *      @example
 *      import SmsReceiver from '@smartface/extension-smsreceiver';
 *      import Application from '@smartface/native/application';
 *
 *      Application.android.requestPermissions(1002, Application.Android.Permissions.RECEIVE_SMS);
 *
 *      SmsReceiver.registerReceiver();
 *      SmsReceiver.callback = function(e) {
 *          console.log(e.senderNumber + " : " + e.smsBody);
 *      });
 *
 *      // SmsReceiver.unRegisterReceiever();
 *
 */
export default class SMSReceiver {

    /**
     * Set or get this function to read the sms content and number.
     */
    static callback: (e?: { senderNumber: string; smsBody: string }) => void;

    /**
     * Register a Sms-BroadcastReceiver to be run in the main activity thread.
     * This needs RECEIVE_SMS permission.
     */
    static registerReceiver() {
        let filter = new NativeIntentFilter(
            "android.provider.Telephony.SMS_RECEIVED"
        );
        filter.setPriority(9999);
        let broadcastReceiverOverrideMethods = {
            //@ts-ignore
            onReceive:  (context, intent) => {
                let smsSender = "";
                let smsBody = "";
                if (NativeBuild.VERSION.SDK_INT >= NativeBuild.VERSION_CODES.KITKAT) {
                    //@ts-ignore
                    let arr = toJSArray(
                        NativeTelephony.Sms.Intents.getMessagesFromIntent(intent)
                    );
                    for (let i = 0; i < arr.length; i++) {
                        let smsMessage = arr[i];
                        smsSender = smsMessage.getDisplayOriginatingAddress();
                        smsBody += smsMessage.getMessageBody();
                    }
                } else {
                    let smsBundle = intent.getExtras();
                    if (smsBundle != null) {
                        //@ts-ignore
                        let pdus = toJSArray(smsBundle.get("pdus"));
                        if (pdus == null) {
                            return;
                        }
                        let messages = [];
                        for (let i = 0; i < pdus.length; i++) {
                            messages.push(NativeSmsMessage.createFromPdu(pdus[i]));
                            smsBody += messages[i].getMessageBody();
                        }
                        smsSender = messages[0].getOriginatingAddress();
                    }
                }
                if (SMSReceiver.callback && typeof SMSReceiver.callback === "function") {
                    SMSReceiver.callback({ senderNumber: smsSender, smsBody: smsBody });
                }
            },
        };
        _myReceiver = NativeBroadcastReceiver.extend(
            "NativeBroadcastReceiver",
            broadcastReceiverOverrideMethods,
            null
        );
        activity.registerReceiver(_myReceiver, filter);
        _isRegistered = true;
    }

    /**
     * Set or get this function to read the sms content and number.
     */
    static unRegisterReceiver() {
        if(_isRegistered) {
            //@ts-ignore
            activity.unregisterReceiver(_myReceiver);
            _isRegistered = false;
        }
    }

}