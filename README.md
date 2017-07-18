#活动开发项目 正确启动姿势

## 启动项目

+ 简单实现通过不同命令 dev开发执行对应项目 build打包dist目录生成对应项目

```bash
//开发模式
npm run dev
//打包模式
npm run build

//区分项目打包和开发模式命令
npm run dev-<name>
npm run build-<name>

//举例
"scripts": {
    "dev-toolInit": "node build/dev-server.js toolInit",
    "build-toolInit": "node build/build.js toolInit"
}

//雪碧图打包 (简单版)
"scripts":{
	"sprites" : "node build/sprite.js <name>",	//<name>输入项目名  如：toolInit
}
//自动化发布静态资源到CDN服务器
"upload": "node build/upload.js <name>"	//输入项目名 如：toolInit

```

## 自动化发布静态资源

+ userSignIn : 存放资源服务器登陆信息，不会上传git，需要本地自己配置格式：
```
//配置
module.exports = {
    "uname" : "",   //账号
    "upwd" : ""     //密码
};
//引用
var login = require('');
```
+ command : 一些相关工具，比如命令行获得参数 获得项目名称之类；
+ prodConfig : 项目的配置，每次新开发项目一定要配置；
```
// 示例配置项 -- port：端口；url：静态资源服务地址；ver：版本号
// url的值就这样写 不要写(http)协议头什么的 最后也不需要"/"号
// 具体使用看文件使用方法
{
    port : 3666,
    url  : '127.0.0.1/mobile/activitys',
    ver  : 'v1'
}
```
+ upload : 上传文件的脚本基本不需要改动；
> 上传目录规则 prodConfig中配置项目的url+年+月+项目名+版本号；比如：127.0.0.1/mobile/activitys/2017/01/v1/index.html
> 上传规则就是往咱们efs服务器里上传资源

###### 自动化发布功能必须需要有这4个文件：userSignIn.js、config/command.js、config/prodConfig.js、build/upload.js


## 文件说明

+ 活动页面的项目都在 /src/pages/ 下；

| 文件名 | 路径 | 描述 |
|:------------:|:---------:|:--------------------:|
| assets | 项目名/assets | 当前项目静态资源目录，存放一些图片、脚本、字体和媒体之类···  |
| assets/icons | 项目名/assets/icons | 存放准备做成sprite的icon图片,通过sprites命令生成 |
| assets/banner | 项目名/assets/banner | 放一些大图，如banner的 大背景的 |
| assets/img | 项目名/assets/img | 合成的sprite图片、其它类型的图片放到这里 |
| assets/* | 项目名/assets/* | 其它类型的资源请自行创建 |
| components | 项目名/components | 当前项目通用组件库 |
| modules | 项目名/modules | 一些模块功能、服务接口配置、路由配置等 |
| modules/api.js | 项目名/modules/api.js | 业务所用到的ajax请求链接 |
| modules/server.js | 项目名/modules/server.js | 业务所用到的ajax请求,封装方法请写到这里 |
| modules/pageRouter.js | 项目名/modules/pageRouter.js | 业务之间的路由配置,注意配置name,调用的时候调用对应name |
| pages | 项目名/pages | 就业务模块了 经典的.vue存放地儿 |
| scss | 项目名/scss/ | scss文件存放地 比如引用第三方的scss 或者独立出来的scss都可以写到这 |
| scss | 项目名/scss/sprite_icon.scss | sprites命令创建的雪碧图sass文件 |


## 项目中的使用说明 （以下说到的文件路径请看《文件说明》指定的路径）
+ ajax在业务中的调用方法为: this.$ELServer.函数名(入参参数) 如：this.$ELServer.list({a:1}).then().catch();


## 配置项说明
+ toolInit 								17年05月01日完成 **活动

## 注意事项
+ 每次新添加一个促销活动  记得早package.json文件的scripts字段里面配置名称

## 补充（很重要）
+ 每个pages/下的项目里都有readme.md文件 需要各开发注意一定要编写清楚
+ 重新下载工具：