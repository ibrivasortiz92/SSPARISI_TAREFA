// TEMPLATE
<template>
  <div class="app">
    <!-- HEADER -->
    <NavBar @update="update" />

    <!-- ORDERING OPTIONS -->
    <div class="order">
      <button class="order-btn" @click="handleClick('name')">
        Ordenar por nome
      </button>
      <button class="order-btn" @click="handleClick('cnpj')">
        Ordenar por CNPJ
      </button>
      <button class="order-btn" @click="handleClick('data')">
        Ordenar por Data
      </button>
    </div>

    <!-- LIST OF CLIENTS -->
    <ClientList :order="order" :key="compKey" />
  </div>
</template>

// SCRIPT
<script lang="ts">
import {defineComponent, ref} from 'vue';
import NavBar from './components/navbar/NavBar.vue';
import ClientList from './components/clients/ClientList.vue';
import OrderTerm from './types/OrderTerm';

export default defineComponent({
  name: 'App',
  components: {NavBar, ClientList},
  setup() {
    // ORDERING OPTIONS
    const order = ref<OrderTerm>('name');
    const handleClick = (term: OrderTerm) => {
      order.value = term;
    };

    // UPDATE COMPONENT
    const compKey = ref(0);
    const update = () => {
      compKey.value += 1;
    };

    // RETURN
    return {
      order,
      handleClick,
      compKey,
      update,
    };
  },
});
</script>

// STYLES
<style>
*,
::before,
::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  font-family: 'Open Sans', sans-serif;
  color: #173c5e;
  background: #f1f5f8;
}
.order {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
.order-btn {
  margin: 0 10px;
  border: none;
  background: #fff;
  color: #173c5e;
  padding: 8px 16px;
  border-radius: 10px;
  cursor: pointer;
  font-weight: bold;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}
.order-btn:hover {
  scale: 1.05;
}
</style>
