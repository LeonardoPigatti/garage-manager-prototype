<template>
  <div class="dashboard">
    <!-- Sidebar -->
    <aside class="sidebar">
      <h2>Oficina</h2>
      <ul>
        <li>Início</li>
        <li>Clientes</li>
        <li>Serviços</li>
      </ul>
    </aside>

    <!-- Conteúdo -->
    <main class="content">
      <h1>Dashboard</h1>
      <p>Bem-vindo ao sistema 👋</p>

      <!-- Só mostra se tiver usuário -->
      <div v-if="user">
<h2>Olá, {{ user.email }} 👋</h2>
<p>Tipo: {{ user.type }}</p>
      </div>

      <div v-else>
        <p>Carregando usuário...</p>
      </div>

      <button @click="logout">Sair</button>
    </main>
  </div>
</template>

<script>
export default {
  name: 'DashboardPage',

  data() {
    return {
      user: null
    }
  },

  methods: {
    logout() {
      localStorage.removeItem('auth')
      localStorage.removeItem('user') // 🔥 importante limpar também
      this.$router.push('/login')
    }
  },

mounted() {
  const userId = localStorage.getItem('userId')

  if (!userId) {
    this.$router.push('/login')
    return
  }

  fetch(`http://localhost:3000/user/${userId}`)
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        this.user = data.user
      } else {
        this.$router.push('/login')
      }
    })
    .catch(() => {
      this.$router.push('/login')
    })
}
}
</script>

<style scoped>
.dashboard {
  display: flex;
  height: 100vh;
}

/* Sidebar */
.sidebar {
  width: 220px;
  background: #001B35;
  color: white;
  padding: 1.5rem;
}

.sidebar h2 {
  margin-bottom: 1.5rem;
}

.sidebar ul {
  list-style: none;
  padding: 0;
}

.sidebar li {
  margin-bottom: 1rem;
  cursor: pointer;
  opacity: 0.8;
  transition: 0.2s;
}

.sidebar li:hover {
  opacity: 1;
}

/* Conteúdo */
.content {
  flex: 1;
  padding: 2rem;
  background: #f1f5f9;
}

button {
  margin-top: 20px;
  padding: 10px 16px;
  border: none;
  background: #001B35;
  color: white;
  border-radius: 8px;
  cursor: pointer;
}

button:hover {
  opacity: 0.9;
}
</style>