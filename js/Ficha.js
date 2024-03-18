document.addEventListener("DOMContentLoaded", function () {
    const images = document.querySelectorAll(".image-container img");
    const backButton = document.getElementById("back-button");
    const characterInfo = document.getElementById("character-info");

    images.forEach(image => {
        image.addEventListener("click", function () {
            const className = this.dataset.class; // Obtém o nome da classe da imagem clicada
            const raceName = this.dataset.race; // Obtém o nome da raça da imagem clicada

            // Oculta todas as imagens e o botão "voltar"
            images.forEach(img => img.style.display = "none");
            backButton.style.display = "block";

            // Exibe apenas a imagem clicada e o botão "voltar"
            this.style.display = "block";

            // Limpa as informações do personagem
            characterInfo.innerHTML = "";

            // Busca informações da classe na API
            fetch(`https://www.dnd5eapi.co/api/classes/${className}`)
                .then(response => response.json())
                .then(classData => {
                    // Exibe informações da classe
                    characterInfo.innerHTML += `<h3>${classData.name}</h3>`;
                    characterInfo.innerHTML += `<p>Hit Die: ${classData.hit_die}</p>`;
                })
                .catch(error => console.error("Error fetching class data:", error));

            // Busca informações da raça na API
            fetch(`https://www.dnd5eapi.co/api/races/${raceName}`)
                .then(response => response.json())
                .then(raceData => {
                    // Exibe informações da raça
                    characterInfo.innerHTML += `<h3>${raceData.name}</h3>`;
                    characterInfo.innerHTML += `<p>Ability Bonuses: ${raceData.ability_bonuses.join(', ')}</p>`;
                })
                .catch(error => console.error("Error fetching race data:", error));
        });
    });

    // Adiciona um ouvinte de evento de clique para o botão "voltar"
    backButton.addEventListener("click", function () {
        // Exibe todas as imagens novamente e oculta o botão "voltar"
        images.forEach(img => img.style.display = "block");
        backButton.style.display = "none";

        // Limpa as informações do personagem
        characterInfo.innerHTML = "";
    });
});
