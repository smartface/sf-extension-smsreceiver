# SmsReceiver Extension from Smartface
This extension is reading incoming sms content.
[![Twitter: @Smartface_io](https://img.shields.io/badge/contact-@Smartface_io-blue.svg?style=flat)](https://twitter.com/smartface_io)
[![License](https://img.shields.io/badge/license-MIT-green.svg?style=flat)](https://raw.githubusercontent.com/smartface/sf-extension-extendedlabel/master/LICENSE)

## Installation
Smartface SmsReceiver can be installed via npm easily from our public npm repository. The installation is pretty easy via Smartface Cloud IDE.

- Run command `(cd ~/workspace/scripts && npm i -S sf-extension-smsreceiver)`

## How to use

```javascript
const Page = require("sf-core/ui/page");
const extend = require("js-base/core/extend");

var Page1 = extend(Page)(
    function(_super) {
        _super(this, {
            onShow: function(params) {
                this.statusBar.visible = false;
                this.headerBar.visible = false;
            }
        });
        
    const Application = require("sf-core/application");
    const SmsReceiver = require('sf-extension-smsreceiver');
    Application.android.requestPermissions(1002, Application.Android.Permissions.RECEIVE_SMS);
            
        Application.android.onRequestPermissionsResult = function(e) {
            
            if (e.requestCode === 1002 && e.result === true) {
                
                SmsReceiver.registerReceiver(function(e) {
                    console.log(e.senderNumber + " : " + e.smsBody);
                });
                
            }
        };

        // SmsReceiver.unRegisterReceiever(); 
    
    }
);
module.exports = Page1;
```
## License
This project is licensed under the terms of the MIT license. See the [LICENSE](https://raw.githubusercontent.com/smartface/sf-extension-extendedlabel/master/LICENSE) file. Within the scope of this license, all modifications to the source code, regardless of the fact that it is used commercially or not, shall be committed as a contribution back to this repository.
