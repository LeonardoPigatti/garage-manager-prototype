<template>
  <div class="app">
    <!-- LEFT PANEL: Image / Brand Side -->
    <div class="panel-left">
      <div class="overlay"></div>

      <div class="brand">
        <div class="logo">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="24" cy="24" r="22" stroke="#F59E0B" stroke-width="2.5"/>
            <path d="M24 8L27.5 18H38L29.5 24.5L32.5 35L24 28.5L15.5 35L18.5 24.5L10 18H20.5L24 8Z" fill="#F59E0B"/>
            <circle cx="24" cy="24" r="5" fill="#1E3A5F"/>
            <path d="M14 32 Q18 28 24 30 Q30 28 34 32" stroke="#F59E0B" stroke-width="1.5" fill="none" stroke-linecap="round"/>
          </svg>
        </div>
        <div class="brand-text">
          <span class="brand-name">AutoMech</span>
          <span class="brand-sub">Workshop Pro</span>
        </div>
      </div>

      <div class="hero-content">
        <h2 class="hero-title">Sua oficina.<br/>No controle total.</h2>
        <p class="hero-desc">Gerencie ordens de serviço, estoque e clientes em um único painel profissional.</p>

        <div class="stats">
          <div class="stat">
            <span class="stat-num">2.4k</span>
            <span class="stat-label">Oficinas ativas</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat">
            <span class="stat-num">98%</span>
            <span class="stat-label">Satisfação</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat">
            <span class="stat-num">12x</span>
            <span class="stat-label">Mais produtivo</span>
          </div>
        </div>
      </div>

    </div>

    <!-- RIGHT PANEL: Login Form -->
    <div class="panel-right">
      <div class="login-card">
        <div class="card-header">
          <h1 class="card-title">Bem-vindo de volta</h1>
          <p class="card-subtitle">Entre na sua conta para continuar</p>
        </div>

        <form class="form" @submit.prevent="handleLogin">
          <!-- Email Field -->
          <div class="field-group" :class="{ focused: focusedField === 'email', filled: form.email }">
            <label class="field-label">E-mail</label>
            <div class="field-wrapper">
              <span class="field-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
              </span>
              <input
                type="email"
                v-model="form.email"
                placeholder="seu@email.com"
                class="field-input"
                @focus="focusedField = 'email'"
                @blur="focusedField = null"
                required
              />
            </div>
          </div>

          <!-- Password Field -->
          <div class="field-group" :class="{ focused: focusedField === 'password', filled: form.password }">
            <label class="field-label">Senha</label>
            <div class="field-wrapper">
              <span class="field-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
              </span>
              <input
                :type="showPassword ? 'text' : 'password'"
                v-model="form.password"
                placeholder="••••••••"
                class="field-input"
                @focus="focusedField = 'password'"
                @blur="focusedField = null"
                required
              />
              <button type="button" class="toggle-password" @click="showPassword = !showPassword">
                <svg v-if="!showPassword" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
                <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                  <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                  <line x1="1" y1="1" x2="23" y2="23"/>
                </svg>
              </button>
            </div>
          </div>

          <!-- Forgot Password -->
          <div class="form-meta">
            <a href="#" class="forgot-link" @click.prevent="$router.push('/forgot-password')">
              Esqueceu a senha?
            </a>
          </div>

          <!-- Submit Button -->
          <button type="submit" class="btn-login" :class="{ loading: isLoading }">
            <span v-if="!isLoading" class="btn-text">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
                <polyline points="10 17 15 12 10 7"/>
                <line x1="15" y1="12" x2="3" y2="12"/>
              </svg>
              Entrar na plataforma
            </span>
            <span v-else class="btn-spinner">
              <svg class="spin" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
              </svg>
              Autenticando...
            </span>
          </button>
        </form>

        <div class="card-footer">
          <span class="footer-text">Não tem uma conta?</span>
          <a href="#" class="create-link">Criar conta gratuita</a>
        </div>

        <div class="security-badge">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
          <span>Conexão segura e criptografada</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  data() {
    return {
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
async handleLogin() {
  this.isLoading = true

  try {
    const response = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: this.form.email,
        password: this.form.password
      })
    })

    const data = await response.json()

    if (!response.ok || !data.success) {
      throw new Error('Credenciais inválidas')
    }

    // salva ID
localStorage.setItem('userId', data.user.id)

localStorage.setItem('user', JSON.stringify(data.user))
    // salva auth
    localStorage.setItem('auth', 'true')

    this.$router.push('/dashboard')

  } catch (error) {
    alert('Email ou senha inválidos')
  } finally {
    this.isLoading = false
  }
}
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.app {
  display: flex;
  min-height: 100vh;
  font-family: 'DM Sans', sans-serif;
  background: #f8fafc;
}

body {
  -webkit-font-smoothing: antialiased;
}

/* ─── LEFT PANEL ─────────────────────────────────────── */
.panel-left {
  position: relative;
  flex: 1;
  background: linear-gradient(
  145deg,
  #001B35 0%,
  #00264d 40%,
  #001f3f 100%
);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 40px 48px 36px;
  overflow: hidden;
  min-height: 100vh;
}

.panel-left::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 60% 50% at 80% 20%, rgba(245,158,11,0.08) 0%, transparent 70%),
    radial-gradient(ellipse 40% 60% at 10% 80%, rgba(30,100,180,0.15) 0%, transparent 70%);
  pointer-events: none;
}

.panel-left::after {
  content: '';
  position: absolute;
  top: 0; right: 0;
  width: 1px;
  height: 100%;
  background: linear-gradient(180deg, transparent, rgba(245,158,11,0.3) 40%, rgba(245,158,11,0.15) 80%, transparent);
}

.overlay { display: none; }

.brand {
  display: flex;
  align-items: center;
  gap: 14px;
  position: relative;
  z-index: 2;
}

.logo {
  width: 52px;
  height: 52px;
  background: rgba(245,158,11,0.12);
  border: 1.5px solid rgba(245,158,11,0.35);
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(8px);
}

.brand-text {
  display: flex;
  flex-direction: column;
}

.brand-name {
  font-family: 'Syne', sans-serif;
  font-size: 22px;
  color: #fff;
  letter-spacing: -0.5px;
  line-height: 1;
}

.brand-sub {
  font-size: 11px;
  color: rgba(245,158,11,0.75);
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-top: 3px;
}

.hero-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 2;
  padding: 20px 0;
}

.hero-title {
  font-family: 'Syne', sans-serif;
  font-size: clamp(32px, 3.5vw, 48px);
  color: #fff;
  line-height: 1.3;
  letter-spacing: -0.3px;
  margin-bottom: 18px;
}

.hero-desc {
  font-size: 15px;
  color: rgba(255,255,255,0.55);
  line-height: 1.65;
  max-width: 340px;
  margin-bottom: 44px;
}

.stats {
  display: flex;
  align-items: center;
  gap: 0;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 16px;
  padding: 20px 28px;
  backdrop-filter: blur(12px);
  width: fit-content;
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 0 28px;
}

.stat:first-child { padding-left: 0; }
.stat:last-child { padding-right: 0; }

.stat-num {
  font-family: 'Syne', sans-serif;
  font-size: 26px;
  color: #F59E0B;
  letter-spacing: -0.5px;
  line-height: 1;
}

.stat-label {
  font-size: 11px;
  color: rgba(255,255,255,0.45);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  white-space: nowrap;
}

.stat-divider {
  width: 1px;
  height: 36px;
  background: rgba(255,255,255,0.1);
}

.car-silhouette {
  position: relative;
  z-index: 2;
  opacity: 0.8;
}

.car-silhouette svg {
  width: 100%;
  max-width: 460px;
}

/* ─── RIGHT PANEL ────────────────────────────────────── */
.panel-right {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px 40px;
  background: #f1f5f9;
}

.login-card {
  width: 100%;
  max-width: 400px;
  background: #ffffff;
  border-radius: 24px;
  padding: 44px 40px 36px;
  box-shadow:
    0 1px 3px rgba(0,0,0,0.04),
    0 8px 24px rgba(0,0,0,0.06),
    0 32px 64px rgba(0,0,0,0.08);
  border: 1px solid rgba(0,0,0,0.04);
}

.card-header {
  margin-bottom: 36px;
}

.card-title {
  font-family: 'Syne', sans-serif;
  font-size: 28px;
  color: #0d1f3c;
  letter-spacing: -0.2px;
  line-height: 1.1;
  margin-bottom: 8px;
}

.card-subtitle {
  font-size: 14px;
  color: #94a3b8;
}

/* ─── FORM FIELDS ───────────────────────────────────── */
.form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.field-group {
  display: flex;
  flex-direction: column;
  gap: 7px;
}

.field-label {
  font-size: 12.5px;
  color: #64748b;
  letter-spacing: 0.3px;
  transition: color 0.2s;
}

.field-group.focused .field-label {
  color: #001B35;
}

.field-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.field-icon {
  position: absolute;
  left: 14px;
  color: #94a3b8;
  display: flex;
  align-items: center;
  transition: color 0.2s;
  pointer-events: none;
}

.field-group.focused .field-icon {
  color: #001B35;
}

.field-input {
  width: 100%;
  height: 48px;
  background: #f8fafc;
  border: 1.5px solid #e2e8f0;
  border-radius: 12px;
  padding: 0 44px 0 44px;
  font-family: 'DM Sans', sans-serif;
  font-size: 14.5px;
  color: #0f172a;
  outline: none;
  transition: all 0.2s ease;
}

.field-input::placeholder {
  color: #c1ccd8;
}

.field-input:focus {
  background: #fff;
  border-color: #001B35;
  box-shadow: 0 0 0 3.5px rgba(29,78,216,0.1);
}

.toggle-password {
  position: absolute;
  right: 14px;
  background: none;
  border: none;
  cursor: pointer;
  color: #94a3b8;
  display: flex;
  align-items: center;
  padding: 4px;
  border-radius: 6px;
  transition: color 0.2s;
}

.toggle-password:hover { color: #475569; }

.form-meta {
  display: flex;
  justify-content: flex-end;
  margin-top: -6px;
}

.forgot-link {
  font-size: 13px;
  color: #001B35;
  text-decoration: none;
  transition: color 0.2s;
}


/* ─── BUTTON ─────────────────────────────────────────── */
.btn-login {
  width: 100%;
  height: 50px;
  background: linear-gradient(
  145deg,
  #001B35 0%,
  #00264d 40%,
  #001f3f 100%
);
  color: #fff;
  border: none;
  border-radius: 12px;
  font-family: 'Syne', sans-serif;
  font-size: 15px;
  letter-spacing: 0.2px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  margin-top: 4px;
  transition: all 0.25s ease;
  box-shadow: 0 4px 14px rgba(29,78,216,0.35);
  position: relative;
  overflow: hidden;
}

.btn-login::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 60%);
  pointer-events: none;
}

.btn-login:hover:not(.loading) {
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(29,78,216,0.45);
  background: linear-gradient(
  145deg,
  #001B35 0%,
  #00264d 40%,
  #001f3f 100%
);
}

.btn-login:active:not(.loading) {
  transform: translateY(0);
  box-shadow: 0 2px 8px rgba(29,78,216,0.3);
}

.btn-login.loading {
  background: linear-gradient(
  145deg,
  #001B35 0%,
  #00264d 40%,
  #001f3f 100%
);
  cursor: not-allowed;
  opacity: 0.85;
}

.btn-text, .btn-spinner {
  display: flex;
  align-items: center;
  gap: 9px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.spin {
  animation: spin 0.8s linear infinite;
}

/* ─── FOOTER ─────────────────────────────────────────── */
.card-footer {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  margin-top: 28px;
  padding-top: 24px;
  border-top: 1px solid #f1f5f9;
}

.footer-text {
  font-size: 13.5px;
  color: #94a3b8;
}

.create-link {
  font-size: 13.5px;
  color: #001B35;
  text-decoration: none;
  transition: color 0.2s;
}


.security-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  margin-top: 16px;
  font-size: 11.5px;
  color: #b0bec5;
}

/* ─── RESPONSIVE ─────────────────────────────────────── */

/* Tablet landscape / small desktop */
@media (max-width: 1024px) {
  .panel-left { padding: 36px 36px 30px; }
  .panel-right { padding: 36px 28px; }
}

/* Tablet portrait */
@media (max-width: 768px) {
  .app { flex-direction: column; }

  .panel-left {
    min-height: auto;
    padding: 28px 24px 24px;
    flex: none;
  }

  .hero-content { padding: 16px 0; }
  .hero-title { font-size: clamp(22px, 5vw, 30px); }
  .hero-desc { display: none; }

  .stats {
    padding: 14px 18px;
    width: 100%;
    justify-content: space-around;
  }
  .stat { padding: 0 12px; }
  .stat-num { font-size: 20px; }
  .stat-label { font-size: 10px; }
  .car-silhouette { display: none; }

  .panel-right {
    flex: none;
    padding: 28px 20px 36px;
    background: #f1f5f9;
  }

  .login-card {
    padding: 32px 26px 26px;
    max-width: 100%;
  }
}

/* Mobile */
@media (max-width: 480px) {
  .panel-left { padding: 22px 18px 18px; }

  .brand-name { font-size: 18px; }
  .hero-title { font-size: 20px; letter-spacing: -.8px; }

  .stats {
    padding: 12px 14px;
    border-radius: 12px;
  }
  .stat { padding: 0 8px; }
  .stat-num { font-size: 17px; }
  .stat-label { font-size: 9.5px; letter-spacing: 0; }

  .panel-right { padding: 22px 14px 32px; }

  .login-card {
    padding: 26px 18px 22px;
    border-radius: 18px;
  }

  .card-title { font-size: 22px; }
  .card-subtitle { font-size: 13px; }
  .field-input { height: 44px; font-size: 14px; }
  .btn-login { height: 46px; font-size: 14px; }
}

/* Very small screens */
@media (max-width: 360px) {
  .stats { flex-wrap: wrap; gap: 8px; padding: 12px; }
  .stat-divider { display: none; }
  .stat { padding: 0 10px; flex: 1; min-width: 60px; }
  .login-card { padding: 22px 14px 18px; }
}
</style>