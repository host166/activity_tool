var path = require('path');
var fs = require('fs');
var program = require('commander')
var images = require("images");
var comConf = require('../config/command.js');      //相关工具


function spriteMethod(obj){
    var opts = {
        icons : "",
        sprite : "",
        scss : "",
        addSize : 2,    //给宽度高度增加尺寸 主要是因为rem适配会计算不准
        margin : 10     //边距距离
    };
    for(let x in obj) opts[x] = obj[x];

    //路径处理
    opts.icons = path.join(__dirname,'../src/pages/'+comConf.ComParam.name+'/assets/icons/');
    opts.scss = path.join(__dirname,'../src/pages/'+comConf.ComParam.name+'/scss/sprite_icon.scss');
    opts.sprite = path.join(__dirname,'../src/pages/'+comConf.ComParam.name+'/assets/img/icon_sprite.png');

    //指定查找图片
    fs.readdir(opts.icons, function(err, files) {
        if (err) {  //出错的时候停止执行并且提示
            console.log(err);
            return;
        };

        var oImgData = [],  //存放图片属性
            regSuffix = /\.(png|jpe?g|gif|svg)(\?.*)?$/;    //匹配图片的正则
        var oSize = {
            sw : 0,
            sh : 0,
            maxw : 0,   //单个最大宽
            maxh : 0,
            m  : opts.margin
        };
        files.forEach(function(elem,index){
            if( regSuffix.test(elem) ){
                var obj = {
                    url : opts.icons+elem,
                    name : elem.replace(regSuffix,""),
                    w : images(opts.icons+elem).width(),
                    h : images(opts.icons+elem).height()
                };
                //宽度和高度的计算
                oSize.sw += (obj.w + oSize.m);
                oSize.sh += (obj.h + oSize.m);
                //得到最高
                if( oSize.maxh < (obj.h + oSize.m) ) oSize.maxh = (obj.h + oSize.m);
                oImgData.push(obj);
            };
        });

        //设置坐标位置
        var tempX = 0;
        oImgData.forEach(function(elem,index){
            //坐标位置
            if( index == 0 ){
                tempX = 0;
            }else{
                tempX += oImgData[index-1].w+oSize.m;
            };
            elem.x = tempX;
            elem.y = oSize.m/2;
        });

        //创建图片
        var createSpriteImageStage = images(oSize.sw,oSize.maxh);   //创建雪碧图片场景 
        oImgData.forEach(function(elem,index){
            createSpriteImageStage.draw(
                images(elem.url),
                elem.x,
                oSize.m/2
            );
        });
        //spript图片存放路径
        createSpriteImageStage.save(opts.sprite);
        // console.log( oImgData,oSize );
        
        //创建css文件和sprite属性
        var createCSS = function(){
            var cssResult = [],
                incBacksize = [];
            oImgData.forEach(function(elem,index){
                incBacksize.push(`.${elem.name}`);
                cssResult.push(
                    `.${elem.name}{width:${elem.w+opts.addSize}px;height:${elem.h+opts.addSize}px; background-position: -${elem.x}px -${elem.y}px;}`
                );
            });
            //../src/assets/img/icon_sprite.png //$backSpriteUrl
            incBacksize += `{background:url(../assets/img/icon_sprite.png) no-repeat; background-size:${oSize.sw}px auto; display:inline-block;}`;   
            return incBacksize + cssResult.join("");
        };

        //scss文件存放路径 
        fs.writeFileSync(opts.scss, createCSS(), { //appendFile
            encoding: "utf8",
            flags: "a",
            mode: 438
        });
    });
};
spriteMethod();
















// // console.log(images);
// // console.log( "路径：", process.cwd(), __dirname, path.join(__dirname,"../src/assets/icons_flight/") )

// // var distPath = (function(program){
// //     program
// //     .version('0.0.3')
// //     .parse(process.argv)  //参数：program.args

// //     //编写一个命令行参数的对象方法

// //     //取命令行参数名作为CHANNEL的值
// //     if( !!program.args[0] ){
// //         return program.args[0];
// //     }
// // })(program);

// // console.log("distPath",distPath);
// // function spriteMethod(obj){
// //     var opt = {

// //     };
// //     for(let x in obj) opt[x] = obj[x];

    
// // };

// //参数设置
// program.version('0.0.1')
//     .option('-f, --flight', '打包红版样式')
//     .option('-w, --weixin', '打包微信样式')
//     .option('-s, --spriteImg', '雪碧图创建')
//     .parse(process.argv);

// var channelName = "flight";
// if( program.flight ){
//     channelName = "flight";
// }else if( program.weixin ){
//     channelName = "weixin";
// };

// //sprite创建过程
// var spriteImg = path.join(__dirname,"../src/assets/icons_"+channelName+"/");     //合并用的icon图片们的路径
// fs.readdir(spriteImg, function(err, files) {
//     if (err) {
//         console.log(err);
//         return;
//     };
//     var oImgData = [],  //存放图片属性
//         regSuffix = /\.(png|jpe?g|gif|svg)(\?.*)?$/;
//     var oSize = {
//         sw : 0,
//         sh : 0,
//         maxw : 0,   //单个最大宽
//         maxh : 0,
//         m  : 10
//     };
//     files.forEach(function(elem,index){
//         if( regSuffix.test(elem) ){
//             var obj = {
//                 url : spriteImg+elem,
//                 name : elem.replace(regSuffix,""),
//                 w : images(spriteImg+elem).width(),
//                 h : images(spriteImg+elem).height()
//             };
            

//             //宽度和高度的计算
//             oSize.sw += (obj.w + oSize.m);
//             oSize.sh += (obj.h + oSize.m);
//             //得到最高
//             if( oSize.maxh < (obj.h + oSize.m) ) oSize.maxh = (obj.h + oSize.m);

//             oImgData.push(obj);
//         };
//     });

//     //设置坐标位置
//     var tempX = 0;
//     oImgData.forEach(function(elem,index){
//         //坐标位置
//         if( index == 0 ){
//             tempX = 0;
//         }else{
//             tempX += oImgData[index-1].w+oSize.m;
//         };
//         elem.x = tempX;
//         elem.y = oSize.m/2;
//     });

//     //创建图片
//     var createSpriteImageStage = images(oSize.sw,oSize.maxh);   //创建雪碧图片场景 
//     oImgData.forEach(function(elem,index){
//         createSpriteImageStage.draw(
//             images(elem.url),
//             elem.x,
//             oSize.m/2
//         );
//     });
//     createSpriteImageStage.save(path.join(__dirname,"../src/assets/img/"+channelName+"_icon_sprite.png"));
//     // console.log( oImgData,oSize );
    
//     //创建css文件和sprite属性
//     var createCSS = function(){
//         var cssResult = [],
//             incBacksize = [];
//         oImgData.forEach(function(elem,index){
//             incBacksize.push(`.${elem.name}`);
//             cssResult.push(
//                 `.${elem.name}{width:${elem.w}px;height:${elem.h}px; background-position: -${elem.x}px -${elem.y}px;}`
//             );
//         });
//         //../src/assets/img/icon_sprite.png
//         incBacksize += `{background:url($backSpriteUrl) no-repeat; background-size:${oSize.sw}px auto; display:inline-block;}`;   
//         return incBacksize + cssResult.join("");
//     };
//     fs.writeFileSync(path.join(__dirname,"../src/scss/sprite_icon.scss"), createCSS(), { //appendFile
//         encoding: "utf8",
//         flags: "a",
//         mode: 438
//     });
// });