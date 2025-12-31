import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [],
  }),
  actions: {
    addToCart(product) {
      const price = parseFloat(product.price.replace(/[^\d.-]/g, ''));
      if (isNaN(price)) {
        console.error(`Invalid product price: ${product.price}`);
        return;
      }

      const item = this.items.find(item => item.id === product.id);
      if (item) {
        item.quantity++;
      } else {
        this.items.push({ ...product, price, quantity: 1 });
      }
    },
    removeFromCart(productId) {
      this.items = this.items.filter(item => item.id !== productId);
    },
    clearCart() {
      this.items = [];
    },
  },
  getters: {
    cartTotal: state => {
      return state.items.reduce((total, item) => {
        console.log(`价格${item.price}, 数量${item.quantity}`);
        if (typeof item.price !== 'number' || isNaN(item.price)) {
          console.error(`价格: ${item.price}`);
          return total;
        }
        return total + item.price * item.quantity;
      }, 0);
    },
    cartItems: state => state.items,
  },
});
