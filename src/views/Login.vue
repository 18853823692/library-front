<template>
  <div class="all">
    <el-card>
      <el-form :model="loginForm" :rules="loginFormRules" ref="loginForm" label-width="100px" class="form-style">
        <el-form-item label="账号" prop="name">
          <el-input v-model="loginForm.name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="loginForm.password"
                    @keyup.enter.native="submitForm('loginForm')"></el-input>
        </el-form-item>
        <el-form-item prop="identity">
          <div style="text-align: center">
            <el-radio v-model="loginForm.identity" label="1">读者</el-radio>
            <el-radio v-model="loginForm.identity" label="2">管理员</el-radio>
          </div>
        </el-form-item>
        <el-form-item class="footer-button">
          <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
          <el-button style="margin-left: 60px" @click="resetForm('loginForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        name: '',
        password: '',
        identity: '1'
      },
      loginFormRules: {
        name: [
          {required: true, message: '请输入账号', trigger: 'blur'},
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const res = await this.$http.post('/login',this.loginForm)
          if (res.data.code !== 200) {
            return this.$message.error({
              message: res.data.msg,
              duration: 2000
            })
          }
          this.$message.success({
            message: res.data.msg,
            duration: 1000
          })
          await this.$router.push('/bookManage')
          // this.$store.commit("SET_USERINFO", res.data.data)
        } else {
          this.$message.error({
            message: '您的信息填写有误',
            duration: 1000
          })
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>

<style lang="less" scoped>
.all {
  height: 100%;
}

.login-position {
  position: absolute;
  transform: translate(-50%, -50%);
}

.el-card {
  height: 60%;
  width: 45%;
  left: 50%;
  top: 50%;
  .login-position()
}

.form-style {
  height: 100%;
  width: 65%;
  top: 70%;
  left: 45%;
  .login-position()
}

.footer-button {
  margin-left: 20%;
  margin-top: 10%;
}
</style>
