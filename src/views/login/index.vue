<template>
  <div class="login-container">
    <!-- 表单校验，添加model属性（整个表单数据）和rules属性（整个表单校验规则） -->
    <el-form
      ref="loginForm"
      class="login-form"
      auto-complete="on"
      :model="LoginForm"
      :rules="LoginFormRules"
    >
      <div class="title-container">
        <h3 class="title">
          <img src="@/assets/common/login-logo.png" alt="" />
        </h3>
      </div>
      <el-form-item prop="mobile">
        <i class="el-icon-user-solid svg-containe"></i>
        <el-input v-model="LoginForm.mobile"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <svg-icon iconClass="password" className="svg-icon"></svg-icon>
        <el-input type="password" v-model="LoginForm.password"></el-input>
      </el-form-item>
      <el-button
        type="primary"
        style="width: 100%; margin-bottom: 30px"
        class="loginBtn"
        @click="Login"
        :loading="isLogin"
        >登录</el-button
      >
      <div class="tips">
        <span style="margin-right: 20px">用户名: 13800000002</span>
        <span> 密码: 123456</span>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      LoginForm: {
        mobile: '13800000002',
        password: '123456',
      },
      // 规则名和数据名保持一致
      LoginFormRules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          {
            patter: /^(?:(?:\+|00)86)?1\d{10}$/,
            message: '请输入正确的手机号码',
          },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            patter:
              /^\S*(?=\S{6,})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$/,
            message: '密码包含1个大写字母,1个小写字母,1个数字,1个特殊符号',
          },
        ],
      },
      isLogin: false,
    }
  },
  methods: {
    async Login() {
      this.isLogin = true
      try {
        await this.$refs.loginForm.validate()
        // console.log('表单校验成功，可以发送请求')
        // 这是异步请求
        await this.$store.dispatch('user/getToken', this.LoginForm)
        // 跳转到首页
        this.$router.push('/')
        this.$message.success('登录成功')
      } finally {
        this.isLogin = false
      }
    },
  },
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #68b0fe;
$cursor: #68b0fe;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: #fff;
  }
}

/* reset element-ui css */
.login-container {
  .loginBtn {
    background: #407ffe;
    height: 64px;
    line-height: 32px;
    font-size: 24px;
  }
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(255, 255, 255, 0.7); // 输入登录表单的背景色
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-image: url('~@/assets/common/login.jpg'); // 设置背景图片，在css中也可以使用@符号，仍然代表src，但是需要添加~
  background-position: center; // 将图片位置设置为充满整个屏幕
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
.svg-icon {
  color: #889aa4;
}
.el-icon-user-solid {
  color: #889aa4;
}
</style>
