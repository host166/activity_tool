var utils = require('./utils')
var config = require('../config')
var isProduction = process.env.NODE_ENV === 'production'

module.exports = {
    loaders: utils.cssLoaders({
        sourceMap: isProduction ?
            config.build.productionSourceMap : config.dev.cssSourceMap,
        extract: isProduction
    }),
    postcss: [
        // 将px转换为rem
        require('postcss-plugin-px2rem')({ //postcss-pxtorem
            // font-size 默认值
            rootValue: 20,
            // 需转换的最小数值
            minPixelValue: 2,
            // 屏蔽转换名单
            selectorBlackList: ['html'],
            // 需转换css 属性列表，留空默认全部转换
            propWhiteList: []
        }),
        require('autoprefixer')({
            browsers: ['last 2 versions']
        })
    ]
}

/*
约定：

设计稿     750     逻辑尺寸375   postcss设置 20px    html实际 10px

然后js计算：

fontSize = document.body.offsetWidth/(375/10)
document.querySelector('html').style.fontSize = fontSize

*/
