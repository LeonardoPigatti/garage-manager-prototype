<template>
  <div class="page">

    <AppHeader
      :title="$t('allServices.title')"
      :subtitle="$t('allServices.subtitle')"
      :count="filteredOrders.length"
      v-model="searchQuery"
      v-model:viewMode="viewMode"
      search-placeholder="Buscar por placa, cliente, OS..."
      @new="$router.push('/service-orders/new')"
    />

    <!-- Loading / vazio -->
    <EmptyState v-if="isLoading || showEmpty" :loading="isLoading"
      :title="searchQuery ? 'Nenhuma ordem encontrada' : 'Nenhuma ordem cadastrada'"
      :subtitle="searchQuery ? `Nenhum resultado para '${searchQuery}'` : 'Crie a primeira ordem de serviço.'">
      <button v-if="!isLoading && !searchQuery" class="btn-new-empty"
        @click="$router.push('/service-orders/new')">Nova OS</button>
      <button v-if="!isLoading && searchQuery" class="btn-clear"
        @click="searchQuery = ''">Limpar busca</button>
    </EmptyState>

    <!-- Tabela -->
    <ServiceTable
      v-else-if="viewMode === 'table'"
      :orders="filteredOrders"
      @select="order => $router.push(`/service-orders/${order._id}`)"
    />

    <!-- Cards -->
    <div v-else class="cards-grid">
      <ServiceCard
        v-for="(order, index) in filteredOrders"
        :key="order._id"
        :order="order"
        :index="index"
        @click="$router.push(`/service-orders/${order._id}`)"
      />
    </div>

  </div>
</template>

<script>
import AppHeader   from '../components/AppHeader.vue'
import ServiceCard from '../components/ServiceCard.vue'
import ServiceTable from '../components/ServiceTable.vue'
import EmptyState  from '../components/EmptyState.vue'

export default {
  name: 'AllServices',
  components: { AppHeader, ServiceCard, ServiceTable, EmptyState },

  data() {
    return {
      isLoading: true,
      orders: [],
      viewMode: 'table',
      searchQuery: '',
    }
  },

  async mounted() {
    await this.fetchOrders()
  },

  computed: {
    filteredOrders() {
      if (!this.searchQuery.trim()) return this.orders
      const q = this.searchQuery.toLowerCase()
      return this.orders.filter(o =>
        o.osNumber?.toString().toLowerCase().includes(q) ||
        o.vnumber?.toLowerCase().includes(q)            ||
        o.customer?.toLowerCase().includes(q)           ||
        o.phone?.toLowerCase().includes(q)              ||
        o.employee?.toLowerCase().includes(q)
      )
    },
    showEmpty() {
      return !this.isLoading && this.filteredOrders.length === 0
    },
  },

  methods: {
    async fetchOrders() {
      this.isLoading = true
      try {
        const res  = await fetch('http://localhost:3000/oficina/service-orders')
        const data = await res.json()
        if (data.success) this.orders = data.orders
      } catch (err) {
        console.error(err)
      } finally {
        this.isLoading = false
      }
    },
  },
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap');

* { box-sizing: border-box; margin: 0; padding: 0; }

.page {
  min-height: 100vh;
  background: #f1f5f9;
  font-family: 'DM Sans', sans-serif;
  padding: 32px 24px 48px;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
}

.btn-new-empty, .btn-clear {
  display: flex; align-items: center; gap: 7px;
  height: 38px; padding: 0 18px;
  background: linear-gradient(145deg, #001B35 0%, #00264d 40%, #001f3f 100%);
  color: #fff; border: none; border-radius: 10px;
  font-family: 'Syne', sans-serif; font-size: 13px;
  cursor: pointer; transition: all 0.2s;
}
.btn-clear { background: #f1f5f9; color: #334155; }
.btn-clear:hover { background: #e2e8f0; }

@media (max-width: 600px) {
  .page { padding: 20px 16px 40px; }
  .cards-grid { grid-template-columns: 1fr; }
}
</style>