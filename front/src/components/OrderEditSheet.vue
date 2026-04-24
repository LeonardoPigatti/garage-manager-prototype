<template>
  <!-- Overlay -->
  <transition name="fade">
    <div v-if="open" class="overlay" @click="$emit('update:open', false)" />
  </transition>

  <!-- Sheet -->
  <transition name="slide">
    <div v-if="open" class="sheet">
      <div class="sheet-header">
        <div>
          <h2 class="sheet-title">Editar Ordem de Serviço</h2>
          <p class="sheet-sub">OS {{ form.osNumber }}</p>
        </div>
        <button class="close-btn" @click="$emit('update:open', false)">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>

      <div class="sheet-body">
        <div class="field">
          <label class="label">Placa</label>
          <input v-model="form.vnumber" class="input" placeholder="Ex: ABC1D23" />
        </div>
        <div class="field">
          <label class="label">Cliente</label>
          <input v-model="form.customer" class="input" placeholder="Nome do cliente" />
        </div>
        <div class="field">
          <label class="label">Telefone</label>
          <input v-model="form.phone" class="input" placeholder="(00) 00000-0000" />
        </div>
        <div class="field-row">
          <div class="field">
            <label class="label">Quilometragem</label>
            <input v-model.number="form.mileage" type="number" min="0" class="input" placeholder="0" />
          </div>
          <div class="field">
            <label class="label">Box</label>
            <input v-model.number="form.boxNumber" type="number" min="1" class="input" placeholder="1" />
          </div>
        </div>
        <div class="field">
          <label class="label">Funcionário Responsável</label>
          <input v-model="form.employee" class="input" placeholder="Nome do funcionário" />
        </div>
        <div class="field">
          <label class="label">Data de Entrada</label>
          <input v-model="form.entryDate" type="date" class="input" />
        </div>
      </div>

      <div class="sheet-footer">
        <button class="btn-cancel" @click="$emit('update:open', false)">Cancelar</button>
        <button class="btn-save" @click="handleSave">Salvar alterações</button>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'OrderEditSheet',
  props: {
    open:  { type: Boolean, required: true },
    order: { type: Object,  default: null },
  },
  emits: ['update:open', 'save'],
  data() {
    return { form: {} }
  },
  watch: {
    open(val) {
      if (val && this.order) {
        this.form = {
          vnumber:   this.order.vnumber   ?? '',
          customer:  this.order.customer  ?? '',
          phone:     this.order.phone     ?? '',
          mileage:   this.order.mileage   ?? 0,
          boxNumber: this.order.boxNumber ?? '',
          employee:  this.order.employee  ?? '',
          entryDate: this.order.entryDate
            ? new Date(this.order.entryDate).toISOString().split('T')[0]
            : '',
          osNumber:  this.order.osNumber  ?? '',
        }
      }
    }
  },
  methods: {
    handleSave() {
      // Validação mínima antes de emitir
      if (!this.form.vnumber?.trim()) return alert('Placa obrigatória')
      if (!this.form.customer?.trim()) return alert('Nome do cliente obrigatório')
      if (!this.form.phone?.trim()) return alert('Telefone obrigatório')
      if (!this.form.mileage) return alert('Quilometragem obrigatória')
      if (!this.form.employee?.trim()) return alert('Funcionário obrigatório')
      if (!this.form.boxNumber) return alert('Box obrigatório')
      if (!this.form.entryDate) return alert('Data de entrada obrigatória')

      // Emite com os tipos corretos — igual ao body do POST
      this.$emit('save', {
        vnumber:   this.form.vnumber.toUpperCase(),
        customer:  this.form.customer,
        phone:     this.form.phone,
        mileage:   Number(this.form.mileage),
        employee:  this.form.employee,
        boxNumber: Number(this.form.boxNumber),
        entryDate: this.form.entryDate,
      })

      this.$emit('update:open', false)
    },

    maskPhone(e) {
      let v = e.target.value.replace(/\D/g, '')
      if (v.length <= 11) {
        v = v.replace(/^(\d{2})(\d)/g, '($1) $2')
        v = v.replace(/(\d)(\d{4})$/, '$1-$2')
      }
      this.form.phone = v
    },
  }
}
</script>

<style scoped>
.overlay {
  position: fixed; inset: 0; background: rgba(0,0,0,0.45); z-index: 40;
}
.sheet {
  position: fixed; top: 0; right: 0; bottom: 0;
  width: 100%; max-width: 460px;
  background: #fff; z-index: 50;
  display: flex; flex-direction: column;
  box-shadow: -4px 0 24px rgba(0,0,0,0.1);
  overflow: hidden;
}

.sheet-header {
  display: flex; align-items: flex-start; justify-content: space-between;
  padding: 24px 24px 16px; border-bottom: 1px solid #f1f5f9;
}
.sheet-title { font-family: 'Syne', sans-serif; font-size: 17px; color: #0d1f3c; }
.sheet-sub   { font-size: 12px; color: #94a3b8; margin-top: 3px; }
.close-btn {
  width: 32px; height: 32px; border-radius: 8px;
  background: #f1f5f9; border: none; cursor: pointer;
  display: flex; align-items: center; justify-content: center; color: #64748b;
  flex-shrink: 0;
}
.close-btn:hover { background: #e2e8f0; }

.sheet-body {
  flex: 1; overflow-y: visible; padding: 20px 24px;
  display: flex; flex-direction: column; gap: 16px;
}

.field { display: flex; flex-direction: column; gap: 6px; }
.field-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px; /* era 12px, aumentei */
}
.label { font-size: 12px; color: #64748b; font-weight: 500; }
.input {
  height: 38px; padding: 0 12px;
  border: 1.5px solid #e2e8f0; border-radius: 10px;
  font-family: 'DM Sans', sans-serif; font-size: 13px; color: #334155;
  background: #fff; outline: none; transition: border 0.2s;
  width: 100%;
  box-sizing: border-box; /* garante que não gruda na borda */
}
.input:focus { border-color: #001B35; }
.input::placeholder { color: #cbd5e1; }

.sheet-footer {
  display: flex; gap: 10px; padding: 16px 24px;
  border-top: 1px solid #f1f5f9;
}
.btn-cancel {
  flex: 1; height: 40px; border-radius: 10px;
  border: 1.5px solid #e2e8f0; background: #fff;
  font-family: 'DM Sans', sans-serif; font-size: 13px;
  color: #64748b; cursor: pointer; transition: all 0.2s;
}
.btn-cancel:hover { background: #f8fafc; }
.btn-save {
  flex: 1; height: 40px; border-radius: 10px; border: none;
  background: linear-gradient(145deg, #001B35 0%, #00264d 40%, #001f3f 100%);
  color: #fff; font-family: 'DM Sans', sans-serif;
  font-size: 13px; font-weight: 500; cursor: pointer; transition: all 0.2s;
}
.btn-save:hover { opacity: 0.92; }

/* Transitions */
.fade-enter-active, .fade-leave-active { transition: opacity 0.25s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
.slide-enter-active, .slide-leave-active { transition: transform 0.3s ease; }
.slide-enter-from, .slide-leave-to { transform: translateX(100%); }
</style>