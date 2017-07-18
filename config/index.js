// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path');
var proxyMiddleware = require('http-proxy-middleware');
var comConf = require('./command.js'); //相关工具

// console.log( "comConf:",comConf );

module.exports = {
    build: {
        env: require('./prod.env'),
        index: path.resolve(__dirname, '../dist/' + comConf.ComParam.name + '/index.html'),
        assetsRoot: path.resolve(__dirname, '../dist/' + comConf.ComParam.name),
        assetsSubDirectory: '', //静态资源的路径文件名
        //CDN路径配置   '//'+comConf.prod.url+'/'+comConf.ComParam.name+'/'
        assetsPublicPath: '//' + comConf.utils.assetsPublicPath() + '/',
        productionSourceMap: false,
        // Gzip off by default as many popular static hosts such as
        // Surge or Netlify already gzip all static assets for you.
        // Before setting to `true`, make sure to:
        // npm install --save-dev compression-webpack-plugin
        productionGzip: false,
        productionGzipExtensions: ['js', 'css'],
        // Run the build command with an extra argument to
        // View the bundle analyzer report after build finishes:
        // `npm run build --report`
        // Set to `true` or `false` to always turn it on or off
        bundleAnalyzerReport: process.env.npm_config_report
    },
    dev: {
        env: require('./dev.env'),
        port: comConf.prod.port, //3066,
        autoOpenBrowser: true,
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        proxyTable: {
            //代理请求到线上环境
            '/flight/**': {
                target: 'http://m.elong.com',
                changeOrigin: true
            },
            // 代理请求到本地环境
            // '/flight/': {
            //   target: 'http://127.0.0.1:7001',
            //   changeOrigin: true,
            //   pathRewrite: function (item) {
            //     console.log(item);
            //     return item.replace('/flight/flightajax', '');
            //   }
            // },
        },
        // CSS Sourcemaps off by default because relative paths are "buggy"
        // with this option, according to the CSS-Loader README
        // (https://github.com/webpack/css-loader#sourcemaps)
        // In our experience, they generally work as expected,
        // just be aware of this issue when enabling this option.
        cssSourceMap: false
    }
}

// proxyTable:{
// '/flight/*': {
//     target: 'http://m.elong.com',
//     changeOrigin: true,
//     secure : false,
//     rewrite : function(req){
//         req.url = req.url.replace(/^\/flight/,"");
//     },
//     router : {
//         'm.elong.com' : 'http://localhost:3036'
//     }
// }
// '/list': {
//     target: 'http://m.elong.com/flight',
//     changeOrigin: true,
//     pathRewrite: {
//         '^/list': '/list'
//     }
// }
// '/list/': {
//     target: 'http://jm.elong.com:3063',
//     changeOrigin: true,
//     headers: { //添加token,用于开发
//         "Accept" : "application/json; charset=utf-8",
//         "X-Requested-With": "XMLHttpRequest"
//     },
//     pathRewrite: {
//         '^/list': '/list'
//     }
// }
// }



// var program = require('commander'); //参数命令行
// var distPath = (function(program){
//     program
//     .version('0.7.1')
//     .parse(process.argv)  //参数：program.args

//     var result = {
//         name : "",
//         port : 3066
//     };
//     //编写一个命令行参数的对象方法

//     //取命令行参数名作为CHANNEL的值
//     if( !!program.args[0] ){
//         result.name = program.args[0];
//     };
//     if( !!program.args[1] ){
//         result.port = program.args[1];
//     };
//     return result;
// })(program);