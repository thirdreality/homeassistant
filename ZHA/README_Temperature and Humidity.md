# # Instructions on ThirdReality Temperature and Humidity Private Cluster in Home Assistant ZHA

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

Note: These instructions describe the operation for a Temperature and Humidity. Similar methods can be applied to customize other ThirdReaity devices with private clusters.

1.Add a Temperature and Humidity

2.Access Temperature and Humidity Settings, navigate to the details page of the added Temperature and Humidity click the "Options" button, as shown in the screenshot

<img title="" src="assets/temperature_humidity/2.png" alt="">

3.In the pop-up menu, choose the "Manage Zigbee Device" option.

<img title="" src="assets/temperature_humidity/3.png" alt="">

4.In the new window, select "ThirdRealityAccelCluster" from the "Clusters" drop-down list.

<img title="" src="assets/temperature_humidity/4.png" alt="">

5.Under "ATTRIBUTES," locate "Temperature_calibration", set the "value" to 10 ，click the "WRITE"(The unit is 0.1 degrees. If this value is 10, the detected value increases by 1.0 degrees. If it is -10, the detected value decreases by 1.0 degrees)

<img title="" src="assets/temperature_humidity/5.png" alt="">

<img title="" src="assets/temperature_humidity/7.png" alt="">

6.Under "ATTRIBUTES," locate "humidity_calibration", set the "value" to 10 ，click the "WRITE"(The unit is 0.1%. If this value is 10, add 1% to the detected value)

<img title="" src="assets/temperature_humidity/6.png" alt="">

<img title="" src="assets/temperature_humidity/8.png" alt="">

## 3.Access Smart Plug scripts on GitHub
URL：https://github.com/thirdreality

<img title="" src="assets/temperature_humidity/9.png" alt="">

<img title="" src="assets/temperature_humidity/10.png" alt="">

<img title="" src="assets/temperature_humidity/11.png" alt="">

<img title="" src="assets/temperature_humidity/12.png" alt="">
