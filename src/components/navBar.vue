<template>
  <!-- <el-header class="header"> -->
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
      <el-menu-item index="1" @click="goTo('/home')">首页</el-menu-item>
      <el-menu-item index="2" @click="goTo('/shop')">商城</el-menu-item>
      <el-menu-item index="3" @click="goTo('/cart')">购物车</el-menu-item>
      <el-menu-item index="4" @click="goTo('/about')" >关于我们</el-menu-item>
    </el-menu>
    <div class="user-section">
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          <img :src="user.avatar" class="avatar" alt="avatar" />{{ user.name }}<i
            class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  <!-- </el-header> -->
</template>

<script setup>
import { ref, defineProps } from 'vue'
import { useRouter } from 'vue-router'
import userImage from '@/assets/images/user.png'
import Cookies from 'js-cookie'
const props = defineProps({
  defaultActive: String
})

const router = useRouter()
const activeIndex = ref(props.defaultActive || '1') // 设置默认值或者从父组件传递过来

const user = ref({
  name: 'admin',
  avatar: userImage // 替换为用户头像的实际 URL
})

const goTo = (path) => {
  router.push(path)
}

const handleCommand = (command) => {
  if (command === 'logout') {
    router.push('/login')
    Cookies.remove('token')
    localStorage.removeItem('products')
  }
}
</script>

<style scoped>

.header {
  background-color: #F4B2B6;
  color: white;
  font-size: 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.el-menu-demo {
  background-color: #F4B2B6;
  flex-grow: 1;
}

.user-section {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.user-section .el-dropdown-link {
  display: flex;
  align-items: center;
}

.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-right: 8px;
}

.about-us {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 12px rgba(0,0,0,.1);
  text-align: center;
}

h1 {
  font-size: 32px;
  margin-bottom: 20px;
}

p {
  font-size: 16px;
  color: #666;
  margin-bottom: 20px;
  line-height: 1.6;
}

.el-button {
  margin-top: 20px;
}
</style>
