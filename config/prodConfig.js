//项目配置
//创建：170711 10：22

/**
*  
*  port : 服务端口
*  url  : 项目地址 是CDN的资源服务器的路径（指定路径的前缀：www.**cnd.com/staticfile）
*  ver  : version 当前版本  会根据名字创建或进入文件夹
*  pname : 指定项目名
*  
*/

//项目hash码
// var hashState = function(){
//     return (Math.random()*9007199254740992).toString(36).toUpperCase();
// };
//默认的配置 dConfig => default config
var dConfig = (obj)=>{
    var opt = {
        port : 3666,
        url  : '127.0.0.1/mobile/activitys',   
        ver  : 'v1',
        pname : ''
    };
    for(let i in obj) opt[i] = obj[i];

    return opt;
};

module.exports = {
    'toolInit' : dConfig({
        ver : 'v3'
    }),
    'giftmoney001' : dConfig({
        port : 3110
    })
};