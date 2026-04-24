<template>
  <div class="page">

    <div class="page-header">
      <div>
        <h1 class="page-title">{{ $t('allServices.title') }}</h1>
        <p class="page-sub">{{ $t('allServices.subtitle') }}</p>
      </div>
      <div class="header-meta">
        <span class="total-badge">{{ orders.length }} ordens</span>
        <div class="view-toggle">
          <button class="view-btn" :class="{ active: viewMode === 'table' }" @click="viewMode = 'table'" title="Tabela">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/><line x1="9" y1="3" x2="9" y2="21"/></svg>
          </button>
          <button class="view-btn" :class="{ active: viewMode === 'cards' }" @click="viewMode = 'cards'" title="Cards">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
          </button>
        </div>
        <button class="btn-new" @click="$router.push('/service-orders/new')">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Nova OS
        </button>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="isLoading" class="state-wrap">
      <div class="spinner"></div>
      <p>Carregando ordens...</p>
    </div>

    <!-- Vazio -->
    <div v-else-if="orders.length === 0" class="state-wrap">
      <div class="state-icon">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>
      </div>
      <p class="state-title">Nenhuma ordem encontrada</p>
      <p class="state-sub">Crie a primeira ordem de serviço.</p>
      <button class="btn-new" @click="$router.push('/service-orders/new')">Nova OS</button>
    </div>

    <!-- ── TABELA ── -->
    <div v-else-if="viewMode === 'table'" class="table-wrap">
      <table class="table">
        <thead>
          <tr>
            <th>Status</th>
            <th>Nº OS</th>
            <th>Placa</th>
            <th>Cliente</th>
            <th>Telefone</th>
            <th>Km</th>
            <th>Funcionário</th>
            <th>Box</th>
            <th>Data Entrada</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="order in orders"
            :key="order._id"
            class="table-row"
            style="cursor:pointer"
            @click="$router.push(`/service-orders/${order._id}`)"
          >
            <td><span class="status-chip" :class="statusClass(order.status)"><span class="status-dot"></span>{{ order.status || 'Programado' }}</span></td>
            <td><span class="os-chip">{{ order.osNumber }}</span></td>
            <td><span class="plate-chip">{{ order.vnumber }}</span></td>
            <td class="td-main">{{ order.customer || '—' }}</td>
            <td>{{ order.phone || '—' }}</td>
            <td>{{ order.mileage ? order.mileage.toLocaleString() + ' km' : '—' }}</td>
            <td>{{ order.employee || '—' }}</td>
            <td><span class="box-chip">Box {{ order.boxNumber }}</span></td>
            <td>{{ formatDate(order.entryDate) }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- ── CARDS ── -->
    <div v-else class="cards-grid">
      <div
        v-for="order in orders"
        :key="order._id"
        class="card"
        style="cursor:pointer"
        @click="$router.push(`/service-orders/${order._id}`)"
      >
        <div class="card-top">
          <span class="status-chip" :class="statusClass(order.status)">
            <span class="status-dot"></span>
            {{ order.status || 'Programado' }}
          </span>
          <span class="card-os">{{ order.osNumber }}</span>
        </div>

        <div class="card-plate">{{ order.vnumber }}</div>
        <p class="card-customer">{{ order.customer || 'Cliente não informado' }}</p>

        <div class="card-details">
          <div class="card-row">
            <span class="card-label">Funcionário</span>
            <span class="card-value">{{ order.employee || '—' }}</span>
          </div>
          <div class="card-row">
            <span class="card-label">Box</span>
            <span class="card-value">{{ order.boxNumber ? 'Box ' + order.boxNumber : '—' }}</span>
          </div>
          <div class="card-row">
            <span class="card-label">Telefone</span>
            <span class="card-value">{{ order.phone || '—' }}</span>
          </div>
          <div class="card-row">
            <span class="card-label">Km</span>
            <span class="card-value">{{ order.mileage ? order.mileage.toLocaleString() + ' km' : '—' }}</span>
          </div>
          <div class="card-row">
            <span class="card-label">Data</span>
            <span class="card-value">{{ formatDate(order.entryDate) }}</span>
          </div>
        </div>

        <div class="card-footer">
          <span class="card-created">{{ formatDate(order.createdAt) }}</span>
          <button class="card-arrow">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'AllServicesPage',
  data() {
    return {
      isLoading: true,
      orders: [],
      viewMode: 'table'
    }
  },
  async mounted() {
    await this.fetchOrders()
  },
  methods: {
    async fetchOrders() {
      this.isLoading = true
      try {
        const res = await fetch('http://localhost:3000/oficina/service-orders')
        const data = await res.json()
        if (data.success) this.orders = data.orders
      } catch (err) {
        console.error(err)
      } finally {
        this.isLoading = false
      }
    },

    statusClass(status) {
      if (status === 'Em Progresso') return 'status-progress'
      if (status === 'Concluído')    return 'status-done'
      return 'status-scheduled'
    },

    formatDate(date) {
      if (!date) return '—'
      return new Date(date).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap');
* { box-sizing: border-box; margin: 0; padding: 0; }

.page { min-height: 100vh; background: #f1f5f9; font-family: 'DM Sans', sans-serif; padding: 32px 24px 48px; }

.page-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px; flex-wrap: wrap; gap: 12px; }
.page-title { font-family: 'Syne', sans-serif; font-size: 22px; color: #0d1f3c; }
.page-sub { font-size: 13px; color: #94a3b8; margin-top: 4px; }
.header-meta { display: flex; align-items: center; gap: 10px; }

.total-badge { font-size: 12px; color: #64748b; background: #fff; border: 1px solid #e2e8f0; border-radius: 20px; padding: 4px 12px; }

.view-toggle { display: flex; gap: 2px; background: #fff; border: 1px solid #e2e8f0; border-radius: 10px; padding: 3px; }
.view-btn { width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; border: none; border-radius: 7px; cursor: pointer; background: transparent; color: #94a3b8; transition: all 0.18s; }
.view-btn:hover { color: #475569; background: #f1f5f9; }
.view-btn.active { background: #001B35; color: #fff; }

.btn-new { display: flex; align-items: center; gap: 7px; height: 38px; padding: 0 18px; background: linear-gradient(145deg, #001B35 0%, #00264d 40%, #001f3f 100%); color: #fff; border: none; border-radius: 10px; font-family: 'Syne', sans-serif; font-size: 13px; cursor: pointer; transition: all 0.2s; box-shadow: 0 3px 10px rgba(29,78,216,0.25); }
.btn-new:hover { transform: translateY(-1px); box-shadow: 0 5px 16px rgba(29,78,216,0.35); }

/* ── STATUS CHIP ── */
.status-chip { display: inline-flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 500; padding: 4px 10px; border-radius: 20px; white-space: nowrap; }
.status-dot  { width: 7px; height: 7px; border-radius: 50%; background: currentColor; flex-shrink: 0; }
.status-scheduled { background: #f1f5f9; color: #475569; }
.status-progress  { background: #fffbeb; color: #92400e; }
.status-done      { background: #f0fdf4; color: #166534; }

/* ── STATES ── */
.state-wrap { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px; padding: 80px 20px; color: #94a3b8; }
.state-icon { width: 56px; height: 56px; background: #e8eeff; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #1a1f5e; }
.state-title { font-family: 'Syne', sans-serif; font-size: 16px; color: #0d1f3c; }
.state-sub { font-size: 13px; color: #94a3b8; }
.spinner { width: 32px; height: 32px; border: 3px solid #e2e8f0; border-top-color: #1a1f5e; border-radius: 50%; animation: spin 0.7s linear infinite; }

/* ── TABELA ── */
.table-wrap { background: #fff; border-radius: 18px; border: 1px solid rgba(0,0,0,0.05); box-shadow: 0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.04); overflow-x: auto; }
.table { width: 100%; border-collapse: collapse; font-size: 13px; min-width: 860px; }
.table thead tr { border-bottom: 1px solid #f1f5f9; }
.table th { padding: 14px 16px; text-align: left; font-size: 11px; font-weight: 500; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.5px; white-space: nowrap; background: #fafbfc; }
.table th:first-child { border-radius: 18px 0 0 0; }
.table th:last-child { border-radius: 0 18px 0 0; }
.table-row { border-bottom: 1px solid #f8fafc; transition: background 0.15s; }
.table-row:last-child { border-bottom: none; }
.table-row:hover { background: #f8fafc; }
.table td { padding: 14px 16px; color: #334155; white-space: nowrap; }
.td-main { font-weight: 500; color: #0d1f3c; }

.os-chip { font-family: monospace; font-size: 12px; background: #f1f5f9; color: #1a1f5e; padding: 3px 8px; border-radius: 6px; border: 1px solid #e2e8f0; font-weight: 600; }
.plate-chip { font-family: 'Syne', sans-serif; font-size: 13px; background: #001B35; color: #fff; padding: 3px 10px; border-radius: 6px; letter-spacing: 1px; }
.box-chip { font-size: 12px; background: #e8eeff; color: #1a1f5e; padding: 3px 10px; border-radius: 20px; font-weight: 500; }

/* ── CARDS ── */
.cards-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px; }

.card { background: #fff; border-radius: 16px; border: 1px solid rgba(0,0,0,0.06); padding: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.04); display: flex; flex-direction: column; gap: 12px; transition: box-shadow 0.2s, transform 0.2s; }
.card:hover { transform: translateY(-2px); box-shadow: 0 4px 20px rgba(0,0,0,0.08); }

.card-top { display: flex; align-items: center; justify-content: space-between; }
.card-os  { font-family: monospace; font-size: 11px; color: #94a3b8; }
.card-plate { font-family: 'Syne', sans-serif; font-size: 22px; color: #0d1f3c; letter-spacing: 2px; }
.card-customer { font-size: 13px; color: #475569; line-height: 1.4; }

.card-details { display: flex; flex-direction: column; gap: 6px; padding-top: 10px; border-top: 1px solid #f1f5f9; }
.card-row { display: flex; align-items: center; justify-content: space-between; }
.card-label { font-size: 12px; color: #94a3b8; }
.card-value { font-size: 12px; color: #334155; font-weight: 500; }

.card-footer { display: flex; align-items: center; justify-content: space-between; padding-top: 10px; border-top: 1px solid #f1f5f9; margin-top: auto; }
.card-created { font-size: 11px; color: #94a3b8; }
.card-arrow { width: 28px; height: 28px; background: #f1f5f9; border: none; border-radius: 8px; display: flex; align-items: center; justify-content: center; cursor: pointer; color: #64748b; transition: all 0.18s; }
.card-arrow:hover { background: #001B35; color: #fff; }

@keyframes spin { to { transform: rotate(360deg); } }

@media (max-width: 600px) {
  .page { padding: 20px 16px 40px; }
  .page-header { flex-direction: column; align-items: flex-start; }
  .cards-grid { grid-template-columns: 1fr; }
}
</style>