<template> 
  <el-container>
    <el-header class="header">
      <Navbar :default-active="activeIndex" />
    </el-header>

    <el-main class="main-content">
      <el-carousel height="300px" class="carousel-container">
        <el-carousel-item v-for="item in carouselItems" :key="item.id">
          <!-- 轮播图数据 -->
          <div class="banner-item" :style="{ backgroundImage: 'url(' + item.image + ')' }">
          </div>
        </el-carousel-item>
        <!-- 将搜索框放在轮播图的中间，绝对定位 -->
        <div class="search-value">
          <el-input placeholder="搜索" v-model="searchQuery" class="search-input">
            <template #append>
              <el-button @click="search">搜索</el-button>
            </template>
          </el-input>
        </div>
      </el-carousel>

      <div class="categories">
        <el-button @click="filterCategory('全部')">全部</el-button>
        <el-button @click="filterCategory('辣条类')">辣条类</el-button>
        <el-button @click="filterCategory('薯片类')">薯片类</el-button>
        <el-button @click="filterCategory('泡面类')">泡面类</el-button>
        <el-button @click="filterCategory('饮料类')">饮料类</el-button>
        <el-button @click="filterCategory('果冻类')">果冻类</el-button>
      </div>

      <el-row :gutter="20">
        <el-col :span="6" v-for="product in filteredProducts" :key="product.id">
          <el-card shadow="always" class="card-body">
            <img :src="product.image" class="image">
            <div class="card-content">
              <h3>{{ product.name }}</h3>
              <p>{{ product.price }}</p>
              <p>{{ product.description }}</p>
              <el-button @click="addToCart(product)">加入购物车</el-button>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useProductStore } from '@/stores/products'
import { useCartStore } from '@/stores/cart'
import { ElMessage } from 'element-plus'
import userImage from '@/assets/images/user.png';
import Navbar from '@/components/navBar.vue'
import banner1 from '@/assets/images/log.png';

const router = useRouter()
const activeIndex = ref('1')
const searchQuery = ref('')
const selectedCategory = ref('全部')
const user = ref({
  name: 'admin',
  avatar: userImage, // 替换为用户头像的实际 URL
})

const productStore = useProductStore()
const cartStore = useCartStore()

const filteredProducts = computed(() => productStore.filteredProducts(selectedCategory.value, searchQuery.value))

const filterCategory = (category) => {
  selectedCategory.value = category
}

const search = () => {
  // 触发搜索时，重新计算 filteredProducts
  // 不需要额外的逻辑，因为 computed 属性会自动响应变化
}


const addToCart = (product) => {
  cartStore.addToCart(product)
  ElMessage({
    message: '商品已加入购物车',
    type: 'success',
  })
}

onMounted(async () => {
  await productStore.fetchProducts()
})

const carouselItems = ref([
  { 
    id: 1, 
    title: 'Loopy小超市', 
    subtitle: 'Loopy small supermarket',
    image: banner1
  },
  { 
    id: 2, 
    title: '欢迎光临', 
    subtitle: 'Welcome',
    image: banner1
  },
])
</script>

<style scoped>
.el-header {
  background-color: #F4B2B6;
  color: white;
  font-size: 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}

.el-menu-demo {
  background-color: #F4B2B6;
  border-bottom: none;
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

.main-content {
  padding: 20px;
}

.carousel-container {
  position: relative; /* 给父容器设置相对定位 */
}

.banner-item {
  height: 100%;
  text-align: center;
  background-size: cover;
  background-position: center;
  padding: 40px 0;
  color: #fff;
}

/* 搜索框的绝对定位 */
.search-value {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); /* 将搜索框居中 */
  width: 100%;
  text-align: center;
}

.search-input {
  width: 300px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 20px;
  overflow: hidden;
}

.categories {
  display: flex;
  justify-content: center;
  margin: 20px 0;
}

.categories .el-button {
  margin: 0 10px;
  background-color: #fff;
  border-color: #F4B2B6;
  color: #F4B2B6;
}

.categories .el-button:hover {
  background-color: #F4B2B6;
  color: #fff;
}

.image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 10px;
}

.card-body {
  margin: 5px 0;
}

.card-content h3 {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 5px 0;
}

.card-content p {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 5px 0;
}

.card-content {
  text-align: center;
  margin-top: 10px;
}

.el-button {
  margin: 5px;
  background-color: #F4B2B6;
  border-color: #F4B2B6;
  color: #fff;
}

.el-button:hover {
  background-color: #F4B2B6;
  border-color: #F4B2B6;
}

.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-right: 8px;
}
</style>
