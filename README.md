# MP-PUSH

一个频道可以被多个微信订阅，一个微信也可以订阅多个频道。当有消息到达频道时，会向所有订阅的微信推送通知。

开发此项目的目的是实现一个自己的“[Server酱](http://sc.ftqq.com/)”，方便自定义。

零痛苦部署，极度简单的API，代码开源，自由扩展。

## 准备好服务号或者测试号

如果注册不了服务号也一点关系没有，测试号完全可以满足个人使用的需求。打开[这里](https://mp.weixin.qq.com/debug/cgi-bin/sandbox?t=sandbox/login)进行注册。

先配置一个消息模板，需要带一个 `first` 字段。

## 准备好一个可以通过域名访问或者有公网IP的服务器

推荐使用 Ubuntu 系统

```
apt update
apt upgrade
```

## 准备部署

安装 Docker 环境

```
apt install docker.io
```

然后执行以下指令

```
$ sudo docker run -d \
-e WX_APP_ID="wxc124e540d18*****" \
-e WX_APP_SC="dcd143ad7e000de32c0236**********" \
-e WX_TEMPLATE_ID="bzrWGCKcwMNPuerpK4WrsbMJ_kq0I4CWxyM207sy8Uk" \
-p 80:3000 \
-v mppushdb:"/app/data" \
brucex/mp-push-nestjs
```

## 确认接口配置信息

在[测试号管理](https://mp.weixin.qq.com/debug/cgi-bin/sandboxinfo?action=showinfo&t=sandbox/index)页面确认接口配置信息。

URL 为 `http://域名或IP/wx`

Token 随意不校验

## 测试接口

关注测试号，发送 `link 频道名称` 绑定频道。

发送 POST 请求触发推送

```
curl -X POST 'https://二级域名.leanapp.cn/push' \
-H 'content-type: application/json' \
-d '{ "channelName": "频道名称", "text": "OK" }'
```
