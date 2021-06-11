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
   * Register a Sms-BroadcastReceiver to be run in the main activity thread.
   * This needs RECEIVE_SMS permission.
   */
  static registerReceiver(): void;
  /**
   * Unregister a Sms-BroadcastReceiver to be run in the main activity thread.
   * It is important to unregister it after you are done with the SMS.
   */
  static unRegisterReceiver(): void;
  /**
   * Set or get this function to read the sms content and number.
   */
  static callback: (e?: { senderNumber: string; smsBody: string }) => void;
}
