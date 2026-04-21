import { createI18n } from 'vue-i18n'
import pt from './pt'
import en from './en'
import es from './es'

// pega idioma salvo ou detecta o do navegador
const savedLocale = localStorage.getItem('locale')
const browserLocale = navigator.language.slice(0, 2) // 'pt', 'en', 'es'
const supported = ['pt', 'en', 'es']
const defaultLocale = savedLocale || (supported.includes(browserLocale) ? browserLocale : 'pt')

const i18n = createI18n({
  legacy: false,
  locale: defaultLocale,
  fallbackLocale: 'pt',
  messages: { pt, en, es }
})

export default i18n