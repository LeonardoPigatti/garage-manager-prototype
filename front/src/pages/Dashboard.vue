<template>
  <div class="dashboard">

    <!-- Hamburguer mobile -->
    <button v-if="isMobile" class="hamburger" @click="sidebarOpen = true">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
        <line x1="3" y1="6" x2="21" y2="6"/>
        <line x1="3" y1="12" x2="21" y2="12"/>
        <line x1="3" y1="18" x2="21" y2="18"/>
      </svg>
    </button>

    <!-- Sidebar -->
    <Sidebar
      :isOpen="sidebarOpen"
      :user="user"
      @toggle="sidebarOpen = !sidebarOpen"
      @close="sidebarOpen = false"
      @logout="logout"
    />

    <!-- Conteúdo -->
    <main class="content">
      <h1>Dashboard</h1>
      <p>Bem-vindo ao sistema 👋</p>
    </main>

  </div>
</template>

<script>
import Sidebar from '../components/Sidebar.vue'

export default {
  name: 'DashboardPage',
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
.dashboard {
  display: flex;
  min-height: 100vh;
  background: #f1f5f9;
}

.content {
  flex: 1;
  padding: 2rem;
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

  .content {
    padding: 72px 1.2rem 1.5rem;
  }
}
</style>