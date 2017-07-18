/**
 * @Author: king
 * @Date:   2017-05-22
 * @Last modified by:   king
 * @Last modified time: 2017-05-01
 */
import Index from '../pages/Index.vue';
import Home from '../pages/Home.vue';


/***********************接口暴露*******************************/
export const currentRouter = {
    routes: [
        //默认进入首页
        {
            name: 'index',
            path: '/',
            redirect : '/home',
            component: Index
        },
        //首页
        {
            name : 'home',
            path : '/home',
            component : Home
        },
        //错误页面
        {
            name: '404',
            path: '*',
            component: Index
        }
    ]
};