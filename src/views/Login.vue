

<template>
  <div class="login-container">
    <div class="login-content">
      <div class="logo">
        <img :src="userImage" alt="Logo" />
      </div>
      <div class="login-form">
        <h2>Loopy超市</h2>
        <div class="form-group">
          <label for="username">
            <i class="fas fa-user"></i>
            <el-input id="username" v-model="loginForm.username" placeholder="用户名" clearable></el-input>
          </label>
        </div>
        <div class="form-group">
          <label for="password">
            <i class="fas fa-lock"></i>
            <el-input id="password" type="password" v-model="loginForm.password" placeholder="密码" clearable show-password></el-input>
          </label>
        </div>
        <div class="button-container">
          <el-button type="primary" color='#F4B2B6' @click="onRegister" class="login-button">注册</el-button>
          <el-button type="primary" color='#F4B2B6' @click="onLogin" class="login-button">登录</el-button>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios';
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import Cookies from 'js-cookie'
import userImage from '@/assets/images/user.png'

const loginForm = ref({
  username: 'admin',
  password: ''
})

const router = useRouter()

const onLogin = () => {
  
  // if (loginForm.value.username === 'admin' && loginForm.value.password === '123') {
  //   // 模拟登录成功后保存 token 到 localStorage
  //   localStorage.setItem('token', 'xxxxxxx')
  //   ElMessage.success('登录成功')
  //   router.push('/home')
  // } else {
  //   ElMessage.error('账号或密码错误')
  // }

   // 发送登录请求
   axios.post('/login', loginForm.value)
    .then(response => {
      const { code, message, token, data } = response.data;
      if (code === 200) {
        // 登录成功，保存token到localStorage
        Cookies.set('token', token);
        ElMessage.success(message);
        router.push('/home');
      } else {
        ElMessage.error(message);
      }
    })
    .catch(error => {
      console.error(error);
      ElMessage.error('登录失败');
    });
}
const onRegister=()=>{
  router.push('/register')
}
</script>

<style scoped>



.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 20px);
  background: #F4B2B6; 
  /* background-image: url('@/assets/images/登录页.png'); */
}

.login-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 300px;
}

.logo {
  display: flex;
  justify-content: center;
  align-items: center;
}

.logo img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}

.login-form {
  width: 100%;
}

h2 {
  text-align: center;
  color: #333333;
  font-size: 24px;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
  position: relative;
}

label {
  display: flex;
  align-items: center;
  color: #666666;


}

.button-container {
  
  display: flex;
  /* justify-content: flex-end; */
  justify-content: space-between;
}
.el-button {
  width: 100%;
}
</style>
