document.addEventListener('DOMContentLoaded', function () {
  // Load social links
  loadSocialLinks()

  // Load games data
  loadGames()

  // Load systems data
  loadSystems()

  // Load arts data
  loadArts()

  // Load teams data
  loadTeams()

  // Portfolio functionality can be added here as needed
})

function escapeHtml(value) {
  return String(value).replace(/[&<>'\"]/g, function (char) {
    const entities = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }
    return entities[char]
  })
}

async function loadSocialLinks() {
  try {
    const res = await fetch('data/links.json')
    const links = await res.json()

    const socialLinksContainer = document.getElementById('sub-pages')

    const socialLinksHtml = links
      .map(function (link) {
        return `
        <a href="${escapeHtml(link.url)}" class="social-link" target="_blank" rel="noopener noreferrer">
          <span class="iconify-inline icon social-icon" data-icon="${escapeHtml(link.icon)}" alt="${escapeHtml(link.name)}"></span>
          ${escapeHtml(link.name)}
        </a>
      `
      })
      .join('')

    socialLinksContainer.insertAdjacentHTML('beforeend', socialLinksHtml)
  } catch (error) {
    console.error('Error loading social links data:', error)
  }
}

async function loadGames() {
  try {
    const response = await fetch('data/projects/games.json')
    const games = await response.json()

    const gamesGrid = document.getElementById('games-grid')

    const gamesHtml = games
      .map(function (game) {
        return `
        <a href="${escapeHtml(game.url)}" class="game-item" target="_blank" rel="noopener noreferrer">
          <img src="${escapeHtml(game.imgUrl)}" alt="${escapeHtml(`ملصق لعبة ${game.name}`)}" class="game-image">
        </a>
      `
      })
      .join('')

    gamesGrid.insertAdjacentHTML('beforeend', gamesHtml)
  } catch (error) {
    console.error('Error loading games data:', error)
  }
}

async function loadSystems() {
  try {
    const response = await fetch('data/projects/systems.json')
    const systems = await response.json()

    const systemsGrid = document.getElementById('systems-grid')

    const systemsHtml = systems
      .map(function (system) {
        let description = `مطور باستخدام ${system.lang}`
        if (system.engine) {
          description += ` مع ${system.engine}`
        }

        return `
        <div class="project-item">
          <a href="${escapeHtml(system.url)}" target="_blank" rel="noopener noreferrer" style="text-decoration: none; color: inherit;">
            <h4>${escapeHtml(system.name)}</h4>
            <p>${escapeHtml(description)}</p>
          </a>
        </div>
      `
      })
      .join('')

    systemsGrid.insertAdjacentHTML('beforeend', systemsHtml)
  } catch (error) {
    console.error('Error loading systems data:', error)
  }
}

async function loadArts() {
  try {
    const response = await fetch('data/projects/arts.json')
    const arts = await response.json()

    const artsGrid = document.getElementById('arts-grid')

    const artsHtml = arts
      .map(function (art) {
        return `
        <a href="${escapeHtml(art.url)}" class="game-item" target="_blank" rel="noopener noreferrer">
          <img src="${escapeHtml(art.imgUrl)}" alt="${escapeHtml(`صورة للعمل الفني ${art.name}`)}" class="game-image">
        </a>
      `
      })
      .join('')

    artsGrid.insertAdjacentHTML('beforeend', artsHtml)
  } catch (error) {
    console.error('Error loading arts data:', error)
  }
}

async function loadTeams() {
  try {
    const response = await fetch('data/teams.json')
    const teams = await response.json()

    const teamsSection = document.getElementById('teams-section')
    // Clear existing content
    teamsSection.innerHTML = ''

    // Add dynamic teams from JSON
    const teamsHtml = teams
      .map(function (team) {
        return `
        <div class="team-item" style="text-align: center; padding: 20px;">
          <a href="${escapeHtml(team.url)}" target="_blank" rel="noopener noreferrer" style="text-decoration: none; color: inherit; display: flex; flex-direction: column; align-items: center;">
            <img src="${escapeHtml(team.imgUrl)}" alt="${escapeHtml(`شعار ${team.name}`)}" style="width: 120px; height: 120px; border-radius: 50%; object-fit: cover; margin-bottom: 15px; border: 3px solid var(--color-secondary);">
            <h3 style="margin: 0; font-size: 1.2rem;">${escapeHtml(team.name)}</h3>
          </a>
        </div>
      `
      })
      .join('')

    teamsSection.insertAdjacentHTML('beforeend', teamsHtml)
  } catch (error) {
    console.error('Error loading teams data:', error)
  }
}
