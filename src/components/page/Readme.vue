<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-setting"></i> 简介</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="ms-doc">
            <h3>README.md</h3>
            <article>
                <h1>k-NN friend recommend system</h1>
                <p>基于Vue.js 2.x系列 + Element UI + SpringBoot + MySQL的登录管理系统</p>
                <h2>前言</h2>
                <p>用了Vue + Element组件库做了个简易的社交系统，包括账号系统，好友系统，配置系统3个功能模块。</p>
                <p>账号系统包含账号的注册，登录，退出，更改个人信息等常见功能；好友系统，包含添加/删除好友，好友互动，好友推荐；配置系统包含核心参数配置与读取</p>

                <h2>功能</h2>
                <el-checkbox disabled checked>登录/注销</el-checkbox>
                <br>
                <el-checkbox disabled checked>好友添加/删除/互动/推荐</el-checkbox>
                <br>
                <el-checkbox disabled checked>修改密码</el-checkbox>
                <br>
                <el-checkbox disabled checked>修改用户信息</el-checkbox>
                <br>
                <el-checkbox disabled checked>参数配置化</el-checkbox>
                <br>

            </article>
        </div>

    </div>
</template>

<script>
    export default {
        data: function(){
            return {}
        }
    }
</script>

<style scoped>
    .ms-doc{
        width:100%;
        max-width: 980px;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
    }
    .ms-doc h3{
        padding: 9px 10px 10px;
        margin: 0;
        font-size: 14px;
        line-height: 17px;
        background-color: #f5f5f5;
        border: 1px solid #d8d8d8;
        border-bottom: 0;
        border-radius: 3px 3px 0 0;
    }
    .ms-doc article{
        padding: 45px;
        word-wrap: break-word;
        background-color: #fff;
        border: 1px solid #ddd;
        border-bottom-right-radius: 3px;
        border-bottom-left-radius: 3px;
    }
    .ms-doc article h1{
        font-size:32px;
        padding-bottom: 10px;
        margin-bottom: 15px;
        border-bottom: 1px solid #ddd;
    }
    .ms-doc article h2 {
        margin: 24px 0 16px;
        font-weight: 600;
        line-height: 1.25;
        padding-bottom: 7px;
        font-size: 24px;
        border-bottom: 1px solid #eee;
    }
    .ms-doc article p{
        margin-bottom: 15px;
        line-height: 1.5;
    }
    .ms-doc article .el-checkbox{
        margin-bottom: 5px;
    }
</style>
