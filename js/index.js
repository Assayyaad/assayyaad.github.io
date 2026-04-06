/** @type {Record<string, string>} */
const entities = Object.freeze({
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  "'": '&#39;',
  '"': '&quot;'
})

const urlRel = 'noopener referrer'

document.addEventListener('DOMContentLoaded', function () {
  loadSocialLinks()
  loadGames()
  loadSystems()
  loadArts()
  loadTeams()

  // Portfolio functionality can be added here as needed
})

/**
 * Escapes HTML characters in a string.
 * @param {any} value
 * @returns {string}
 */
function escapeHtml(value) {
  return String(value).replace(/[&<>'\"]/g, (char) => entities[char])
}

/**
 * Loads JSON from the provided path.
 * @template T
 * @param {string} filename
 * @returns {Promise<T>}
 */
async function fetchJson(filename) {
  const path = `data/index/${filename}.json`
  const res = await fetch(path)
  if (!res.ok) {
    throw new Error(`Request failed for ${path}: ${res.status} ${res.statusText}`)
  }

  return res.json()
}

/**
 * Renders list items into a container using a templating callback.
 * @template T
 * @param {string} containerId
 * @param {T[]} items
 * @param {(item: T) => string} renderItem
 * @param {'beforeend' | 'replace'} [mode='beforeend']
 */
function renderList(containerId, items, renderItem, mode = 'beforeend') {
  const container = /** @type {HTMLDivElement | null} */ (document.getElementById(containerId))
  if (!container) {
    throw new Error(`Container not found: #${containerId}`)
  }

  const html = items.map(renderItem).join('')

  if (mode === 'replace') {
    container.innerHTML = html
    return
  }

  container.insertAdjacentHTML('beforeend', html)
}

/**
 * Runs an async loader with standardized error handling.
 * @param {string} errorContext
 * @param {() => Promise<void>} loader
 * @returns {Promise<void>}
 */
async function runLoader(errorContext, loader) {
  try {
    await loader()
  } catch (error) {
    console.error(`Error loading ${errorContext} data:`, error)
  }
}

async function loadSocialLinks() {
  await runLoader('social links', async () => {
    const links = /** @type {Link[]} */ (await fetchJson('links'))

    renderList('sub-pages', links, (/** @type {Link} */ link) => {
      return `
        <a href="${escapeHtml(link.url)}" class="social-link" target="_blank" rel="${urlRel}">
          <span class="iconify-inline icon social-icon" data-icon="${escapeHtml(link.icon)}" alt="${escapeHtml(link.name)}"></span>
          ${escapeHtml(link.name)}
        </a>
      `
    })
  })
}

async function loadGames() {
  await runLoader('games', async () => {
    const games = /** @type {Game[]} */ (await fetchJson('projects/games'))

    renderList('games-grid', games, (/** @type {Game} */ game) => {
      return `
        <a href="${escapeHtml(game.url)}" class="game-item" target="_blank" rel="${urlRel}">
          <img src="${escapeHtml(game.imgUrl)}" alt="${escapeHtml(`ملصق لعبة ${game.name}`)}" class="game-image">
        </a>
      `
    })
  })
}

async function loadSystems() {
  await runLoader('systems', async () => {
    const systems = /** @type {System[]} */ (await fetchJson('projects/systems'))

    renderList('systems-grid', systems, (/** @type {System} */ system) => {
      let description = `مطور باستخدام ${system.lang}`
      if (system.engine) {
        description += ` مع ${system.engine}`
      }

      return `
        <div class="project-item">
          <a href="${escapeHtml(system.url)}" target="_blank" rel="${urlRel}" style="text-decoration: none; color: inherit;">
            <h4>${escapeHtml(system.name)}</h4>
            <p>${escapeHtml(description)}</p>
          </a>
        </div>
      `
    })
  })
}

async function loadArts() {
  await runLoader('arts', async () => {
    const arts = /** @type {Art[]} */ (await fetchJson('projects/arts'))

    renderList('arts-grid', arts, (/** @type {Art} */ art) => {
      return `
        <a href="${escapeHtml(art.url)}" class="game-item" target="_blank" rel="${urlRel}">
          <img src="${escapeHtml(art.imgUrl)}" alt="${escapeHtml(`صورة للعمل الفني ${art.name}`)}" class="game-image">
        </a>
      `
    })
  })
}

async function loadTeams() {
  await runLoader('teams', async () => {
    const teams = /** @type {Team[]} */ (await fetchJson('teams'))

    renderList(
      'teams-section',
      teams,
      (/** @type {Team} */ team) => {
        return `
        <div class="team-item" style="text-align: center; padding: 20px;">
          <a href="${escapeHtml(team.url)}" target="_blank" rel="${urlRel}" style="text-decoration: none; color: inherit; display: flex; flex-direction: column; align-items: center;">
            <img src="${escapeHtml(team.imgUrl)}" alt="${escapeHtml(`شعار ${team.name}`)}" style="width: 120px; height: 120px; border-radius: 50%; object-fit: cover; margin-bottom: 15px; border: 3px solid var(--color-secondary);">
            <h3 style="margin: 0; font-size: 1.2rem;">${escapeHtml(team.name)}</h3>
          </a>
        </div>
      `
      },
      'replace'
    )
  })
}

/**
 * @typedef {LinkedIcon} Link
 */

/**
 * @typedef {LinkedImage} Game
 */

/**
 * @typedef {Object} System
 * @property {string} name - The name of the system or project.
 * @property {string} url - The URL to the system's page or repository.
 * @property {string} lang - The programming language used for the system.
 * @property {string} [engine] - Optional. The game engine used for the system, if applicable.
 */

/**
 * @typedef {LinkedImage} Art
 */

/**
 * @typedef {LinkedImage} Team
 */

/**
 * @typedef {Object} LinkedIcon
 * @property {string} name
 * @property {string} url
 * @property {string} icon
 */

/**
 * @typedef {Object} LinkedImage
 * @property {string} name
 * @property {string} url
 * @property {string} imgUrl
 */
