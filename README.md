# SMS Receiver Extension from Smartface
## This extension works only for Android.
[![Twitter: @Smartface_io](https://img.shields.io/badge/contact-@Smartface_io-blue.svg?style=flat)](https://twitter.com/smartface_io)
[![License](https://img.shields.io/badge/license-MIT-green.svg?style=flat)](https://raw.githubusercontent.com/smartface/sf-extension-extendedlabel/master/LICENSE)
## SMS Receiver 
This extension is reading incoming SMS content on Android devices. To learn more about how to handle SMS on both systems, refer to [this document.](https://docs.smartface.io/smartface-native-framework/miscellaneous-native-features/sms-handling)
## Installation
Smartface SMS Receiver can be installed via npm. Execute this command on scripts directory:

```
npm i @smartface/extension-smsreceiver
```


Open this line in config/Android/AndroidManifest.xml file.
```xml
<!-- Required for receive sms. -->
<uses-permission android:name="android.permission.RECEIVE_SMS" />
```
You must request permission for sms receive. (API LEVEL 23 AND UPPER)
```javascript
Application.android.requestPermissions(1002, Application.Android.Permissions.RECEIVE_SMS);
```
**Note:** You can also use the [permission utility by Smartface Extension Utils.](https://github.com/smartface/sf-extension-utils/blob/master/doc/permission.md)
## How to use

```typescript
import Page1Design from 'generated/pages/page1';
import Permission from '@smartface/extension-utils/lib/permission';
import Application from '@smartface/native/application';
import SMSReceiver from '@smartface/extension-smsreceiver';
import System from '@smartface/native/device/system';

export default class Page1 extends Page1Design {
    router: any;
    constructor() {
        super();
        this.onShow = onShow.bind(this, this.onShow.bind(this));
        this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
        this.onHide = onHide.bind(this, this.onHide && this.onHide.bind(this));
    }

    requestSMSPermission() {
        if (System.OS === 'iOS') {
            // Prevent unnecessary prompt on iOS. iOS doesn't have this permission.
            return;
        }
        Permission.getPermission({
            androidPermission: Application.Android.Permissions.RECEIVE_SMS,
            permissionText: "Requesting to Receive SMS to do awesome stuff",
            permissionTitle: "Permission Required"
        })
            .then(() => {
                SMSReceiver.registerReceiver();
                SMSReceiver.callback = (e) => {
                    console.info(e);
                }
            })
    }
}

function onHide(superOnHide: () => void) {
    superOnHide();
    /**
     * This will be triggered when user leaves the page.
     */
    SMSReceiver.unRegisterReceiver();
}

function onShow(superOnShow: () => void) {
    superOnShow();
}

function onLoad(superOnLoad: () => void) {
    superOnLoad();
    this.requestSMSPermission();
}

```
## License
This project is licensed under the terms of the MIT license. See the [LICENSE](https://raw.githubusercontent.com/smartface/sf-extension-smsreceiver/master/LICENSE) file. Within the scope of this license, all modifications to the source code, regardless of the fact that it is used commercially or not, shall be committed as a contribution back to this repository.
