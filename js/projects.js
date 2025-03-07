fetch('data/projects.json')
    .then(response => response.json())
    .then(projects => {
        let projectContainer = document.getElementById("project-container");
        projects.forEach(project => {
            let card = document.createElement("div");
            card.classList.add("project-card");
            card.innerHTML = `
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <a href="${project.github}" target="_blank">View on GitHub</a>
            `;
            projectContainer.appendChild(card);
        });
    });