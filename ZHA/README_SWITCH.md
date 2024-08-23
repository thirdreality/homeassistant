# Instructions on ThirdReality Switch Private Cluster in Home Assistant ZHA

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

## 3.Access Smart Plug scripts on GitHub
URL：https://github.com/thirdreality

<img title="" src="assets/switch/9.png" alt="">

<img title="" src="assets/switch/10.png" alt="">

<img title="" src="assets/switch/11.png" alt="">

<img title="" src="assets/switch/12.png" alt="">
