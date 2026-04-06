document.addEventListener('DOMContentLoaded', function () {
  // Load social links
  loadSocialLinks();
  
  // Load games data
  loadGames();
  
  // Load systems data
  loadSystems();
  
  // Load arts data
  loadArts();
  
  // Load teams data
  loadTeams();
  
  // Portfolio functionality can be added here as needed
});

async function loadSocialLinks() {
  try {
    const response = await fetch('data/links.json');
    const links = await response.json();
    
    const socialLinksContainer = document.getElementById('sub-pages');
    
    links.forEach(link => {
      const socialLink = document.createElement('a');
      socialLink.href = link.url;
      socialLink.className = 'social-link';
      socialLink.target = '_blank';
      socialLink.rel = 'noopener noreferrer';
      
      const socialIcon = document.createElement('span');
      socialIcon.className = 'iconify-inline icon social-icon';
      socialIcon.setAttribute('data-icon', link.icon);
      socialIcon.setAttribute('alt', link.name);
      
      const linkText = document.createTextNode(link.name);
      
      socialLink.appendChild(socialIcon);
      socialLink.appendChild(linkText);
      socialLinksContainer.appendChild(socialLink);
    });
  } catch (error) {
    console.error('Error loading social links data:', error);
  }
}

async function loadGames() {
  try {
    const response = await fetch('data/projects/games.json');
    const games = await response.json();
    
    const gamesGrid = document.getElementById('games-grid');
    
    games.forEach(game => {
      const gameItem = document.createElement('a');
      gameItem.href = game.url;
      gameItem.className = 'game-item';
      gameItem.target = '_blank';
      gameItem.rel = 'noopener noreferrer';
      
      const gameImage = document.createElement('img');
      gameImage.src = game.imgUrl;
      gameImage.alt = `ملصق لعبة ${game.name}`;
      gameImage.className = 'game-image';
      
      gameItem.appendChild(gameImage);
      gamesGrid.appendChild(gameItem);
    });
  } catch (error) {
    console.error('Error loading games data:', error);
  }
}

async function loadSystems() {
  try {
    const response = await fetch('data/projects/systems.json');
    const systems = await response.json();
    
    const systemsGrid = document.getElementById('systems-grid');
    
    systems.forEach(system => {
      const systemItem = document.createElement('div');
      systemItem.className = 'project-item';
      
      const systemLink = document.createElement('a');
      systemLink.href = system.url;
      systemLink.target = '_blank';
      systemLink.rel = 'noopener noreferrer';
      systemLink.style.textDecoration = 'none';
      systemLink.style.color = 'inherit';
      
      const systemTitle = document.createElement('h4');
      systemTitle.textContent = system.name;
      
      const systemDescription = document.createElement('p');
      let description = `مطور باستخدام ${system.lang}`;
      if (system.engine) {
        description += ` مع ${system.engine}`;
      }
      systemDescription.textContent = description;
      
      systemLink.appendChild(systemTitle);
      systemLink.appendChild(systemDescription);
      systemItem.appendChild(systemLink);
      systemsGrid.appendChild(systemItem);
    });
  } catch (error) {
    console.error('Error loading systems data:', error);
  }
}

async function loadArts() {
  try {
    const response = await fetch('data/projects/arts.json');
    const arts = await response.json();
    
    const artsGrid = document.getElementById('arts-grid');
    
    arts.forEach(art => {
      const artItem = document.createElement('a');
      artItem.href = art.url;
      artItem.className = 'game-item';
      artItem.target = '_blank';
      artItem.rel = 'noopener noreferrer';
      
      const artImage = document.createElement('img');
      artImage.src = art.imgUrl;
      artImage.alt = `صورة للعمل الفني ${art.name}`;
      artImage.className = 'game-image';
      
      artItem.appendChild(artImage);
      artsGrid.appendChild(artItem);
    });
  } catch (error) {
    console.error('Error loading arts data:', error);
  }
}

async function loadTeams() {
  try {
    const response = await fetch('data/teams.json');
    const teams = await response.json();
    
    const teamsSection = document.getElementById('teams-section');
    // Clear existing content
    teamsSection.innerHTML = '';
    
    // Add dynamic teams from JSON
    teams.forEach(team => {
      const teamItem = document.createElement('div');
      teamItem.className = 'team-item';
      teamItem.style.textAlign = 'center';
      teamItem.style.padding = '20px';
      
      const teamLink = document.createElement('a');
      teamLink.href = team.url;
      teamLink.target = '_blank';
      teamLink.rel = 'noopener noreferrer';
      teamLink.style.textDecoration = 'none';
      teamLink.style.color = 'inherit';
      teamLink.style.display = 'flex';
      teamLink.style.flexDirection = 'column';
      teamLink.style.alignItems = 'center';
      
      const teamImage = document.createElement('img');
      teamImage.src = team.imgUrl;
      teamImage.alt = `شعار ${team.name}`;
      teamImage.style.width = '120px';
      teamImage.style.height = '120px';
      teamImage.style.borderRadius = '50%';
      teamImage.style.objectFit = 'cover';
      teamImage.style.marginBottom = '15px';
      teamImage.style.border = '3px solid var(--color-secondary)';
      
      const teamTitle = document.createElement('h3');
      teamTitle.textContent = team.name;
      teamTitle.style.margin = '0';
      teamTitle.style.fontSize = '1.2rem';
      
      teamLink.appendChild(teamImage);
      teamLink.appendChild(teamTitle);
      teamItem.appendChild(teamLink);
      teamsSection.appendChild(teamItem);
    });
  } catch (error) {
    console.error('Error loading teams data:', error);
  }
}
