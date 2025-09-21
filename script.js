let editingIndex = null;
let items = JSON.parse(localStorage.getItem('items') || '[]');

function saveToStorage() {
    localStorage.setItem('items', JSON.stringify(items));
}

function hideForm() {
    document.getElementById('form-section').style.display = 'none';

    document.getElementById('list-container').style.display = 'block';
    document.getElementById('item-input').value = '';
    editingIndex = null;

    renderList();
}

function showCreateForm() {
    editingIndex = null;
    document.getElementById('item-input').value = '';
    document.getElementById('form-section').style.display = 'block';

    document.getElementById('list-container').style.display = 'none';
}


function saveItem() {
    const value = document.getElementById('item-input').value;
    if (editingIndex === null) {
        items.push(value);
    } else {
        items[editingIndex] = value;
    }
    saveToStorage();
    hideForm();
}

function editItem(i) {
    editingIndex = i;
    document.getElementById('item-input').value = items[i];
    document.getElementById('form-section').style.display = 'block';

    document.getElementById('list-container').style.display = 'none';
}

function deleteItem(i) {
    items.splice(i, 1);
    saveToStorage();
    renderList();
}

// function renderList() {
//     const listSection = document.getElementById('list-section');
//     listSection.innerHTML = items.map((item, i) => `
//             <div>
//             ${item}
//             <button onclick="editItem(${i})">Editar</button>
//             <button onclick="deleteItem(${i})">Deletar</button>
//             </div>
//         `).join('');
// }

function renderList() {
    const listSection = document.getElementById('list-section');
    if (items.length === 0) {
        listSection.innerHTML = `<div class="result">Nenhum item cadastrado.</div>`;
        return;
    }
    listSection.innerHTML = `
        <ul class="list-section">
            ${items.map((item, i) => `
                <li>
                    <span>${item}</span>
                    <button class="actionButton edit" onclick="editItem(${i})">Editar</button>
                    <button class="actionButton delete" onclick="deleteItem(${i})">Deletar</button>
                </li>
            `).join('')}
        </ul>
    `;
}

window.onload = () => {
    renderList();
};