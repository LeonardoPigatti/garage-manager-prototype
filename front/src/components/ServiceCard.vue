<template>
  <div class="card" :style="cardStyle" @click="$emit('click')">
    <div class="card-top">
      <span class="status-badge" :style="statusStyle">{{ statusLabel }}</span>
      <span class="card-os">#{{ order.osNumber }}</span>
    </div>

    <div class="card-plate">{{ order.vnumber || '—' }}</div>
    <p class="card-customer">{{ order.customer || 'Cliente não informado' }}</p>

    <div class="card-details">
      <div class="card-row" v-for="detail in details" :key="detail.label">
        <span class="card-label">{{ detail.label }}</span>
        <span class="card-value">{{ detail.value }}</span>
      </div>
    </div>

    <div class="card-footer">
      <span class="card-created">{{ formatDate(order.createdAt) }}</span>
      <button class="card-arrow">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
          <polyline points="9 18 15 12 9 6"/>
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
const STATUS_CONFIG = {
  scheduled:    { color: '#2563eb', bg: '#eff6ff', label: 'Agendado' },
  'in-progress':{ color: '#d97706', bg: '#fffbeb', label: 'Em andamento' },
  completed:    { color: '#16a34a', bg: '#f0fdf4', label: 'Concluído' },
  'Paid':       { color: '#16a34a', bg: '#f0fdf4', label: 'Pago' },
  'In Progress':{ color: '#d97706', bg: '#fffbeb', label: 'Em andamento' },
  'Open':       { color: '#2563eb', bg: '#eff6ff', label: 'Aberto' },
  'Finished':   { color: '#16a34a', bg: '#f0fdf4', label: 'Finalizado' },
}

export default {
  name: 'ServiceCard',
  props: {
    order: { type: Object, required: true },
    index: { type: Number, default: 0 },
  },
  emits: ['click'],
  computed: {
    statusConfig() {
      return STATUS_CONFIG[this.order.status] ?? STATUS_CONFIG['scheduled']
    },
    statusLabel() { return this.statusConfig.label },
    statusStyle() {
      return {
        color: this.statusConfig.color,
        backgroundColor: this.statusConfig.bg,
      }
    },
    cardStyle() {
      return {
        animation: `fadeIn 0.4s ease-out ${this.index * 0.06}s both`,
      }
    },
    details() {
      return [
        { label: 'Funcionário', value: this.order.employee || '—' },
        { label: 'Box',         value: this.order.boxNumber ? `Box ${this.order.boxNumber}` : '—' },
        { label: 'Telefone',    value: this.order.phone || '—' },
        { label: 'Km',          value: this.order.mileage ? `${Number(this.order.mileage).toLocaleString()} km` : '—' },
        { label: 'Data',        value: this.formatDate(this.order.entryDate) },
      ]
    },
  },
  methods: {
    formatDate(date) {
      if (!date) return '—'
      return new Date(date).toLocaleDateString('pt-BR', {
        day: '2-digit', month: '2-digit', year: 'numeric'
      })
    },
  },
}
</script>

<style scoped>
.card {
  background: #fff;
  border-radius: 16px;
  border: 1px solid rgba(0,0,0,0.06);
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.04);
  display: flex; flex-direction: column; gap: 12px;
  cursor: pointer;
  transition: box-shadow 0.2s, transform 0.2s;
}
.card:hover { transform: translateY(-2px); box-shadow: 0 4px 20px rgba(0,0,0,0.08); }
.card:active { transform: scale(0.98); }

.card-top { display: flex; align-items: center; justify-content: space-between; }

.status-badge {
  font-size: 11px; font-weight: 500;
  padding: 3px 10px; border-radius: 20px;
}

.card-os { font-family: monospace; font-size: 11px; color: #94a3b8; }

.card-plate {
  font-family: 'Syne', sans-serif;
  font-size: 22px; color: #0d1f3c; letter-spacing: 2px;
}

.card-customer { font-size: 13px; color: #475569; line-height: 1.4; }

.card-details {
  display: flex; flex-direction: column; gap: 6px;
  padding-top: 10px; border-top: 1px solid #f1f5f9;
}

.card-row { display: flex; align-items: center; justify-content: space-between; }
.card-label { font-size: 12px; color: #94a3b8; }
.card-value { font-size: 12px; color: #334155; font-weight: 500; }

.card-footer {
  display: flex; align-items: center; justify-content: space-between;
  padding-top: 10px; border-top: 1px solid #f1f5f9; margin-top: auto;
}
.card-created { font-size: 11px; color: #94a3b8; }

.card-arrow {
  width: 28px; height: 28px;
  background: #f1f5f9; border: none; border-radius: 8px;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; color: #64748b; transition: all 0.18s;
}
.card-arrow:hover { background: #001B35; color: #fff; }

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
}
</style>