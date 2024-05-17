# Instructions on ThirdReality Door Sensor Private Cluster in Home Assistant ZHA

## ZHA Configuration

1）Create a Folder for Local Code Files:
a. Navigate to the /config directory.
b. Create a new folder with a name(e.g., thirdreality_quirks). This folder will store the local code files.

2）Place the door.py File:
a. Use the Samba share tool to transfer the door.py file into the newly created folder.

3）Edit the configuration.yaml File(as shown in the boxed area):

![config_configuration](assets/door/1.png)

4）Restart Home Assistant:
a. Restart Home Assistant to apply the configuration changes.

## Operating Devices

**Note: These instructions describe the operation for a DOOR SENSOR device. Similar methods can be applied to customize other ThirdReaity devices with private clusters.**

1) Add a DOOR SENSOR Device

2) Access DOOR SENSOR Device Settings, navigate to the details page of the added DOOR SENSOR device, click the "Options" button, as shown in the screenshot

![image](assets/door/2.png)

3) In the pop-up menu, choose the "Manage Zigbee Device" option.

![image](assets/door/11.png)

4) In the new window, select "ThirdRealityDoorCluster" from the "Clusters" drop-down list.

![image](assets/door/3.png)

5) Under "ATTRIBUTES," locate "delay_open.", set the "value" to (0-255sec), click the "WRITE ATTRIBUTE" button.

![image](assets/door/4.png)

6) The following screenshot show the difference.If the value set 15，state from closed to open need 15sec.

![image](assets/door/5.png)

![image](assets/door/6.png)



## 3.Access Smart Door scripts on GitHub

URL：https://github.com/thirdreality

![image](assets/door/7.png)

![image](assets/door/8.png)

![image](assets/door/9.png)

![image](assets/door/10.png)


