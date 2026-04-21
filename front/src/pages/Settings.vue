<template>
  <div class="page">

    <div class="page-header">
      <div>
        <h1 class="page-title">{{ $t('settings.title') }}</h1>
        <p class="page-sub">{{ $t('settings.subtitle') }}</p>
      </div>
    </div>

    <!-- Switch de abas -->
    <div class="tab-switch">
      <button class="tab-btn" :class="{ active: activeTab === 'oficina' }" @click="activeTab = 'oficina'">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
        {{ $t('settings.tabWorkshop') }}
      </button>
      <button class="tab-btn" :class="{ active: activeTab === 'usuario' }" @click="activeTab = 'usuario'">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
        {{ $t('settings.tabAccount') }}
      </button>
    </div>

    <!-- ── ABA OFICINA ── -->
    <div v-if="activeTab === 'oficina'">
      <div v-if="isLoading" class="state-wrap">
        <div class="spinner"></div>
        <p>{{ $t('settings.loading') }}</p>
      </div>

      <div v-else-if="!oficina" class="state-wrap">
        <div class="state-icon">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        </div>
        <p class="state-title">{{ $t('settings.noWorkshop') }}</p>
        <p class="state-sub">{{ $t('settings.noWorkshopSub') }}</p>
      </div>

      <div v-else class="content">
        <div class="form-section">
          <div class="section-header">
            <div class="section-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            </div>
            <div>
              <span class="section-title">{{ $t('settings.workshopInfo') }}</span>
              <span class="section-sub">{{ $t('settings.workshopInfoSub') }}</span>
            </div>
            <button v-if="!isEditingOficina" class="btn-edit" @click="isEditingOficina = true">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              {{ $t('settings.edit') }}
            </button>
          </div>

          <div class="fields-grid">
            <div class="field-group">
              <label class="field-label">{{ $t('settings.workshopName') }}</label>
              <div class="field-wrapper">
                <span class="field-icon"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg></span>
                <input v-model="formOficina.nome" class="field-input" :class="{ readonly: !isEditingOficina }" :readonly="!isEditingOficina" :placeholder="$t('settings.workshopNamePlaceholder')"/>
              </div>
            </div>

            <div class="field-group">
              <label class="field-label">{{ $t('settings.cnpj') }}</label>
              <div class="field-wrapper">
                <span class="field-icon"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg></span>
                <input v-model="formOficina.cnpj" class="field-input" :class="{ readonly: !isEditingOficina }" :readonly="!isEditingOficina" :placeholder="$t('settings.cnpjPlaceholder')" @input="maskCnpj" maxlength="18"/>
              </div>
            </div>

            <div class="field-group">
              <label class="field-label">{{ $t('settings.phone') }}</label>
              <div class="field-wrapper">
                <span class="field-icon"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.62 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 5.45 5.45l.96-.87a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16.92z"/></svg></span>
                <input v-model="formOficina.telefone" class="field-input" :class="{ readonly: !isEditingOficina }" :readonly="!isEditingOficina" :placeholder="$t('settings.phonePlaceholder')" @input="maskPhone" maxlength="15"/>
              </div>
            </div>

            <div class="field-group full">
              <label class="field-label">{{ $t('settings.address') }}</label>
              <div class="field-wrapper">
                <span class="field-icon"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg></span>
                <input v-model="formOficina.endereco" class="field-input" :class="{ readonly: !isEditingOficina }" :readonly="!isEditingOficina" :placeholder="$t('settings.addressPlaceholder')"/>
              </div>
            </div>
          </div>

          <div v-if="isEditingOficina" class="edit-actions">
            <button class="btn-cancel" @click="cancelEditOficina">{{ $t('settings.cancel') }}</button>
            <button class="btn-save" :class="{ loading: isSavingOficina }" @click="saveOficina">
              <span v-if="!isSavingOficina">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                {{ $t('settings.save') }}
              </span>
              <span v-else class="btn-spinner">
                <svg class="spin" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
                {{ $t('settings.saving') }}
              </span>
            </button>
          </div>
        </div>

        <div class="info-row">
          <div class="info-item">
            <span class="info-label">{{ $t('settings.workshopId') }}</span>
            <span class="info-value mono">{{ oficina._id }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">{{ $t('settings.registeredAt') }}</span>
            <span class="info-value">{{ formatDate(oficina.createdAt) }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- ── ABA USUÁRIO ── -->
    <div v-if="activeTab === 'usuario'" class="content">

      <!-- Conta -->
      <div class="form-section">
        <div class="section-header">
          <div class="section-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          </div>
          <div>
            <span class="section-title">{{ $t('settings.accountInfo') }}</span>
            <span class="section-sub">{{ $t('settings.accountInfoSub') }}</span>
          </div>
          <button v-if="!isEditingUser" class="btn-edit" @click="isEditingUser = true">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
            {{ $t('settings.edit') }}
          </button>
        </div>

        <div class="fields-grid">
          <div class="field-group full">
            <label class="field-label">{{ $t('settings.email') }}</label>
            <div class="field-wrapper">
              <span class="field-icon"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg></span>
              <input v-model="formUser.email" class="field-input" :class="{ readonly: !isEditingUser }" :readonly="!isEditingUser" :placeholder="$t('settings.emailPlaceholder')" type="email"/>
            </div>
          </div>

          <div class="field-group full">
            <label class="field-label">{{ $t('settings.accessType') }}</label>
            <div class="field-wrapper">
              <span class="field-icon"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></span>
              <input :value="formUser.type" class="field-input readonly" readonly/>
              <span class="type-badge">{{ formUser.type }}</span>
            </div>
          </div>

          <template v-if="isEditingUser">
            <div class="field-group">
              <label class="field-label">{{ $t('settings.newPassword') }} <span class="optional">{{ $t('settings.newPasswordOptional') }}</span></label>
              <div class="field-wrapper">
                <span class="field-icon"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg></span>
                <input v-model="formUser.newPassword" class="field-input" :type="showPass ? 'text' : 'password'" placeholder="••••••••"/>
                <button type="button" class="toggle-pass" @click="showPass = !showPass">
                  <svg v-if="!showPass" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  <svg v-else width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                </button>
              </div>
            </div>

            <div class="field-group">
              <label class="field-label">{{ $t('settings.confirmPassword') }}</label>
              <div class="field-wrapper">
                <span class="field-icon"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg></span>
                <input v-model="formUser.confirmPassword" class="field-input" :type="showPass ? 'text' : 'password'" placeholder="••••••••"/>
              </div>
            </div>
          </template>
        </div>

        <div v-if="isEditingUser" class="edit-actions">
          <button class="btn-cancel" @click="cancelEditUser">{{ $t('settings.cancel') }}</button>
          <button class="btn-save" :class="{ loading: isSavingUser }" @click="saveUser">
            <span v-if="!isSavingUser">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>
              {{ $t('settings.save') }}
            </span>
            <span v-else class="btn-spinner">
              <svg class="spin" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
              {{ $t('settings.saving') }}
            </span>
          </button>
        </div>
      </div>

      <!-- Idioma -->
      <div class="form-section">
        <div class="section-header">
          <div class="section-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
          </div>
          <div>
            <span class="section-title">{{ $t('settings.language') }}</span>
            <span class="section-sub">{{ $t('settings.languageSub') }}</span>
          </div>
        </div>

        <div class="lang-grid">
          <button
            v-for="lang in languages"
            :key="lang.code"
            class="lang-btn"
            :class="{ active: currentLocale === lang.code }"
            @click="changeLanguage(lang.code)"
          >
            <span class="lang-flag">{{ lang.flag }}</span>
            <span class="lang-label">{{ $t(lang.labelKey) }}</span>
            <span v-if="currentLocale === lang.code" class="lang-check">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>
            </span>
          </button>
        </div>
      </div>

      <div class="info-row">
        <div class="info-item">
          <span class="info-label">{{ $t('settings.userId') }}</span>
          <span class="info-value mono">{{ user?.id }}</span>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Settings',
  data() {
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    return {
      activeTab: 'oficina',
      isLoading: true,
      oficina: null,
      isEditingOficina: false,
      isSavingOficina: false,
      isEditingUser: false,
      isSavingUser: false,
      showPass: false,
      user,
      currentLocale: localStorage.getItem('locale') || navigator.language.slice(0, 2) || 'pt',
      languages: [
        { code: 'browser', flag: '🌐', labelKey: 'settings.langBrowser' },
        { code: 'pt',      flag: '🇧🇷', labelKey: 'settings.langPt' },
        { code: 'en',      flag: '🇺🇸', labelKey: 'settings.langEn' },
        { code: 'es',      flag: '🇪🇸', labelKey: 'settings.langEs' },
      ],
      formOficina: { nome: '', cnpj: '', telefone: '', endereco: '' },
      formUser: {
        email: user.email || '',
        type: user.type || '',
        newPassword: '',
        confirmPassword: ''
      }
    }
  },
  async mounted() {
    await this.fetchOficina()
  },
  methods: {
    changeLanguage(code) {
      if (code === 'browser') {
        const browser = navigator.language.slice(0, 2)
        const supported = ['pt', 'en', 'es']
        const locale = supported.includes(browser) ? browser : 'pt'
        this.$i18n.locale = locale
        localStorage.setItem('locale', 'browser')
      } else {
        this.$i18n.locale = code
        localStorage.setItem('locale', code)
      }
      this.currentLocale = code
    },

    async fetchOficina() {
      this.isLoading = true
      try {
        const userId = this.user?.id
        if (!userId) return
        const res = await fetch(`http://localhost:3000/oficina/${userId}`)
        const data = await res.json()
        if (!data.success) return
        this.oficina = data.oficina
        this.fillFormOficina(data.oficina)
      } catch (err) {
        console.error(err)
      } finally {
        this.isLoading = false
      }
    },

    fillFormOficina(o) {
      this.formOficina = { nome: o.nome || '', cnpj: o.cnpj || '', telefone: o.telefone || '', endereco: o.endereco || '' }
    },

    cancelEditOficina() {
      this.fillFormOficina(this.oficina)
      this.isEditingOficina = false
    },

    async saveOficina() {
      this.isSavingOficina = true
      try {
        const res = await fetch(`http://localhost:3000/oficina/${this.oficina._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.formOficina)
        })
        const data = await res.json()
        if (!data.success) throw new Error()
        this.oficina = { ...this.oficina, ...this.formOficina }
        this.isEditingOficina = false
      } catch {
        alert(this.$t('settings.errorSave'))
      } finally {
        this.isSavingOficina = false
      }
    },

    cancelEditUser() {
      this.formUser.email = this.user.email || ''
      this.formUser.newPassword = ''
      this.formUser.confirmPassword = ''
      this.isEditingUser = false
    },

    async saveUser() {
      if (this.formUser.newPassword && this.formUser.newPassword !== this.formUser.confirmPassword) {
        return alert(this.$t('settings.passwordMismatch'))
      }
      this.isSavingUser = true
      try {
        const body = { email: this.formUser.email }
        if (this.formUser.newPassword) body.password = this.formUser.newPassword

        const res = await fetch(`http://localhost:3000/users/${this.user.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body)
        })
        const data = await res.json()
        if (!data.success) throw new Error()

        const updated = { ...this.user, email: this.formUser.email }
        localStorage.setItem('user', JSON.stringify(updated))
        this.user = updated
        this.formUser.newPassword = ''
        this.formUser.confirmPassword = ''
        this.isEditingUser = false
      } catch {
        alert(this.$t('settings.errorSave'))
      } finally {
        this.isSavingUser = false
      }
    },

    maskPhone(e) {
      let v = e.target.value.replace(/\D/g, '')
      v = v.replace(/^(\d{2})(\d)/g, '($1) $2')
      v = v.replace(/(\d)(\d{4})$/, '$1-$2')
      this.formOficina.telefone = v
    },

    maskCnpj(e) {
      let v = e.target.value.replace(/\D/g, '')
      v = v.replace(/^(\d{2})(\d)/, '$1.$2')
      v = v.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
      v = v.replace(/\.(\d{3})(\d)/, '.$1/$2')
      v = v.replace(/(\d{4})(\d)/, '$1-$2')
      this.formOficina.cnpj = v
    },

    formatDate(date) {
      if (!date) return '—'
      return new Date(date).toLocaleDateString(this.$i18n.locale === 'en' ? 'en-US' : this.$i18n.locale === 'es' ? 'es-ES' : 'pt-BR', {
        day: '2-digit', month: 'long', year: 'numeric'
      })
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap');

* { box-sizing: border-box; margin: 0; padding: 0; }

.page {
  min-height: 100vh;
  background: #f1f5f9;
  font-family: 'DM Sans', sans-serif;
  padding: 32px 24px 48px;
}

.page-header { margin-bottom: 20px; }
.page-title { font-family: 'Syne', sans-serif; font-size: 22px; color: #0d1f3c; }
.page-sub { font-size: 13px; color: #94a3b8; margin-top: 4px; }

/* ── TABS ── */
.tab-switch {
  display: flex; gap: 4px;
  background: #fff;
  border: 1px solid rgba(0,0,0,0.06);
  border-radius: 14px; padding: 5px;
  width: fit-content; margin-bottom: 24px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.04);
}

.tab-btn {
  display: flex; align-items: center; gap: 8px;
  height: 38px; padding: 0 20px;
  border-radius: 10px; border: none;
  background: transparent;
  font-family: 'DM Sans', sans-serif;
  font-size: 13px; color: #94a3b8;
  cursor: pointer; transition: all 0.2s;
}
.tab-btn:hover { color: #475569; background: #f8fafc; }
.tab-btn.active {
  background: linear-gradient(145deg, #001B35 0%, #00264d 40%, #001f3f 100%);
  color: #fff;
  box-shadow: 0 2px 8px rgba(29,78,216,0.25);
}

/* ── STATES ── */
.state-wrap { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px; padding: 80px 20px; color: #94a3b8; }
.state-icon { width: 56px; height: 56px; background: #e8eeff; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #1a1f5e; }
.state-title { font-family: 'Syne', sans-serif; font-size: 16px; color: #0d1f3c; }
.state-sub { font-size: 13px; color: #94a3b8; }
.spinner { width: 32px; height: 32px; border: 3px solid #e2e8f0; border-top-color: #1a1f5e; border-radius: 50%; animation: spin 0.7s linear infinite; }

/* ── CONTENT ── */
.content { max-width: 760px; margin: 0 auto; display: flex; flex-direction: column; gap: 16px; }

.form-section {
  background: #fff; border-radius: 18px;
  border: 1px solid rgba(0,0,0,0.05); padding: 24px 28px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.04);
}

.section-header { display: flex; align-items: center; gap: 12px; margin-bottom: 24px; padding-bottom: 16px; border-bottom: 1px solid #f1f5f9; }
.section-icon { width: 34px; height: 34px; background: #e8eeff; border-radius: 9px; display: flex; align-items: center; justify-content: center; color: #1a1f5e; flex-shrink: 0; }
.section-title { display: block; font-family: 'Syne', sans-serif; font-size: 14px; color: #0d1f3c; }
.section-sub { display: block; font-size: 12px; color: #94a3b8; margin-top: 2px; }

.btn-edit { margin-left: auto; display: flex; align-items: center; gap: 7px; height: 36px; padding: 0 16px; background: #f8fafc; border: 1.5px solid #e2e8f0; border-radius: 9px; font-family: 'DM Sans', sans-serif; font-size: 13px; color: #475569; cursor: pointer; transition: all 0.2s; }
.btn-edit:hover { border-color: #1a1f5e; color: #1a1f5e; background: #f0f4ff; }

.fields-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.field-group { display: flex; flex-direction: column; gap: 6px; }
.field-group.full { grid-column: 1 / -1; }
.field-label { font-size: 12px; color: #64748b; letter-spacing: 0.3px; }
.optional { color: #c1ccd8; font-size: 11px; }
.field-wrapper { position: relative; display: flex; align-items: center; }
.field-icon { position: absolute; left: 13px; color: #94a3b8; display: flex; align-items: center; pointer-events: none; }

.field-input {
  width: 100%; height: 46px; background: #f8fafc;
  border: 1.5px solid #e2e8f0; border-radius: 11px;
  padding: 0 44px 0 40px;
  font-family: 'DM Sans', sans-serif; font-size: 14px; color: #0f172a;
  outline: none; transition: all 0.2s;
}
.field-input::placeholder { color: #c1ccd8; }
.field-input:not(.readonly):focus { background: #fff; border-color: #1a1f5e; box-shadow: 0 0 0 3px rgba(26,31,94,0.08); }
.field-input.readonly { background: #f8fafc; color: #475569; cursor: default; }

.toggle-pass { position: absolute; right: 13px; background: none; border: none; cursor: pointer; color: #94a3b8; display: flex; padding: 4px; }
.type-badge { position: absolute; right: 13px; font-size: 11px; padding: 3px 10px; border-radius: 20px; font-weight: 500; background: #e8eeff; color: #1a1f5e; }

/* ── LANGUAGE ── */
.lang-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 10px;
}

.lang-btn {
  display: flex; align-items: center; gap: 10px;
  padding: 12px 16px;
  background: #f8fafc;
  border: 1.5px solid #e2e8f0;
  border-radius: 12px;
  cursor: pointer; transition: all 0.2s;
  font-family: 'DM Sans', sans-serif;
  font-size: 13px; color: #475569;
  position: relative;
}
.lang-btn:hover { border-color: #1a1f5e; background: #f0f4ff; color: #1a1f5e; }
.lang-btn.active { border-color: #1a1f5e; background: #e8eeff; color: #1a1f5e; font-weight: 500; }

.lang-flag { font-size: 20px; line-height: 1; }
.lang-label { flex: 1; text-align: left; }
.lang-check { color: #1a1f5e; display: flex; align-items: center; }

/* ── EDIT ACTIONS ── */
.edit-actions { display: flex; justify-content: flex-end; gap: 10px; margin-top: 20px; padding-top: 16px; border-top: 1px solid #f1f5f9; }

.btn-cancel { height: 42px; padding: 0 20px; background: #fff; border: 1.5px solid #e2e8f0; border-radius: 10px; font-family: 'DM Sans', sans-serif; font-size: 13px; color: #64748b; cursor: pointer; transition: all 0.2s; }
.btn-cancel:hover { border-color: #94a3b8; color: #334155; }

.btn-save { height: 42px; padding: 0 24px; background: linear-gradient(145deg, #001B35 0%, #00264d 40%, #001f3f 100%); color: #fff; border: none; border-radius: 10px; font-family: 'Syne', sans-serif; font-size: 13px; cursor: pointer; display: flex; align-items: center; gap: 8px; transition: all 0.25s; box-shadow: 0 4px 14px rgba(29,78,216,0.25); }
.btn-save:hover:not(.loading) { transform: translateY(-1px); box-shadow: 0 6px 18px rgba(29,78,216,0.35); }
.btn-save.loading { opacity: 0.8; cursor: not-allowed; }
.btn-spinner { display: flex; align-items: center; gap: 8px; }

/* ── INFO ROW ── */
.info-row { display: flex; gap: 12px; flex-wrap: wrap; }
.info-item { flex: 1; min-width: 200px; background: #fff; border-radius: 12px; border: 1px solid rgba(0,0,0,0.05); padding: 14px 18px; display: flex; flex-direction: column; gap: 4px; }
.info-label { font-size: 11px; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.5px; }
.info-value { font-size: 13px; color: #334155; }
.info-value.mono { font-family: monospace; font-size: 12px; color: #64748b; word-break: break-all; }

@keyframes spin { to { transform: rotate(360deg); } }
.spin { animation: spin 0.8s linear infinite; }

@media (max-width: 600px) {
  .page { padding: 20px 16px 40px; }
  .fields-grid { grid-template-columns: 1fr; }
  .form-section { padding: 18px; }
  .edit-actions { flex-direction: column; }
  .btn-cancel, .btn-save { width: 100%; justify-content: center; }
  .tab-switch { width: 100%; }
  .tab-btn { flex: 1; justify-content: center; }
  .lang-grid { grid-template-columns: 1fr 1fr; }
}
</style>