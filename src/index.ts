import System from "@smartface/native/device/system";
import type SMSReceiverAndroid from './smsreceiver-Android';
import type SMSReceiverIOS from './smsreceiver-iOS';

const SMSReceiver: typeof SMSReceiverAndroid & typeof SMSReceiverIOS = require(`./smsreceiver-${System.OS}`);

export = SMSReceiver;