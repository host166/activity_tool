var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')
var comConf = require('../config/command.js');      //相关工具

function resolve(dir) {
    return path.join(__dirname, '..', dir)
};
module.exports = {
    entry: {
        app: './src/main.js'
    },
    output: {
        path: config.build.assetsRoot,
        filename: '[name].js',
        publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        modules: [
            resolve('src'),
            resolve('node_modules')
        ],
        alias: {
            'vue$': 'vue/dist/vue.common.js',
            'src': resolve('src'),
            'assets': resolve('src/assets'),
            'components': resolve('src/components'),
            'variable' : path.resolve(__dirname, '../src/scss/variable.scss'),
            'elongapp' : path.resolve(__dirname,'../src/pages/'+comConf.ComParam.name+'/main.js')
        }
    },
    module: {
        rules: [{
            test: /\.vue$/,
            loader: 'vue-loader',
            options: vueLoaderConfig
        }, {
            test: /\.js$/,
            loader: 'babel-loader',
            include: [resolve('src'), resolve('test')]
        }, {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            loader: 'url-loader',
            query: {
                limit: 10,
                name: utils.assetsPath('img/[name].[hash:7].[ext]')
            }
        }, {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            loader: 'url-loader',
            query: {
                limit: 10000,
                name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
            }
        }]
    }
}



//skin的皮肤引用
// utils.commander();
// (function(){
//     var program = require('commander')
//     program.version('0.0.1').option('-f, --flight', '加载红版样式').option('-w, --weixin', '加载微信样式').parse(process.argv);

//     if(program.flight){
//         process.env.CHANNEL = 'flight'
//     }else if(program.weixin){
//         process.env.CHANNEL = 'weixin'
//     }else{
//         process.env.CHANNEL = 'flight'
//     }
// })();