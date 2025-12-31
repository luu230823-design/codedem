<template>
  <el-header class="header">
    <!-- 导航栏 -->
    <Navbar :default-active="activeIndex" />
  </el-header>

  <!-- 搜索框 -->
  <div class="search-box">
    <el-input 
      placeholder="搜索商品名称" 
      v-model="searchQuery" 
      clearable
      style="width: 300px; margin-right: 20px;"
    />
    <el-button  @click="performSearch">搜索</el-button>
  </div>

  <el-row>
    <el-col :span="24">
      <el-table :data="filteredCartItems" height='calc(100vh - 230px )' tooltip-effect="dark">
        <el-table-column prop="name" label="商品名称" />
        <el-table-column label="价格" prop="price"></el-table-column>
        <el-table-column label="数量">
          <template #default="scope">
            <el-input-number v-model="scope.row.quantity" :min="1" @change="updateTotal"></el-input-number>
          </template>
        </el-table-column>
        <el-table-column label="状态">
          <template #default="scope">
            <el-tag :type="getTagType(scope.row)">
              {{ getStatus(scope.row) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="300">
          <template #default="scope">
            <el-button @click="toggleCheckoutStatus(scope.$index)" class="small-button">
              {{ scope.row.checkedOut ? '取消结算' : '结算' }}
            </el-button>
            <el-button @click="removeItem(scope.row.id)" type="danger" class="small-button">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="total">
        <span class="total-num"> 总计: ¥ {{ total }} </span>
      </div>
    </el-col>
  </el-row>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';
import { useCartStore } from '@/stores/cart';
import Navbar from '@/components/navBar.vue';

const router = useRouter();
const activeIndex = ref('3');
const cartStore = useCartStore();
const searchQuery = ref('');
const filteredItems = ref([]);

// 跳转到指定路径
const goTo = (path) => {
  router.push(path);
};

// 登出操作
const handleCommand = (command) => {
  if (command === 'logout') {
    router.push('/login');
  }
};

// 获取商品状态
const getStatus = (item) => {
  if (item.shipped) return '已发货';
  if (item.checkedOut) return '未发货';
  return '未结算';
};

// 获取状态标签类型
const getTagType = (item) => {
  if (item.shipped) return 'success';
  if (item.checkedOut) return 'warning';
  return 'info';
};

// 删除购物车中的商品
const removeItem = (productId) => {
  cartStore.removeFromCart(productId);
  ElMessage.success('商品已从购物车移除');
};

// 切换结算状态
const toggleCheckoutStatus = (index) => {
  cartStore.items[index].checkedOut = !cartStore.items[index].checkedOut;
  ElMessage.success('结算状态已更新');
};

// 更新总计
const updateTotal = () => {
  const total = cartStore.cartTotal;
  return isNaN(total) ? 0 : total;  // 返回数值，而不是字符串
};

// 执行搜索
const performSearch = () => {
  filteredItems.value = cartStore.cartItems.filter(item => item.name.includes(searchQuery.value));
};

// 计算总计
const total = computed(() => cartStore.cartTotal);

// 计算过滤后的购物车商品
const filteredCartItems = computed(() => {
  return filteredItems.value.length ? filteredItems.value : cartStore.cartItems;
});

// 监听购物车项目变化
watch(() => cartStore.items, updateTotal, { deep: true });

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

.search-box {
  width: 500px;
  padding: 10px 0;
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

.total {
  font-weight: bold;
  height: 50px;
  display: flex;
  align-items: center;
  padding: 0 0 0 5px;
}

.small-button {
  width: 80px;
}
</style>
