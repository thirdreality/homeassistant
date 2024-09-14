# Instructions on ThirdReality Vibration Sensor Private Cluster in Home Assistant ZHA（Support zha starting from version 46）


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

Note: These instructions describe the operation for a Vibration Sensor. Similar methods can be applied to customize other ThirdReaity devices with private clusters.

1.Add a Vibration Sensor

2.Access Vibration Sensor Settings, navigate to the details page of the added Vibration Sensor click the "Options" button, as shown in the screenshot

<img title="" src="assets/vibrate/2.png" alt="">

3.In the pop-up menu, choose the "Manage Zigbee Device" option.

<img title="" src="assets/vibrate/3.png" alt="">
<img title="" src="assets/vibrate/4.png" alt="">

4.In the new window, select "ThirdRealityAccelCluster" from the "Clusters" drop-down list.

<img title="" src="assets/vibrate/5.png" alt="">

5.Under "ATTRIBUTES," locate "cooldown_perioc.", set the "value" to 10, click the "WRITE ATTRIBUTE" button.

<img title="" src="assets/vibrate/6.png" alt="">

6.Compare the "Logbook" display before and after sending the command. The following two screenshots show the difference.

<img title="" src="assets/vibrate/7.png" alt="">

<img title="" src="assets/vibrate/8.png" alt="">

## 3.Access Smart Plug scripts on GitHub
URL：https://github.com/thirdreality

<img title="" src="assets/vibrate/9.png" alt="">

<img title="" src="assets/vibrate/10.png" alt="">

<img title="" src="assets/vibrate/11.png" alt="">

<img title="" src="assets/vibrate/12.png" alt="">
