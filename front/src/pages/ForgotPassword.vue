<template>
  <div class="app">
    <div class="panel-left">
      <div class="overlay"></div>
      <div class="brand">
        <div class="logo">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <circle cx="24" cy="24" r="22" stroke="#F59E0B" stroke-width="2.5"/>
            <path d="M24 8L27.5 18H38L29.5 24.5L32.5 35L24 28.5L15.5 35L18.5 24.5L10 18H20.5L24 8Z" fill="#F59E0B"/>
          </svg>
        </div>
        <div class="brand-text">
          <span class="brand-name">AutoMech</span>
          <span class="brand-sub">Workshop Pro</span>
        </div>
      </div>
      <div class="hero-content">
        <h2 class="hero-title">Recupere<br/>seu acesso.</h2>
        <p class="hero-desc">Siga os passos para redefinir sua senha com segurança.</p>
      </div>
    </div>

    <div class="panel-right">
      <div class="login-card">

        <!-- Progress -->
        <div class="progress">
          <div class="prog-step" :class="{ done: step >= 1 }"></div>
          <div class="prog-step" :class="{ done: step >= 2 }"></div>
          <div class="prog-step" :class="{ done: step >= 3 }"></div>
          <span class="prog-label">{{ progressLabel }}</span>
        </div>

        <!-- STEP 1: Email -->
        <div v-if="step === 1">
          <div class="icon-wrap">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1a1f5e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
          </div>
          <h1 class="card-title">Esqueceu a senha?</h1>
          <p class="card-subtitle">Digite seu e-mail e enviaremos um código de verificação.</p>

          <div class="field-group">
            <label class="field-label">E-mail</label>
            <div class="field-wrapper">
              <span class="field-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              </span>
              <input type="email" v-model="email" class="field-input" placeholder="seu@email.com"/>
            </div>
          </div>

          <button class="btn-primary" :class="{ loading: isLoading }" @click="sendEmail">
            <span v-if="!isLoading">Enviar código</span>
            <span v-else class="btn-spinner">
              <svg class="spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
              Enviando...
            </span>
          </button>

          <div class="back-link" @click="$router.push('/login')">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="15 18 9 12 15 6"/></svg>
            Voltar ao login
          </div>
        </div>

        <!-- STEP 2: Código -->
        <div v-if="step === 2">
          <div class="icon-wrap">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1a1f5e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
          </div>
          <h1 class="card-title">Verifique seu e-mail</h1>
          <p class="card-subtitle">Enviamos um código de 4 dígitos para <strong>{{ email }}</strong>.</p>

          <div class="code-inputs">
            <input
              v-for="(_, i) in code"
              :key="i"
              :ref="'code' + i"
              class="code-input"
              maxlength="1"
              v-model="code[i]"
              @input="nextCode(i)"
              @keydown.backspace="prevCode(i)"
            />
          </div>

          <button class="btn-primary" @click="verifyCode">Verificar código</button>

          <p class="resend-text">
            Não recebeu?
            <span class="resend-link" @click="sendEmail">Reenviar código</span>
          </p>

          <div class="back-link" @click="step = 1">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="15 18 9 12 15 6"/></svg>
            Voltar
          </div>
        </div>

        <!-- STEP 3: Nova senha -->
        <div v-if="step === 3">
          <div class="icon-wrap">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1a1f5e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
          </div>
          <h1 class="card-title">Nova senha</h1>
          <p class="card-subtitle">Crie uma senha forte para proteger sua conta.</p>

          <div class="field-group">
            <label class="field-label">Nova senha</label>
            <div class="field-wrapper">
              <span class="field-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg></span>
              <input :type="showPass ? 'text' : 'password'" v-model="newPassword" class="field-input" placeholder="••••••••"/>
              <button type="button" class="toggle-password" @click="showPass = !showPass">
                <svg v-if="!showPass" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
              </button>
            </div>
          </div>

          <div class="field-group">
            <label class="field-label">Confirmar senha</label>
            <div class="field-wrapper">
              <span class="field-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg></span>
              <input :type="showPass ? 'text' : 'password'" v-model="confirmPassword" class="field-input" placeholder="••••••••"/>
            </div>
          </div>

          <button class="btn-primary" :class="{ loading: isLoading }" @click="resetPassword">
            <span v-if="!isLoading">Redefinir senha</span>
            <span v-else class="btn-spinner">
              <svg class="spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
              Salvando...
            </span>
          </button>

          <div class="back-link" @click="step = 2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="15 18 9 12 15 6"/></svg>
            Voltar
          </div>
        </div>

        <!-- STEP 4: Sucesso -->
        <div v-if="step === 4" class="success-wrap">
          <div class="success-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2e7d32" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </div>
          <h1 class="card-title" style="text-align:center">Senha redefinida!</h1>
          <p class="card-subtitle" style="text-align:center">Sua senha foi alterada com sucesso.</p>
          <button class="btn-primary" @click="$router.push('/login')">Ir para o login</button>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ForgotPassword',
  data() {
    return {
      step: 1,
      email: '',
      code: ['', '', '', ''],
      newPassword: '',
      confirmPassword: '',
      showPass: false,
      isLoading: false
    }
  },
  computed: {
    progressLabel() {
      if (this.step === 4) return 'Concluído'
      return `Passo ${this.step} de 3`
    }
  },
  methods: {
    async sendEmail() {
      if (!this.email) return alert('Digite seu e-mail')
      this.isLoading = true
      try {
        const res = await fetch('http://localhost:3000/forgot-password', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: this.email })
        })
        const data = await res.json()
        if (!data.success) throw new Error()
        this.step = 2
      } catch {
        alert('Erro ao enviar e-mail. Tente novamente.')
      } finally {
        this.isLoading = false
      }
    },

    async verifyCode() {
      const codeStr = this.code.join('')
      if (codeStr.length < 4) return alert('Digite o código completo')
      try {
        const res = await fetch('http://localhost:3000/verify-code', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: this.email, code: codeStr })
        })
        const data = await res.json()
        if (!data.success) throw new Error()
        this.step = 3
      } catch {
        alert('Código inválido ou expirado.')
      }
    },

    async resetPassword() {
      if (!this.newPassword) return alert('Digite a nova senha')
      if (this.newPassword !== this.confirmPassword) return alert('As senhas não coincidem')
      this.isLoading = true
      try {
        const res = await fetch('http://localhost:3000/reset-password', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: this.email, password: this.newPassword })
        })
        const data = await res.json()
        if (!data.success) throw new Error()
        this.step = 4
      } catch {
        alert('Erro ao redefinir senha. Tente novamente.')
      } finally {
        this.isLoading = false
      }
    },

    nextCode(index) {
      if (this.code[index] && index < 3) {
        this.$nextTick(() => {
          this.$refs['code' + (index + 1)][0].focus()
        })
      }
    },

    prevCode(index) {
      if (!this.code[index] && index > 0) {
        this.$nextTick(() => {
          this.$refs['code' + (index - 1)][0].focus()
        })
      }
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap');

* { box-sizing: border-box; margin: 0; padding: 0; }

.app {
  display: flex;
  min-height: 100vh;
  font-family: 'DM Sans', sans-serif;
  background: #f8fafc;
}

/* ── LEFT PANEL ── */
.panel-left {
  position: relative;
  flex: 1;
  background: linear-gradient(145deg, #001B35 0%, #00264d 40%, #001f3f 100%);
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
  background: radial-gradient(ellipse 60% 50% at 80% 20%, rgba(245,158,11,0.08) 0%, transparent 70%);
  pointer-events: none;
}

.overlay { display: none; }

.brand { display: flex; align-items: center; gap: 14px; position: relative; z-index: 2; }

.logo {
  width: 52px; height: 52px;
  background: rgba(245,158,11,0.12);
  border: 1.5px solid rgba(245,158,11,0.35);
  border-radius: 14px;
  display: flex; align-items: center; justify-content: center;
}

.brand-text { display: flex; flex-direction: column; }
.brand-name { font-family: 'Syne', sans-serif; font-size: 22px; color: #fff; }
.brand-sub { font-size: 11px; color: rgba(245,158,11,0.75); letter-spacing: 2px; text-transform: uppercase; margin-top: 3px; }

.hero-content { flex: 1; display: flex; flex-direction: column; justify-content: center; position: relative; z-index: 2; }

.hero-title { font-family: 'Syne', sans-serif; font-size: clamp(32px, 3.5vw, 48px); color: #fff; line-height: 1.3; margin-bottom: 18px; }
.hero-desc { font-size: 15px; color: rgba(255,255,255,0.55); line-height: 1.65; max-width: 340px; }

/* ── RIGHT PANEL ── */
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
  background: #fff;
  border-radius: 24px;
  padding: 40px 36px 32px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.06), 0 32px 64px rgba(0,0,0,0.08);
  border: 1px solid rgba(0,0,0,0.04);
}

/* ── PROGRESS ── */
.progress {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 28px;
}

.prog-step {
  flex: 1; height: 3px;
  border-radius: 2px;
  background: #e2e8f0;
  transition: background 0.3s;
}

.prog-step.done { background: #1a1f5e; }
.prog-label { font-size: 11px; color: #94a3b8; white-space: nowrap; }

/* ── ICON ── */
.icon-wrap {
  width: 50px; height: 50px;
  border-radius: 14px;
  background: #e8eeff;
  display: flex; align-items: center; justify-content: center;
  margin-bottom: 18px;
}

.card-title { font-family: 'Syne', sans-serif; font-size: 24px; color: #0d1f3c; margin-bottom: 6px; }
.card-subtitle { font-size: 13.5px; color: #94a3b8; line-height: 1.55; margin-bottom: 24px; }
.card-subtitle strong { color: #1a1f5e; }

/* ── FIELDS ── */
.field-group { display: flex; flex-direction: column; gap: 6px; margin-bottom: 16px; }
.field-label { font-size: 12px; color: #64748b; letter-spacing: 0.3px; }

.field-wrapper { position: relative; display: flex; align-items: center; }

.field-icon {
  position: absolute; left: 13px;
  color: #94a3b8; display: flex; align-items: center;
  pointer-events: none;
}

.field-input {
  width: 100%; height: 46px;
  background: #f8fafc;
  border: 1.5px solid #e2e8f0;
  border-radius: 11px;
  padding: 0 44px 0 42px;
  font-family: 'DM Sans', sans-serif;
  font-size: 14px; color: #0f172a;
  outline: none;
  transition: all 0.2s;
}

.field-input::placeholder { color: #c1ccd8; }
.field-input:focus { background: #fff; border-color: #1a1f5e; box-shadow: 0 0 0 3px rgba(26,31,94,0.08); }

.toggle-password {
  position: absolute; right: 13px;
  background: none; border: none; cursor: pointer;
  color: #94a3b8; display: flex; padding: 4px;
}

/* ── CODE INPUTS ── */
.code-inputs { display: flex; gap: 10px; margin-bottom: 20px; }

.code-input {
  flex: 1; height: 54px;
  background: #f8fafc;
  border: 1.5px solid #e2e8f0;
  border-radius: 11px;
  text-align: center;
  font-family: 'Syne', sans-serif;
  font-size: 22px; color: #0d1f3c;
  outline: none;
  transition: all 0.2s;
}

.code-input:focus { background: #fff; border-color: #1a1f5e; box-shadow: 0 0 0 3px rgba(26,31,94,0.08); }

/* ── BUTTON ── */
.btn-primary {
  width: 100%; height: 48px;
  background: linear-gradient(145deg, #001B35 0%, #00264d 40%, #001f3f 100%);
  color: #fff; border: none; border-radius: 11px;
  font-family: 'Syne', sans-serif; font-size: 15px;
  cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px;
  margin-top: 4px; transition: all 0.25s;
  box-shadow: 0 4px 14px rgba(29,78,216,0.3);
}

.btn-primary:hover:not(.loading) { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(29,78,216,0.4); }
.btn-primary.loading { opacity: 0.85; cursor: not-allowed; }

.btn-spinner { display: flex; align-items: center; gap: 8px; }

@keyframes spin { to { transform: rotate(360deg); } }
.spin { animation: spin 0.8s linear infinite; }

/* ── MISC ── */
.back-link {
  display: flex; align-items: center; justify-content: center; gap: 6px;
  margin-top: 18px; font-size: 13px; color: #94a3b8;
  cursor: pointer; transition: color 0.2s;
}
.back-link:hover { color: #1a1f5e; }

.resend-text { text-align: center; margin-top: 14px; font-size: 13px; color: #94a3b8; }
.resend-link { color: #1a1f5e; cursor: pointer; font-weight: 500; }

.success-wrap { text-align: center; }
.success-icon {
  width: 64px; height: 64px; border-radius: 50%;
  background: #e8f5e9;
  display: flex; align-items: center; justify-content: center;
  margin: 0 auto 20px;
}

/* ── RESPONSIVE ── */
@media (max-width: 768px) {
  .app { flex-direction: column; }
  .panel-left { min-height: auto; padding: 24px; flex: none; }
  .hero-desc { display: none; }
  .panel-right { padding: 24px 16px 36px; }
  .login-card { padding: 28px 22px 24px; }
}
</style>