<template>
   <el-header class="header">
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
        <el-menu-item index="1" @click="goTo('/home')">首页</el-menu-item>
        <el-menu-item index="2" @click="goTo('/shop')">商城</el-menu-item>
        <el-menu-item index="3" >购物车</el-menu-item>
        <el-menu-item index="4" @click="goTo('/about')">关于我们</el-menu-item>
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
    </el-header>
  <!-- <div class="title">
    <el-row>
        <el-col :span="24">
          <div class="add-item">
            <el-form :model="newItem" label-width="80px">
              <el-form-item label="商品信息">
                <el-input style="width:200px ;margin: 0 10px 0 0" v-model="newItem.name" placeholder="商品名称" /> 
               价格：<el-input-number style="margin: 0 10px 0 0" v-model="newItem.price" :min="0" placeholder="价格" />
               数量：<el-input-number v-model="newItem.quantity" :min="1" placeholder="数量" />
                <el-button style="margin: 0 10px" @click="addItem" type="primary">添加</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
      </el-row>
  </div> -->

  <el-row>
    <el-col :span="24">
      <el-table :data="cart" height='calc(100vh - 230px )' tooltip-effect="dark">
        <el-table-column prop="name" label="商品名称" />
        <el-table-column label="价格">
          <template #default="scope">
            <el-input-number v-model="scope.row.price" :min="0" @change="updateTotal"></el-input-number>
          </template>
        </el-table-column>
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
            <!-- <el-button @click="toggleShipmentStatus(scope.$index)" class="small-button">
              {{ scope.row.shipped ? '取消发货' : '发货' }}
            </el-button> -->
            <el-button @click="removeItem(scope.$index)" type="danger" class="small-button">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- <el-row> -->
        <!-- <el-col :span="24"> -->
          <div class="total">
            <span class="total-num"> 总计: ¥ {{ total }} </span>
          </div>
        <!-- </el-col> -->
      <!-- </el-row> -->
    </el-col>
  </el-row>
</template>

<script setup>


import { ref, computed,watch } from 'vue';
import { ElMessage } from 'element-plus';
import userImage from '@/assets/images/user.png'
import { useRouter } from 'vue-router'

const router = useRouter()
const activeIndex = ref('3')
// 初始化购物车数据
const cart = ref([
  { id: 1, name: '香辣小龙虾味辣条', price: 0.5, quantity: 2, checkedOut: false, shipped: false },
  { id: 2, name: '脆香番薯薯片', price: 1, quantity: 1, checkedOut: false, shipped: false },
  { id: 3, name: '红烧牛肉面', price: 2.5, quantity: 3, checkedOut: true, shipped: false },
  { id: 3, name: '冰镇可乐', price: 2, quantity: 3, checkedOut: true, shipped: true },
  { id: 3, name: '果冻', price: 1.5, quantity: 3, checkedOut: true, shipped: false },
])
const user = ref({
  name: 'admin',
  avatar: userImage // 替换为用户头像的实际 URL
})
// 新商品数据
const newItem = ref({
  name: '',
  price: 10,
  quantity: 1,
  checkedOut: false,
  shipped: false,
});

// 添加商品到购物车
const addItem = () => {
  if (newItem.value.name && newItem.value.price > 0 && newItem.value.quantity > 0) {
    cart.value.push({ ...newItem.value, id: Date.now() });
    resetNewItem();
    ElMessage.success('商品已添加到购物车');
  } else {
    ElMessage.error('请填写所有字段，并确保价格和数量为正数');
  }
};

// 删除购物车中的商品
const removeItem = (index) => {
  cart.value.splice(index, 1);
  ElMessage.success('商品已从购物车移除');
};

// 增加商品数量
const increaseQuantity = (index) => {
  cart.value[index].quantity++;
  updateTotal();
};

// 减少商品数量
const decreaseQuantity = (index) => {
  if (cart.value[index].quantity > 1) {
    cart.value[index].quantity--;
    updateTotal();
  }
};

// 切换结算状态
const toggleCheckoutStatus = (index) => {
  cart.value[index].checkedOut = !cart.value[index].checkedOut;
  // 如果取消结算，同时取消发货状态
  if (!cart.value[index].checkedOut) {
    cart.value[index].shipped = false;
  }
};

// 切换发货状态
const toggleShipmentStatus = (index) => {
  if (cart.value[index].checkedOut) {
    cart.value[index].shipped = !cart.value[index].shipped;
  } else {
    ElMessage.error('请先结算');
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

// 重置新商品输入框
const resetNewItem = () => {
  newItem.value.name = '';
  newItem.value.price = 10;
  newItem.value.quantity = 1;
  newItem.value.checkedOut = false;
  newItem.value.shipped = false;
};

const goTo = (path) => {
  router.push(path)
}

const handleCommand = (command) => {
  if (command === 'logout') {
    router.push('/login')
  }
}
// 更新总计
const updateTotal = () => {
  total.value = cart.value.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);
};

// 计算总计
const total = ref(0);
watch(cart, updateTotal, { deep: true });
updateTotal();


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
.cart-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.cart-item span {
  margin-right: 10px;
}

.cart-item button {
  margin-right: 5px;
}

.add-item {
  height: 50px;
  display: flex;
  align-items: center;
}

.total {
  font-weight: bold;
  height: 50px;
  display: flex;
  align-items: center;
  padding: 0 0 0 5px;
}

.title {
  height: 50px;
  margin-top:50px;
}
.small-button{
  width: 80px;
}


</style>
