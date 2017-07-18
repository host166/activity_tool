/**
* @Author: king
* @Date:   2017-03-01
* @Last modified by:   king
* @Last modified time: 2017-03-01
*/

import Vue from 'vue';
// import mockjs from './mock';	

const ELServer = {
	flightList(params) {
        return Vue.Tool.ajax({
            url: "api.list",
            params: params,
            isBack: false,
            indicator: true
        });
        //mockData: mockjs.seatSubmit()
    }
};

const getitVue = {
	install(Vue){
		// Vue.ELServer = ELServer;
		//直接在Vue对象上定义新的属性或修改现有属性 并返回该对象
	    Object.defineProperties(Vue.prototype,{
	        $ELServer : {
	            value : ELServer,
	            writable : false
	        }
	    });
	    // console.log((new Vue()).$ELServer)
	}
};

//给Vue安装一个插件：{ELServer} Object
Vue.use(getitVue);

































// for( let i in el_server ){
// 	Vue[i] = el_server[i];
// };
