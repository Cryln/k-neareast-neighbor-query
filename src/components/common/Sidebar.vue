<template>
    <div class="sidebar">
        <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" theme="dark" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index">
                        <template slot="title"><i :class="item.icon"></i>{{ item.title }}</template>
                        <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">{{ subItem.title }}
                        </el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index">
                        <i :class="item.icon"></i>{{ item.title }}
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                items: [
                    {
                        icon: 'el-icon-s-promotion',
                        index: 'home',
                        title: '简介'
                    },
                    {
                        icon: 'el-icon-user',
                        index: 'friends',
                        title: '好友列表'
                    },
                    {
                        icon: 'el-icon-s-promotion',
                        index: 'graph',
                        title: '好友推荐'

                    },

                    {
                        icon: 'el-icon-setting',
                        index: 'userCenter',
                        title: '设置',
                        subs: [
                            {
                                index: 'addFriend',
                                title: '添加好友'
                            },
                            {
                                index: 'modifyUser',
                                title: '修改用户'
                            },
                            {
                                index: 'modifyPassword',
                                title: '修改密码'
                            },
                            {
                                index: 'config',
                                title: '参数配置'
                            }
                        ]
                    }
                ]
            }
        },
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        }
    }
</script>

<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        width: 250px;
        left: 0;
        top: 70px;
        bottom:0;
        background: #2E363F;
    }
    .sidebar > ul {
        height:100%;
    }
</style>
