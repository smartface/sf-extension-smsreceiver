# SmsReceiver Extension from Smartface
## This extension work only Android.
[![Twitter: @Smartface_io](https://img.shields.io/badge/contact-@Smartface_io-blue.svg?style=flat)](https://twitter.com/smartface_io)
[![License](https://img.shields.io/badge/license-MIT-green.svg?style=flat)](https://raw.githubusercontent.com/smartface/sf-extension-extendedlabel/master/LICENSE)
## SmsReceiver 
This extension is reading incoming sms content.
## Installation
Smartface SmsReceiver can be installed via npm easily from our public npm repository. The installation is pretty easy via Smartface Cloud IDE.

- Run command `(cd ~/workspace/scripts && npm i -S sf-extension-smsreceiver)`

Open this line in config/Android/AndroidManifest.xml file.
```xml
<!-- Required for receive sms. -->
<uses-permission android:name="android.permission.RECEIVE_SMS" />
```
You must request permission for sms receive. (API LEVEL 23 AND UPPER)
```javascript
Application.android.requestPermissions(1002, Application.Android.Permissions.RECEIVE_SMS);
```
## How to use

```javascript
const Page = require("sf-core/ui/page");
const extend = require("js-base/core/extend");

var Page1 = extend(Page)(
    function(_super) {
        _super(this, {
            onShow: function(params) {
                this.statusBar.visible = true;
                this.headerBar.visible = true;

                const Application = require("sf-core/application");
                const SmsReceiver = require('sf-extension-smsreceiver');

                Application.android.requestPermissions(1002, Application.Android.Permissions.RECEIVE_SMS);
                Application.android.onRequestPermissionsResult = function(e) {
                    SmsReceiver.registerReceiver(smsCallback);
                };

                var result = Application.android.checkPermission(Application.Android.Permissions.RECEIVE_SMS);
                if (result) {
                    SmsReceiver.registerReceiver(smsCallback);
                }

                
                // SmsReceiver.unRegisterReceiever(); 
                
                function smsCallback(e) {
                    console.log(e.senderNumber + " : " + e.smsBody);
                }
            }
        });

    }
);
module.exports = Page1;
```
## License
This project is licensed under the terms of the MIT license. See the [LICENSE](https://raw.githubusercontent.com/smartface/sf-extension-extendedlabel/master/LICENSE) file. Within the scope of this license, all modifications to the source code, regardless of the fact that it is used commercially or not, shall be committed as a contribution back to this repository.
