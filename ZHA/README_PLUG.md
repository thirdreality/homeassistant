# Instructions on ThirdReality Smart Plug Private Cluster in Home Assistant ZHA

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

**Note: These instructions describe the operation for a PLUG device. Similar methods can be applied to customize other ThirdReaity devices with private clusters.**

1) Add a PLUG Device

2) Access PLUG Device Settings, navigate to the details page of the added PLUG device, click the "Options" button, as shown in the screenshot

![image](assets/plug/2.png)

3) In the pop-up menu, choose the "Manage Zigbee Device" option.

![image](assets/plug/3.png)

4) In the new window, select "ThirdRealityPlugCluster" from the "Clusters" drop-down list.

![image](assets/plug/4.png)

5) Under "ATTRIBUTES," locate "reset_summation_delivered.", set the "value" to 1, click the "WRITE ATTRIBUTE" button.

![image](assets/plug/5.png)

6)Compare the "Summation Delivered" display before and after sending the reset command. The following two screenshots show the difference.

![image](assets/plug/6.png)

![image](assets/plug/7.png)

## 3.Access Smart Plug scripts on GitHub

URL：https://github.com/thirdreality

![image](assets/plug/8.png)

![image](assets/plug/9.png)

![image](assets/plug/10.png)

![image](assets/plug/11.png)
