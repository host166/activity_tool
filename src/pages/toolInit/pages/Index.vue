<template lang="html">

	<keep-alive>
    	<router-view></router-view>
    </keep-alive>
    
</template>

<script type="text/javascript">
import Vue from 'vue';
import store from '../store';

export default {
    data() {
        return {
        	state : store.state
		}
	},
	beforeCreate(){
		
	},
	beforeMount() {
        
    },
	mounted(){
		
		// MessageBox('提示', '操作成功');
        // store.actions.ServerUserCenter({})
	},
	activated(){

	},
	methods : {
		//动态创建script
		createScripts(url){
			var oScript = document.createElement('script');
			oScript.src = url;
			document.body.appendChild(oScript);
			return oScript;
		}
	},
	components : {
		
	}
};
</script>

<style lang="scss">
@import "~variable";
@import "../scss/sprite_icon.scss";


</style>
