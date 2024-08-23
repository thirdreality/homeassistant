# Instructions on ThirdReality Door Sensor Private Cluster in Home Assistant ZHA

#
## 1.ZHA Configuration And How To Add The Script 

1）Install the Samba Sahre add-on in Home Assistant

![config_configuration](assets/motion/14.png)


![config_configuration](assets/motion/15.png)


![config_configuration](assets/motion/17.png)

#If you cannot find the plugin, please open the advanced settings below

![config_configuration](assets/motion/18.png)


![config_configuration](assets/motion/16.png)


2）Open the folder and enter the IP address of the Home assistant. You need to enter your account and password(Account password in Samba share configuration)

![config_configuration](assets/motion/19.png)

3）Afterwards, enter the config file and create a new file to store the script. (My script is stored in zha_quirks)

![config_configuration](assets/motion/20.png)
![config_configuration](assets/motion/23.png)

4）Enter configuration.yaml, add these two lines, and the path will be the location where you store the plug script, as shown in the above figure

![config_configuration](assets/motion/22.png)


a. Restart Home Assistant to apply the configuration changes.

## 2.Operating Devices (delay_open)(The device is reset, and all private property Settings are restored to default values)

**Note: These instructions describe the operation for a DOOR SENSOR device. Similar methods can be applied to customize other ThirdReaity devices with private clusters.**

1) Add a DOOR SENSOR Device

2) Access DOOR SENSOR Device Settings, navigate to the details page of the added DOOR SENSOR device, click the "Options" button, as shown in the screenshot

![image](assets/door/2.png)

3) In the pop-up menu, choose the "Manage Zigbee Device" option.

![image](assets/door/11.png)

4) In the new window, select "ThirdRealityDoorCluster" from the "Clusters" drop-down list.

![image](assets/door/3.png)

5) Under "ATTRIBUTES," locate "delay_open.", set the "value" to (0-65535), click the "WRITE ATTRIBUTE" button.

![image](assets/door/4.png)

6) The following screenshot show the difference.If the value set 15，state from closed to open need 15sec.

![image](assets/door/5.png)

![image](assets/door/6.png)


## 3.Operating Devices (Control the brightness of the light）（The device is reset, and all private property Settings are restored to default values)

**Note: These instructions describe the operation for a MOTION SENSOR device. Similar methods can be applied to customize other ThirdReaity devices with private clusters.**

1) Add a DOOR SENSOR Device

2) Access DOOR SENSOR Device Settings, navigate to the details page of the added DOOR SENSOR device, click the "Options" button, as shown in the screenshot

![image](assets/door/2.png)

3) In the pop-up menu, choose the "Manage Zigbee Device" option.

![image](assets/door/11.png)

4) In the new window, select "ThirdRealityDoorBrightnessCluster" from the "Clusters" drop-down list

![image](assets/door/12.png)

5)Under "ATTRIBUTES," locate "blue_light" or " locate "blue_light", set the "value" to (0-100,    0 is the darkest, 100 is the brightest), click the "WRITE ATTRIBUTE" button.

![image](assets/door/14.png)


## 4.Access Smart Door scripts on GitHub

URL：https://github.com/thirdreality

![image](assets/door/7.png)

![image](assets/door/8.png)

![image](assets/door/9.png)

![image](assets/door/10.png)


