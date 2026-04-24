<template>
  <transition name="fade">
    <div v-if="open" class="overlay" @click="$emit('update:open', false)" />
  </transition>

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

        <!-- Status -->
        <div class="field">
          <label class="label">Status</label>
          <div class="status-options">
            <button
              v-for="s in statusOptions"
              :key="s.value"
              class="status-btn"
              :class="[s.cls, { active: form.status === s.value }]"
              @click="form.status = s.value"
            >
              <span class="status-dot"></span>
              {{ s.label }}
            </button>
          </div>
        </div>

        <div class="divider"></div>

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
          <input v-model="form.phone" class="input" placeholder="(00) 00000-0000" @input="maskPhone" maxlength="15"/>
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
    return {
      form: {},
      statusOptions: [
        { value: 'Programado',   label: 'Programado',   cls: 'status-scheduled' },
        { value: 'Em Progresso', label: 'Em Progresso', cls: 'status-progress'  },
        { value: 'Concluído',    label: 'Concluído',    cls: 'status-done'      },
      ]
    }
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
          status:    this.order.status    ?? 'Programado',
        }
      }
    }
  },
  methods: {
    handleSave() {
      if (!this.form.vnumber?.trim())  return alert('Placa obrigatória')
      if (!this.form.customer?.trim()) return alert('Nome do cliente obrigatório')
      if (!this.form.phone?.trim())    return alert('Telefone obrigatório')
      if (!this.form.mileage)          return alert('Quilometragem obrigatória')
      if (!this.form.employee?.trim()) return alert('Funcionário obrigatório')
      if (!this.form.boxNumber)        return alert('Box obrigatório')
      if (!this.form.entryDate)        return alert('Data de entrada obrigatória')

      this.$emit('save', {
        vnumber:   this.form.vnumber.toUpperCase(),
        customer:  this.form.customer,
        phone:     this.form.phone,
        mileage:   Number(this.form.mileage),
        employee:  this.form.employee,
        boxNumber: Number(this.form.boxNumber),
        entryDate: this.form.entryDate,
        status:    this.form.status,
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
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700&family=DM+Sans:wght@400;500&display=swap');
* { box-sizing: border-box; margin: 0; padding: 0; }

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
  font-family: 'DM Sans', sans-serif;
}

.sheet-header {
  display: flex; align-items: flex-start; justify-content: space-between;
  padding: 24px 24px 20px; border-bottom: 1px solid #f1f5f9;
  flex-shrink: 0;
}
.sheet-title { font-family: 'Syne', sans-serif; font-size: 17px; color: #0d1f3c; }
.sheet-sub   { font-size: 12px; color: #94a3b8; margin-top: 3px; }
.close-btn {
  width: 32px; height: 32px; border-radius: 8px;
  background: #f1f5f9; border: none; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  color: #64748b; flex-shrink: 0; transition: background 0.2s;
}
.close-btn:hover { background: #e2e8f0; }

.sheet-body {
  flex: 1; overflow-y: auto; padding: 24px;
  display: flex; flex-direction: column; gap: 16px;
}

/* ── STATUS ── */
.status-options {
  display: flex; gap: 8px; flex-wrap: wrap;
}

.status-btn {
  display: flex; align-items: center; gap: 7px;
  height: 36px; padding: 0 14px;
  border-radius: 20px; border: 1.5px solid #e2e8f0;
  background: #f8fafc; cursor: pointer;
  font-family: 'DM Sans', sans-serif; font-size: 13px;
  color: #64748b; transition: all 0.18s;
  white-space: nowrap;
}

.status-dot {
  width: 8px; height: 8px; border-radius: 50%;
  background: currentColor; flex-shrink: 0;
}

/* Programado */
.status-scheduled { color: #64748b; }
.status-scheduled.active { background: #f1f5f9; border-color: #64748b; color: #334155; font-weight: 500; }
.status-scheduled .status-dot { background: #64748b; }

/* Em Progresso */
.status-progress { color: #d97706; }
.status-progress.active { background: #fffbeb; border-color: #d97706; color: #92400e; font-weight: 500; }
.status-progress .status-dot { background: #d97706; }

/* Concluído */
.status-done { color: #16a34a; }
.status-done.active { background: #f0fdf4; border-color: #16a34a; color: #166534; font-weight: 500; }
.status-done .status-dot { background: #16a34a; }

.divider { height: 1px; background: #f1f5f9; margin: 4px 0; }

.field { display: flex; flex-direction: column; gap: 7px; }
.field-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.label { font-size: 12px; color: #64748b; font-weight: 500; letter-spacing: 0.3px; }

.input {
  width: 100%; height: 46px; padding: 0 14px;
  border: 1.5px solid #e2e8f0; border-radius: 11px;
  font-family: 'DM Sans', sans-serif; font-size: 14px; color: #334155;
  background: #f8fafc; outline: none; transition: all 0.2s;
  box-sizing: border-box;
}
.input:focus { border-color: #001B35; background: #fff; box-shadow: 0 0 0 3px rgba(26,31,94,0.08); }
.input::placeholder { color: #c1ccd8; }

.sheet-footer {
  display: flex; gap: 10px; padding: 16px 24px;
  border-top: 1px solid #f1f5f9; flex-shrink: 0;
}
.btn-cancel {
  flex: 1; height: 44px; border-radius: 11px;
  border: 1.5px solid #e2e8f0; background: #fff;
  font-family: 'DM Sans', sans-serif; font-size: 13px;
  color: #64748b; cursor: pointer; transition: all 0.2s;
}
.btn-cancel:hover { background: #f8fafc; border-color: #94a3b8; }
.btn-save {
  flex: 1; height: 44px; border-radius: 11px; border: none;
  background: linear-gradient(145deg, #001B35 0%, #00264d 40%, #001f3f 100%);
  color: #fff; font-family: 'Syne', sans-serif;
  font-size: 13px; font-weight: 500; cursor: pointer;
  transition: all 0.2s; box-shadow: 0 3px 10px rgba(29,78,216,0.25);
}
.btn-save:hover { opacity: 0.92; transform: translateY(-1px); }

.fade-enter-active, .fade-leave-active { transition: opacity 0.25s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
.slide-enter-active, .slide-leave-active { transition: transform 0.3s ease; }
.slide-enter-from, .slide-leave-to { transform: translateX(100%); }
</style>