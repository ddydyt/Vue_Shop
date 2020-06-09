<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avatar_box">
        <img src="../../assets/logo.png" alt />
      </div>
      <!-- 登录表单区域 -->
      <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" label-width="0px" class="login_form">
        <!-- 用户名 -->
        <el-form-item prop="mobile">
          <el-input v-model="loginForm.mobile" prefix-icon="el-icon-user"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" type="password" prefix-icon="el-icon-lock"></el-input>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 这是登录表单的数据对象
      loginForm: {
        mobile: "88888888888",
        password: "123"
      },
      // 这是表单的验证规则对象
      loginFormRules: {
        // 验证用户名是否合法
        mobile: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 11, message: "长度在 3 到 11 个字符", trigger: "blur" }
        ],
        // 验证密码是否合法
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 15, message: "长度在6到15个字符之间", trigger: "blur" }
        ]
      }
    };
  },
  methods:{
    // 点击重置登录按钮，重置表单
    resetLoginForm() {
      this.$refs.loginFormRef.resetFields()
    },
    login(){
      console.log(this)
      this.$refs.loginFormRef.validate(async valid=>{
        if(!valid) return;
        const { data: res } = await this.$http.post('login',this.loginForm);
        console.log(res)
        if(res.meta.status !== 200)
        return this.$message.error('登录失败,用户名或密码错误!')
        this.$message.success('登录成功!')
        // 将登录成功之后的token保存到客户端的 sessionStorage中
        // sessionStorage会话来保存 token
        window.sessionStorage.setItem('token',res.token);
        setTimeout(() => {
          this.$router.push('home')
        }, 1500);
      })
    }
  }
};

</script>

<style lang="less" scoped>
.login_container {
  background-color: #2b4b6b;
  height: 100%;
}
.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  .avatar_box {
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
}

.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}

.btns {
  display: flex;
  justify-content: flex-end;
}
</style>
