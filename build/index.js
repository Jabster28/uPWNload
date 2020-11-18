"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const usbDetect = require("usb-detection");
const drivelist = require("drivelist");
require("colors");
usbDetect.startMonitoring();
// This is the listener function for the 'add' event
function addUSBhandler() {
    console.log('i think i hear one!');
    // Start interval to check if the USB is mounted
    const checkUSBintervalID = setInterval(() => {
        console.log('looking for it...');
        drivelist.list().then(drives => {
            // iterate through all drives
            for (let d = 0; d < drives.length; d++) {
                // if the drive is a removable usb
                if (drives[d].isSystem === false) {
                    // if this drive is mounted
                    if (drives[d].mountpoints.length > 0) {
                        console.log('found it!');
                        console.log(drives[d].mountpoints[0].path);
                        // the drive is mounted
                        // do stuff here.
                        // the path is at drives[d].mountpoints[0].path
                        clearInterval(checkUSBintervalID);
                    }
                }
            }
        });
    }, 1000);
}
// Add listener for when a USB is plugged in
console.log('waiting for USB sticks...');
usbDetect.on('add', addUSBhandler);
//# sourceMappingURL=index.js.map