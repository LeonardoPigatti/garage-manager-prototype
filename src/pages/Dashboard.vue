<template>
  <div class="dashboard">
    <aside class="sidebar">
      <h2>Oficina</h2>
      <ul>
        <li>Início</li>
        <li>Clientes</li>
        <li>Serviços</li>
      </ul>
    </aside>

    <main class="content">
      <h1>Dashboard</h1>
      <p>Bem-vindo ao sistema 👋</p>
      <h1>Olá, {{ user?.name }} 👋</h1>
<p>{{ user?.email }}</p>

      <button @click="logout">Sair</button>
    </main>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  data() {
    return {
      user: null,
      form: {
        email: '',
        password: ''
      },
      focusedField: null,
      showPassword: false,
      isLoading: false
    }
  },
  methods: {
  logout() {
    localStorage.removeItem('auth')
    this.$router.push('/login')
  }
  },
  mounted() {
  const user = localStorage.getItem('user')
  this.user = user ? JSON.parse(user) : null
}
}
</script>

<style scoped>
.dashboard {
  display: flex;
  height: 100vh;
}

.sidebar {
  width: 220px;
  background: #1e293b;
  color: white;
  padding: 1rem;
}

.sidebar h2 {
  margin-bottom: 1rem;
}

.sidebar ul {
  list-style: none;
  padding: 0;
}

.sidebar li {
  margin-bottom: 0.8rem;
  cursor: pointer;
}

.content {
  flex: 1;
  padding: 2rem;
  background: #f1f5f9;
}
</style>