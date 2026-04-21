<template>
  <div class="page">
    <h1 class="page-title">{{ $t('dashboard.title') }}</h1>
    <p class="page-sub">{{ $t('dashboard.subtitle') }}</p>
  </div>
</template>

<script>
export default {
  name: 'DashboardPage'
}
</script>

<style scoped>
.page { padding: 2rem; }
.page-title { font-size: 28px; font-weight: 600; color: #0d1f3c; margin-bottom: 8px; }
.page-sub { font-size: 15px; color: #64748b; }
</style>