var path = require('path');
var fs = require( 'fs' );
var needle = require( 'needle' );
var queryString = require('queryString');

var inquirer = require('inquirer');                 //命令交互 比如：confirm之类的
var userSignIn = require( '../userSignIn.js' );        //用户登录信息 （自己配置）
var comConf = require('../config/command.js');      //相关工具

//基础配置
const baseConf = {
    //=====项目参数 start=====//
    prodName : comConf.ComParam.name,    //项目名称
    //=====项目参数 end=====//
    servUrl : 'http://127.0.0.1',        //固定的服务器ajax接口前缀名
    fixedArgs : {    //固定的入参参数
        domainId:'127.0.0.1'
    },
    cookies : '',   //登录携带的cookies
    //例: 127.0.0.1/mobile/activitys/2017/07/v1/
    uploadAddress : comConf.utils.assetsPublicPath(),
    //读取文件（ 文件路径 ）
    filePath : fs.readFileSync( path.resolve(`dist/${comConf.ComParam.name}/${comConf.ComParam.name}.zip`) ) 
};

// console.log(baseConf.uploadAddress)
// return false;

//如果项目参数没有写或者不正确
if( !comConf.utils.isCorrectObject(comConf.prodConfig,comConf.ComParam.name) ){
    console.log(' -------------------- config/prodConfig.js中没有配置正确的项目参数 --------------------');
    return false;
};

//命令行交互 询问操作者是否确认操作
inquirer.prompt([{
    type: 'confirm',
    name: 'status',  //上传文件到efs站点
    message: `请确认上传地址：${baseConf.uploadAddress}`
}]).then( answers => {
    // console.log( answers.status );
    if( !!answers.status ){
        console.log("------------------ 准备上传 ------------------");
        console.log(` 上传地址 :  ${baseConf.uploadAddress}`);

        uploadStart();
    }else{
        console.log("------ 停止上传文件 ------");
    };
});

//封装起来的基于needle服务接口请求方法
function oServer(obj){      //Method,URL,Params,needleData,needleMultipart,callback
    // nde => needle
    var opts = {
        compile : true, //是否编码参数
        method : 'POST',
        url : '',
        params : {},
        ndeData : {},
        ndeOptions : {json:true, open_timeout:5000},
        callback : function(){}
    };
    for(var x in obj) opts[x] = obj[x];

    // 参数编译成 &key=value模式并且给符号编码
    opts.params = queryString.stringify(opts.params);
    needle.request(
        opts.method, 
        opts.url+opts.params, 
        opts.ndeData, 
        opts.ndeOptions,
        function(err,resp){
            opts.callback(err,resp);
        }
    );
};

//开始上传
function uploadStart(){
    console.log(' --------------- 开始上传 --------------- ');
    login();
};
//登录
function login(){
    oServer({
        method : 'POST',
        url : baseConf.servUrl+'/sign?',
        params : {
            uname : userSignIn.uname,
            upwd  : userSignIn.upwd,
            reme  : false
        },
        callback : function( err,resp ) {
            if( !resp.body.checkSuccess ){
                console.log(" ---------- 登录失败:"+resp.body+" ---------- "); 
                return false;
            };
            console.log(" ---------- 登录成功:"+baseConf.cookies+" ---------- ");

            baseConf.cookies = resp.cookies;
            recursionBypath();
        }
    });
};

//递归调用方法
function recursionBypath(){
    //项目路径入参 : 2017/06/proname/v1
    // baseConf.uploadAddress.replace(comConf.prod.url+'/',"")
    // baseConf.uploadAddress
    // var prodname = !!comConf.prod.pname?comConf.prod.pname:comConf.ComParam.name;
    var base = `${comConf.utils.iDate().y}/${comConf.utils.iDate().mm}/${comConf.ComParam.name}/${comConf.prod.ver}`,
        base = base.split("/");
        console.log(base);

    var pageIndex = 0;
    var newUrl = `/${comConf.prod.url}`;

    var recursionFor = ()=>{
        if( pageIndex >= base.length ){
            //上传文件
            upload();
            return false;
        };
        newUrl += `/${base[pageIndex]}`;    //递归路径
        // console.log( "newUrl = ",newUrl, base[pageIndex], newUrl.replace('/'+base[pageIndex],'') )
        // 检查目录
        bypath(
            newUrl.replace('/'+base[pageIndex],''),
            (resp) => {
                var _data = resp.body;
                //返回成功
                if( !!_data.checkSuccess ){
                    //匹配器
                    var oFilter = _data.entity.filter( (elem) => elem.fileName == base[pageIndex]);
                    //如果目录里面又有指定目录 那么创建目录
                    if( _data.entity.length == 0 || oFilter.length == 0 ){
                        add(
                            newUrl.replace('/'+base[pageIndex],''),
                            base[pageIndex],
                            comConf.utils.iDate().mm,
                            comConf.utils.iDate().time,
                            (resp)=>{
                                pageIndex++;
                                recursionFor();
                            }
                        );
                        return false;
                    };
                    pageIndex++;
                    recursionFor();
                };
            }
        );
        // pageIndex++;
        // recursionFor();
    };
    recursionFor();
};

//创建目录
function add(filepath,name,remarks,desc,fn){
    oServer({
        url : baseConf.servUrl+'/addfile?',
        params : {
            'fileId' : 0,
            'domainName' : '127.0.0.1',
            'filePath' : filepath,
            'fileName' : name,
            'uploadRemarks' : remarks,
            'fileDescription' : desc,
            'storeType' : 1
        },
        ndeOptions : {
            cookies : baseConf.cookies
        },
        callback : function( err,resp ) {
            var _data = resp.body;
            // 返回成功
            if( !!_data.checkSuccess ){
                console.log( " ---------- 创建"+filepath+"/"+name+"目录 ---------- " );
                fn && fn(resp);
            };
        }
    });
};
//查询目录
function bypath(filepath,fn){
    oServer({
        url : baseConf.servUrl+'/routeGetFile?',
        params : {
            'domain_id' : baseConf.fixedArgs.domainId,
            'file_path' : filepath
        },
        ndeOptions : {
            cookies : baseConf.cookies
        },
        callback : function(err,resp) {
            var _data = resp.body;
            // 返回成功
            if( !!_data.checkSuccess ){
                console.log( " ---------- 查询"+filepath+"目录 ---------- " );
                fn && fn(resp);
            };
        }
    });
};

//指定目录上传FormData数据
function upload(){
    //'/127.0.0.1/mobile/activitys/2017/07/v1',
    oServer({
        url : baseConf.servUrl+'/uploadFile?',
        params : {
            'domainId' : baseConf.fixedArgs.domainId,
            'filePath' : `/${baseConf.uploadAddress}`,    
            'unzip' : true
        },
        ndeData : {
            zip_file: {
                buffer       : baseConf.filePath,
                filename     : comConf.ComParam.name+'.zip',
                content_type : 'application/octet-stream'
            }
        },
        ndeOptions : {
            cookies : baseConf.cookies,
            multipart : true
        },
        callback : function(err,resp) {
            var _data = resp.body;
            if( !_data.checkSuccess ) return false;

            console.log( "---------- upload success ----------" );
            publish();
        }
    });
};

//发布功能
function publish(){
    oServer({
        url : baseConf.servUrl+'/publishFile?',
        params : {
            'domainId' : baseConf.fixedArgs.domainId,
            'customUrl': baseConf.uploadAddress,
            'isFolder' : true,  //ture：文件夹
            'publishRemark' : comConf.utils.iDate().time
        },
        ndeOptions : {
            cookies : baseConf.cookies,
            json : true
        },
        callback : function(err,resp) {
            var _data = resp.body;
            if( !_data.checkSuccess ) return false;

            console.log( "---------- publish success ----------" );
            console.log( "---------- 程序执行上传任务成功 ----------" );
        }
    });
};