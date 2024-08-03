document.addEventListener('DOMContentLoaded', () => {
    const backToMenuButton = document.getElementById('back-to-menu');
    const deleteCharacterButton = document.getElementById('delete-character');
    const showAddWeaponMenuButton = document.getElementById('show-add-weapon-menu');
    const closeAddWeaponMenuButton = document.getElementById('close-add-weapon-menu');
    const addWeaponMenu = document.getElementById('add-weapon-menu');
    const showAddAmmoMenuButton = document.getElementById('show-add-ammo-menu');
    const closeAddAmmoMenuButton = document.getElementById('close-add-ammo-menu');
    const addAmmoMenu = document.getElementById('add-ammo-menu');
    const weaponList = document.getElementById('weapon-list');
    const ammoList = document.getElementById('ammo-list');
    const equippedWeaponSection = document.getElementById('equipped-weapon-section');
    const equippedWeaponName = document.getElementById('equipped-weapon-name');
    const equippedWeaponAmmo = document.getElementById('equipped-weapon-ammo');
    const reloadWeaponButton = document.getElementById('reload-weapon');
    const fireBurstButton = document.getElementById('fire-burst');
    const unequipWeaponButton = document.getElementById('unequip-weapon');
    const ammoControls = document.querySelector('.ammo-controls');
    const increaseAmmoButton = document.getElementById('increase-ammo');
    const decreaseAmmoButton = document.getElementById('decrease-ammo');
    const ammoAmountSpan = document.getElementById('ammo-amount');
    const burstControls = document.getElementById('burst-controls');
    const characterNameElement = document.getElementById('character-name');

    let characters = JSON.parse(localStorage.getItem('characters')) || [];
    let currentCharacterIndex = parseInt(localStorage.getItem('selectedCharacterIndex'), 10);
    let character = characters[currentCharacterIndex];

    characterNameElement.textContent = `Inventário de ${character.name}`;

    function updateWeaponList() {
        weaponList.innerHTML = '';
        character.inventory.weapons.forEach((weapon, index) => {
            const li = document.createElement('li');
            li.textContent = `${weapon.name} (${weapon.currentAmmo || 0} / ${weapon.maxAmmo})`;
            const equipButton = document.createElement('button');
            equipButton.textContent = 'Equipar';
            equipButton.dataset.index = index;
            equipButton.addEventListener('click', () => equipWeapon(index));
            li.appendChild(equipButton);

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Deletar';
            deleteButton.dataset.index = index;
            deleteButton.addEventListener('click', () => deleteWeapon(index));
            li.appendChild(deleteButton);

            weaponList.appendChild(li);
        });
    }

    function updateAmmoList() {
        ammoList.innerHTML = '';
        ['curtas', 'longas'].forEach(type => {
            character.inventory.ammoPacks[type].forEach((pack, index) => {
                const li = document.createElement('li');
                li.textContent = `Pacote de Munição ${type} (${pack} balas)`;
                const incrementButton = document.createElement('button');
                incrementButton.textContent = '+';
                incrementButton.dataset.index = index;
                incrementButton.dataset.type = type;
                incrementButton.addEventListener('click', () => adjustAmmoPack(type, index, 1));
                li.appendChild(incrementButton);

                const decrementButton = document.createElement('button');
                decrementButton.textContent = '-';
                decrementButton.dataset.index = index;
                decrementButton.dataset.type = type;
                decrementButton.addEventListener('click', () => adjustAmmoPack(type, index, -1));
                li.appendChild(decrementButton);

                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Deletar';
                deleteButton.dataset.index = index;
                deleteButton.dataset.type = type;
                deleteButton.addEventListener('click', () => deleteAmmoPack(type, index));
                li.appendChild(deleteButton);

                ammoList.appendChild(li);
            });
        });
    }

    function updateEquippedWeapon() {
        if (character.equippedWeapon) {
            equippedWeaponSection.classList.remove('hidden');
            equippedWeaponName.textContent = character.equippedWeapon.name;
            equippedWeaponAmmo.textContent = `${character.equippedWeapon.currentAmmo} / ${character.equippedWeapon.maxAmmo}`;
            ammoAmountSpan.textContent = character.equippedWeapon.currentAmmo;

            if (character.equippedWeapon.name === 'Submetralhadora' || character.equippedWeapon.name === 'Fuzil de Assalto') {
                burstControls.classList.remove('hidden');
            } else {
                burstControls.classList.add('hidden');
            }
        } else {
            equippedWeaponSection.classList.add('hidden');
        }
    }

    function equipWeapon(index) {
        if (character.equippedWeapon) {
            character.inventory.weapons.push(character.equippedWeapon);
        }
        character.equippedWeapon = character.inventory.weapons.splice(index, 1)[0];
        updateWeaponList();
        updateEquippedWeapon();
    }

    function unequipWeapon() {
        if (character.equippedWeapon) {
            character.inventory.weapons.push(character.equippedWeapon);
            character.equippedWeapon = null;
            updateWeaponList();
            updateEquippedWeapon();
        }
    }

    function reloadWeapon() {
        if (character.equippedWeapon) {
            const ammoType = ['Pistola', 'Revólver', 'Submetralhadora'].includes(character.equippedWeapon.name) ? 'curtas' : 'longas';
            for (let i = 0; i < character.inventory.ammoPacks[ammoType].length; i++) {
                const ammoNeeded = character.equippedWeapon.maxAmmo - character.equippedWeapon.currentAmmo;
                if (ammoNeeded > 0 && character.inventory.ammoPacks[ammoType][i] > 0) {
                    const ammoToTransfer = Math.min(ammoNeeded, character.inventory.ammoPacks[ammoType][i]);
                    character.equippedWeapon.currentAmmo += ammoToTransfer;
                    character.inventory.ammoPacks[ammoType][i] -= ammoToTransfer;
                    if (character.inventory.ammoPacks[ammoType][i] <= 0) {
                        character.inventory.ammoPacks[ammoType].splice(i, 1);
                        i--;
                    }
                }
                updateAmmoList();
                updateEquippedWeapon();
            }
        }
    }

    function fireBurst() {
        if (character.equippedWeapon && (character.equippedWeapon.name === 'Submetralhadora' || character.equippedWeapon.name === 'Fuzil de Assalto')) {
            if (character.equippedWeapon.currentAmmo >= 10) {
                character.equippedWeapon.currentAmmo -= 10;
                updateEquippedWeapon();
            }
        }
    }

    function deleteCharacter() {
        if (confirm('Tem certeza de que deseja deletar este personagem?')) {
            characters.splice(currentCharacterIndex, 1);
            localStorage.setItem('characters', JSON.stringify(characters));
            window.location.href = 'index.html';
        }
    }

    function adjustAmmoPack(type, index, delta) {
        if (delta === 1) {
            character.inventory.ammoPacks[type][index]++;
        } else {
            if (character.inventory.ammoPacks[type][index] > 0) {
                character.inventory.ammoPacks[type][index]--;
                if (character.inventory.ammoPacks[type][index] <= 0) {
                    character.inventory.ammoPacks[type].splice(index, 1);
                }
            }
        }
        updateAmmoList();
    }

    function addAmmoPack(type, amount) {
        character.inventory.ammoPacks[type].push(amount);
        updateAmmoList();
    }

    function deleteWeapon(index) {
        if (confirm('Tem certeza de que deseja deletar esta arma?')) {
            character.inventory.weapons.splice(index, 1);
            updateWeaponList();
        }
    }

    function deleteAmmoPack(type, index) {
        if (confirm('Tem certeza de que deseja deletar este pacote de munição?')) {
            character.inventory.ammoPacks[type].splice(index, 1);
            updateAmmoList();
        }
    }

    function updateAmmoAmount(amount) {
        if (character.equippedWeapon) {
            character.equippedWeapon.currentAmmo = Math.max(0, Math.min(character.equippedWeapon.maxAmmo, character.equippedWeapon.currentAmmo + amount));
            ammoAmountSpan.textContent = character.equippedWeapon.currentAmmo;
            updateEquippedWeapon();
        }
    }

    showAddWeaponMenuButton.addEventListener('click', () => {
        addWeaponMenu.classList.remove('hidden');
    });

    closeAddWeaponMenuButton.addEventListener('click', () => {
        addWeaponMenu.classList.add('hidden');
    });

    showAddAmmoMenuButton.addEventListener('click', () => {
        addAmmoMenu.classList.remove('hidden');
    });

    closeAddAmmoMenuButton.addEventListener('click', () => {
        addAmmoMenu.classList.add('hidden');
    });

    addWeaponMenu.querySelectorAll('button[data-weapon]').forEach(button => {
        button.addEventListener('click', () => {
            const weaponName = button.dataset.weapon;
            const weapon = {
                name: weaponName,
                maxAmmo: {
                    'Pistola': 12,
                    'Revólver': 6,
                    'Fuzil de Caça': 4,
                    'Submetralhadora': 20,
                    'Espingarda': 6,
                    'Fuzil de Assalto': 30,
                    'Fuzil de Precisão': 1,
                    'Metralhadora': 50
                }[weaponName],
                currentAmmo: 0
            };
            character.inventory.weapons.push(weapon);
            updateWeaponList();
            addWeaponMenu.classList.add('hidden');
        });
    });

    addAmmoMenu.querySelectorAll('button[data-ammo]').forEach(button => {
        button.addEventListener('click', () => {
            const ammoType = button.dataset.ammo;
            addAmmoPack(ammoType, 20);
            addAmmoMenu.classList.add('hidden');
        });
    });

    backToMenuButton.addEventListener('click', () => {
        window.location.href = 'index.html';
    });

    deleteCharacterButton.addEventListener('click', deleteCharacter);
    reloadWeaponButton.addEventListener('click', reloadWeapon);
    fireBurstButton.addEventListener('click', fireBurst);
    unequipWeaponButton.addEventListener('click', unequipWeapon);
    increaseAmmoButton.addEventListener('click', () => updateAmmoAmount(1));
    decreaseAmmoButton.addEventListener('click', () => updateAmmoAmount(-1));

    updateWeaponList();
    updateAmmoList();
    updateEquippedWeapon();
});
