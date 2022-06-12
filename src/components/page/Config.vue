<template>
	<div>
		<div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-edit"></i> 个人中心</el-breadcrumb-item>
                <el-breadcrumb-item>参数配置</el-breadcrumb-item>
            </el-breadcrumb>
		</div>
		<div class="userContent">
			<el-form ref="form" :model="form" :rules="rules" label-width="80px">
				<el-form-item prop="kValue" label="K">
					<el-input v-model="form.kValue" type="text" placeholder="输入k值，影响推荐数量，正整数"></el-input>
				</el-form-item>
				<el-form-item prop="delta" label="置信度𝛿" ref="delta">
					<el-input v-model="form.delta" type="text" placeholder="输入𝛿值，影响置信度，0-1浮点数" @blur="calculateS()"></el-input>
				</el-form-item>
                <el-form-item prop="rho" label="阈值ρ" ref="rho">
                    <el-input v-model="form.rho" type="text" placeholder="输入ρ值，概率忽略阈值，0-1浮点数" @blur="calculateS()"></el-input>
                </el-form-item>
                <el-form-item prop="epsilon" label="误差精度ε" ref="epsilon">
                    <el-input v-model="form.epsilon" type="text" placeholder="输入ε值，影响误差精度，0-1浮点数" @blur="calculateS()"></el-input>
                </el-form-item>
                <el-form-item prop="sampleSize" label="抽样次数">
                    <el-input v-model="form.sampleSize" type="text" placeholder="影响精度和时间消耗，正整数"></el-input>
                </el-form-item>
				<el-form-item>
					<el-button type="primary" @click="onSubmit('form')">确定</el-button>
					<el-button @click="onCancle()">取消</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			var validateFloat = (rule, value, callback) => {
                if(!value){
                    // return callback(new Error('该字段不能为空'));
                    return callback();
                }
                setTimeout(() => {
                    if (!(/^\-{0,1}\d+(?=\.{0,1}\d+$|$)/.test(value)))  {
                        callback(new Error('请输入数字值'));
                    } else {
                        if (value<=0 || value>=1) {
                            callback(new Error('请输入0-1之间的浮点值'));
                        } else {
                            callback();
                        }
                    }
                }, 1000);
			};
			var validateInteger = (rule, value, callback) => {
                if(!value){
                    return callback(new Error('该字段不能为空'));
                }
                setTimeout(() => {
                    if (!(/^[0-9]*[1-9][0-9]*$/.test(value))) {
                        callback(new Error('请输入一个正整数值'));
                    }
                    callback();
                }, 1000);
			};
            return {
				form: {
					kValue : '',
                    delta : '', //置信度
                    epsilon : '', //误差精度
                    rho : '', //阈值
                    sampleSize : ''
				},
				rules: {
                    kValue : [
                        { validator: validateInteger, trigger: 'blur'}
                    ],
                    delta : [
                        { validator: validateFloat, trigger: 'blur'}
                    ], //置信度
                    epsilon : [
                        { validator: validateFloat, trigger: 'blur'}
                    ], //误差精度
                    rho : [
                        { validator: validateFloat, trigger: 'blur'}
                    ], //阈值
                    sampleSize : [
                        { validator: validateInteger, trigger: 'blur'}
                    ]
				}
			}
        },
        mounted() {
            this.loadForm()
        },
        methods:{
        	onSubmit(formName) {
				let formData = {
					configType: 100,
					content:{
                        k: Number.parseInt(this.form.kValue),
                        sampleSize: Number.parseInt(this.form.sampleSize)
                    }
				};
                let self = this
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        // self.$http.post('/api/user/modifyPassword',formData).then(function(response) {
                        self.$http.put('/config',formData).then(function(response) {
							console.log(response);

                            if(response.data.code===200) {
                                self.$message({
                                    message: '保存成功',
                                    type: 'success'
                                });
                            }
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
        	},
            calculateS(){
                let state1 = this.$refs["delta"];
                let state2 = this.$refs["rho"];
                let state3 = this.$refs["epsilon"];

                let condition1 = this.notError(state1)&&this.notError(state2)&&this.notError(state3)
                let condition2 = this.notEmpty(this.form.delta)&&this.notEmpty(this.form.rho)&&this.notEmpty(this.form.epsilon)
                console.log(condition1,condition2)

                if(condition1 && condition2){
                    let e = this.form.epsilon
                    let r = this.form.rho
                    let d = this.form.delta
                    console.log(e,r,d)
                    this.form.sampleSize = Math.ceil((3/(e*e*r))*Math.log(2/d))
                }
            },
            notError(inputEl){
                return !(inputEl.validateState === "error");
            },
            notEmpty(x){
                return !(x==='')
            },
            loadForm(){
                let self = this
                self.$http.get('/config',{params:{configType:100}}).then(function(response) {
                    let res = JSON.parse(response.data.data.content)
                    console.log(res)
                    self.form.kValue = res.k
                    self.form.sampleSize = res.sampleSize
                }).then(function(error) {
                    console.log(error);
                })
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
