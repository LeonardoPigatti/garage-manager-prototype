<template>
  <div>
    <div v-if="isMobile && isOpen" class="overlay" @click="$emit('close')"></div>

    <!-- Botão flutuante — só aparece no desktop quando recolhido -->
    <button v-if="!isOpen && !isMobile" class="float-toggle" @click="handleToggle">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
        <line x1="3" y1="6" x2="21" y2="6"/>
        <line x1="3" y1="12" x2="21" y2="12"/>
        <line x1="3" y1="18" x2="21" y2="18"/>
      </svg>
    </button>

    <aside class="sidebar" :class="{ collapsed: !isOpen && !isMobile, 'mobile-open': isMobile && isOpen, 'mobile-closed': isMobile && !isOpen }">
      <div class="sb-inner">

        <!-- Topo com brand + toggle -->
        <div class="sb-top">
          <div class="sb-brand">
            <span class="sb-brand-name">AutoService</span>
            <span class="sb-brand-sub">Management System</span>
          </div>
          <button class="toggle-btn" @click="handleToggle">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
              <line x1="3" y1="6" x2="21" y2="6"/>
              <line x1="3" y1="12" x2="21" y2="12"/>
              <line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          </button>
        </div>

        <!-- New Service -->
        <button class="sb-new-btn" @click="$router.push('/service-orders/new')">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" style="flex-shrink:0">
            <line x1="12" y1="5" x2="12" y2="19"/>
            <line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          New Service
        </button>

        <!-- Nav -->
        <nav class="sb-nav">
          <div
            v-for="item in menuItems"
            :key="item.label"
            class="sb-item"
            :class="{ active: activeItem === item.label }"
            @click="setActive(item.label)"
          >
            <span class="sb-icon" v-html="item.icon"></span>
            <span class="sb-label">{{ item.label }}</span>
            <span v-if="item.count" class="sb-badge">{{ item.count }}</span>
          </div>
        </nav>

        <!-- Footer -->
        <div class="sb-footer">
<div class="sb-user" v-if="user" @click="$router.push('/settings')" style="cursor:pointer">
  <div class="sb-avatar">{{ user.email[0].toUpperCase() }}</div>
  <div class="sb-user-info">
    <span class="sb-email">{{ user.email }}</span>
    <span class="sb-type">{{ user.type }}</span>
  </div>
</div>
          <button class="sb-logout" @click="$emit('logout')">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
            Sair
          </button>
        </div>

      </div>
    </aside>
  </div>
</template>

<script>
export default {
  name: 'Sidebar',
  props: {
    isOpen: { type: Boolean, default: true },
    user: { type: Object, default: null }
  },
  emits: ['close', 'toggle', 'logout'],
  data() {
    return {
      isMobile: window.innerWidth <= 768,
      activeItem: 'All Services',
menuItems: [
  {
    label: 'All Services',
    count: 22,
    route: '/all-services',
    icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <line x1="8" y1="6" x2="21" y2="6"/>
      <line x1="8" y1="12" x2="21" y2="12"/>
      <line x1="8" y1="18" x2="21" y2="18"/>
      <line x1="3" y1="6" x2="3.01" y2="6"/>
      <line x1="3" y1="12" x2="3.01" y2="12"/>
      <line x1="3" y1="18" x2="3.01" y2="18"/>
    </svg>`
  },
//   {
//     label: 'Scheduled',
//     count: 1,
//     icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
//       <rect x="3" y="4" width="18" height="18" rx="2"/>
//       <line x1="16" y1="2" x2="16" y2="6"/>
//       <line x1="8" y1="2" x2="8" y2="6"/>
//       <line x1="3" y1="10" x2="21" y2="10"/>
//     </svg>`
//   },
//   {
//     label: 'In Progress',
//     count: 1,
//     icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
//       <circle cx="12" cy="12" r="10"/>
//       <polyline points="12 6 12 12 16 14"/>
//     </svg>`
//   },
//   {
//     label: 'Completed',
//     count: 20,
//     icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
//       <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
//       <polyline points="22 4 12 14.01 9 11.01"/>
//     </svg>`
//   }
]
    }
  },
  mounted() {
    window.addEventListener('resize', this.handleResize)
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    handleResize() {
      this.isMobile = window.innerWidth <= 768
    },
    handleToggle() {
      this.$emit('toggle')
    },
setActive(label) {
  this.activeItem = label
  const item = this.menuItems.find(i => i.label === label)
  if (item?.route) {
    this.$router.push(item.route)
  }
  if (this.isMobile) this.$emit('close')
}
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500&display=swap');

.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  z-index: 98;
  backdrop-filter: blur(2px);
}

/* ── BOTÃO FLUTUANTE (desktop recolhido) ── */
.float-toggle {
  position: fixed;
  top: 16px;
  left: 16px;
  z-index: 100;
  width: 38px;
  height: 38px;
  background: #1a1f5e;
  border: none;
  border-radius: 10px;
  color: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.18s;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.2);
}

.float-toggle:hover { background: #232870; }

/* ── SIDEBAR ── */
.sidebar {
  width: 270px;
  min-width: 240px;
  background: #1a1f5e;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  flex-shrink: 0;
  height: 100vh;
  transition: width 0.35s cubic-bezier(.4, 0, .2, 1),
              min-width 0.35s cubic-bezier(.4, 0, .2, 1);
}

/* Desktop recolhido: some completamente */
.sidebar.collapsed {
  width: 0;
  min-width: 0;
}

/* ── MOBILE ── */
@media (max-width: 768px) {
  .sidebar {
    position: fixed;
    top: 0; left: 0;
    z-index: 99;
    width: 270px !important;
    min-width: 240px !important;
    transform: translateX(-100%);
    transition: transform 0.35s cubic-bezier(.4, 0, .2, 1);
  }
  .sidebar.mobile-open  { transform: translateX(0); }
  .sidebar.mobile-closed { transform: translateX(-100%); }
}

/* ── INNER ── */
.sb-inner {
  width: 240px;
  min-width: 240px;
  padding: 16px 12px 20px;
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 4px;
  font-family: 'DM Sans', sans-serif;
}

/* ── TOP ── */
.sb-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 4px 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  margin-bottom: 4px;
}

.sb-brand { overflow: hidden; flex: 1; }

.sb-brand-name {
  display: block;
  font-size: 16px;
  font-weight: 500;
  color: #fff;
  white-space: nowrap;
}

.sb-brand-sub {
  font-size: 10px;
  color: rgba(255, 255, 255, 0.4);
  white-space: nowrap;
}

.toggle-btn {
  background: rgba(255, 255, 255, 0.08);
  border: none;
  border-radius: 8px;
  color: rgba(255, 255, 255, 0.7);
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.18s;
  flex-shrink: 0;
}

.toggle-btn:hover { background: rgba(255, 255, 255, 0.15); }

/* ── NEW SERVICE BTN ── */
.sb-new-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  background: #3d5afe;
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 10px 12px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  width: 100%;
  margin: 4px 0 8px;
  font-family: 'DM Sans', sans-serif;
  transition: background 0.18s;
  white-space: nowrap;
}

.sb-new-btn:hover { background: #536dfe; }

/* ── NAV ── */
.sb-nav {
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;
}

.sb-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 10px;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.55);
  font-size: 13px;
  transition: all 0.18s;
  white-space: nowrap;
}

.sb-item:hover { background: rgba(255, 255, 255, 0.07); color: rgba(255, 255, 255, 0.85); }
.sb-item.active { background: #3d5afe; color: #fff; }

.sb-icon { display: flex; align-items: center; flex-shrink: 0; }

.sb-badge {
  margin-left: auto;
  background: rgba(255, 255, 255, 0.18);
  color: #fff;
  font-size: 11px;
  padding: 2px 7px;
  border-radius: 20px;
  flex-shrink: 0;
}

.sb-item.active .sb-badge { background: rgba(255, 255, 255, 0.25); }

/* ── FOOTER ── */
.sb-footer {
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  padding-top: 12px;
  margin-top: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.sb-user {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.04);
  overflow: hidden;
}

.sb-avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: rgba(61, 90, 254, 0.4);
  color: #fff;
  font-size: 13px;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.sb-user-info { display: flex; flex-direction: column; overflow: hidden; }

.sb-email {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.7);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.sb-type {
  font-size: 10px;
  color: rgba(255, 255, 255, 0.35);
  text-transform: capitalize;
}

.sb-logout {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 9px 12px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  color: rgba(255, 255, 255, 0.5);
  font-family: 'DM Sans', sans-serif;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
}

.sb-logout:hover {
  background: rgba(239, 68, 68, 0.15);
  border-color: rgba(239, 68, 68, 0.3);
  color: #f87171;
}
</style>