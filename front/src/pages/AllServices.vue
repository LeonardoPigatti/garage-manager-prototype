<template>
  <div class="page">
    <h1 class="page-title">{{ $t('allServices.title') }}</h1>
    <p class="page-sub">{{ $t('allServices.subtitle') }}</p>
  </div>
</template>

<script>
export default {
  name: 'AllServicesPage'
}
</script>

<style scoped>
.page { padding: 2rem; }
.page-title { font-size: 28px; font-weight: 600; color: #0d1f3c; margin-bottom: 8px; }
.page-sub { font-size: 15px; color: #64748b; }
</style>