import { defineStore } from 'pinia'
import axios from 'axios'

export const useProductStore = defineStore('product', {
  state: () => ({
    products: [],
    
  }),
  actions: {
    async fetchProducts() {
      const productData = localStorage.getItem('products');
      if (productData) {
        this.products = JSON.parse(productData);
        console.log(this.products);
      } else {
        try {
          const { data } = await axios.post('/product');
          if (data.code === 200) {
            this.products = data.data;
            localStorage.setItem('products', JSON.stringify(data.data));
          }
        } catch (error) {
          console.error('获取产品数据失败:', error);
        }
      }
    },
    increaseQuantity(product) {
      if (!this.cart[product.id]) {
        this.cart[product.id] = { ...product, quantity: 1 }
      } else {
        this.cart[product.id].quantity++
      }
    },
    decreaseQuantity(product) {
      if (this.cart[product.id] && this.cart[product.id].quantity > 0) {
        this.cart[product.id].quantity--
        if (this.cart[product.id].quantity === 0) {
          delete this.cart[product.id]
        }
      }
    },
    getQuantity(product) {
      return this.cart[product.id] ? this.cart[product.id].quantity : 0
    },
    filteredProducts(category, searchQuery) {
      if (!this.products || this.products.length === 0) {
        return []
      }
      if (category === '全部') {
        return this.products.filter(product => product.name.includes(searchQuery))
      }
      return this.products.filter(product => 
        product.category === category && product.name.includes(searchQuery)
      )
    },
    addProduct(product) {
      this.products.push(product)
    },
    editProduct(updatedProduct) {
      const index = this.products.findIndex(product => product.id === updatedProduct.id)
      if (index !== -1) {
        this.products.splice(index, 1, updatedProduct)
      }
    },
    deleteProduct(id) {
      this.products = this.products.filter(product => product.id !== id)
    },
   
  }
})
