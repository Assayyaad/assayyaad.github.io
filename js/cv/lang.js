/** @import { Lang, LangCode } from './types.js' */

// Global variable to track current language
/** @type {LangCode} */
let currLang = 'ar'
/** @type {Record<string, string>} */
let translations = {}

/** @type {Record<LangCode, Lang>} */
export const langs = {
  ar: { code: 'ar', name: 'العربية', dir: 'rtl' },
  en: { code: 'en', name: 'English', dir: 'ltr' }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
  const firstSegment = window.location.pathname.split('/').filter(Boolean)[0]
  currLang = firstSegment === 'en' ? 'en' : 'ar'

  try {
    const res = await fetch('data/cv/translations.json')
    if (res.ok) {
      translations = await res.json()
    }
  } catch (error) {
    console.warn('Could not load translations:', error)
  }
})

// Language toggle functionality
function toggleLanguage() {
  const nextLang = currLang === 'ar' ? 'en' : 'ar'
  const parts = window.location.pathname.split('/').filter(Boolean)

  if (parts.length === 0) {
    window.location.pathname = `/${nextLang}/`
    return
  }

  if (parts[0] === 'ar' || parts[0] === 'en') parts[0] = nextLang
  else parts.unshift(nextLang)

  const nextPath = `/${parts.join('/')}`
  window.location.assign(`${nextPath}${window.location.search}${window.location.hash}`)
}

// @ts-expect-error - Expose toggleLanguage globally for inline onclick
window['toggleLanguage'] = toggleLanguage
