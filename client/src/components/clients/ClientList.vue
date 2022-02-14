<template>
  <div class="client-list">
    <!-- ORDERING MESSAGE -->
    <p v-if="order == 'name'" class="client-msg">Ordenado por nome</p>
    <p v-if="order == 'cnpj'" class="client-msg">Ordenado por CNPJ</p>
    <p v-if="order == 'data'" class="client-msg">Ordenado por data</p>

    <!-- LIST OF CLIENTS -->
    <transition-group name="list" tag="ul" v-if="showClients">
      <li v-for="client in orderedClients" :key="client.id">
        <div>
          <!-- NAME -->
          <h2>{{ client.name }}</h2>

          <!-- CNPJ - ADDRESS -->
          <p class="cnpj">
            {{ client.cnpj }}
            <span v-if="client.address">- {{ client.address }}</span>
          </p>

          <!-- EMAILS -->
          <div v-if="client.emails != null" class="emails">
            <span v-for="email in client.emails" :key="email" class="email">
              {{ email }}
            </span>
          </div>
        </div>

        <!-- DATE -->
        <div class="data">
          <p>{{ client.data }}</p>
        </div>
      </li>
    </transition-group>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, onMounted, PropType, ref} from 'vue';
import Client from '../../types/Client';
import OrderTerm from '../../types/OrderTerm';
import {BASE_URL} from '../../services/clients';

export default defineComponent({
  name: 'ClientList',
  props: {
    order: {
      required: true,
      type: String as PropType<OrderTerm>,
    },
  },
  setup(props) {
    const clients = ref<Client[]>([]);

    // ORDERING
    const orderedClients = computed(() => {
      let orderedClients = Array.from(clients.value);
      return [...orderedClients].sort((c1: Client, c2: Client) => {
        if (props.order == 'name') {
          return c1.name > c2.name ? 1 : -1;
        } else if (props.order == 'cnpj') {
          return c1.cnpj > c2.cnpj ? 1 : -1;
        } else {
          return c1.data < c2.data ? 1 : -1;
        }
      });
    });

    // FETCHING CLIENTS
    const showClients = ref(false);
    onMounted(() => {
      fetch(BASE_URL)
        .then((res) => res.json())
        .then((res) => {
          clients.value = res.data;
          showClients.value = true;
          console.log(clients.value);
        })
        .catch((err) => console.log(err));
    });

    return {
      clients,
      showClients,
      orderedClients,
    };
  },
});
</script>

<style scoped>
.client-list {
  max-width: 960px;
  margin: 40px auto;
}
.client-list li {
  list-style-type: none;
  background: white;
  padding: 16px;
  margin: 16px 0;
  border-radius: 6px;
  display: flex;
  justify-content: space-between;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}
.client-list h2 {
  margin: 0 0 10px;
  text-transform: capitalize;
}
.cnpj {
  color: #173c5e;
  margin: 10px 4px;
}
.list-move {
  transition: all 0.5s;
}
.emails {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.emails .email {
  display: inline-block;
  margin: 0 10px 0 0;
  padding: 6px 12px;
  background: #eee;
  border-radius: 20px;
  font-size: 12px;
  font-weight: bold;
  color: #777;
}
.client-msg {
  font-size: 14px;
}
</style>
