<template>
  <div>
    <h2>购物车</h2>
    <el-row v-if="cartItems.length > 0">
      <el-col :span="24" v-for="item in cartItems" :key="item.id" class="cart-item">
        <div>{{ item.name }} - {{ item.price }} - 数量: {{ item.quantity }}</div>
        <el-button @click="increaseQuantity(item)">+</el-button>
        <el-button @click="decreaseQuantity(item)">-</el-button>
      </el-col>
    </el-row>
    <div v-else>购物车为空</div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  cartItems: Array,
  increaseQuantity: Function,
  decreaseQuantity: Function
});

const increaseQuantity = (product) => {
  product.quantity += 1;
};

const decreaseQuantity = (product) => {
  if (product.quantity > 1) {
    product.quantity -= 1;
  } else {
    const index = cart.value.findIndex(item => item.id === product.id);
    if (index > -1) {
      cart.value.splice(index, 1);
    }
  }
};

</script>

<style scoped>
.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
}
</style>
