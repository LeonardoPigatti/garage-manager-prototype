<template>
  <div class="state-wrap">
    <!-- Loading -->
    <template v-if="loading">
      <div class="spinner" />
      <p>Carregando ordens...</p>
    </template>

    <!-- Empty -->
    <template v-else>
      <div class="state-icon">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
          <rect x="3" y="3" width="18" height="18" rx="2"/>
          <line x1="3" y1="9" x2="21" y2="9"/>
          <line x1="9" y1="21" x2="9" y2="9"/>
        </svg>
      </div>
      <p class="state-title">{{ title }}</p>
      <p class="state-sub">{{ subtitle }}</p>
      <slot />
    </template>
  </div>
</template>

<script>
export default {
  name: 'EmptyState',
  props: {
    loading:  { type: Boolean, default: false },
    title:    { type: String, default: 'Nenhum resultado encontrado' },
    subtitle: { type: String, default: '' },
  },
}
</script>

<style scoped>
.state-wrap {
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  gap: 12px; padding: 80px 20px; color: #94a3b8;
}
.state-icon {
  width: 56px; height: 56px; background: #e8eeff;
  border-radius: 50%; display: flex; align-items: center;
  justify-content: center; color: #1a1f5e;
}
.state-title { font-family: 'Syne', sans-serif; font-size: 16px; color: #0d1f3c; }
.state-sub   { font-size: 13px; color: #94a3b8; }
.spinner {
  width: 32px; height: 32px;
  border: 3px solid #e2e8f0; border-top-color: #1a1f5e;
  border-radius: 50%; animation: spin 0.7s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }
</style>