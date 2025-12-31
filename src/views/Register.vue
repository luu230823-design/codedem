<!-- <template>
  <el-form ref="registerForm" :model="registerForm" :rules="rules" label-width="80px">
      <el-input v-model="registerForm.username"></el-input>

    <el-form-item label="密码" prop="password">
      <el-input type="password" v-model="registerForm.password"></el-input>

      <el-button type="primary" @click="onRegister">注册</el-button>

</template> -->

<template>
  <div class="login-container">
    <el-card class="login-card" shadow="hover">
      <h2 class="login-title">用户注册</h2>
      <el-input v-model="registerForm.username" placeholder="用户名" class="login-input"></el-input>
      <el-input type="password" v-model="registerForm.password" placeholder="密码" class="login-input"></el-input>
      <div class="login">
        <el-button type="primary" color='#F4B2B6'  @click="onRegister" class="login-button">注册</el-button>
      </div>
     
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

const router = useRouter()
const registerForm = ref({
  username: '',
  password: ''
})

const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' }
  ]
}

const onRegister = () => {
  const form = registerForm.value
  if (form.username && form.password) {
    // 模拟注册成功
    ElMessage.success('注册成功')
    router.push('/')
  } else {
    ElMessage.error('请填写完整信息')
  }
}
</script>

<style scoped>

.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 20px);
  background: linear-gradient(135deg, #F4B2B6 0%, #F4B2B6 100%);
}

.login-card {
  width: 400px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.login-title {
  text-align: center;
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
}

.login-input {
  margin-bottom: 20px;
}
.login{
  width: 100%;
  display: flex;
  align-items: center;

  /* justify-content: space-between; */
}
.login-button {
  width: 100%;
  background-color: #F4B2B6;
  border-color: #F4B2B6;
  color: #fff;
}
</style>

