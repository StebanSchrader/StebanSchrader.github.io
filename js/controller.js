document.addEventListener('DOMContentLoaded', () => {
    // Controller: Initialize the app
    const app = new PortfolioController();
    app.init();
});

class PortfolioController {
    constructor() {
        this.modelUrl = 'data/model.json';
    }

    async init() {
        try {
            const data = await this.fetchModel();
            this.renderView(data);
        } catch (error) {
            console.error('Error loading portfolio data:', error);
            // Fallback content or error message
            document.querySelector('.main-content').innerHTML = '<p style="text-align:center; padding: 2rem;">Chargement des données...</p>';
        }
    }

    async fetchModel() {
        // Fetching the 'Model'
        const response = await fetch(this.modelUrl);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return await response.json();
    }

    renderView(data) {
        // Rendering the 'View'
        
        // Profile / Hero
        this.setText('profile-name', `${data.profile.firstName}<br>${data.profile.lastName}`);
        this.setText('profile-intro', data.profile.intro);
        const img = document.getElementById('profile-img');
        if (img) img.src = data.profile.image;

        // About
        this.setText('about-title', data.about.title);
        this.setText('about-desc', data.about.description);
        this.setText('about-details', data.about.details);

        // Skills
        this.setText('skills-title', data.skills.title);
        const skillsContainer = document.getElementById('skills-container');
        if (skillsContainer) {
            skillsContainer.innerHTML = data.skills.categories.map(category => `
                <div class="skill-card">
                    <h3>${category.name}</h3>
                    <ul>
                        ${category.items.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                </div>
            `).join('');
        }

        // Projects
        this.setText('projects-title', data.projects.title);
        const projectsContainer = document.getElementById('projects-container');
        if (projectsContainer) {
            projectsContainer.innerHTML = data.projects.items.map(project => `
                <div class="project-card">
                    <img src="${project.image}" alt="${project.title}">
                    <div class="project-info">
                        <h3>${project.title}</h3>
                        <p>${project.description}</p>
                        <a href="${project.link}" class="btn">Voir le projet</a>
                    </div>
                </div>
            `).join('');
        }

        // Contact
        this.setText('contact-title', data.contact.title);
        const contactContainer = document.getElementById('contact-info');
        if (contactContainer) {
            contactContainer.innerHTML = `
                <div class="contact-item">
                    <i class="fas fa-envelope"></i>
                    <a href="mailto:${data.contact.email}">${data.contact.email}</a>
                </div>
                <div class="contact-socials">
                    <a href="https://${data.contact.linkedin}" target="_blank">LinkedIn</a>
                    <a href="https://${data.contact.github}" target="_blank">GitHub</a>
                </div>
            `;
        }
    }

    setText(id, html) {
        const el = document.getElementById(id);
        if (el) el.innerHTML = html;
    }
}
