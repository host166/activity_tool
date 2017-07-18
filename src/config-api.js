/* 引入各模块 api */
// 公共模块
// import Common from 'modules/common/api'
// 项目模块（局部模块）
var moduleCommon = require('elongapp').apis;
// console.log("moduleCommon:",moduleCommon);
// console.log( moduleCommon.currentAPI );
//模块暴露
export default {
    api: moduleCommon.currentAPI
}