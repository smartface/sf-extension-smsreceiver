const System = require("sf-core/device/system");
if (System.OS === "Android") {
    module.exports = require("./smsreceiver-Android");
} else {
    module.exports = {};
}
