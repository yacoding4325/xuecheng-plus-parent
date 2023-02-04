# xuecheng-plus-parent

# 学成在线 讲义-项目开发环境搭建



# 1.项目背景

## 1.1在线教育市场环境


在线教育行业是一个有着极强的广度和深度的行业，从校内到校外；从早幼教到职业培训；从教育工具到全信息化平台等等。

2020年的新冠疫情外生冲击，让在线教育再次站在聚光灯下。疫情下教育领域获融资最多，而其中在线教育最受资本青睐。据[艾瑞咨询](http://s.iresearch.cn/search/airuizixun/)统计，2020年教育行业累计融资1164亿元，其中在线教育融资金额1034亿元，占比89%。与此同时，在行业处于困境的情况下，会加速洗牌，资源向好的企业集中。2020年资源向头部集中趋势明显，中小型机构生存更加困难。2020年资本向在线教育行业累计输送的1034亿元中，80%都流向了头部的5家公司。

**To C市场**

据艾瑞咨询统计核算，2020年中国在线教育行业市场规模2573亿元，过去4年的CAGR达34.5%，其中低幼及素质教育赛道、K12学科培训赛道在线化进程加快是在线教育市场快速增长的最主要贡献因素。疫情影响下，低幼及素质教育领域的在线化范围持续纵深，职业教育领域的在线化进程也在不断加速，新的供给和需求不断产生。但同时，2020年疫情外生冲击加快了2020年的在线教育进程，将会透支一部分2021年的增速，艾瑞预计2021年在线教育行业同比增速将回落到20%左右。

![image-20220821085001257](imgs/image-20220821085001257.png)

**To B** **市场**

疫情也加速了整个教育产业链的进化，toB机构快速成长起来，扮演着赋能者的角色，课程内容、招生、师训、直播系统、管理系统等产品及服务大量涌现。随着云服务发展成熟以及疫情对直播课需求的催化，大量提供直播授课系统等PaaS/SaaS服务的机构迅速成长起来，成为各种会展上的主力军。

![image-20220821085246982](imgs/image-20220821085246982.png)

## 1.2 IT培训市场规模

中国IT人才供给报告（https://new.qq.com/rain/a/20210831A01JI600）

IT人才总体供不应求，高中低人才分别占比8%、41%、51%，详见下图：

![image-20220821085929333](imgs/image-20220821085929333.png)

IT服务是贯穿IT应用系统全生命周期的各项服务的统称，下图是IT服务产品图谱，本项目属于IT培训产业。

![image-20220821090005829](imgs/image-20220821090005829.png)

下图是IT培训市场规模：

![image-20220821090446812](imgs/image-20220821090446812.png)



# 2 项目介绍（面试）

## 2.1 项目介绍 

学成在线项目借鉴了MOOC（大型开放式网络课程，即MOOC（massive open online courses））的设计思想，是一个提供IT职业课程在线学习的平台，它为即将和已经加入IT领域的技术人才提供在线学习服务，用户通过在线学习、在线练习、在线考试等学习内容，最终掌握所学的IT技能，并能在工作中熟练应用。  

在线教育的模式出现多种多样，包括：B2C、C2C、B2B2C等业务模式。**学成在线采用B2B2C业务模式**，即向企业或个人在线教育平台提供教学服务，老师和学生通过平台完成整个教学和学习的过程，市场上类似的平台有：网易云课堂、腾讯课堂等，学成在线的特点是IT职业课程在线教学。

​	

## 2.2 功能模块与演示

本项目包括门户、个人学习中心、教学机构管理平台、运营平台、社交系统、系统管理6个模块 。

![image](https://user-images.githubusercontent.com/82166879/216629091-250cf7f5-d9f9-4668-911e-7f40400423f0.png)



本项目主要包括三类用户角色：学生、教学机构的老师、平台运营人员。

主要讲解下边的业务流程：

1、教学机构的老师登录教学管理平台，编辑课程信息，发布自己的课程。

2、平台运营人员登录运营平台审核课程、视频等信息，审核通过后课程方可发布。

课程编辑与发布流程如下：

![image](https://user-images.githubusercontent.com/82166879/216629145-2e8daaaf-babb-434f-a096-074b2c944d91.png)

3、课程发布后学生登录平台进行选课、在线学习。

免费课程可直接学习，收费课程需要下单购买。

学生选课流程如下：
![image](https://user-images.githubusercontent.com/82166879/216629193-6663517f-4f42-4bef-96dd-9faf2d524746.png)

下边打开网站进行演示。



# 3.项目的技术架构（面试）

## 3.1 项目技术架构

​	学成在线项目采用当前流行的前后端分离架构开发，由以下流程来构成：用户层、CDN内容分发和加速、负载均衡、UI层、微服务层、数据层。

> 项目技术架构图

![image](https://user-images.githubusercontent.com/82166879/216629261-ada544d1-206d-4da5-883a-4ed7be81079d.png)



> 技术架构列表

| **序号** | **名称** | **功能描述**                                                 |
| -------- | -------- | ------------------------------------------------------------ |
| 1        | 用户层   | 用户层描述了本系统所支持的用户类型包括：pc用户、app用户、h5用户。pc用户通过浏览器访问系统、app用户通过android、ios手机访问系统，H5用户通过h5页面访问系统。 |
| 2        | CDN      | CDN全称Content Delivery Network，即内容分发网络，本系统所有静态资源全部通过CDN加速来提高访问速度。系统静态资源包括：html页面、js文件、css文件、image图片、pdf和ppt及doc教学文档、video视频等。 |
| 3        | 负载均衡 | 系统的CDN层、UI层、服务层及数据层均设置了负载均衡服务，上图仅在UI层前边标注了负载均衡。  每一层的负载均衡会根据系统的需求来确定负载均衡器的类型，系统支持4层负载均衡+7层负载均衡结合的方式，4层负载均衡是指在网络传输层进行流程转发，根据IP和端口进行转发，7层负载均衡完成HTTP协议负载均衡及反向代理的功能，根据url进行请求转发。 |
| 4        | UI层     | UI层描述了系统向pc用户、app用户、h5用户提供的产品界面。根据系统功能模块特点确定了UI层包括如下产品界面类型：  1）面向pc用户的门户系统、学习中心系统、教学管理系统、系统管理中心。  2）面向h5用户的门户系统、学习中心系统。  3）面向app用户的门户系统、学习中心系统。 |
| 5        | 微服务层 | 微服务层将系统服务分类三类：业务服务、基础服务、第三方代理服务。  **业务服务**：主要为学成在线核心业务提供服务，并与数据层进行交互获得数据。  **基础服务**：主要管理学成在线系统运行所需的配置、日志、任务调度、短信等系统级别的服务。  **第三方代理服务**：系统接入第三方服务完成业务的对接，例如认证、支付、视频点播/直播、用户认证和授权。 |
| 6        | 数据层   | 数据层描述了系统的数据存储的内容类型，**关系性数据库：**持久化的业务数据使用MySQL。  **消息队列**：存储系统服务间通信的消息，本身提供消息存取服务，与微服务层的系统服务连接。  **索引库：**存储课程信息的索引信息，本身提供索引维护及搜索的服务，与微服务层的系统服务连接。  **缓存：**作为系统的缓存服务，作为微服务的缓存数据便于查询。  **文件存储：**提供系统静态资源文件的分布式存储服务，文件存储服务器作为CDN服务器的数据来源，CDN上的静态资源将最终在文件存储服务器上保存多份。 |

> 流程说明 



1. 用户可以通过pc、手机等客户端访问系统进行在线学习。
2. 系统应用CDN技术，对一些图片、CSS、视频等资源从CDN调度访问。
3. 所有的请求全部经过负载均衡器。
4. 对于PC、H5等客户端请求，首先请求UI层，渲染用户界面。
5. 客户端UI请求服务层获取进行具体的业务操作。
6. 服务层将数据持久化到数据库。



## 3.3 项目技术栈

​	学成在线按照技术分层的基础上，需要对主要层次使用具体的技术作说明。下面是学成在线技术栈结构图。

> 技术栈（技术结构图）

![image](https://user-images.githubusercontent.com/82166879/216629422-f06514f0-8660-495e-bcd6-5998cfe4cf4f.png)

