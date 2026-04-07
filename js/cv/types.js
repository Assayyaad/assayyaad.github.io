export {}

/** @typedef {string} Sex */
/** @typedef {string} LanguageEfficiency */
/** @typedef {1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10} Efficiency */
/** @typedef {`${string}@${string}.${string}`} Email */
/** @typedef {`+${string}`} Phone */
/** @typedef {`${string}-${string}`} DateStr */

/**
 * @typedef {Object} Header
 * @property {string} title
 * @property {string} tagline
 */

/**
 * @typedef {Object} PersonalInfo
 * @property {[string, string]} name
 * @property {[string, number]} age
 * @property {[string, Sex]} sex
 */

/**
 * @typedef {Object} Contact
 * @property {Email} email
 * @property {Phone} phone
 */

/**
 * @typedef {Object} Account
 * @property {string} name
 * @property {string} link
 * @property {string} icon - Valid Iconify icon ID
 */

/**
 * @typedef {Object} Project
 * @property {string} name
 * @property {string} link
 * @property {DateStr} date - Format: "YYYY-MM"
 * @property {string} description
 */

/**
 * @typedef {Object} Certificate
 * @property {string} name
 * @property {string} id
 * @property {string} image
 * @property {string} link
 * @property {Provider} provider
 */

/**
 * @typedef {Object} Provider
 * @property {string} name
 * @property {string} link
 * @property {string} icon - Valid Iconify icon ID
 */

/**
 * @typedef {Object} Skill
 * @property {string} name
 * @property {Efficiency} efficiency - Scale 1-10
 */

/**
 * @typedef {Object} Tool
 * @property {string} name
 * @property {string} icon - Valid Iconify icon ID
 * @property {string} link
 * @property {number} yearsOfExperience - Greater than or equal to 0
 */

/**
 * @typedef {Object} Interest
 * @property {string} name
 * @property {string} icon - Emoji or valid Iconify icon ID
 */

/**
 * @typedef {Object} Language
 * @property {string} name
 * @property {LanguageEfficiency} efficiency - e.g., "Native", "Fluent", "Intermediate"
 */

// language

/**
 * @typedef {Object} Lang
 * @property {LangCode} code - Language code (e.g., 'en', 'ar')
 * @property {LangName} name - Language name (e.g., 'English', 'العربية')
 * @property {LangDir} dir - Text direction ('ltr' or 'rtl')
 */

/** @typedef {'ar' | 'en'} LangCode */
/** @typedef {'العربية' | 'English'} LangName */
/** @typedef {'rtl' | 'ltr'} LangDir */

// other

/**
 * @typedef {Object} PageData
 * @property {Header} header
 * @property {PersonalInfo} personalInfo
 * @property {Contact} contact
 * @property {Account[]} accounts
 * @property {Project[]} projects
 * @property {Certificate[]} certificates
 * @property {Skill[]} skills
 * @property {Tool[]} tools
 * @property {Interest[]} interests
 * @property {Language[]} languages
 */
