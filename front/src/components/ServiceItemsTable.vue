<template>
  <div class="section">
    <div class="section-header">
      <div class="section-header-left">
        <div class="section-icon">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/>
            <line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/>
            <line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
          </svg>
        </div>
        <div>
          <span class="section-title">Itens de Serviço</span>
          <span class="section-sub">Peças e serviços realizados</span>
        </div>
      </div>
      <button class="btn-add" @click="$emit('add')">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
          <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
        </svg>
        Adicionar Item
      </button>
    </div>

    <!-- Vazio -->
    <div v-if="items.length === 0" class="empty-items">
      <p class="empty-text">Nenhum item adicionado ainda.</p>
    </div>

    <!-- Tabela -->
    <div v-else class="table-wrap">
      <table class="table">
        <thead>
          <tr>
            <th>Item</th>
            <th class="col-right">Qtd</th>
            <th class="col-right">Preço Unit.</th>
            <th class="col-right">Total</th>
            <th class="col-actions"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in items" :key="item.id" class="table-row">
            <td class="td-main">{{ item.item }}</td>
            <td class="col-right td-muted">{{ item.quantity }}</td>
            <td class="col-right td-muted">R$ {{ item.price.toFixed(2) }}</td>
            <td class="col-right td-bold">R$ {{ (item.price * item.quantity).toFixed(2) }}</td>
            <td class="col-actions">
              <button class="icon-btn" title="Editar" @click="$emit('edit', item)">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                </svg>
              </button>
              <button class="icon-btn danger" title="Remover" @click="$emit('remove', item.id)">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round">
                  <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/>
                  <path d="M10 11v6"/><path d="M14 11v6"/>
                  <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/>
                </svg>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Totais -->
    <div v-if="items.length > 0" class="totals">
      <div class="total-row">
        <span class="total-label">Peças e Serviços</span>
        <span class="total-value">R$ {{ itemsSubtotal.toFixed(2) }}</span>
      </div>
      <div class="total-row">
        <span class="total-label">Mão de obra</span>
        <span class="total-value">R$ {{ labor.toFixed(2) }}</span>
      </div>
      <div class="total-row grand">
        <span class="total-label-grand">Total</span>
        <span class="total-value-grand">R$ {{ grandTotal.toFixed(2) }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ServiceItemsTable',
  props: {
    items: { type: Array,  default: () => [] },
    labor: { type: Number, default: 0 },
  },
  emits: ['add', 'edit', 'remove'],
  computed: {
    itemsSubtotal() {
      return this.items.reduce((acc, i) => acc + i.price * i.quantity, 0)
    },
    grandTotal() {
      return this.itemsSubtotal + this.labor
    },
  },
}
</script>

<style scoped>
.section {
  background: #fff; border-radius: 18px;
  border: 1px solid rgba(0,0,0,0.05);
  box-shadow: 0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.04);
  overflow: hidden;
}
.section-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 20px 24px; border-bottom: 1px solid #f1f5f9;
}
.section-header-left { display: flex; align-items: center; gap: 12px; }
.section-icon {
  width: 34px; height: 34px; background: #e8eeff;
  border-radius: 9px; display: flex; align-items: center;
  justify-content: center; color: #1a1f5e; flex-shrink: 0;
}
.section-title { display: block; font-family: 'Syne', sans-serif; font-size: 14px; color: #0d1f3c; }
.section-sub   { display: block; font-size: 12px; color: #94a3b8; margin-top: 2px; }

.btn-add {
  display: flex; align-items: center; gap: 6px;
  height: 34px; padding: 0 14px;
  background: linear-gradient(145deg, #001B35 0%, #00264d 40%, #001f3f 100%);
  color: #fff; border: none; border-radius: 9px;
  font-family: 'DM Sans', sans-serif; font-size: 12px; font-weight: 500;
  cursor: pointer; transition: all 0.2s;
}
.btn-add:hover { opacity: 0.88; }

.empty-items { padding: 40px 24px; text-align: center; }
.empty-text  { font-size: 13px; color: #94a3b8; }

.table-wrap { overflow-x: auto; }
.table { width: 100%; border-collapse: collapse; font-size: 13px; }
.table th {
  padding: 10px 16px; text-align: left; font-size: 11px;
  font-weight: 500; color: #94a3b8; text-transform: uppercase;
  letter-spacing: 0.5px; background: #fafbfc;
  border-bottom: 1px solid #f1f5f9;
}
.col-right   { text-align: right; }
.col-actions { width: 80px; }
.table-row   { border-bottom: 1px solid #f8fafc; transition: background 0.15s; }
.table-row:last-child { border-bottom: none; }
.table-row:hover { background: #f8fafc; }
.table td    { padding: 12px 16px; color: #334155; }
.td-main     { font-weight: 500; color: #0d1f3c; }
.td-muted    { color: #94a3b8; text-align: right; }
.td-bold     { font-weight: 600; color: #0d1f3c; text-align: right; }

.icon-btn {
  width: 28px; height: 28px; border-radius: 7px;
  border: none; background: #f1f5f9; cursor: pointer;
  display: inline-flex; align-items: center; justify-content: center;
  color: #64748b; transition: all 0.18s; margin-left: 4px;
}
.icon-btn:hover { background: #e2e8f0; color: #334155; }
.icon-btn.danger:hover { background: #fef2f2; color: #ef4444; }

.totals {
  padding: 16px 24px; border-top: 1px solid #f1f5f9;
  display: flex; flex-direction: column; align-items: flex-end; gap: 6px;
}
.total-row  { display: flex; gap: 48px; justify-content: flex-end; }
.total-label { font-size: 13px; color: #94a3b8; min-width: 140px; text-align: right; }
.total-value { font-size: 13px; color: #334155; font-weight: 500; min-width: 90px; text-align: right; }
.grand { padding-top: 10px; border-top: 1px solid #e2e8f0; margin-top: 4px; }
.total-label-grand { font-size: 14px; font-weight: 600; color: #0d1f3c; min-width: 140px; text-align: right; }
.total-value-grand { font-size: 18px; font-weight: 700; color: #001B35; min-width: 90px; text-align: right; }
</style>