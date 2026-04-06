/** @import { Account, Certificate, Contact, Header, Interest, Language, PageData, PersonalInfo, Project, Skill, Tool } from './cv/types.js' */

import renderSection from './cv/render/sections.js'

/**
 * Populates a section with rendered data
 * @param {string} sectionId - ID of the section element
 * @param {Array<any>|Object} data - Data to render
 * @param {(data: any) => string} renderFunction - Function to render individual items
 */
function populateSection(sectionId, data, renderFunction) {
  const el = document.getElementById(sectionId)
  if (!el) {
    console.error(`Element with ID ${sectionId} not found`)
    return
  }

  try {
    el.innerHTML = renderFunction(data)
  } catch (error) {
    const sectionName = sectionId.replace('-content', '')

    console.error(`Error populating section ${sectionId}:`, error)
    el.innerHTML = `<div class="error-message">Error loading ${sectionName} data</div>`
  }
}

/**
 * Initializes the page by loading all sections
 * @param {PageData} data - Data for the page
 */
function initializePage(data) {
  // In a real implementation, this would load data from JSON files
  // For now, we'll use the sample data

  try {
    const sections = [
      ['header', 'header'],
      ['personal-info', 'personalInfo'],
      ['contact', 'contact'],
      ['accounts', 'accounts'],
      ['projects', 'projects'],
      ['certificates', 'certificates'],
      ['skills', 'skills'],
      ['tools', 'tools'],
      ['interests', 'interests'],
      ['languages', 'languages']
    ]

    sections.forEach(([id, key]) => {
      // @ts-expect-error - TypeScript doesn't know the keys of PageData are dynamic
      populateSection(`${id}-content`, data[key], renderSection[key])
    })
  } catch (error) {
    console.error('Error initializing page:', error)
  }
}

/**
 * Loads JSON data from specified file path
 * @param {string} filePath - Path to JSON file
 * @returns {Promise<Object>} Parsed JSON data
 */
async function loadJSON(filePath) {
  try {
    const res = await fetch(filePath)
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
    return await res.json()
  } catch (error) {
    console.error(`Error loading ${filePath}:`, error)
    throw error
  }
}

/**
 * Simulates loading JSON data (in real implementation, would use fetch)
 * @param {string} page - Path to JSON file
 * @returns {Promise<PageData>} Parsed JSON data
 */
async function loadData(page) {
  const sections = {
    shared: ['personal-info', 'contact', 'accounts'],
    specific: ['header', 'projects', 'certificates', 'skills', 'tools', 'interests', 'languages']
  }

  const sectionData = {
    shared: await Promise.all(sections.shared.map((str) => loadJSON(`data/cv/${str}.json`))),
    specific: await Promise.all(sections.specific.map((str) => loadJSON(`data/cv/pages/${page}/${str}.json`)))
  }

  return {
    header: /** @type {Header} */ (sectionData.specific[0]),
    personalInfo: /** @type {PersonalInfo} */ (sectionData.shared[0]),
    contact: /** @type {Contact} */ (sectionData.shared[1]),
    accounts: /** @type {Account[]} */ (sectionData.shared[2]),
    projects: /** @type {Project[]} */ (sectionData.specific[1]),
    certificates: /** @type {Certificate[]} */ (sectionData.specific[2]),
    skills: /** @type {Skill[]} */ (sectionData.specific[3]),
    tools: /** @type {Tool[]} */ (sectionData.specific[4]),
    interests: /** @type {Interest[]} */ (sectionData.specific[5]),
    languages: /** @type {Language[]} */ (sectionData.specific[6])
  }
}

// Initialize the page when DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
  const page = 'game-programmer'
  const data = await loadData(page)

  initializePage(data)
})
