# Instructions on ThirdReality Water Leak Sensor Private Cluster in Home Assistant ZHA

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

## 2.Operating Devices

**Note: These instructions describe the operation for a WATER LEAK SENSOR device. Similar methods can be applied to customize other ThirdReaity devices with private clusters.**

1) Add a WATER LEAK SENSOR Device

2) Access WATER LEAK SENSOR Device Settings, navigate to the details page of the added WATER LEAK SENSOR device, click the "Options" button, as shown in the screenshot

![image](assets/waterleak/2.png)

3) In the pop-up menu, choose the "Manage Zigbee Device" option.

![image](assets/waterleak/3.png)

4) In the new window, select "ThirdRealityWaterLeakCluster" from the "Clusters" drop-down list.

![image](assets/waterleak/4.png)

5)Under "ATTRIBUTES," locate "siren_on_off", set the "value" to (0 or 1),value 0 is mute，1 is ringing, click the "WRITE ATTRIBUTE" button.

![image](assets/waterleak/5.png)

6) Under "ATTRIBUTES," locate "siren_mintues.", set the "value" to (0 -255),value 0 is Always ringing，1 is ringing one minutes, click the "WRITE ATTRIBUTE" button.

![image](assets/waterleak/6.png)





## 3.Access Smart Water Leak scripts on GitHub

URL：https://github.com/thirdreality

![image](assets/waterleak/7.png)

![image](assets/waterleak/8.png)

![image](assets/waterleak/9.png)

![image](assets/waterleak/10.png)


