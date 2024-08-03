document.addEventListener('DOMContentLoaded', () => {
    const createCharacterButton = document.getElementById('create-character');
    const charactersList = document.getElementById('characters');

    let characters = JSON.parse(localStorage.getItem('characters')) || [];

    function updateCharacterList() {
        charactersList.innerHTML = '';
        characters.forEach((character, index) => {
            const li = document.createElement('li');
            li.textContent = character.name;
            const selectButton = document.createElement('button');
            selectButton.textContent = 'Selecionar';
            selectButton.dataset.index = index;
            selectButton.addEventListener('click', () => selectCharacter(index));
            li.appendChild(selectButton);
            charactersList.appendChild(li);
        });
    }

    function selectCharacter(index) {
        localStorage.setItem('selectedCharacterIndex', index);
        window.location.href = 'character.html';
    }

    createCharacterButton.addEventListener('click', () => {
        const name = prompt('Nome do personagem:');
        if (name) {
            characters.push({ name, inventory: { weapons: [], ammoPacks: { curtas: [], longas: [] } }, equippedWeapon: null });
            localStorage.setItem('characters', JSON.stringify(characters));
            updateCharacterList();
        }
    });

    updateCharacterList();
});
