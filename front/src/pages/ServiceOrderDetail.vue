<template>
  <div class="page">

    <!-- Loading -->
    <div v-if="isLoading" class="state-wrap">
      <div class="spinner"></div>
      <p>Carregando ordem...</p>
    </div>

    <!-- Erro -->
    <div v-else-if="!order" class="state-wrap">
      <div class="state-icon">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
      </div>
      <p class="state-title">Ordem não encontrada</p>
      <p class="state-sub">Esta ordem pode ter sido removida ou não existe.</p>
      <button class="btn-back" @click="$router.push('/all-services')">Voltar</button>
    </div>

    <!-- Conteúdo -->
    <div v-else>

      <!-- Header -->
      <div class="page-header">
        <div class="header-left">
          <button class="back-btn" @click="$router.push('/all-services')">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          <div>
            <h1 class="page-title">Ordem de Serviço</h1>
            <p class="page-sub">Detalhes completos da OS</p>
          </div>
        </div>
        <div class="os-badge">
          <span class="os-label">Nº da OS</span>
          <span class="os-number">{{ order.osNumber }}</span>
        </div>
      </div>

      <div class="content">

        <!-- Veículo -->
        <div class="section">
          <div class="section-header">
            <div class="section-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4l3 5v3h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
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
              <span class="info-value">{{ order.mileage ? order.mileage.toLocaleString() + ' km' : '—' }}</span>
            </div>
          </div>
        </div>

        <!-- Cliente -->
        <div class="section">
          <div class="section-header">
            <div class="section-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
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
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            </div>
            <div>
              <span class="section-title">Dados da Oficina</span>
              <span class="section-sub">Responsável e localização</span>
            </div>
          </div>

          <div class="info-grid">
            <div class="info-item">
              <span class="info-label">Funcionário Responsável</span>
              <span class="info-value">{{ order.employee || '—' }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Número do Box</span>
              <span class="box-chip">Box {{ order.boxNumber }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Data de Entrada</span>
              <span class="info-value">{{ formatDate(order.entryDate) }}</span>
            </div>
          </div>
        </div>

        <!-- Rodapé info -->
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
    </div>

  </div>
</template>

<script>
export default {
  name: 'ServiceOrderDetail',
  data() {
    return {
      isLoading: true,
      order: null
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
        if (data.success) this.order = data.order
      } catch (err) {
        console.error(err)
      } finally {
        this.isLoading = false
      }
    },

    formatDate(date) {
      if (!date) return '—'
      return new Date(date).toLocaleDateString('pt-BR', {
        day: '2-digit', month: '2-digit', year: 'numeric'
      })
    },

    formatDateTime(date) {
      if (!date) return '—'
      return new Date(date).toLocaleDateString('pt-BR', {
        day: '2-digit', month: '2-digit', year: 'numeric',
        hour: '2-digit', minute: '2-digit'
      })
    }
  }
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

/* ── STATES ── */
.state-wrap {
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  gap: 12px; padding: 80px 20px; color: #94a3b8;
}
.state-icon { width: 56px; height: 56px; background: #e8eeff; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #1a1f5e; }
.state-title { font-family: 'Syne', sans-serif; font-size: 16px; color: #0d1f3c; }
.state-sub { font-size: 13px; color: #94a3b8; }
.spinner { width: 32px; height: 32px; border: 3px solid #e2e8f0; border-top-color: #1a1f5e; border-radius: 50%; animation: spin 0.7s linear infinite; }

.btn-back {
  height: 38px; padding: 0 20px;
  background: #001B35; color: #fff; border: none;
  border-radius: 10px; font-family: 'DM Sans', sans-serif;
  font-size: 13px; cursor: pointer;
}

/* ── HEADER ── */
.page-header {
  display: flex; align-items: center; justify-content: space-between;
  margin-bottom: 28px; flex-wrap: wrap; gap: 16px;
}

.header-left { display: flex; align-items: center; gap: 16px; }

.back-btn {
  width: 38px; height: 38px; border-radius: 10px;
  background: #fff; border: 1.5px solid #e2e8f0;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; color: #64748b; transition: all 0.2s;
}
.back-btn:hover { border-color: #001B35; color: #001B35; }

.page-title { font-family: 'Syne', sans-serif; font-size: 22px; color: #0d1f3c; line-height: 1; }
.page-sub { font-size: 13px; color: #94a3b8; margin-top: 4px; }

.os-badge {
  display: flex; flex-direction: column; align-items: flex-end;
  background: #fff; border: 1.5px solid #e2e8f0;
  border-radius: 12px; padding: 10px 16px;
}
.os-label { font-size: 10px; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px; }
.os-number { font-family: 'Syne', sans-serif; font-size: 18px; color: #001B35; letter-spacing: 0.5px; }

/* ── CONTENT ── */
.content { max-width: 760px; margin: 0 auto; display: flex; flex-direction: column; gap: 16px; }

/* ── SECTION ── */
.section {
  background: #fff; border-radius: 18px;
  border: 1px solid rgba(0,0,0,0.05); padding: 24px 28px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.04);
}

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
.section-sub { display: block; font-size: 12px; color: #94a3b8; margin-top: 2px; }

/* ── INFO GRID ── */
.info-grid {
  display: grid; grid-template-columns: 1fr 1fr; gap: 16px;
}

.info-item { display: flex; flex-direction: column; gap: 6px; }
.info-label { font-size: 11px; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.5px; }
.info-value { font-size: 15px; color: #0d1f3c; font-weight: 500; }

.plate-chip {
  font-family: 'Syne', sans-serif; font-size: 20px;
  color: #001B35; letter-spacing: 3px; font-weight: 700;
}

.box-chip {
  font-size: 14px; font-weight: 500;
  background: #e8eeff; color: #1a1f5e;
  padding: 4px 12px; border-radius: 20px;
  width: fit-content;
}

/* ── META ROW ── */
.meta-row { display: flex; gap: 12px; flex-wrap: wrap; }
.meta-item {
  flex: 1; min-width: 180px; background: #fff;
  border-radius: 12px; border: 1px solid rgba(0,0,0,0.05);
  padding: 14px 18px; display: flex; flex-direction: column; gap: 4px;
}
.meta-label { font-size: 11px; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.5px; }
.meta-value { font-size: 13px; color: #334155; }
.meta-value.mono { font-family: monospace; font-size: 11px; color: #64748b; word-break: break-all; }

@keyframes spin { to { transform: rotate(360deg); } }

@media (max-width: 600px) {
  .page { padding: 20px 16px 40px; }
  .info-grid { grid-template-columns: 1fr; }
  .section { padding: 18px; }
  .os-badge { display: none; }
}
</style>