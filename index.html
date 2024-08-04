document.addEventListener('DOMContentLoaded', () => {
    const createCharacterButton = document.getElementById('create-character');
    const charactersList = document.getElementById('characters');
    const backToMainButton = document.getElementById('back-to-main');
    const addWeaponButton = document.getElementById('add-weapon');
    const addAmmoButton = document.getElementById('add-ammo');
    const itemList = document.getElementById('item-list');
    const weaponNameElem = document.getElementById('weapon-name');
    const weaponAmmoElem = document.getElementById('weapon-ammo');
    const equipButton = document.getElementById('equip-button');
    const desequipButton = document.getElementById('deselect-button');
    const reloadButton = document.getElementById('reload-button');
    const ammoList = document.getElementById('ammo-list');

    let characters = JSON.parse(localStorage.getItem('characters')) || [];
    let selectedCharacterIndex = localStorage.getItem('selectedCharacterIndex');
    let selectedCharacter = characters[selectedCharacterIndex];

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

    function updateInventory() {
        itemList.innerHTML = '';
        selectedCharacter.inventory.weapons.forEach((weapon, index) => {
            const li = document.createElement('li');
            li.textContent = `${weapon.name} - ${weapon.ammo} balas`;
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remover';
            removeButton.dataset.index = index;
            removeButton.addEventListener('click', () => removeWeapon(index));
            li.appendChild(removeButton);
            itemList.appendChild(li);
        });

        ammoList.innerHTML = '';
        ['curtas', 'longas'].forEach(type => {
            selectedCharacter.inventory.ammoPacks[type].forEach((pack, index) => {
                const li = document.createElement('li');
                li.textContent = `${type === 'curtas' ? 'Bala Curta' : 'Bala Longa'} - 20 balas`;
                const removeButton = document.createElement('button');
                removeButton.textContent = 'Remover';
                removeButton.dataset.type = type;
                removeButton.dataset.index = index;
                removeButton.addEventListener('click', () => removeAmmoPack(type, index));
                li.appendChild(removeButton);
                ammoList.appendChild(li);
            });
        });
    }

    function updateEquippedWeapon() {
        if (selectedCharacter.equippedWeapon) {
            weaponNameElem.textContent = selectedCharacter.equippedWeapon.name;
            weaponAmmoElem.textContent = `Munição: ${selectedCharacter.equippedWeapon.ammo}`;
            equipButton.style.display = 'none';
            desequipButton.style.display = 'inline';
            reloadButton.style.display = 'inline';
        } else {
            weaponNameElem.textContent = 'Nenhuma';
            weaponAmmoElem.textContent = 'Munição: 0';
            equipButton.style.display = 'inline';
            desequipButton.style.display = 'none';
            reloadButton.style.display = 'none';
        }
    }

    function addWeapon() {
        const weaponType = prompt('Digite o tipo da arma (Pistola, Revólver, Fuzil de Caça, Submetralhadora, Espingarda, Fuzil de Assalto, Fuzil de Precisão, Metralhadora):');
        const weaponAmmo = getWeaponAmmo(weaponType);
        if (weaponType && weaponAmmo !== null) {
            selectedCharacter.inventory.weapons.push({ name: weaponType, ammo: 0, maxAmmo: weaponAmmo });
            localStorage.setItem('characters', JSON.stringify(characters));
            updateInventory();
        }
    }

    function removeWeapon(index) {
        const weapon = selectedCharacter.inventory.weapons[index];
        if (weapon === selectedCharacter.equippedWeapon) {
            desequipWeapon();
        }
        selectedCharacter.inventory.weapons.splice(index, 1);
        localStorage.setItem('characters', JSON.stringify(characters));
        updateInventory();
    }

    function addAmmo() {
        const ammoType = prompt('Digite o tipo de munição (curtas ou longas):');
        if (ammoType === 'curtas' || ammoType === 'longas') {
            selectedCharacter.inventory.ammoPacks[ammoType].push({ bullets: 20 });
            localStorage.setItem('characters', JSON.stringify(characters));
            updateInventory();
        } else {
            alert('Tipo de munição inválido!');
        }
    }

    function removeAmmoPack(type, index) {
        selectedCharacter.inventory.ammoPacks[type].splice(index, 1);
        localStorage.setItem('characters', JSON.stringify(characters));
        updateInventory();
    }

    function equipWeapon() {
        const weaponIndex = prompt('Digite o índice da arma para equipar:');
        const weapon = selectedCharacter.inventory.weapons[weaponIndex];
        if (weapon) {
            selectedCharacter.equippedWeapon = weapon;
            localStorage.setItem('characters', JSON.stringify(characters));
            updateEquippedWeapon();
        }
    }

    function desequipWeapon() {
        if (selectedCharacter.equippedWeapon) {
            selectedCharacter.inventory.weapons.push(selectedCharacter.equippedWeapon);
            selectedCharacter.equippedWeapon = null;
            localStorage.setItem('characters', JSON.stringify(characters));
            updateInventory();
            updateEquippedWeapon();
        }
    }

    function reloadWeapon() {
        if (selectedCharacter.equippedWeapon) {
            const ammoType = selectedCharacter.equippedWeapon.maxAmmo <= 20 ? 'curtas' : 'longas';
            const ammoPack = selectedCharacter.inventory.ammoPacks[ammoType].pop();
            if (ammoPack) {
                const ammoToAdd = Math.min(ammoPack.bullets, selectedCharacter.equippedWeapon.maxAmmo - selectedCharacter.equippedWeapon.ammo);
                selectedCharacter.equippedWeapon.ammo += ammoToAdd;
                ammoPack.bullets -= ammoToAdd;
                if (ammoPack.bullets === 0) {
                    selectedCharacter.inventory.ammoPacks[ammoType] = selectedCharacter.inventory.ammoPacks[ammoType].filter(pack => pack !== ammoPack);
                }
                localStorage.setItem('characters', JSON.stringify(characters));
                updateEquippedWeapon();
                updateInventory();
            } else {
                alert('Nenhum pacote de munição disponível!');
            }
        }
    }

    function burstFire() {
        if (selectedCharacter.equippedWeapon && ['Submetralhadora', 'Fuzil de Assalto'].includes(selectedCharacter.equippedWeapon.name)) {
            selectedCharacter.equippedWeapon.ammo = Math.max(selectedCharacter.equippedWeapon.ammo - 10, 0);
            localStorage.setItem('characters', JSON.stringify(characters));
            updateEquippedWeapon();
        }
    }

    function confirmAndDeleteCharacter() {
        const confirmDelete = confirm('Tem certeza de que deseja deletar este personagem?');
        if (confirmDelete) {
            characters.splice(selectedCharacterIndex, 1);
            localStorage.setItem('characters', JSON.stringify(characters));
            window.location.href = 'index.html';
        }
    }

    if (backToMainButton) {
        backToMainButton.addEventListener('click', () => {
            window.location.href = 'index.html';
        });
    }

    if (addWeaponButton) {
        addWeaponButton.addEventListener('click', addWeapon);
    }

    if (addAmmoButton) {
        addAmmoButton.addEventListener('click', addAmmo);
    }

    if (equipButton) {
        equipButton.addEventListener('click', equipWeapon);
    }

    if (desequipButton) {
        desequipButton.addEventListener('click', desequipWeapon);
    }

    if (reloadButton) {
        reloadButton.addEventListener('click', reloadWeapon);
    }

    if (burstControls) {
        burstControls.addEventListener('click', burstFire);
    }

    if (confirmDeleteButton) {
        confirmDeleteButton.addEventListener('click', confirmAndDeleteCharacter);
    }

    updateInventory();
    updateEquippedWeapon();
});
