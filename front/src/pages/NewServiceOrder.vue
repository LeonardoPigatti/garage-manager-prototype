<template>
  <div class="page">

    <div class="page-header">
      <div class="header-left">
        <button class="back-btn" @click="$router.back()">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <div>
          <h1 class="page-title">{{ $t('newServiceOrder.title') }}</h1>
          <p class="page-sub">{{ $t('newServiceOrder.subtitle') }}</p>
        </div>
      </div>
      <div class="os-badge">
        <span class="os-label">{{ $t('newServiceOrder.osLabel') }}</span>
        <span class="os-number">{{ osNumber }}</span>
      </div>
    </div>

    <div class="form-body">

      <!-- Veículo -->
      <div class="form-section">
        <div class="section-header">
          <div class="section-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4l3 5v3h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
          </div>
          <span>{{ $t('newServiceOrder.vehicleSection') }}</span>
        </div>

        <div class="fields-grid">
          <div class="field-group">
            <label class="field-label">{{ $t('newServiceOrder.plate') }} <span class="required">*</span></label>
            <div class="field-wrapper">
              <span class="field-icon"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="2" y="7" width="20" height="10" rx="2"/><path d="M5 7V5m14 2V5"/></svg></span>
              <input v-model="form.vnumber" class="field-input" :placeholder="$t('newServiceOrder.platePlaceholder')" @input="form.vnumber = form.vnumber.toUpperCase()" maxlength="8"/>
            </div>
          </div>

          <div class="field-group">
            <label class="field-label">{{ $t('newServiceOrder.mileage') }} <span class="required">*</span></label>
            <div class="field-wrapper">
              <span class="field-icon"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg></span>
              <input v-model="form.mileage" class="field-input" :placeholder="$t('newServiceOrder.mileagePlaceholder')" type="number" min="0"/>
              <span class="field-suffix">km</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Cliente -->
      <div class="form-section">
        <div class="section-header">
          <div class="section-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          </div>
          <span>{{ $t('newServiceOrder.clientSection') }}</span>
        </div>

        <div class="fields-grid">
          <div class="field-group full">
            <label class="field-label">{{ $t('newServiceOrder.customerName') }} <span class="required">*</span></label>
            <div class="field-wrapper">
              <span class="field-icon"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></span>
              <input v-model="form.customer" class="field-input" :placeholder="$t('newServiceOrder.customerNamePlaceholder')"/>
            </div>
          </div>

          <div class="field-group full">
            <label class="field-label">{{ $t('newServiceOrder.phone') }} <span class="required">*</span></label>
            <div class="field-wrapper">
              <span class="field-icon"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.62 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 5.45 5.45l.96-.87a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16.92z"/></svg></span>
              <input v-model="form.phone" class="field-input" :placeholder="$t('newServiceOrder.phonePlaceholder')" @input="maskPhone" maxlength="15"/>
            </div>
          </div>
        </div>
      </div>

      <!-- Oficina -->
      <div class="form-section">
        <div class="section-header">
          <div class="section-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          </div>
          <span>{{ $t('newServiceOrder.workshopSection') }}</span>
        </div>

        <div class="fields-grid">
          <div class="field-group">
            <label class="field-label">{{ $t('newServiceOrder.employee') }} <span class="required">*</span></label>
            <div class="field-wrapper">
              <span class="field-icon"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></span>
              <input v-model="form.employee" class="field-input" :placeholder="$t('newServiceOrder.employeePlaceholder')"/>
            </div>
          </div>

          <div class="field-group">
            <label class="field-label">{{ $t('newServiceOrder.boxNumber') }} <span class="required">*</span></label>
            <div class="field-wrapper">
              <span class="field-icon"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg></span>
              <input v-model="form.boxNumber" class="field-input" :placeholder="$t('newServiceOrder.boxPlaceholder')" type="number" min="1"/>
            </div>
          </div>

          <div class="field-group">
            <label class="field-label">{{ $t('newServiceOrder.entryDate') }} <span class="required">*</span></label>
            <div class="field-wrapper">
              <span class="field-icon"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg></span>
              <input v-model="form.entryDate" class="field-input" type="date"/>
            </div>
          </div>
        </div>
      </div>

      <!-- Botões -->
      <div class="form-actions">
        <button class="btn-cancel" @click="$router.back()">{{ $t('newServiceOrder.cancel') }}</button>
        <button class="btn-save" :class="{ loading: isLoading }" @click="saveOrder">
          <span v-if="!isLoading">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>
            {{ $t('newServiceOrder.register') }}
          </span>
          <span v-else class="btn-spinner">
            <svg class="spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
            {{ $t('newServiceOrder.saving') }}
          </span>
        </button>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'NewServiceOrder',
  data() {
    return {
      isLoading: false,
      osNumber: this.generateOSNumber(),
      form: {
        vnumber: '',
        customer: '',
        phone: '',
        mileage: '',
        employee: '',
        boxNumber: '',
        entryDate: new Date().toISOString().split('T')[0]
      }
    }
  },
  methods: {
    generateOSNumber() {
      const now = new Date()
      const year = now.getFullYear().toString().slice(-2)
      const month = String(now.getMonth() + 1).padStart(2, '0')
      const rand = Math.floor(1000 + Math.random() * 9000)
      return `OS${year}${month}-${rand}`
    },

    maskPhone(e) {
      let v = e.target.value.replace(/\D/g, '')
      if (v.length <= 11) {
        v = v.replace(/^(\d{2})(\d)/g, '($1) $2')
        v = v.replace(/(\d)(\d{4})$/, '$1-$2')
      }
      this.form.phone = v
    },

    validate() {
      const { vnumber, customer, phone, mileage, employee, boxNumber, entryDate } = this.form
      if (!vnumber)    return this.$t('newServiceOrder.errorPlate')
      if (!customer)   return this.$t('newServiceOrder.errorCustomer')
      if (!phone)      return this.$t('newServiceOrder.errorPhone')
      if (!mileage)    return this.$t('newServiceOrder.errorMileage')
      if (!employee)   return this.$t('newServiceOrder.errorEmployee')
      if (!boxNumber)  return this.$t('newServiceOrder.errorBox')
      if (!entryDate)  return this.$t('newServiceOrder.errorDate')
      return null
    },

    async saveOrder() {
      const error = this.validate()
      if (error) return alert(error)

      this.isLoading = true
      try {
        const res = await fetch('http://localhost:3000/oficina/service-orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            osNumber: this.osNumber,
            vnumber: this.form.vnumber,
            customer: this.form.customer,
            phone: this.form.phone,
            mileage: Number(this.form.mileage),
            employee: this.form.employee,
            boxNumber: Number(this.form.boxNumber),
            entryDate: this.form.entryDate,
            status: 'Programado', // padrão ao criar

          })
        })

        const data = await res.json()
        if (!data.success) throw new Error()

        this.$router.push(`/service-orders/${data.order._id}`)
      } catch {
        alert(this.$t('newServiceOrder.errorSave'))
      } finally {
        this.isLoading = false
      }
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

/* ── HEADER ── */
.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 28px;
  flex-wrap: wrap;
  gap: 16px;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.back-btn {
  width: 38px; height: 38px;
  border-radius: 10px;
  background: #fff;
  border: 1.5px solid #e2e8f0;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer;
  color: #64748b;
  transition: all 0.2s;
}
.back-btn:hover { border-color: #001B35; color: #001B35; }

.page-title {
  font-family: 'Syne', sans-serif;
  font-size: 22px;
  color: #0d1f3c;
  line-height: 1;
}

.page-sub {
  font-size: 13px;
  color: #94a3b8;
  margin-top: 4px;
}

.os-badge {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  background: #fff;
  border: 1.5px solid #e2e8f0;
  border-radius: 12px;
  padding: 10px 16px;
}

.os-label {
  font-size: 10px;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.os-number {
  font-family: 'Syne', sans-serif;
  font-size: 18px;
  color: #001B35;
  letter-spacing: 0.5px;
}

/* ── FORM BODY ── */
.form-body {
  max-width: 760px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* ── SECTION ── */
.form-section {
  background: #fff;
  border-radius: 18px;
  border: 1px solid rgba(0,0,0,0.05);
  padding: 24px 28px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.04);
}

.section-header {
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: 'Syne', sans-serif;
  font-size: 14px;
  color: #0d1f3c;
  margin-bottom: 20px;
  padding-bottom: 14px;
  border-bottom: 1px solid #f1f5f9;
}

.section-icon {
  width: 32px; height: 32px;
  background: #e8eeff;
  border-radius: 8px;
  display: flex; align-items: center; justify-content: center;
  color: #1a1f5e;
}

/* ── GRID ── */
.fields-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.field-group { display: flex; flex-direction: column; gap: 6px; }
.field-group.full { grid-column: 1 / -1; }

.field-label {
  font-size: 12px;
  color: #64748b;
  letter-spacing: 0.3px;
}

.required { color: #e24b4a; }

.field-wrapper { position: relative; display: flex; align-items: center; }

.field-icon {
  position: absolute; left: 13px;
  color: #94a3b8;
  display: flex; align-items: center;
  pointer-events: none;
}

.field-input {
  width: 100%; height: 46px;
  background: #f8fafc;
  border: 1.5px solid #e2e8f0;
  border-radius: 11px;
  padding: 0 44px 0 40px;
  font-family: 'DM Sans', sans-serif;
  font-size: 14px; color: #0f172a;
  outline: none;
  transition: all 0.2s;
}

.field-input::placeholder { color: #c1ccd8; }
.field-input:focus { background: #fff; border-color: #1a1f5e; box-shadow: 0 0 0 3px rgba(26,31,94,0.08); }

input[type="date"].field-input { color: #0f172a; }

.field-suffix {
  position: absolute; right: 13px;
  font-size: 12px; color: #94a3b8;
  pointer-events: none;
}

/* ── ACTIONS ── */
.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding-top: 4px;
}

.btn-cancel {
  height: 46px;
  padding: 0 24px;
  background: #fff;
  border: 1.5px solid #e2e8f0;
  border-radius: 11px;
  font-family: 'DM Sans', sans-serif;
  font-size: 14px; color: #64748b;
  cursor: pointer;
  transition: all 0.2s;
}
.btn-cancel:hover { border-color: #94a3b8; color: #334155; }

.btn-save {
  height: 46px;
  padding: 0 28px;
  background: linear-gradient(145deg, #001B35 0%, #00264d 40%, #001f3f 100%);
  color: #fff;
  border: none;
  border-radius: 11px;
  font-family: 'Syne', sans-serif;
  font-size: 14px;
  cursor: pointer;
  display: flex; align-items: center; gap: 8px;
  transition: all 0.25s;
  box-shadow: 0 4px 14px rgba(29,78,216,0.3);
}
.btn-save:hover:not(.loading) { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(29,78,216,0.4); }
.btn-save.loading { opacity: 0.8; cursor: not-allowed; }

.btn-spinner { display: flex; align-items: center; gap: 8px; }

@keyframes spin { to { transform: rotate(360deg); } }
.spin { animation: spin 0.8s linear infinite; }

/* ── RESPONSIVE ── */
@media (max-width: 600px) {
  .page { padding: 20px 16px 40px; }
  .fields-grid { grid-template-columns: 1fr; }
  .form-section { padding: 18px 18px; }
  .os-badge { display: none; }
  .form-actions { flex-direction: column; }
  .btn-cancel, .btn-save { width: 100%; justify-content: center; }
}
</style>