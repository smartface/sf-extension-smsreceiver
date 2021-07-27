const System = require("@smartface/native/device/system");
module.exports = require(`./smsreceiver-${System.OS}`);
