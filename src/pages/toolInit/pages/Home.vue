<template lang="html">
	<!--首页-->
	<div class="pa pn inc_screen homeMianWrap">
		首页数据
	</div>
	<!--首页 end-->
</template>

<script type="text/javascript">
import Vue from 'vue';
import store from '../store';

export default {
    data() {
        return {
        	state:store.state
		}
	},
	mounted(){
		// MessageBox.alert(111);
		// Toast("呵呵");
		console.log( this.$ELServer )
		// console.log(this)
	},
	computed : {
		
	},
	methods:{
		
	}
};
</script>

<style lang="scss">
@import "~variable";

</style>





































