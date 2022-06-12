<template>
	<div>
		<div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-edit"></i> 个人中心</el-breadcrumb-item>
                <el-breadcrumb-item>添加好友</el-breadcrumb-item>
            </el-breadcrumb>
		</div>
		<div class="userContent">
			<el-form ref="form" :model="form" :rules="rules" label-width="80px">
				<el-form-item prop="account" label="账号">
					<el-input v-model="form.account" type="text" placeholder="对方账号"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="onSubmit('form')">添加</el-button>
					<el-button @click="onCancle()">取消</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			var validatePass = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('请输入账号'));
				} else {
					callback();
				}
			};
            return {
				form: {
					account: ''
				},
				rules: {
                    account: [
                        { validator: validatePass, trigger: 'blur'}
                    ]
				}
			}
        },
        methods:{
        	onSubmit(formName) {
				const self = this;
				let formData = {
					userId: parseInt(sessionStorage.getItem('ms_userId')),
					account: self.form.account
				};
				self.$refs[formName].validate((valid) => {
                    if (valid) {
                        // self.$http.post('/api/user/modifyPassword',formData).then(function(response) {
                        self.$http.post('/friend/add',formData).then(function(response) {
							console.log(response);
                            if(response.data.code===200) {
                                self.$message({
                                    message: '添加成功',
                                    type: 'success'
                                });
                            }
							self.$router.push('/friends');
						}).then(function(error) {
							console.log(error);
						})
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
        	},
        	onCancle() {
        		this.$router.push('/userCenter');
        	}
        }
	}
</script>

<style>
	.userContent {
		width: 400px;
		margin: 0 auto;
	}
</style>
