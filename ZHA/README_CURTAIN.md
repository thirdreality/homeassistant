# # Instructions on ThirdReality Curtain Private Cluster in Home Assistant ZHA（Support zha starting from version 73）

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


## 2.Operating Devices

Note: These instructions describe the operation for a Curtain. Similar methods can be applied to customize other ThirdReaity devices with private clusters.

1.Add a Curtain

2.Access Curtain Settings, navigate to the details page of the added Curtain click the "Options" button, as shown in the screenshot

<img title="" src="assets/curtain/2.png" alt="">

3.In the pop-up menu, choose the "Manage Zigbee Device" option.

<img title="" src="assets/curtain/3.png" alt="">

4.In the new window, select "ThirdRealityBlindCluster" from the "Clusters" drop-down list.

<img title="" src="assets/curtain/4.png" alt="">

5.Under "ATTRIBUTES," locate "infrared_off", set the "value" to 1, click the "WRITE ATTRIBUTE" button.

<img title="" src="assets/curtain/5.png" alt="">

<img title="" src="assets/curtain/6.png" alt="">

## 3.Access Smart Motion scripts on GitHub
URL：https://github.com/thirdreality

<img title="" src="assets/curtain/9.png" alt="">

<img title="" src="assets/curtain/10.png" alt="">

<img title="" src="assets/curtain/11.png" alt="">

<img title="" src="assets/curtain/12.png" alt="">
