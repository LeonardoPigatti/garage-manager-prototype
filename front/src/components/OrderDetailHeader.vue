<template>
  <div class="topbar">
    <div class="topbar-left">
      <button class="back-btn" @click="$emit('back')">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
          <polyline points="15 18 9 12 15 6"/>
        </svg>
      </button>
      <div>
        <h1 class="page-title">Ordem de Serviço</h1>
        <p class="page-sub">{{ vnumber || 'Detalhes completos da OS' }}</p>
      </div>
    </div>

    <div class="topbar-right">
      <div class="os-badge">
        <span class="os-label">Nº OS</span>
        <span class="os-number">{{ osNumber }}</span>
      </div>

      <button class="btn-edit" @click="$emit('edit')">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round">
          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
        </svg>
        Editar OS
      </button>

      <button class="btn-pdf" :disabled="generatingPDF" @click="$emit('export-pdf')">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round">
          <path d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
        </svg>
        {{ generatingPDF ? 'Gerando...' : 'Exportar PDF' }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrderDetailHeader',
  props: {
    osNumber:     { type: String, default: '—' },
    vnumber:      { type: String, default: '' },
    generatingPDF:{ type: Boolean, default: false },
  },
  emits: ['back', 'edit', 'export-pdf'],
}
</script>

<style scoped>
.topbar {
  display: flex; align-items: center; justify-content: space-between;
  margin-bottom: 28px; flex-wrap: wrap; gap: 16px;
}
.topbar-left  { display: flex; align-items: center; gap: 16px; }
.topbar-right { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }

.back-btn {
  width: 38px; height: 38px; border-radius: 10px;
  background: #fff; border: 1.5px solid #e2e8f0;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; color: #64748b; transition: all 0.2s; flex-shrink: 0;
}
.back-btn:hover { border-color: #001B35; color: #001B35; }

.page-title { font-family: 'Syne', sans-serif; font-size: 22px; color: #0d1f3c; line-height: 1; }
.page-sub   { font-size: 13px; color: #94a3b8; margin-top: 4px; }

.os-badge {
  display: flex; flex-direction: column; align-items: flex-end;
  background: #fff; border: 1.5px solid #e2e8f0;
  border-radius: 12px; padding: 8px 14px;
}
.os-label  { font-size: 10px; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px; }
.os-number { font-family: 'Syne', sans-serif; font-size: 16px; color: #001B35; }

.btn-edit {
  display: flex; align-items: center; gap: 7px;
  height: 38px; padding: 0 16px;
  background: #fff; border: 1.5px solid #e2e8f0;
  border-radius: 10px; font-family: 'DM Sans', sans-serif;
  font-size: 13px; font-weight: 500; color: #334155;
  cursor: pointer; transition: all 0.2s;
}
.btn-edit:hover { border-color: #001B35; color: #001B35; }

.btn-pdf {
  display: flex; align-items: center; gap: 7px;
  height: 38px; padding: 0 16px;
  background: linear-gradient(145deg, #001B35 0%, #00264d 40%, #001f3f 100%);
  color: #fff; border: none; border-radius: 10px;
  font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 500;
  cursor: pointer; transition: all 0.2s;
  box-shadow: 0 3px 10px rgba(29,78,216,0.2);
}
.btn-pdf:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 5px 16px rgba(29,78,216,0.3); }
.btn-pdf:disabled { opacity: 0.6; cursor: not-allowed; }

@media (max-width: 600px) { .os-badge { display: none; } }
</style>