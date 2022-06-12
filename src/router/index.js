import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/home',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            children:[
                {
                    path: '/',
                    component: resolve => require(['../components/page/Readme.vue'], resolve)
                },
                {
                    path: '/upload',
                    component: resolve => require(['../components/page/Upload.vue'], resolve)       // Vue-Core-Image-Upload组件
                },
                {
                    path: '/userCenter',
                    component: resolve => require(['../components/page/UserCenter.vue'], resolve)    // 拖拽列表组件
                },
                {
                    path: '/modifyUser',
                    component: resolve => require(['../components/page/ModifyUser.vue'], resolve)
                },
                {
                    path: '/modifyPassword',
                    component: resolve => require(['../components/page/ModifyPassword.vue'], resolve)
                },
                {
                    path: '/success',
                    component: resolve => require(['../components/page/Success.vue'], resolve)
                },
                {
                    path: '/graph',
                    component: resolve => require(['../components/page/Recommend.vue'], resolve)
                },
                {
                    path: '/friends',
                    component: resolve => require(['../components/page/FriendList.vue'], resolve)
                },
                {
                    path: '/addFriend',
                    component: resolve => require(['../components/page/AddFriend.vue'], resolve)
                },
                {
                    path: '/config',
                    component: resolve => require(['../components/page/Config.vue'], resolve)
                }
            ]
        },
        {
            path: '/register',
            component: resolve => require(['../components/page/Register.vue'], resolve)
        },
        {
            path: '/register-success',
            component: resolve => require(['../components/page/RegisterSuccess.vue'], resolve)
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
    ]
})
