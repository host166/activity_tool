import Vue from 'vue';
import Vuex from 'vuex';
import * as types from './types';	// * as types ---- types.CALENDAR_TAP

Vue.use(Vuex);

/* 状态 */
var state = {
	
};

/* 派发一些状态 */
var getters = {
	
};

/* 修改数据的唯一方法 */
var mutations = {
	// 低价数据请求
	// [types.LOWESTPRICES](state){

	// }
};

/* 操作 */
var actions = {
	// 操作请求低价数据
	// LowestPrices(
	// 	{commit,state}
	// ){
	// 	commit(types.LOWESTPRICES);
	// 	// console.log("LOWESTPRICES:",state); //Vue.router
	// }
};



export default new Vuex.Store({
	state,
	getters,
	mutations,
	actions
});

// export default new Vuex.Store({
// 	modules : {
// 		mutations
// 	},
// 	actions
// })
