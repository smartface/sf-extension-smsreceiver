/**
 * This extension is reading incoming sms content.
 * 
 * 
 * @class SmsReceiver
 *
 *      @example
 *      const SMSReceiver = require('sf-extension-smsreceiver');
 *      const Application = require("sf-core/application");
 * 
 *      Application.android.requestPermissions(1002, Application.Android.Permissions.RECEIVE_SMS);
 * 
 *      SMSReceiver.registerReceiver();
 *      SMSReceiver.callback = function(e) {
 *          console.log(e.senderNumber + " : " + e.smsBody);
 *      });
 * 
 *      // SMSReceiver.unRegisterReceiever(); 
 *       
 */
function SMSReceiver() {}

/**
 * Register a Sms-BroadcastReceiver to be run in the main activity thread.
 * @method registerReceiver
 * @param {Function} callback
 * @param {object} callback.e
 * @android
 */
SMSReceiver.registerReceiver = function(callback){};

/**
 * Unregister a Sms-BroadcastReceiver to be run in the main activity thread.
 * @method unRegisterReceiever
 * @android
 */
SMSReceiver.unRegisterReceiever = function(){};


module.exports = {
    SMSReceiver: SMSReceiver,
};
