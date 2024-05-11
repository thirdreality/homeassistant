# Instructions on ThirdReality Smart Plug Private Cluster in Home Assistant ZHA

## 1.ZHA中的配置
1）在/config目录下创建一个文件夹（名称自己定义，示例中文件夹名称为“thirdreality_quirks”），用于存放本地用代码文件

2）使用samba share工具将plug.py文件放入到刚刚创建的文件夹中

3）编辑configuration.yaml文件，具体如下图红框处所示：
![config_configuration](https://github.com/hwzolin/thirdThreadZHA/assets/42085859/a457049b-8cb8-4e0c-8a0d-d478caa88428)

4）配置完成后保存退出，并将HA重启


## 2.对设备的操作
**PS：本文描述的是PLUG的操作，而所有的设备私有cluster都可以用类似如下的方式进行控制**

1）添加PLUG

2）进入PLUG的详情页，如下图所示，点击选项按钮
![image](https://github.com/hwzolin/thirdThreadZHA/assets/42085859/57c430a7-91fa-4a2e-9384-7fe44dfe2c8d)

3）在弹出的目录中选择“Manage zigbee device”
![image](https://github.com/hwzolin/thirdThreadZHA/assets/42085859/e24e790e-82c6-46fc-b86a-695330a62a5c)

4)在弹出的窗口中选择clusters下拉列表中的“ThirdRealityPlugCluster”
![image](https://github.com/hwzolin/thirdThreadZHA/assets/42085859/e3323307-256b-4928-ae93-3123ffbdb314)

5)选择cluster之后，在"ATTRIBUTES"中选择"reset_summation_delivered",并且设置value为1，然后点击"WRITE ATTRIBUTE"
![image](https://github.com/hwzolin/thirdThreadZHA/assets/42085859/8cd77246-197d-4d60-91b9-458b38c89957)

6)查看结果：上图为点击命令发送前的累计电量显示，下图为发送命令后的累计电量显示
![image](https://github.com/hwzolin/thirdThreadZHA/assets/42085859/a3fe7e31-61ab-4385-b614-406392124583)

![image](https://github.com/hwzolin/thirdThreadZHA/assets/42085859/0273af27-856c-44ac-b0a3-c8cab07d050e)


## 3.Access Smart Plug scripts on GitHub
URL：https://github.com/thirdreality
![image](https://github.com/hwzolin/thirdThreadZHA/assets/42085859/35ce0633-aa30-42f7-982c-9c1f7d3e292f)
![image](https://github.com/hwzolin/thirdThreadZHA/assets/42085859/3f6cb4ba-3166-430a-ba2f-36002a029e4b)
![image](https://github.com/hwzolin/thirdThreadZHA/assets/42085859/e1790e4b-5dc4-4115-8f4e-b3db37c73961)
![image](https://github.com/hwzolin/thirdThreadZHA/assets/42085859/9d4c17d8-5a74-412e-9653-d41f096fbb2a)


