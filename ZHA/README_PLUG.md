# Instructions on ThirdReality Smart Plug Private Cluster in Home Assistant ZHA

## 1.Configuration in ZHA
1）Create a folder in the /config directory (the name is defined by yourself, the name of the folder in the example Chinese is "thirdreality_quirks") in the example, which is used to store the local code files.

2）Use the Samba Share tool to place plug.py files into the folder you just created.

3）Edit the configuration.yaml file, as shown in the red box in the following figure:
![config_configuration](https://github.com/hwzolin/thirdThreadZHA/assets/42085859/a457049b-8cb8-4e0c-8a0d-d478caa88428)

4）After the configuration is complete, save and exit, and restart HA.


## 2.Operation on the device
**PS：This document describes the operation of PLUG, and all device private clusters can be controlled in a manner similar to the following:**

1）Add PLUG

2）Go to the details page of PLUG, click the Options button as shown in the figure below:
![image](https://github.com/hwzolin/thirdThreadZHA/assets/42085859/57c430a7-91fa-4a2e-9384-7fe44dfe2c8d)

3）In the pop-up directory, select "Managzi Bideves":
![image](https://github.com/hwzolin/thirdThreadZHA/assets/42085859/e24e790e-82c6-46fc-b86a-695330a62a5c)

4)In the pop-up window, select ThirdRealityPlugCluster from the clusters drop-down list:
![image](https://github.com/hwzolin/thirdThreadZHA/assets/42085859/e3323307-256b-4928-ae93-3123ffbdb314)

5)After selecting cluster, select "reset_summation_delivered" in "ATTRIBUTES" and set the value to 1, then click "WRITE ATTRIBUTE":
![image](https://github.com/hwzolin/thirdThreadZHA/assets/42085859/8cd77246-197d-4d60-91b9-458b38c89957)

6)View the result: The above figure shows the cumulative power before clicking the command sends, and the bottom figure shows the cumulative power after sending the command:
![image](https://github.com/hwzolin/thirdThreadZHA/assets/42085859/a3fe7e31-61ab-4385-b614-406392124583)

![image](https://github.com/hwzolin/thirdThreadZHA/assets/42085859/0273af27-856c-44ac-b0a3-c8cab07d050e)


## 3.Access Smart Plug scripts on GitHub
URL：https://github.com/thirdreality
![image](https://github.com/hwzolin/thirdThreadZHA/assets/42085859/35ce0633-aa30-42f7-982c-9c1f7d3e292f)
![image](https://github.com/hwzolin/thirdThreadZHA/assets/42085859/3f6cb4ba-3166-430a-ba2f-36002a029e4b)
![image](https://github.com/hwzolin/thirdThreadZHA/assets/42085859/e1790e4b-5dc4-4115-8f4e-b3db37c73961)
![image](https://github.com/hwzolin/thirdThreadZHA/assets/42085859/9d4c17d8-5a74-412e-9653-d41f096fbb2a)


