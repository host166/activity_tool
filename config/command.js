//项目配置
//创建：170711 10：22

//引入包
var program = require('commander'); //参数命令行
var prodConfig = require('./prodConfig.js');  //项目配置信息

//根据命令行参数获取相关值
var ComParam = ((program)=>{

    program
    .version('0.7.1')
    .parse(process.argv)  //参数：program.args
    //如果没有指定参数 则返回空字符串
    if( !program.args[0] ) program.args[0] = '';

    return {
        name : program.args[0],         //项目名称
    };
})(program);

//对应项目的取值范围
if(!ComParam.name) console.log( 'ComParam.name的值是空的！' );
var prod = prodConfig[ComParam.name];
if( !prod ){
    console.log(' -------------------- prod中没有匹配到项目 --------------------');
};

// console.log( "ComParam.name:",prodConfig,ComParam.name );
//日历格式化工具 
var utils = {
    //如果参数没有在prodConfig.js中配置
    isCorrectObject(obj,name){
        for( let i in obj ){
            console.log(name,i)
            if( name === i ){
                return true;
            };
        };
        return false;
    },
    coding(val,type='encode'){
        if( type === 'encode' ){
            return encodeURIComponent(val);
        }else if( type === 'decode' ){
            return decodeURIComponent(val);
        };
    },
    //项目地址 一般用来作CDN地址
    assetsPublicPath(){
        return `${prod.url}/${utils.iDate().y}/${utils.iDate().mm}/${ComParam.name}/${prod.ver}`
    },
    iDate(time = new Date(), diff = 0, style = 'yy-mm-dd'){    //time, diff, style,
        // 如果传入的是时间戳，必须是number类型，否则报错
        var d = diff || 0;
        var timer = new Date(new Date(time) + d * (1000 * 60 * 60 * 24));
        var date = new Date(new Date(time).setHours(0,0,0,0) + d * (1000 * 60 * 60 * 24));  //.getTime()
        // var dateTime = new Date(new Date(time) + d * (1000 * 60 * 60 * 24));
        var weekDay = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
        var db = {
            //年月日
            y: date.getFullYear(),
            m: date.getMonth() + 1,
            mm: ((date.getMonth() + 1) < 10 ? '0' : '') + (date.getMonth() + 1),
            d: date.getDate(),
            dd: (date.getDate() < 10 ? '0' : '') + date.getDate(),

            //时间
            _h: timer.getHours(),
            _hh: (timer.getHours() < 10 ? '0' : '') + timer.getHours(),
            _m: timer.getMinutes(),
            _mm: (timer.getMinutes() < 10 ? '0' : '') + timer.getMinutes(),
            _s: timer.getSeconds(),
            _ss: (timer.getSeconds() < 10 ? '0' : '') + timer.getSeconds(),

            lastDay: '',
            w: weekDay[date.getDay()],
            timeInit : date.setHours(0,0,0,0),   //设置时间初始化0点 setHours(0,0,0,0)
            todayDes:'',   //今天 明天 后天
            time: timer.getTime(),
            string: '',
            oDate:date   //日期对象 (重置时间0之后)
        }
        // console.log( db.time-new Date(new Date(time).getTime()).setHours(0,0,0,0) );
        // console.log( new Date(new Date(time).getTime()).setHours(0,0,0,0)+2 * (1000 * 60 * 60 * 24) );

        if (db.m + 1 > 12) {
            var nextMonthDay1 = new Date((db.y + 1) + '/01/1');
        } else {
            var nextMonthDay1 = new Date(db.y + '/' + (db.m + 1) + '/1');
        }

        // 本月末 = 下月初1-1000毫秒
        db.lastDay = (new Date(nextMonthDay1.getTime() - 1000)).getDate();
        if (style && style.indexOf('yy/mm/dd') > -1) {
            db.string = db.y + '/' + db.mm + '/' + db.dd
        } else if (style && style.indexOf('yymmdd') > -1) {
            db.string = db.y + '' + db.mm + '' + db.dd
        } else if (style && style.indexOf('yy-mm-dd') > -1) {
            db.string = db.y + '-' + db.mm + '-' + db.dd;
        } else {
            db.string = db.y + '-' + db.mm + '-' + db.dd;
        }
        if (style && style.indexOf('hh:mm:ss') > -1) {
            db.string += ' ' + db._hh + ':' + db._mm + ':' + db._ss;
        }

        //今天明天后天的描述
        switch( ( date - new Date().setHours(0,0,0,0) ) / 86400000 ){
            case 0 :
                db.todayDes = "今天";
            break;
            case 1 :
                db.todayDes = "明天";
            break;
            case 2 :
                db.todayDes = "后天";
            break;
            default : 
                db.todayDes = db.w;
        };

        return db;
    }
};

//注入相关工具
/**
*  
*  ComParam : 命令行参数
*  prodConfig : 整个项目配置对象
*  prod : 当前项目配置字段
*  utils : 工具集
*  
*  
*/
module.exports = {
    ComParam,
    prodConfig,
    prod,
    utils
};