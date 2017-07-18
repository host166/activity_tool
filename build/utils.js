var path = require('path')
var config = require('../config')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
// var program = require('commander')
// var sprite = require('sprite-webpack-plugin')   //雪碧图(sprite)基于webpack的插件

exports.assetsPath = function(_path) {
    var assetsSubDirectory = process.env.NODE_ENV === 'production' ?
        config.build.assetsSubDirectory :
        config.dev.assetsSubDirectory
    return path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = function(options) {
    options = options || {}
        // generate loader string to be used with extract text plugin
    function generateLoaders(loaders) {
        var sourceLoader = loaders.map(function(loader) {
            var extraParamChar
            if (/\?/.test(loader)) {
                loader = loader.replace(/\?/, '-loader?')
                extraParamChar = '&'
            } else {
                loader = loader + '-loader'
                extraParamChar = '?'
            }
            return loader + (options.sourceMap ? extraParamChar + 'sourceMap' : '')
        }).join('!')

        // Extract CSS when that option is specified
        // (which is the case during production build)
        if (options.extract) {
            return ExtractTextPlugin.extract({
                use: sourceLoader,
                fallback: 'vue-style-loader'
            })
        } else {
            return ['vue-style-loader', sourceLoader].join('!')
        }
    }

    // http://vuejs.github.io/vue-loader/en/configurations/extract-css.html
    return {
        css: generateLoaders(['css']),
        postcss: generateLoaders(['css']),
        less: generateLoaders(['css', 'less']),
        sass: generateLoaders(['css', 'sass?indentedSyntax']),
        scss: generateLoaders(['css', 'sass']),
        stylus: generateLoaders(['css', 'stylus']),
        styl: generateLoaders(['css', 'stylus'])
    }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function(options) {
    var output = []
    var loaders = exports.cssLoaders(options)
    for (var extension in loaders) {
        var loader = loaders[extension]
        output.push({
            test: new RegExp('\\.' + extension + '$'),
            loader: loader
        })
    }
    return output
}

































// //根据命令行参数区分打包和开发状态
// exports.commander = function(){
//     var aList = function(val){
//         return val.split(',')
//     };
//     program
//     .version('0.0.1')
//     // .option('-a, --allBuilding <items>', '打包生成所有CSS',aList)
//     .option('-f, --flight', '打包红版样式')
//     .option('-w, --weixin', '打包微信样式')
//     .option('-s, --spriteImg', '雪碧图创建')
//     .parse(process.argv)  //参数：program.args

//     //编写一个命令行参数的对象方法
//     // console.log( "参数：",program.args[0] );
//     //取命令行参数名作为CHANNEL的值
//     if( !!program.args[0] ){
//         process.env.CHANNEL = program.args[0];
//     }
//     // if( program.flight ){
//     //     process.env.CHANNEL = 'flight';
//     // }else if( program.weixin ){
//     //     process.env.CHANNEL = 'weixin';
//     // }else{
//     //     process.env.CHANNEL = 'flight';
//     // };
    
//     // console.log( program.flight, program._events.flight, program.args, program.argv );  //"allBuilding",program.allBuilding

//     return {
//         size : program.allBuilding
//     }
// };

//process.env.NODE_ENV 
// 1. 生产模式： production 
// 2. 开发模式： development