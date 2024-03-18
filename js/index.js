document.addEventListener('DOMContentLoaded', () => {
    const checkbox = document.getElementById('chk');
    const body = document.body;
    const Tiamat = document.querySelector('.Tiamat');
    const navBar = document.querySelector('.navBar');
    const SubCaixa = document.querySelector('.SubCaixa');
    const Entrar = document.querySelector('.Entrar');
    const main = document.querySelector('.main');
    const div = document.querySelector('.caixa_alta');
    const container = document.querySelector('.container');
    const mainFooter = document.querySelector('.main_footer');
    const footerArrow = document.querySelector('.footer-arrow');
    const main_footer_copy = document.querySelector('.main_footer_copy');
    const fim = document.querySelector('.fim'); // Aqui estamos selecionando o elemento correto
    const bottomMain = document.querySelectorAll('.bottomMain');
    const h2 = document.querySelectorAll('h2');
    const p = document.querySelectorAll('p');
    const limitador = document.querySelectorAll('.limitador');

    checkbox.addEventListener('change', () => {
        body.classList.toggle('dark');
        Tiamat.classList.toggle('dark');
        navBar.classList.toggle('dark');
        SubCaixa.classList.toggle('dark');
        Entrar.classList.toggle('dark');
        main.classList.toggle('dark');
        div.classList.toggle('dark');
        container.classList.toggle('dark');
        main_footer_copy.classList.toggle('dark');
        mainFooter.classList.toggle('dark');
        footerArrow.classList.toggle('dark');

        bottomMain.forEach(btn => btn.classList.toggle('dark'));
        p.forEach(paragrafo => paragrafo.classList.toggle('dark'));
        h2.forEach(megaTexto => megaTexto.classList.toggle('dark'));
        limitador.forEach(linha => linha.classList.toggle('dark'));

        // Verifica se o modo escuro está ativado
        if (body.classList.contains('dark')) {
            // Se estiver, aplica a cor de fundo do modo escuro ao elemento .fim
            fim.style.backgroundColor = 'var(--dark-blue)';
        } else {
            // Caso contrário, volta para a cor original
            fim.style.backgroundColor = ''; // Retorna ao estilo padrão definido no CSS
        }

        const shapeFill = footerArrow.querySelector('.shape-fill');
        if (shapeFill) {
            shapeFill.classList.toggle('dark');
        }

        const svgIcon = footerArrow.querySelector('svg');
        if (svgIcon) {
            svgIcon.style.fill = body.classList.contains('dark') ? 'var(--very-dark-blue)' : 'initial';
        }

        if (body.classList.contains('dark')) {
            Tiamat.src = './images/NoturnoDesktop.png';
        } else {
            Tiamat.src = './images/Tiamat_D&D.png';
        }
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const images = document.querySelectorAll(".lista_img img");
    const backButton = document.getElementById("back-button");
    const characterInfo = document.getElementById("character-info");
    const raceInfo = document.getElementById("race-info");

    images.forEach(image => {
        image.addEventListener("click", function () {
            const className = this.dataset.class;
            const raceName = this.dataset.race;

            images.forEach(img => img.style.display = "none");
            backButton.style.display = "block";
            this.style.display = "block";

            characterInfo.innerHTML = "";
            raceInfo.innerHTML = "";

            // Fetch dos dados da classe
            fetch(`https://www.dnd5eapi.co/api/classes/${className}`)
                .then(response => response.json())
                .then(classData => {
                    characterInfo.innerHTML += `<h3>${classData.name}</h3>`;
                    characterInfo.innerHTML += `<p>Dado de acerto: ${classData.hit_die}</p>`;

                    // Mostrar as proficiências
                    characterInfo.innerHTML += "<p>Proficiências:</p>";
                    classData.proficiencies.forEach(proficiency => {
                        characterInfo.innerHTML += `<p>${proficiency.name}</p>`;
                    });

                    // Mostrar escolhas de proficiência, se houver
                    if (classData.proficiency_choices && classData.proficiency_choices.length > 0) {
                        classData.proficiency_choices.forEach(choice => {
                            if (choice.option_set_type === "options_array" && choice.options.length > 0) {
                                characterInfo.innerHTML += `<p>${choice.desc}</p>`;
                                choice.options.forEach(option => {
                                    characterInfo.innerHTML += `<p>${option.item.name}</p>`;
                                });
                            } else {
                                characterInfo.innerHTML += `<p>${choice.desc}</p>`;
                            }
                        });
                    }

                    // Mostrar equipamentos iniciais
                    if (classData.starting_equipment && classData.starting_equipment.length > 0) {
                        characterInfo.innerHTML += "<p>Equipamentos Iniciais:</p>";
                        classData.starting_equipment.forEach(equipment => {
                            characterInfo.innerHTML += `<p>${equipment.quantity}x ${equipment.equipment.name}</p>`;
                        });
                    }
                })
                .catch(error => console.error("Error fetching class data:", error));

            // Fetch dos dados da raça
            fetch(`https://www.dnd5eapi.co/api/races/${raceName}`)
                .then(response => response.json())
                .then(raceData => {
                    raceInfo.innerHTML += `<h3>${raceData.name}</h3>`;
                    raceInfo.innerHTML += `<p>Velocidade: ${raceData.speed} ft</p>`;
                    raceInfo.innerHTML += `<p>Alinhamento: ${raceData.alignment}</p>`;
                    raceInfo.innerHTML += `<p>Idade: ${raceData.age}</p>`;
                    raceInfo.innerHTML += `<p>Tamanho: ${raceData.size}</p>`;
                    if (raceData.size_description) {
                        raceInfo.innerHTML += `<p>Descrição: ${raceData.size_description}</p>`;
                    } else {
                        raceInfo.innerHTML += `<p>Descrição: Nenhuma descrição disponível</p>`;
                    }

                    // Fetch dos idiomas
                    Promise.all(raceData.languages.map(language => fetch(`https://www.dnd5eapi.co${language.url}`).then(response => response.json())))
                        .then(languageDataArray => {
                            raceInfo.innerHTML += "<p>Idiomas:</p>";
                            languageDataArray.forEach(languageData => {
                                raceInfo.innerHTML += `<p>${languageData.name}</p>`;
                            });
                        })
                        .catch(error => console.error("Error fetching language data:", error));
                })
                .catch(error => console.error("Error fetching race data:", error));
        });
    });

    backButton.addEventListener("click", function () {
        images.forEach(img => img.style.display = "block");
        backButton.style.display = "none";
        characterInfo.innerHTML = "";
        raceInfo.innerHTML = "";
    });
});
