<template>
  <el-container>
    <el-header class="header">

    <Navbar :default-active="activeIndex" />

    </el-header>
    <el-main>
      <div class="about-us">
        <h1>关于我们</h1>
        <p>欢迎来到Loopy小超市，一个专门为您提供各类美味零食的在线商城。</p>
        <p>我们的目标是为顾客提供高质量、健康、美味的零食产品。我们精心挑选每一款商品，确保它们符合我们的高标准。</p>
        <p>在Loopy小超市，您可以找到各种各样的零食，包括辣条、薯片、泡面、饮料和果冻等等。无论您是喜欢咸的、甜的、辣的，还是酸的，我们都能满足您的需求。</p>
        <p>我们的团队致力于为您提供最佳的购物体验，从便捷的在线购买到快速的送货服务，我们努力确保每一个细节都完美无缺。</p>
        <p>感谢您的支持与信任！如果您有任何问题或建议，请随时与我们联系。</p>
        <el-button type="primary" @click="contactUs">联系我们</el-button>
      </div>
    </el-main>
  </el-container>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import userImage from '@/assets/images/user.png'
import Navbar from '@/components/navBar.vue'

const router = useRouter()
const activeIndex = ref('4')
const user = ref({
  name: 'admin',
  avatar: userImage // 替换为用户头像的实际 URL
})
const goTo = (path) => {
  router.push(path)
}

const contactUs = () => {
  window.location.href ='###'
}

const handleCommand = (command) => {
  if (command === 'logout') {
    router.push('/login')
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
