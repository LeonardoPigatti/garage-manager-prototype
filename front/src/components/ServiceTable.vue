<template>
  <div class="table-wrap">
    <table class="table">
      <thead>
        <tr>
          <th>Nº OS</th>
          <th>Placa</th>
          <th>Cliente</th>
          <th>Telefone</th>
          <th>Km</th>
          <th>Funcionário</th>
          <th>Box</th>
          <th>Data Entrada</th>
          <th>Criado em</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="order in orders"
          :key="order._id"
          class="table-row"
          @click="$emit('select', order)"
        >
          <td><span class="os-chip">{{ order.osNumber }}</span></td>
          <td><span class="plate-chip">{{ order.vnumber }}</span></td>
          <td class="td-main">{{ order.customer || '—' }}</td>
          <td>{{ order.phone || '—' }}</td>
          <td>{{ order.mileage ? Number(order.mileage).toLocaleString() + ' km' : '—' }}</td>
          <td>{{ order.employee || '—' }}</td>
          <td><span class="box-chip">Box {{ order.boxNumber }}</span></td>
          <td>{{ formatDate(order.entryDate) }}</td>
          <td class="td-muted">{{ formatDate(order.createdAt) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'ServiceTable',
  props: {
    orders: { type: Array, required: true },
  },
  emits: ['select'],
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
.table-wrap {
  background: #fff; border-radius: 18px;
  border: 1px solid rgba(0,0,0,0.05);
  box-shadow: 0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.04);
  overflow-x: auto;
}
.table { width: 100%; border-collapse: collapse; font-size: 13px; min-width: 860px; }
.table thead tr { border-bottom: 1px solid #f1f5f9; }
.table th {
  padding: 14px 16px; text-align: left;
  font-size: 11px; font-weight: 500; color: #94a3b8;
  text-transform: uppercase; letter-spacing: 0.5px;
  white-space: nowrap; background: #fafbfc;
}
.table th:first-child { border-radius: 18px 0 0 0; }
.table th:last-child  { border-radius: 0 18px 0 0; }
.table-row { border-bottom: 1px solid #f8fafc; transition: background 0.15s; cursor: pointer; }
.table-row:last-child { border-bottom: none; }
.table-row:hover { background: #f8fafc; }
.table td { padding: 14px 16px; color: #334155; white-space: nowrap; }
.td-main  { font-weight: 500; color: #0d1f3c; }
.td-muted { color: #94a3b8; font-size: 12px; }
.os-chip    { font-family: monospace; font-size: 12px; background: #f1f5f9; color: #1a1f5e; padding: 3px 8px; border-radius: 6px; border: 1px solid #e2e8f0; font-weight: 600; }
.plate-chip { font-family: 'Syne', sans-serif; font-size: 13px; background: #001B35; color: #fff; padding: 3px 10px; border-radius: 6px; letter-spacing: 1px; }
.box-chip   { font-size: 12px; background: #e8eeff; color: #1a1f5e; padding: 3px 10px; border-radius: 20px; font-weight: 500; }
</style>