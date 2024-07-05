# Instructions on ThirdReality Switch Private Cluster in Home Assistant ZHA

## ZHA Configuration

1）Create a Folder for Local Code Files: a. Navigate to the /config directory. b. Create a new folder with a name(e.g., thirdreality_quirks). This folder will store the local code files.

2）Place the switch.py File: a. Use the Samba share tool to transfer the switch.py file into the newly created folder.

3）Edit the configuration.yaml File(as shown in the boxed area):

<img title="" src="assets/switch/1.png" alt="">

4）Restart Home Assistant: a. Restart Home Assistant to apply the configuration changes.

### Operating Devices

1.Add a Switch

2.Access Switch Settings, navigate to the details page of the added Switch click the "Options" button, as shown in the screenshot

<img title="" src="assets/switch/2.png" alt="">

3.In the pop-up menu, choose the "Manage Zigbee Device" option.

<img title="" src="assets/switch/3.png" alt="">

4.In the new window, select "ThirdRealitySwitchCluster" from the "Clusters" drop-down list.

<img title="" src="assets/switch/4.png" alt="">

5.Under "ATTRIBUTES," locate "back_on", set the "value" to 1, click the "WRITE ATTRIBUTE" button.

<img title="" src="assets/switch/5.png" alt="">

<img title="" src="assets/switch/6.png" alt="">

If the button is pressed again after pressing it, it will be considered as canceling this function (this time)

3.Access Smart Plug scripts on GitHub
URL：https://github.com/thirdreality

<img title="" src="assets/switch/9.png" alt="">

<img title="" src="assets/switch/10.png" alt="">

<img title="" src="assets/switch/11.png" alt="">

<img title="" src="assets/switch/12.png" alt="">
