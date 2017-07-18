<template lang="html">
	<!--首页-->
	<div v-if="maskVisible" @click="closeMaskLayerTap" class="pf pn oys cFFF maskLayerWrap">
		<!--分发内容-->
		<slot></slot>
	</div>
	<!--首页 end-->
</template>

<script type="text/javascript">
import Vue from 'vue';

export default {
    data() {
        return {
        	
		}
	},
	props:{
		'maskVisible' : Boolean
	},
	methods:{
		closeMaskLayerTap(){
			this.$parent.maskVisible = false;
		}
	}
};
</script>

<style scoped lang="scss">
@import "~variable";
.maskLayerWrap{
	padding:5% 5% 0;
	width:90%; height:100%;
	background:rgba(0,0,0,0.7);
	overflow-x:hidden;
}
</style>





































