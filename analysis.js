/**
 * This extension is reading incoming sms content.
 * 
 * 
 * @class SmsReceiver
 *
 *      @example
 *      const SmsReceiver = require('sf-extension-smsreceiver');
 *      const Application = require("sf-core/application");
 * 
 *      Application.android.requestPermissions(1002, Application.Android.Permissions.RECEIVE_SMS);
 * 
 *      SmsReceiver.registerReceiver(function(e) {
 *          console.log(e.senderNumber + " : " + e.smsBody);
 *      });
 * 
 *      // SmsReceiver.unRegisterReceiever(); 
 *       
 */
function SmsReceiver() {}

/**
 * Register a Sms-BroadcastReceiver to be run in the main activity thread.
 * @method registerReceiver
 * @param {Function} callback
 * @param {object} callback.e
 * @android
 */
SmsReceiver.registerReceiver = function(callback){};

/**
 * Unregister a Sms-BroadcastReceiver to be run in the main activity thread..
 * @method unRegisterReceiever
 * @android
 */
SmsReceiver.unRegisterReceiever = function(){};


module.exports = {
    SmsReceiver: SmsReceiver,
};
