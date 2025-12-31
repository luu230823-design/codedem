<template>
  <el-container>
    <!-- 顶部导航栏 -->
    <el-header class="header">
      <Navbar :default-active="activeIndex" />

    </el-header>

    <!-- 主内容区域 -->
    <el-main>
      <!-- 添加商品按钮 -->
      <el-button type="success" @click="showAddProductDialog">添加商品</el-button>
      <el-row :gutter="20">
        <!-- 商品列表 -->
        <el-col :span="6" v-for="product in productStore.products" :key="product.id">
          <el-card shadow="always" class="card-body">
            <img :src="product.image" class="image">
            <div class="card-content">
              <h3>{{ product.name }}</h3>
              <p>{{ product.description }}</p>
              <!-- 商品详情按钮 -->
              <el-button type="primary" @click="showDetails(product)">详情</el-button>
              <!-- 编辑商品按钮 -->
              <el-button type="warning" @click="showEditProductDialog(product)">编辑</el-button>
              <!-- 删除商品按钮 -->
              <el-button type="danger" @click="deleteProduct(product.id)">删除</el-button>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-main>

    <!-- 添加商品的弹窗 -->
    <el-dialog title="添加新商品" v-model="isAddProductDialogVisible" width="400px">
      <el-form :model="newProduct">
        <el-form-item label="商品名称">
          <el-input v-model="newProduct.name"></el-input>
        </el-form-item>
        <el-form-item label="商品描述">
          <el-input v-model="newProduct.description"></el-input>
        </el-form-item>
        <el-form-item label="商品图片">
          <el-input v-model="newProduct.image"></el-input>
        </el-form-item>
        <el-form-item label="商品分类">
          <el-select v-model="newProduct.category" placeholder="请选择商品分类">
            <el-option label="辣条类" value="辣条类"></el-option>
            <el-option label="薯片类" value="薯片类"></el-option>
            <el-option label="泡面类" value="泡面类"></el-option>
            <el-option label="饮料类" value="饮料类"></el-option>
            <el-option label="果冻类" value="果冻类"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="isAddProductDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmAddProduct">确定</el-button>
      </template>
    </el-dialog>

    <!-- 编辑商品的弹窗 -->
    <el-dialog title="编辑商品" v-model="isEditProductDialogVisible" width="400px">
      <el-form :model="editedProduct">
        <img :src="editedProduct.image" class="detail-image">
        <el-form-item label="商品名称">
          <el-input v-model="editedProduct.name"></el-input>
        </el-form-item>
        <el-form-item label="商品描述">
          <el-input v-model="editedProduct.description"></el-input>
        </el-form-item>
        <!-- <el-form-item label="商品图片"> -->
          <!-- <el-input v-model="editedProduct.image"></el-input> -->
        <!-- </el-form-item> -->
      </el-form>
      <template #footer>
        <el-button @click="isEditProductDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmEditProduct">保存</el-button>
      </template>
    </el-dialog>

    <!-- 商品详情的弹窗 -->
    <el-dialog title="商品详情" v-model="isDetailDialogVisible" width="400px">
      <div v-if="selectedProduct">
        <img :src="selectedProduct.image" class="detail-image">
        <p><strong>商品名称:</strong> {{ selectedProduct.name }}</p>
        <p><strong>商品描述:</strong> {{ selectedProduct.description }}</p>
        <p><strong>商品分类:</strong> {{ selectedProduct.category }}</p>
      </div>
      <template #footer>
        <el-button @click="isDetailDialogVisible = false">关闭</el-button>
      </template>
    </el-dialog>
  </el-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessageBox, ElMessage } from 'element-plus'
import { useProductStore } from '@/stores/products'
import userImage from '@/assets/images/user.png';
import Navbar from '@/components/navBar.vue'

// 用户信息
const user = ref({
  name: 'admin',
  avatar: userImage // 替换为用户头像的实际 URL
})

const router = useRouter()
const productStore = useProductStore()

const activeIndex = ref('2') // 活动菜单索引
const isAddProductDialogVisible = ref(false) // 添加商品弹窗的可见性
const isEditProductDialogVisible = ref(false) // 编辑商品弹窗的可见性
const isDetailDialogVisible = ref(false) // 商品详情弹窗的可见性
const selectedProduct = ref(null) // 选中的商品
const editedProduct = ref({
  id: null,
  name: '',
  description: '',
  image: ''
}) // 被编辑的商品
const newProduct = ref({
  name: '',
  description: '',
  image: ''
}) // 新商品

// 显示添加商品弹窗
const showAddProductDialog = () => {
  isAddProductDialogVisible.value = true
}

// 确认添加商品
const confirmAddProduct = () => {
  const product = { 
    ...newProduct.value, 
    id: productStore.products.length + 1 
  }
  productStore.addProduct(product)
  isAddProductDialogVisible.value = false
  newProduct.value = { name: '', description: '', image: '' } // 重置表单
}

// 显示编辑商品弹窗
const showEditProductDialog = (product) => {
  console.log(1);
  isEditProductDialogVisible.value = true
  editedProduct.value = { ...product }
}

// 确认编辑商品
const confirmEditProduct = () => {
  productStore.editProduct(editedProduct.value)
  isEditProductDialogVisible.value = false
}

// 显示商品详情弹窗
const showDetails = (product) => {
  selectedProduct.value = product
  isDetailDialogVisible.value = true
}

// 导航到指定路径
const goTo = (path) => {
  router.push(path)
}

// 删除商品
const deleteProduct = (id) => {
  ElMessageBox.confirm('确定要删除此商品吗?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    productStore.deleteProduct(id)
    ElMessage({
      type: 'success',
      message: '删除成功!',
    })
  }).catch(() => {
    ElMessage({
      type: 'info',
      message: '取消删除',
    })
  })
}

// 处理用户下拉菜单命令
const handleCommand = (command) => {
  if (command === 'logout') {
    alert('已退出登录')
    router.push('/login')
  }
}

// 获取产品数据
onMounted(async () => {
  await productStore.fetchProducts()
})
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

.el-main {
  padding: 20px;
}

.image {
  width: 100%;
  height: 150px;
  object-fit: cover;
}

.card-content {
  text-align: center;
}

.detail-image {
  width: 100px;
  height: auto;
  margin-bottom: 15px;
}

.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-right: 8px;
}

.card-body{
  margin: 5px 0;
}

/* 限制标题和描述的长度，防止溢出 */
.card-content h3 {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 5px 0;
}

.card-content p {
  display: -webkit-box;
  -webkit-line-clamp: 2; /* 显示两行文字 */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 5px 0;
}
</style>
