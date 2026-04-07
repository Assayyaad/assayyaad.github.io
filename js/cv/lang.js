/** @import { LangCode } from './types.js' */

function toggleLanguage() {
  const currLang = /** @type {LangCode} */ (document.documentElement.lang)
  const nextLang = /** @type {LangCode} */ (currLang === 'ar' ? 'en' : 'ar')

  const newPath = window.location.pathname.replace(`/${currLang}/`, `/${nextLang}/`)
  window.location.replace(`${newPath}${window.location.search}${window.location.hash}`)
}

window['toggleLanguage'] = toggleLanguage
