<template>
  <div class="page">

    <div v-if="isLoading" class="state-wrap">
      <div class="spinner" />
      <p>Carregando ordem...</p>
    </div>

    <div v-else-if="!order" class="state-wrap">
      <div class="state-icon">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="8" x2="12" y2="12"/>
          <line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
      </div>
      <p class="state-title">Ordem não encontrada</p>
      <p class="state-sub">Esta ordem pode ter sido removida ou não existe.</p>
      <button class="btn-back-state" @click="$router.push('/all-services')">Voltar</button>
    </div>

    <template v-else>

      <OrderDetailHeader
        :os-number="order.osNumber"
        :vnumber="order.vnumber"
        :generating-p-d-f="generatingPDF"
        @back="$router.push('/all-services')"
        @edit="isEditSheetOpen = true"
        @export-pdf="handleExportPDF"
      />

      <div class="content">

        <!-- Status -->
        <div class="status-bar">
          <span class="status-chip" :class="statusClass(order.status)">
            <span class="status-dot"></span>
            {{ order.status || 'Programado' }}
          </span>
          <span class="status-hint">Edite a ordem para alterar o status</span>
        </div>

        <!-- Veículo -->
        <div class="section">
          <div class="section-header">
            <div class="section-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="1" y="3" width="15" height="13" rx="2"/>
                <path d="M16 8h4l3 5v3h-7V8z"/>
                <circle cx="5.5" cy="18.5" r="2.5"/>
                <circle cx="18.5" cy="18.5" r="2.5"/>
              </svg>
            </div>
            <div>
              <span class="section-title">Dados do Veículo</span>
              <span class="section-sub">Informações do veículo registrado</span>
            </div>
          </div>
          <div class="info-grid">
            <div class="info-item">
              <span class="info-label">Placa</span>
              <span class="plate-chip">{{ order.vnumber }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Quilometragem</span>
              <span class="info-value">{{ order.mileage ? Number(order.mileage).toLocaleString() + ' km' : '—' }}</span>
            </div>
          </div>
        </div>

        <!-- Cliente -->
        <div class="section">
          <div class="section-header">
            <div class="section-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </div>
            <div>
              <span class="section-title">Dados do Cliente</span>
              <span class="section-sub">Informações de contato</span>
            </div>
          </div>
          <div class="info-grid">
            <div class="info-item">
              <span class="info-label">Nome</span>
              <span class="info-value">{{ order.customer || '—' }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Telefone</span>
              <span class="info-value">{{ order.phone || '—' }}</span>
            </div>
          </div>
        </div>

        <!-- Oficina -->
        <div class="section">
          <div class="section-header">
            <div class="section-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                <polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
            </div>
            <div>
              <span class="section-title">Dados da Oficina</span>
              <span class="section-sub">Responsável e localização</span>
            </div>
          </div>
          <div class="info-grid">
            <div class="info-item">
              <span class="info-label">Funcionário</span>
              <span class="info-value">{{ order.employee || '—' }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Box</span>
              <span class="box-chip">Box {{ order.boxNumber }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Data de Entrada</span>
              <span class="info-value">{{ formatDate(order.entryDate) }}</span>
            </div>
          </div>
        </div>

        <ServiceItemsTable
          :items="serviceItems"
          :labor="0"
          @add="openAddItem"
          @edit="openEditItem"
          @remove="removeItem"
        />

        <div class="meta-row">
          <div class="meta-item">
            <span class="meta-label">ID da Ordem</span>
            <span class="meta-value mono">{{ order._id }}</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">Registrado em</span>
            <span class="meta-value">{{ formatDateTime(order.createdAt) }}</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">Última atualização</span>
            <span class="meta-value">{{ formatDateTime(order.updatedAt) }}</span>
          </div>
        </div>

      </div>
    </template>

    <OrderEditSheet
      v-model:open="isEditSheetOpen"
      :order="order"
      @save="handleEditSave"
    />

    <ServiceItemSheet
      v-model:open="isItemSheetOpen"
      :editing-item="editingItem"
      @save="handleItemSave"
    />

  </div>
</template>

<script>
import OrderDetailHeader from '../components/OrderDetailHeader.vue'
import OrderEditSheet    from '../components/OrderEditSheet.vue'
import ServiceItemsTable from '../components/ServiceItemsTable.vue'
import ServiceItemSheet  from '../components/ServiceItemSheet.vue'

export default {
  name: 'ServiceOrderDetail',
  components: { OrderDetailHeader, OrderEditSheet, ServiceItemsTable, ServiceItemSheet },

  data() {
    return {
      isLoading:       true,
      order:           null,
      serviceItems:    [],
      isEditSheetOpen: false,
      isItemSheetOpen: false,
      editingItem:     null,
      generatingPDF:   false,
    }
  },

  async mounted() {
    await this.fetchOrder()
  },

  methods: {
    async fetchOrder() {
      this.isLoading = true
      try {
        const id = this.$route.params.id
        const res = await fetch(`http://localhost:3000/oficina/service-orders/${id}`)
        const data = await res.json()
        if (data.success) {
          this.order = data.order
          this.serviceItems = data.order.items ?? []
        }
      } catch (err) {
        console.error('Erro ao buscar ordem:', err)
      } finally {
        this.isLoading = false
      }
    },

    async handleEditSave(formData) {
      try {
        const res = await fetch(`http://localhost:3000/oficina/service-orders/${this.order._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            vnumber:   formData.vnumber,
            customer:  formData.customer,
            phone:     formData.phone,
            mileage:   Number(formData.mileage),
            employee:  formData.employee,
            boxNumber: Number(formData.boxNumber),
            entryDate: formData.entryDate,
            status:    formData.status,
          })
        })
        const data = await res.json()
        if (data.success) {
          this.order = data.order
        } else {
          alert('Erro ao atualizar a ordem.')
        }
      } catch (err) {
        console.error('Erro ao salvar edição:', err)
        alert('Erro ao conectar com o servidor.')
      }
    },

    handleExportPDF() {
      console.log('Export PDF — a implementar')
    },

    openAddItem() {
      this.editingItem = null
      this.isItemSheetOpen = true
    },

    openEditItem(item) {
      this.editingItem = item
      this.isItemSheetOpen = true
    },

    async handleItemSave(data) {
      try {
        if (this.editingItem) {
          const res = await fetch(
            `http://localhost:3000/oficina/service-orders/${this.order._id}/items/${this.editingItem.id}`,
            { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }
          )
          const result = await res.json()
          if (result.success) this.serviceItems = result.order.items
        } else {
          const newItem = { ...data, id: String(Date.now()) }
          const res = await fetch(
            `http://localhost:3000/oficina/service-orders/${this.order._id}/items`,
            { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newItem) }
          )
          const result = await res.json()
          if (result.success) this.serviceItems = result.order.items
        }
      } catch (err) {
        console.error('Erro ao salvar item:', err)
        alert('Erro ao salvar item.')
      }
      this.editingItem = null
    },

    async removeItem(id) {
      try {
        const res = await fetch(
          `http://localhost:3000/oficina/service-orders/${this.order._id}/items/${id}`,
          { method: 'DELETE' }
        )
        const result = await res.json()
        if (result.success) this.serviceItems = result.order.items
      } catch (err) {
        console.error('Erro ao remover item:', err)
        alert('Erro ao remover item.')
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
    },

    formatDateTime(date) {
      if (!date) return '—'
      return new Date(date).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })
    },
  },
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap');
* { box-sizing: border-box; margin: 0; padding: 0; }

.page { min-height: 100vh; background: #f1f5f9; font-family: 'DM Sans', sans-serif; padding: 32px 24px 48px; }
.content { max-width: 760px; margin: 0 auto; display: flex; flex-direction: column; gap: 16px; }

/* ── STATUS BAR ── */
.status-bar {
  display: flex; align-items: center; gap: 12px;
  background: #fff; border-radius: 14px;
  border: 1px solid rgba(0,0,0,0.05);
  padding: 14px 20px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.04);
}

.status-chip {
  display: flex; align-items: center; gap: 7px;
  font-size: 13px; font-weight: 500;
  padding: 5px 14px; border-radius: 20px;
}

.status-dot { width: 8px; height: 8px; border-radius: 50%; background: currentColor; flex-shrink: 0; }

.status-scheduled { background: #f1f5f9; color: #475569; }
.status-progress   { background: #fffbeb; color: #92400e; }
.status-done       { background: #f0fdf4; color: #166534; }

.status-hint { font-size: 12px; color: #94a3b8; }

/* ── SECTION ── */
.section { background: #fff; border-radius: 18px; border: 1px solid rgba(0,0,0,0.05); padding: 24px 28px; box-shadow: 0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.04); }
.section-header { display: flex; align-items: center; gap: 12px; margin-bottom: 20px; padding-bottom: 16px; border-bottom: 1px solid #f1f5f9; }
.section-icon { width: 34px; height: 34px; background: #e8eeff; border-radius: 9px; display: flex; align-items: center; justify-content: center; color: #1a1f5e; flex-shrink: 0; }
.section-title { display: block; font-family: 'Syne', sans-serif; font-size: 14px; color: #0d1f3c; }
.section-sub   { display: block; font-size: 12px; color: #94a3b8; margin-top: 2px; }

.info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.info-item { display: flex; flex-direction: column; gap: 6px; }
.info-label { font-size: 11px; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.5px; }
.info-value { font-size: 15px; color: #0d1f3c; font-weight: 500; }
.plate-chip { font-family: 'Syne', sans-serif; font-size: 20px; color: #001B35; letter-spacing: 3px; font-weight: 700; }
.box-chip { font-size: 14px; font-weight: 500; background: #e8eeff; color: #1a1f5e; padding: 4px 12px; border-radius: 20px; width: fit-content; }

.meta-row { display: flex; gap: 12px; flex-wrap: wrap; }
.meta-item { flex: 1; min-width: 180px; background: #fff; border-radius: 12px; border: 1px solid rgba(0,0,0,0.05); padding: 14px 18px; display: flex; flex-direction: column; gap: 4px; }
.meta-label { font-size: 11px; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.5px; }
.meta-value { font-size: 13px; color: #334155; }
.meta-value.mono { font-family: monospace; font-size: 11px; color: #64748b; word-break: break-all; }

.state-wrap { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px; padding: 80px 20px; color: #94a3b8; }
.state-icon { width: 56px; height: 56px; background: #e8eeff; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #1a1f5e; }
.state-title { font-family: 'Syne', sans-serif; font-size: 16px; color: #0d1f3c; }
.state-sub   { font-size: 13px; color: #94a3b8; }
.spinner { width: 32px; height: 32px; border: 3px solid #e2e8f0; border-top-color: #1a1f5e; border-radius: 50%; animation: spin 0.7s linear infinite; }
.btn-back-state { height: 38px; padding: 0 20px; background: #001B35; color: #fff; border: none; border-radius: 10px; font-family: 'DM Sans', sans-serif; font-size: 13px; cursor: pointer; }

@keyframes spin { to { transform: rotate(360deg); } }
@media (max-width: 600px) {
  .page { padding: 20px 16px 40px; }
  .info-grid { grid-template-columns: 1fr; }
  .section { padding: 18px; }
}
</style>