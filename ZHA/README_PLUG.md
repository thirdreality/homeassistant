# Instructions on ThirdReality Smart Plug Private Cluster in Home Assistant ZHA

## 1.ZHA Configuration
1）Create a Folder for Local Code Files:
a. Navigate to the /config directory.
b. Create a new folder with a name(e.g., thirdreality_quirks). This folder will store the local code files.

2）Place the plug.py File:
a. Use the Samba share tool to transfer the plug.py file into the newly created folder.

3）Edit the configuration.yaml File(as shown in the boxed area):

![config_configuration](https://github.com/hwzolin/thirdThreadZHA/assets/42085859/a457049b-8cb8-4e0c-8a0d-d478caa88428)

4）Restart Home Assistant:
a. Restart Home Assistant to apply the configuration changes.


## 2.Operating Devices
**Note: These instructions describe the operation for a PLUG device. Similar methods can be applied to customize other ThirdReaity devices with private clusters.**

1）Add a PLUG Device

2）Access PLUG Device Settings, navigate to the details page of the added PLUG device, click the "Options" button, as shown in the screenshot.

![image](https://github.com/hwzolin/thirdThreadZHA/assets/42085859/57c430a7-91fa-4a2e-9384-7fe44dfe2c8d)

3）In the pop-up menu, choose the "Manage Zigbee Device" option.

![image](https://github.com/hwzolin/thirdThreadZHA/assets/42085859/e24e790e-82c6-46fc-b86a-695330a62a5c)

4)In the new window, select "ThirdRealityPlugCluster" from the "Clusters" drop-down list.

![image](https://github.com/hwzolin/thirdThreadZHA/assets/42085859/e3323307-256b-4928-ae93-3123ffbdb314)

5)Under "ATTRIBUTES," locate "reset_summation_delivered.", set the "value" to 1, click the "WRITE ATTRIBUTE" button.

![image](https://github.com/hwzolin/thirdThreadZHA/assets/42085859/8cd77246-197d-4d60-91b9-458b38c89957)

6)Compare the "Cumulative Power" display before and after sending the reset command. The screenshots provided (image, image) illustrate the difference.

![image](https://github.com/hwzolin/thirdThreadZHA/assets/42085859/a3fe7e31-61ab-4385-b614-406392124583)

![image](https://github.com/hwzolin/thirdThreadZHA/assets/42085859/0273af27-856c-44ac-b0a3-c8cab07d050e)


## 3.Access Smart Plug scripts on GitHub
URL：https://github.com/thirdreality

![image](https://github.com/hwzolin/thirdThreadZHA/assets/42085859/35ce0633-aa30-42f7-982c-9c1f7d3e292f)

![image](https://github.com/hwzolin/thirdThreadZHA/assets/42085859/3f6cb4ba-3166-430a-ba2f-36002a029e4b)

![image](https://github.com/hwzolin/thirdThreadZHA/assets/42085859/e1790e4b-5dc4-4115-8f4e-b3db37c73961)

![image](https://github.com/hwzolin/thirdThreadZHA/assets/42085859/9d4c17d8-5a74-412e-9653-d41f096fbb2a)


