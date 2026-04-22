<template>
  <div class="page-header">
    <div>
      <h1 class="page-title">{{ title }}</h1>
      <p class="page-sub">{{ subtitle }}</p>
    </div>

    <div class="header-meta">
      <span class="total-badge">{{ count }} ordens</span>

      <!-- Search -->
      <div class="search-wrap">
        <svg class="search-icon" width="14" height="14" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <input
          class="search-input"
          type="text"
          :placeholder="searchPlaceholder"
          :value="modelValue"
          @input="$emit('update:modelValue', $event.target.value)"
        />
        <button v-if="modelValue" class="search-clear" @click="$emit('update:modelValue', '')">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>

      <!-- Toggle view -->
      <div class="view-toggle">
        <button class="view-btn" :class="{ active: viewMode === 'table' }"
          @click="$emit('update:viewMode', 'table')" title="Tabela">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <rect x="3" y="3" width="18" height="18" rx="2"/>
            <line x1="3" y1="9" x2="21" y2="9"/>
            <line x1="3" y1="15" x2="21" y2="15"/>
            <line x1="9" y1="3" x2="9" y2="21"/>
          </svg>
        </button>
        <button class="view-btn" :class="{ active: viewMode === 'cards' }"
          @click="$emit('update:viewMode', 'cards')" title="Cards">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <rect x="3" y="3" width="7" height="7" rx="1"/>
            <rect x="14" y="3" width="7" height="7" rx="1"/>
            <rect x="3" y="14" width="7" height="7" rx="1"/>
            <rect x="14" y="14" width="7" height="7" rx="1"/>
          </svg>
        </button>
      </div>

      <button class="btn-new" @click="$emit('new')">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
          <line x1="12" y1="5" x2="12" y2="19"/>
          <line x1="5" y1="12" x2="19" y2="12"/>
        </svg>
        Nova OS
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppHeader',
  props: {
    title:            { type: String, required: true },
    subtitle:         { type: String, default: '' },
    count:            { type: Number, default: 0 },
    modelValue:       { type: String, default: '' },         // search query (v-model)
    viewMode:         { type: String, default: 'table' },    // v-model:viewMode
    searchPlaceholder:{ type: String, default: 'Buscar...' },
  },
  emits: ['update:modelValue', 'update:viewMode', 'new'],
}
</script>

<style scoped>
.page-header {
  display: flex; align-items: center; justify-content: space-between;
  margin-bottom: 24px; flex-wrap: wrap; gap: 12px;
}
.page-title { font-family: 'Syne', sans-serif; font-size: 22px; color: #0d1f3c; }
.page-sub   { font-size: 13px; color: #94a3b8; margin-top: 4px; }
.header-meta { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }

.total-badge {
  font-size: 12px; color: #64748b;
  background: #fff; border: 1px solid #e2e8f0;
  border-radius: 20px; padding: 4px 12px;
}

/* Search */
.search-wrap {
  position: relative; display: flex; align-items: center;
}
.search-icon {
  position: absolute; left: 10px; color: #94a3b8; pointer-events: none;
}
.search-input {
  height: 36px; padding: 0 32px 0 30px;
  border: 1px solid #e2e8f0; border-radius: 10px;
  font-family: 'DM Sans', sans-serif; font-size: 13px; color: #334155;
  background: #fff; outline: none; width: 220px; transition: border 0.2s;
}
.search-input::placeholder { color: #94a3b8; }
.search-input:focus { border-color: #001B35; }
.search-clear {
  position: absolute; right: 10px;
  background: none; border: none; cursor: pointer;
  color: #94a3b8; display: flex; align-items: center;
  padding: 0;
}
.search-clear:hover { color: #334155; }

/* Toggle */
.view-toggle {
  display: flex; gap: 2px;
  background: #fff; border: 1px solid #e2e8f0;
  border-radius: 10px; padding: 3px;
}
.view-btn {
  width: 32px; height: 32px;
  display: flex; align-items: center; justify-content: center;
  border: none; border-radius: 7px; cursor: pointer;
  background: transparent; color: #94a3b8; transition: all 0.18s;
}
.view-btn:hover { color: #475569; background: #f1f5f9; }
.view-btn.active { background: #001B35; color: #fff; }

/* Button */
.btn-new {
  display: flex; align-items: center; gap: 7px;
  height: 38px; padding: 0 18px;
  background: linear-gradient(145deg, #001B35 0%, #00264d 40%, #001f3f 100%);
  color: #fff; border: none; border-radius: 10px;
  font-family: 'Syne', sans-serif; font-size: 13px;
  cursor: pointer; transition: all 0.2s;
  box-shadow: 0 3px 10px rgba(29,78,216,0.25);
}
.btn-new:hover { transform: translateY(-1px); box-shadow: 0 5px 16px rgba(29,78,216,0.35); }

@media (max-width: 600px) {
  .search-input { width: 160px; }
  .page-header { flex-direction: column; align-items: flex-start; }
}
</style>