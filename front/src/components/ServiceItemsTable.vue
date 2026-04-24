<template>
  <div class="section">

    <div class="section-header">
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
      <div class="empty-icon">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
          <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/>
          <line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/>
          <line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
        </svg>
      </div>
      <p class="empty-text">Nenhum item adicionado ainda.</p>
      <p class="empty-sub">Clique em "Adicionar Item" para começar.</p>
    </div>

    <!-- Itens -->
    <div v-else class="items-list">
      <div v-for="item in items" :key="item.id" class="item-row">
        <div class="item-info">
          <span class="item-name">{{ item.item }}</span>
          <span class="item-meta">{{ item.quantity }}x · R$ {{ Number(item.price).toFixed(2) }} cada</span>
        </div>
        <div class="item-right">
          <span class="item-total">R$ {{ (item.price * item.quantity).toFixed(2) }}</span>
          <div class="item-actions">
            <button class="icon-btn" title="Editar" @click="$emit('edit', item)">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
              </svg>
            </button>
            <button class="icon-btn danger" title="Remover" @click="$emit('remove', item.id)">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round">
                <polyline points="3 6 5 6 21 6"/>
                <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/>
                <path d="M10 11v6"/><path d="M14 11v6"/>
                <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Totais -->
    <div v-if="items.length > 0" class="totals">
      <div class="total-row">
        <span class="total-label">Peças e Serviços</span>
        <span class="total-value">R$ {{ itemsSubtotal.toFixed(2) }}</span>
      </div>
      <div class="total-row">
        <span class="total-label">Mão de obra</span>
        <span class="total-value">R$ {{ Number(labor).toFixed(2) }}</span>
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
      return this.items.reduce((acc, i) => acc + Number(i.price) * Number(i.quantity), 0)
    },
    grandTotal() {
      return this.itemsSubtotal + Number(this.labor)
    },
  },
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap');
* { box-sizing: border-box; margin: 0; padding: 0; }

.section {
  background: #fff; border-radius: 18px;
  border: 1px solid rgba(0,0,0,0.05); padding: 24px 28px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.04);
  font-family: 'DM Sans', sans-serif;
}

/* ── HEADER ── */
.section-header {
  display: flex; align-items: center; gap: 12px;
  margin-bottom: 20px; padding-bottom: 16px;
  border-bottom: 1px solid #f1f5f9;
}

.section-icon {
  width: 34px; height: 34px; background: #e8eeff;
  border-radius: 9px; display: flex; align-items: center;
  justify-content: center; color: #1a1f5e; flex-shrink: 0;
}

.section-title { display: block; font-family: 'Syne', sans-serif; font-size: 14px; color: #0d1f3c; }
.section-sub   { display: block; font-size: 12px; color: #94a3b8; margin-top: 2px; }

.btn-add {
  margin-left: auto;
  display: flex; align-items: center; gap: 7px;
  height: 36px; padding: 0 16px;
  background: linear-gradient(145deg, #001B35 0%, #00264d 40%, #001f3f 100%);
  color: #fff; border: none; border-radius: 9px;
  font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 500;
  cursor: pointer; transition: all 0.2s;
  box-shadow: 0 3px 10px rgba(29,78,216,0.2);
}
.btn-add:hover { opacity: 0.9; transform: translateY(-1px); }

/* ── VAZIO ── */
.empty-items {
  display: flex; flex-direction: column; align-items: center;
  gap: 8px; padding: 36px 20px;
}
.empty-icon {
  width: 48px; height: 48px; background: #f1f5f9;
  border-radius: 12px; display: flex; align-items: center;
  justify-content: center; color: #94a3b8; margin-bottom: 4px;
}
.empty-text { font-size: 14px; color: #475569; font-weight: 500; }
.empty-sub  { font-size: 12px; color: #94a3b8; }

/* ── LISTA DE ITENS ── */
.items-list {
  display: flex; flex-direction: column;
  border: 1px solid #f1f5f9; border-radius: 12px;
  overflow: hidden; margin-bottom: 16px;
}

.item-row {
  display: flex; align-items: center; justify-content: space-between;
  padding: 14px 16px;
  border-bottom: 1px solid #f8fafc;
  transition: background 0.15s;
}
.item-row:last-child { border-bottom: none; }
.item-row:hover { background: #f8fafc; }

.item-info { display: flex; flex-direction: column; gap: 3px; }
.item-name { font-size: 14px; font-weight: 500; color: #0d1f3c; }
.item-meta { font-size: 12px; color: #94a3b8; }

.item-right { display: flex; align-items: center; gap: 16px; }
.item-total { font-size: 15px; font-weight: 600; color: #001B35; min-width: 90px; text-align: right; }

.item-actions { display: flex; gap: 4px; }

.icon-btn {
  width: 30px; height: 30px; border-radius: 8px;
  border: 1.5px solid #e2e8f0; background: #fff;
  cursor: pointer; display: flex; align-items: center;
  justify-content: center; color: #64748b; transition: all 0.18s;
}
.icon-btn:hover { border-color: #1a1f5e; color: #1a1f5e; background: #f0f4ff; }
.icon-btn.danger:hover { border-color: #ef4444; color: #ef4444; background: #fef2f2; }

/* ── TOTAIS ── */
.totals {
  display: flex; flex-direction: column; gap: 8px;
  padding: 16px 0 0; border-top: 1px solid #f1f5f9;
  align-items: flex-end;
}

.total-row { display: flex; align-items: center; gap: 48px; }
.total-label { font-size: 13px; color: #94a3b8; min-width: 140px; text-align: right; }
.total-value { font-size: 13px; color: #334155; font-weight: 500; min-width: 100px; text-align: right; }

.grand {
  margin-top: 4px; padding-top: 12px;
  border-top: 1px solid #e2e8f0; width: 100%;
  justify-content: flex-end;
}
.total-label-grand { font-size: 14px; font-weight: 600; color: #0d1f3c; min-width: 140px; text-align: right; }
.total-value-grand { font-size: 20px; font-weight: 700; color: #001B35; min-width: 100px; text-align: right; }

@media (max-width: 600px) {
  .section { padding: 18px; }
  .item-total { min-width: 70px; font-size: 13px; }
  .total-row { gap: 24px; }
}
</style>