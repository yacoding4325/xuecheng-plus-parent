# 学成在线 v2 门户页

## Git 地址

<http://git.itcast.cn/development/project-xczx2-portal-vue-ts>

## 接口地址

<https://mock.boxuegu.com/project/698/interface/api>

## 功能表

<https://shimo.im/sheets/PVAPV2R7E9cmFVql/ryv6D>

## 外网演示（非同步更新）

<http://xczx2-portal-java-dev.itheima.net>

## 自定义 `AUTHORIZATION TOKEN` 和 `API URL`

修改文件 `.env` 文件

```sh
VUE_APP_SERVER_API_URL=https://mock.boxuegu.com/mock/776
VUE_APP_SERVER_AUTHORIZATION=ew0KICAgICJhdWQiOiBbDQogICAgICAgICJ4dWVjaGVuZy1yZXNvdXJjZSINCiAgICBdLA0KICAgICJwYXlsb2FkIjogew0KICAgICAgICAiMTE3NzE0NDIwOTQ2MzEyODEyNSI6IHsNCiAgICAgICAgICAgICJyZXNvdXJjZXMiOiBbDQogICAgICAgICAgICBdLA0KICAgICAgICAgICAgInVzZXJfYXV0aG9yaXRpZXMiOiB7DQogICAgICAgICAgICAgICAgInJfMDAxIjogWw0KICAgICAgICAgICAgICAgICAgICAieGNfY29tcGFueV9tb2RpZnkiLA0KCQkJCQkieGNfY29tcGFueV92aWV3IiwNCgkJCQkJInhjX2NvdXJzZV9iYXNlX2RlbCIsDQoJCQkJCSJ4Y19jb3Vyc2VfYmFzZV9lZGl0IiwNCgkJCQkJInhjX2NvdXJzZV9iYXNlX2xpc3QiLA0KCQkJCQkieGNfY291cnNlX2Jhc2Vfc2F2ZSIsDQoJCQkJCSJ4Y19jb3Vyc2VfYmFzZV92aWV3IiwNCgkJCQkJInhjX2NvdXJzZV9wdWJsaXNoIiwNCgkJCQkJInhjX21hcmtldF9zYXZlX21vZGlmeSIsDQoJCQkJCSJ4Y19tYXJrZXRfdmlldyIsDQoJCQkJCSJ4Y19tZWRpYV9kZWwiLA0KCQkJCQkieGNfbWVkaWFfbGlzdCIsDQoJCQkJCSJ4Y19tZWRpYV9wcmV2aWV3IiwNCgkJCQkJInhjX21lZGlhX3NhdmUiLA0KCQkJCQkieGNfdGVhY2hlcl9saXN0IiwNCgkJCQkJInhjX3RlYWNoZXJfbW9kaWZ5IiwNCgkJCQkJInhjX3RlYWNoZXJfc2F2ZSIsDQoJCQkJCSJ4Y193b3JrcmVjb3JkX2NvcnJlY3Rpb24iLA0KCQkJCQkieGNfd29ya3JlY29yZF9saXN0IiwNCgkJCQkJInhjX3RlYWNocGxhbndvcmtfZGVsIiwNCgkJCQkJInhjX3RlYWNocGxhbndvcmtfbGlzdCIsDQoJCQkJCSJ4Y190ZWFjaHBsYW53b3JrX3NhdmVfbW9kaWZ5IiwNCgkJCQkJInhjX3RlYWNocGxhbl9kZWwiLA0KCQkJCQkieGNfdGVhY2hwbGFuX3NhdmVfbW9kaWZ5IiwNCgkJCQkJInhjX3RlYWNocGxhbl92aWV3Ig0KICAgICAgICAgICAgICAgIF0sDQogICAgICAgICAgICAgICAgInJfMDAyIjogWw0KICAgICAgICAgICAgICAgICAgICAieGNfY291cnNlX2FkbWluX2xpc3QiLA0KCQkJCQkieGNfY291cnNlX2Jhc2VfY29tbWl0IiwNCgkJCQkJInhjX3N5c3RlbV9jYXRlZ29yeSIsDQoJCQkJCSJ4Y19tX21lZGlhX2xpc3QiLA0KCQkJCQkieGNfbWVkaWFfYXVkaXQiDQogICAgICAgICAgICAgICAgXQ0KICAgICAgICAgICAgfQ0KICAgICAgICB9DQogICAgfSwNCiAgICAidXNlcl9uYW1lIjogInhjLXVzZXItZmlyc3QiLA0KICAgICJzY29wZSI6IFsNCiAgICAgICAgInJlYWQiDQogICAgXSwNCiAgICAibW9iaWxlIjogIjE1MDEyMzQ1Njc4IiwNCiAgICAiZXhwIjogMTYwNjUyNTEyMiwNCiAgICAiY2xpZW50X2F1dGhvcml0aWVzIjogWw0KICAgICAgICAiUk9MRV9VU0VSIg0KICAgIF0sDQogICAgImp0aSI6ICIxZWI3ZTk4Ny1kN2MyLTQwZjUtYjBkNi1jZDYxMzljYjE4ZTAiLA0KICAgICJjbGllbnRfaWQiOiAieGMtY29tLXBsYXRmb3JtIg0KfQ==
```

## 本机 nodejs 运行

### 第一步：下载环境

<https://nodejs.org/en/>

### 第二步：安装 cnpm 包管理

```sh
npm install -g cnpm --registry=https://registry.npm.taobao.org
```

### 第三步：拉取包依赖

```sh
cd project-xczx2-portal-vue-ts
cnpm i
```

### 第四步：修改转发 API 地址

修改 `.env` 文件

```env
VUE_APP_SERVER_API_URL=https://mock.boxuegu.com/mock/776
```

### 最后：运行

```sh
npm run serve
```

浏览器打开

<http://localhost:8080/>

## Docker 方式（可以不看）

### 拉取镜像

```sh
docker pull registry.cn-beijing.aliyuncs.com/ducafe/xczx2-portal-java-dev:latest
```

### 推送镜像

```sh
docker login --username=tao.hans@gmail.com registry.cn-beijing.aliyuncs.com
docker build -t registry.cn-beijing.aliyuncs.com/ducafe/xczx2-portal-java-dev:latest .
docker push registry.cn-beijing.aliyuncs.com/ducafe/xczx2-portal-java-dev:latest
```
