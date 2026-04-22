<template>
  <transition name="fade">
    <div v-if="open" class="overlay" @click="$emit('update:open', false)" />
  </transition>

  <transition name="slide">
    <div v-if="open" class="sheet">
      <div class="sheet-header">
        <div>
          <h2 class="sheet-title">{{ isEditing ? 'Editar Item' : 'Adicionar Item' }}</h2>
          <p class="sheet-sub">{{ isEditing ? 'Altere os dados do item' : 'Novo item para esta ordem' }}</p>
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
          <label class="label">Item / Descrição</label>
          <input v-model="form.item" class="input" placeholder="Ex: Pastilha de freio, Óleo motor..." />
          <span v-if="errors.item" class="error">{{ errors.item }}</span>
        </div>

        <div class="field-row">
          <div class="field">
            <label class="label">Preço Unitário (R$)</label>
            <input v-model.number="form.price" type="number" step="0.01" min="0"
              class="input" placeholder="0,00" />
            <span v-if="errors.price" class="error">{{ errors.price }}</span>
          </div>
          <div class="field">
            <label class="label">Quantidade</label>
            <input v-model.number="form.quantity" type="number" min="1"
              class="input" placeholder="1" />
            <span v-if="errors.quantity" class="error">{{ errors.quantity }}</span>
          </div>
        </div>

        <!-- Preview subtotal -->
        <div v-if="form.price > 0 && form.quantity > 0" class="subtotal-preview">
          <span class="subtotal-label">Subtotal</span>
          <span class="subtotal-value">R$ {{ (form.price * form.quantity).toFixed(2) }}</span>
        </div>
      </div>

      <div class="sheet-footer">
        <button class="btn-cancel" @click="$emit('update:open', false)">Cancelar</button>
        <button class="btn-save" @click="handleSave">
          {{ isEditing ? 'Salvar alterações' : 'Adicionar Item' }}
        </button>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'ServiceItemSheet',
  props: {
    open:        { type: Boolean, required: true },
    editingItem: { type: Object,  default: null },
  },
  emits: ['update:open', 'save'],
  data() {
    return {
      form: { item: '', price: 0, quantity: 1 },
      errors: {},
    }
  },
  computed: {
    isEditing() { return !!this.editingItem }
  },
  watch: {
    open(val) {
      this.errors = {}
      if (val && this.editingItem) {
        this.form = {
          item:     this.editingItem.item,
          price:    this.editingItem.price,
          quantity: this.editingItem.quantity,
        }
      } else if (val) {
        this.form = { item: '', price: 0, quantity: 1 }
      }
    }
  },
  methods: {
    validate() {
      this.errors = {}
      if (!this.form.item?.trim()) this.errors.item = 'Descrição obrigatória'
      if (!this.form.price || this.form.price < 0) this.errors.price = 'Preço inválido'
      if (!this.form.quantity || this.form.quantity < 1) this.errors.quantity = 'Mínimo 1'
      return Object.keys(this.errors).length === 0
    },
    handleSave() {
      if (!this.validate()) return
      this.$emit('save', { ...this.form })
      this.$emit('update:open', false)
    }
  }
}
</script>

<style scoped>
.overlay {
  position: fixed; inset: 0; background: rgba(0,0,0,0.45); z-index: 40;
}
.sheet {
  position: fixed; top: 0; right: 0; bottom: 0;
  width: 100%; max-width: 420px; background: #fff;
  z-index: 50; display: flex; flex-direction: column;
  box-shadow: -4px 0 24px rgba(0,0,0,0.1);
}
.sheet-header {
  display: flex; align-items: flex-start; justify-content: space-between;
  padding: 24px 24px 16px; border-bottom: 1px solid #f1f5f9;
}
.sheet-title { font-family: 'Syne', sans-serif; font-size: 17px; color: #0d1f3c; }
.sheet-sub   { font-size: 12px; color: #94a3b8; margin-top: 3px; }
.close-btn {
  width: 32px; height: 32px; border-radius: 8px; background: #f1f5f9;
  border: none; cursor: pointer; display: flex; align-items: center;
  justify-content: center; color: #64748b; flex-shrink: 0;
}
.close-btn:hover { background: #e2e8f0; }
.sheet-body {
  flex: 1; overflow-y: auto; padding: 20px 24px;
  display: flex; flex-direction: column; gap: 16px;
}
.field { display: flex; flex-direction: column; gap: 6px; }
.field-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.label { font-size: 12px; color: #64748b; font-weight: 500; }
.input {
  height: 38px; padding: 0 12px;
  border: 1.5px solid #e2e8f0; border-radius: 10px;
  font-family: 'DM Sans', sans-serif; font-size: 13px; color: #334155;
  background: #fff; outline: none; transition: border 0.2s; width: 100%;
}
.input:focus { border-color: #001B35; }
.input::placeholder { color: #cbd5e1; }
.error { font-size: 11px; color: #ef4444; }
.subtotal-preview {
  display: flex; align-items: center; justify-content: space-between;
  padding: 10px 14px; background: #f8fafc; border-radius: 10px;
  border: 1px solid #e2e8f0;
}
.subtotal-label { font-size: 13px; color: #64748b; }
.subtotal-value { font-size: 15px; font-weight: 600; color: #001B35; }
.sheet-footer {
  display: flex; gap: 10px; padding: 16px 24px;
  border-top: 1px solid #f1f5f9;
}
.btn-cancel {
  flex: 1; height: 40px; border-radius: 10px;
  border: 1.5px solid #e2e8f0; background: #fff;
  font-family: 'DM Sans', sans-serif; font-size: 13px;
  color: #64748b; cursor: pointer;
}
.btn-cancel:hover { background: #f8fafc; }
.btn-save {
  flex: 1; height: 40px; border-radius: 10px; border: none;
  background: linear-gradient(145deg, #001B35 0%, #00264d 40%, #001f3f 100%);
  color: #fff; font-family: 'DM Sans', sans-serif;
  font-size: 13px; font-weight: 500; cursor: pointer;
}
.btn-save:hover { opacity: 0.92; }
.fade-enter-active, .fade-leave-active { transition: opacity 0.25s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
.slide-enter-active, .slide-leave-active { transition: transform 0.3s ease; }
.slide-enter-from, .slide-leave-to { transform: translateX(100%); }
</style>