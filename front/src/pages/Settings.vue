<template>
  <div class="page">

    <div class="page-header">
      <div>
        <h1 class="page-title">Configurações</h1>
        <p class="page-sub">Gerencie as informações da sua oficina</p>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="isLoading" class="state-wrap">
      <div class="spinner"></div>
      <p>Carregando informações...</p>
    </div>

    <!-- Erro: sem oficina -->
    <div v-else-if="!oficina" class="state-wrap">
      <div class="state-icon">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
      </div>
      <p class="state-title">Nenhuma oficina vinculada</p>
      <p class="state-sub">Sua conta não está vinculada a uma oficina.</p>
    </div>

    <!-- Conteúdo -->
    <div v-else class="content">

      <div class="form-section">
        <div class="section-header">
          <div class="section-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
          </div>
          <div>
            <span class="section-title">Informações da Oficina</span>
            <span class="section-sub">Dados cadastrais do seu negócio</span>
          </div>
          <button v-if="!isEditing" class="btn-edit" @click="startEdit">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
            Editar
          </button>
        </div>

        <div class="fields-grid">

          <div class="field-group">
            <label class="field-label">Nome da Oficina</label>
            <div class="field-wrapper">
              <span class="field-icon">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
              </span>
              <input v-model="form.nome" class="field-input" :class="{ readonly: !isEditing }" :readonly="!isEditing" placeholder="Nome da oficina"/>
            </div>
          </div>

          <div class="field-group">
            <label class="field-label">CNPJ</label>
            <div class="field-wrapper">
              <span class="field-icon">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>
              </span>
              <input v-model="form.cnpj" class="field-input" :class="{ readonly: !isEditing }" :readonly="!isEditing" placeholder="00.000.000/0000-00" @input="maskCnpj" maxlength="18"/>
            </div>
          </div>

          <div class="field-group">
            <label class="field-label">Telefone</label>
            <div class="field-wrapper">
              <span class="field-icon">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.62 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 5.45 5.45l.96-.87a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16.92z"/></svg>
              </span>
              <input v-model="form.telefone" class="field-input" :class="{ readonly: !isEditing }" :readonly="!isEditing" placeholder="(00) 00000-0000" @input="maskPhone" maxlength="15"/>
            </div>
          </div>

          <div class="field-group full">
            <label class="field-label">Endereço</label>
            <div class="field-wrapper">
              <span class="field-icon">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              </span>
              <input v-model="form.endereco" class="field-input" :class="{ readonly: !isEditing }" :readonly="!isEditing" placeholder="Rua, número, bairro, cidade"/>
            </div>
          </div>

        </div>

        <!-- Ações edição -->
        <div v-if="isEditing" class="edit-actions">
          <button class="btn-cancel" @click="cancelEdit">Cancelar</button>
          <button class="btn-save" :class="{ loading: isSaving }" @click="saveOficina">
            <span v-if="!isSaving">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>
              Salvar alterações
            </span>
            <span v-else class="btn-spinner">
              <svg class="spin" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
              Salvando...
            </span>
          </button>
        </div>

      </div>

      <!-- Info rodapé -->
      <div class="info-row">
        <div class="info-item">
          <span class="info-label">ID da Oficina</span>
          <span class="info-value mono">{{ oficina._id }}</span>
        </div>
        <div class="info-item">
          <span class="info-label">Cadastrada em</span>
          <span class="info-value">{{ formatDate(oficina.createdAt) }}</span>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'Settings',
  data() {
    return {
      isLoading: true,
      isSaving: false,
      isEditing: false,
      oficina: null,
      form: {
        nome: '',
        cnpj: '',
        telefone: '',
        endereco: ''
      }
    }
  },
  async mounted() {
    await this.fetchOficina()
  },
  methods: {
    async fetchOficina() {
      this.isLoading = true
      try {
        const userId = JSON.parse(localStorage.getItem('user'))?.id
        if (!userId) return
        const res = await fetch(`http://localhost:3000/oficina/${userId}`)
        const data = await res.json()
        if (!data.success) return
        this.oficina = data.oficina
        this.fillForm(data.oficina)
      } catch (err) {
        console.error(err)
      } finally {
        this.isLoading = false
      }
    },

    fillForm(oficina) {
      this.form.nome     = oficina.nome     || ''
      this.form.cnpj     = oficina.cnpj     || ''
      this.form.telefone = oficina.telefone || ''
      this.form.endereco = oficina.endereco || ''
    },

    startEdit() {
      this.isEditing = true
    },

    cancelEdit() {
      this.fillForm(this.oficina)
      this.isEditing = false
    },

    async saveOficina() {
      this.isSaving = true
      try {
        const res = await fetch(`http://localhost:3000/oficina/${this.oficina._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.form)
        })
        const data = await res.json()
        if (!data.success) throw new Error()
        this.oficina = { ...this.oficina, ...this.form }
        this.isEditing = false
      } catch {
        alert('Erro ao salvar. Tente novamente.')
      } finally {
        this.isSaving = false
      }
    },

    maskPhone(e) {
      let v = e.target.value.replace(/\D/g, '')
      v = v.replace(/^(\d{2})(\d)/g, '($1) $2')
      v = v.replace(/(\d)(\d{4})$/, '$1-$2')
      this.form.telefone = v
    },

    maskCnpj(e) {
      let v = e.target.value.replace(/\D/g, '')
      v = v.replace(/^(\d{2})(\d)/, '$1.$2')
      v = v.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
      v = v.replace(/\.(\d{3})(\d)/, '.$1/$2')
      v = v.replace(/(\d{4})(\d)/, '$1-$2')
      this.form.cnpj = v
    },

    formatDate(date) {
      if (!date) return '—'
      return new Date(date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })
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

.page-header { margin-bottom: 28px; }
.page-title { font-family: 'Syne', sans-serif; font-size: 22px; color: #0d1f3c; }
.page-sub { font-size: 13px; color: #94a3b8; margin-top: 4px; }

/* ── STATES ── */
.state-wrap {
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  gap: 12px; padding: 80px 20px;
  color: #94a3b8;
}

.state-icon {
  width: 56px; height: 56px;
  background: #e8eeff; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  color: #1a1f5e;
}

.state-title { font-family: 'Syne', sans-serif; font-size: 16px; color: #0d1f3c; }
.state-sub { font-size: 13px; color: #94a3b8; }

.spinner {
  width: 32px; height: 32px;
  border: 3px solid #e2e8f0;
  border-top-color: #1a1f5e;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}

/* ── CONTENT ── */
.content { max-width: 760px; margin: 0 auto; display: flex; flex-direction: column; gap: 16px; }

/* ── SECTION ── */
.form-section {
  background: #fff;
  border-radius: 18px;
  border: 1px solid rgba(0,0,0,0.05);
  padding: 24px 28px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.04);
}

.section-header {
  display: flex; align-items: center; gap: 12px;
  margin-bottom: 24px; padding-bottom: 16px;
  border-bottom: 1px solid #f1f5f9;
}

.section-icon {
  width: 34px; height: 34px;
  background: #e8eeff; border-radius: 9px;
  display: flex; align-items: center; justify-content: center;
  color: #1a1f5e; flex-shrink: 0;
}

.section-title { display: block; font-family: 'Syne', sans-serif; font-size: 14px; color: #0d1f3c; }
.section-sub { display: block; font-size: 12px; color: #94a3b8; margin-top: 2px; }

.btn-edit {
  margin-left: auto;
  display: flex; align-items: center; gap: 7px;
  height: 36px; padding: 0 16px;
  background: #f8fafc;
  border: 1.5px solid #e2e8f0;
  border-radius: 9px;
  font-family: 'DM Sans', sans-serif;
  font-size: 13px; color: #475569;
  cursor: pointer; transition: all 0.2s;
}
.btn-edit:hover { border-color: #1a1f5e; color: #1a1f5e; background: #f0f4ff; }

/* ── FIELDS ── */
.fields-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.field-group { display: flex; flex-direction: column; gap: 6px; }
.field-group.full { grid-column: 1 / -1; }

.field-label { font-size: 12px; color: #64748b; letter-spacing: 0.3px; }

.field-wrapper { position: relative; display: flex; align-items: center; }

.field-icon {
  position: absolute; left: 13px;
  color: #94a3b8; display: flex; align-items: center;
  pointer-events: none;
}

.field-input {
  width: 100%; height: 46px;
  background: #f8fafc;
  border: 1.5px solid #e2e8f0;
  border-radius: 11px;
  padding: 0 16px 0 40px;
  font-family: 'DM Sans', sans-serif;
  font-size: 14px; color: #0f172a;
  outline: none; transition: all 0.2s;
}

.field-input::placeholder { color: #c1ccd8; }
.field-input:not(.readonly):focus { background: #fff; border-color: #1a1f5e; box-shadow: 0 0 0 3px rgba(26,31,94,0.08); }
.field-input.readonly { background: #f8fafc; color: #475569; cursor: default; }

/* ── EDIT ACTIONS ── */
.edit-actions {
  display: flex; justify-content: flex-end; gap: 10px;
  margin-top: 20px; padding-top: 16px;
  border-top: 1px solid #f1f5f9;
}

.btn-cancel {
  height: 42px; padding: 0 20px;
  background: #fff; border: 1.5px solid #e2e8f0;
  border-radius: 10px; font-family: 'DM Sans', sans-serif;
  font-size: 13px; color: #64748b; cursor: pointer; transition: all 0.2s;
}
.btn-cancel:hover { border-color: #94a3b8; color: #334155; }

.btn-save {
  height: 42px; padding: 0 24px;
  background: linear-gradient(145deg, #001B35 0%, #00264d 40%, #001f3f 100%);
  color: #fff; border: none; border-radius: 10px;
  font-family: 'Syne', sans-serif; font-size: 13px;
  cursor: pointer; display: flex; align-items: center; gap: 8px;
  transition: all 0.25s;
  box-shadow: 0 4px 14px rgba(29,78,216,0.25);
}
.btn-save:hover:not(.loading) { transform: translateY(-1px); box-shadow: 0 6px 18px rgba(29,78,216,0.35); }
.btn-save.loading { opacity: 0.8; cursor: not-allowed; }
.btn-spinner { display: flex; align-items: center; gap: 8px; }

/* ── INFO ROW ── */
.info-row {
  display: flex; gap: 12px; flex-wrap: wrap;
}

.info-item {
  flex: 1; min-width: 200px;
  background: #fff;
  border-radius: 12px;
  border: 1px solid rgba(0,0,0,0.05);
  padding: 14px 18px;
  display: flex; flex-direction: column; gap: 4px;
}

.info-label { font-size: 11px; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.5px; }
.info-value { font-size: 13px; color: #334155; }
.info-value.mono { font-family: monospace; font-size: 12px; color: #64748b; word-break: break-all; }

/* ── ANIMATIONS ── */
@keyframes spin { to { transform: rotate(360deg); } }
.spin { animation: spin 0.8s linear infinite; }

/* ── RESPONSIVE ── */
@media (max-width: 600px) {
  .page { padding: 20px 16px 40px; }
  .fields-grid { grid-template-columns: 1fr; }
  .form-section { padding: 18px; }
  .edit-actions { flex-direction: column; }
  .btn-cancel, .btn-save { width: 100%; justify-content: center; }
}
</style>