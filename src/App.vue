<template lang="html">
    <router-view></router-view>
    <!-- <div class="mianBodyWrap"> -->
        <!-- <transition name="slide"> -->
        <!-- <keep-alive></keep-alive> -->
        <!-- </transition> -->
        <!-- <transition name="slide" mode="out-in">
            transition-mode="out-in" keep-alive ：主要是为了保留组件的状态或避免重新渲染
        </transition> -->
    <!-- </div> -->
</template>
<script type="text/javascript">
import Vue from 'vue';

export default {
    data() {
        return {

        }
    },
    methods: {

    },
    // transitions:{   //定义所有动画
    //     slide:{
    //         enterClass:'slideInRight',
    //         leaveClass:'slideOutRight'
    //     }
    // },
    beforeCreate() {
        Vue.Tool.pageInitSetFontSize();
        Vue.Tool.orientationFunc("windowSizeChange", () => {
            Vue.Tool.pageInitSetFontSize();
        });
        // console.log('组件实例刚刚被创建');
    },
    created() {
        // console.log('实例已经创建完成');
    },
    beforeMount() {
        // console.log('模板编译之前');
    },
    mounted() {
        // console.log('模板编译完成');
    },
    activated(){
        // console.log('组件激活时触发');
    },
    beforeUpdate() {
        // console.log('组件更新之前');
    },
    updated() {
        // console.log('组件更新完毕');
    },
    beforeDestroy() {
        // console.log('组件销毁之前');
    },
    destroyed() {
        // console.log('组件销毁之后');
    }
}
</script>


<style lang="scss">
@import "./scss/common.scss";
@import "./css/widget.scss";

/* scoped src="./scss/common.scss" @import "./scss/common.scss"; */
// @import "./scss/sprite_icon.scss";
// @import "../node_modules/animate.css/animate.css";

/* router view animation */
/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.forward-enter-active,.forward-leave-active,.back-enter-active,.back-leave-active{
    //transition-duration: 0s;
    // animation-iteration-count:infinite;   //是否循环播放 1
    // animation-direction:alternate;        //是否反向播放
    animation-delay: 0s;
    animation-timing-function:ease-in-out;
    position:absolute; top:0; left:0; z-index:10;
    width:100%; height:100%;
}
.forward-enter-active,.forward-leave-active,.back-leave-active{
    animation-duration:.3s;
}
.back-enter-active{
    animation-duration:0s;
}
// .forward-enter{}

//入场动画
.forward-enter-active{
    animation-name:forwardAnimateIn;
    background-color:#f2f2f2;
}
.forward-leave-active{
    z-index:-1;
    animation-name:forwardAnimateOut;
}

//出场动画
.back-enter-active{
    z-index:-1;
    animation-name:backAnimateIn;
    background-color:#f2f2f2;
}
.back-leave-active{
    animation-name:backAnimateOut;
}

//入场动画之类
@keyframes forwardAnimateIn{
    0%{
        transform:translate(80%,0);
        opacity:0;
    }
    100%{
        transform:translate(0,0);
        opacity:1;
    }
}
@keyframes forwardAnimateOut{
    0%{
        transform:translate(0,0);
        opacity:1;
    }
    100%{
        transform:translate(-80%,0);
        opacity:0;
    }
}

//出场动画
@keyframes backAnimateIn{
    0%{
        transform:translate(0,0);
        opacity:1;  //0
    }
    100%{
        transform:translate(0,0);
        opacity:1;
    }
}
@keyframes backAnimateOut{
    0%{
        transform:translate(0,0);
        opacity:1;
    }
    100%{
        transform:translate(80%,0);
        opacity:0;
    }
}
</style>