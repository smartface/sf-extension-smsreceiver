/*globals requireClass */
const AndroidConfig = require("@smartface/native/util/Android/androidconfig");
const NativeIntentFilter = requireClass("android.content.IntentFilter");
const NativeBroadcastReceiver = requireClass(
  "android.content.BroadcastReceiver"
);
const NativeBuild = requireClass("android.os.Build");
const NativeTelephony = requireClass("android.provider.Telephony");
const NativeSmsMessage = requireClass("android.telephony.SmsMessage");

const activity = AndroidConfig.activity;
var _myReciever;

function SMSReceiver() {}

SMSReceiver.callback;

SMSReceiver.registerReceiver = function () {
  var filter = new NativeIntentFilter(
    "android.provider.Telephony.SMS_RECEIVED"
  );
  filter.setPriority(9999);
  var broadcastReceiverOverrideMethods = {
    onReceive: function (context, intent) {
      var smsSender = "";
      var smsBody = "";
      if (NativeBuild.VERSION.SDK_INT >= NativeBuild.VERSION_CODES.KITKAT) {
        var arr = toJSArray(
          NativeTelephony.Sms.Intents.getMessagesFromIntent(intent)
        );
        for (var i = 0; i < arr.length; i++) {
          var smsMessage = arr[i];
          smsSender = smsMessage.getDisplayOriginatingAddress();
          smsBody += smsMessage.getMessageBody();
        }
      } else {
        var smsBundle = intent.getExtras();
        if (smsBundle != null) {
          var pdus = toJSArray(smsBundle.get("pdus"));
          if (pdus == null) {
            return;
          }
          var messages = [];
          for (var i = 0; i < pdus.length; i++) {
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
  _myReciever = NativeBroadcastReceiver.extend(
    "NativeBroadcastReceiver",
    broadcastReceiverOverrideMethods,
    null
  );
  activity.registerReceiver(_myReciever, filter);
};

SMSReceiver.unRegisterReceiever = function () {
  activity.unregisterReceiver(_myReciever);
};

module.exports = SMSReceiver;
