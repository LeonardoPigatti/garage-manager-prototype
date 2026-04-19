<template>
  <div class="layout">

    <!-- Hamburguer mobile -->
    <button v-if="isMobile" class="hamburger" @click="sidebarOpen = true">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
        <line x1="3" y1="6" x2="21" y2="6"/>
        <line x1="3" y1="12" x2="21" y2="12"/>
        <line x1="3" y1="18" x2="21" y2="18"/>
      </svg>
    </button>

    <Sidebar
      :isOpen="sidebarOpen"
      :user="user"
      @toggle="sidebarOpen = !sidebarOpen"
      @close="sidebarOpen = false"
      @logout="logout"
    />

    <main class="main-content">
      <router-view />
    </main>

  </div>
</template>

<script>
import Sidebar from '../components/Sidebar.vue'

export default {
  name: 'MainLayout',
  components: { Sidebar },

  data() {
    return {
      user: null,
      sidebarOpen: true,
      isMobile: window.innerWidth <= 768
    }
  },

  mounted() {
    window.addEventListener('resize', this.handleResize)

    const userRaw = localStorage.getItem('user')
    if (!userRaw) {
      this.$router.push('/login')
      return
    }
    try {
      this.user = JSON.parse(userRaw)
    } catch {
      this.$router.push('/login')
    }
  },

  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize)
  },

  methods: {
    handleResize() {
      this.isMobile = window.innerWidth <= 768
      if (!this.isMobile) this.sidebarOpen = true
    },
    logout() {
      localStorage.removeItem('auth')
      localStorage.removeItem('user')
      localStorage.removeItem('userId')
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
.layout {
  display: flex;
  min-height: 100vh;
  background: #f1f5f9;
}

.main-content {
  flex: 1;
  overflow-y: auto;
}

.hamburger {
  display: none;
  position: fixed;
  top: 16px;
  left: 16px;
  z-index: 97;
  background: #1a1f5e;
  color: white;
  border: none;
  border-radius: 10px;
  padding: 8px;
  cursor: pointer;
}

@media (max-width: 768px) {
  .hamburger {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .main-content {
    padding-top: 64px;
  }
}
</style>