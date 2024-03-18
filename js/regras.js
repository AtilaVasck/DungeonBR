document.getElementById('mostrarRegras').addEventListener('click', function() {
    const regrasContainer = document.getElementById('regrasContainer');
    regrasContainer.classList.toggle('hidden');

    if (!regrasContainer.classList.contains('hidden')) {
        fetch('https://www.dnd5eapi.co/api/')
            .then(response => response.json())
            .then(data => {
                let html = '';

                for (const [key, value] of Object.entries(data)) {
                    if (key === 'rule-sections') {
                        html += '<h2>Regras</h2>';
                        html += '<ul>';
                        for (const ruleSection of value) {
                            html += `<li data-section="${ruleSection}">${ruleSection}</li>`;
                        }
                        html += '</ul>';
                    } else {
                        html += `<h2>${key}</h2>`;
                        html += '<ul>';
                        for (const item of value) {
                            html += `<li data-item="${item}">${item}</li>`;
                        }
                        html += '</ul>';
                    }
                }

                regrasContainer.innerHTML = html;

                // Adiciona evento de clique aos itens da lista
                regrasContainer.querySelectorAll('li').forEach(item => {
                    item.addEventListener('click', function() {
                        const section = this.getAttribute('data-section');
                        const item = this.getAttribute('data-item');
                        if (section) {
                            fetch(`https://www.dnd5eapi.co/api/${section}`)
                                .then(response => response.json())
                                .then(data => {
                                    // Mostra os detalhes da seção
                                    regrasContainer.innerHTML = `<h2>${section}</h2><p>${JSON.stringify(data)}</p>`;
                                })
                                .catch(error => console.error('Erro ao obter dados da API:', error));
                        } else if (item) {
                            fetch(`https://www.dnd5eapi.co/api/${item}`)
                                .then(response => response.json())
                                .then(data => {
                                    // Mostra os detalhes do item
                                    regrasContainer.innerHTML = `<h2>${item}</h2><p>${JSON.stringify(data)}</p>`;
                                })
                                .catch(error => console.error('Erro ao obter dados da API:', error));
                        }
                    });
                });
            })
            .catch(error => console.error('Erro ao obter dados da API:', error));
    }
});
