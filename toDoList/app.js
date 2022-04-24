// List of UI variables
const form = document.querySelector('#chore-form');
const choreList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-chores');
const filter = document.querySelector('#filter');
const choreInput = document.querySelector('#chore');

// Load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners() {
    // On dom load call function getChores
    document.addEventListener('DOMContentLoaded', getChores);
    form.addEventListener('submit', addChore);
    choreList.addEventListener('click', removeChore);
    clearBtn.addEventListener('click', clearChores);
    filter.addEventListener('keyup', filterChores);
}

// Get Chores from localhost
function getChores() {
    let chores;
    // Checks localstorage for chores
    if (localStorage.getItem('chores') === null) {
        chores = [];
    } else {
        chores = JSON.parse(localStorage.getItem('chores'));
    }


    chores.forEach(function (chore) {
        // Creates new li element
        const li = document.createElement('li')
        li.className = 'collection-item';
        li.appendChild(document.createTextNode(chore));

        // Creates new a element
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        link.innerHTML = '<i class="fa fa-remove"></i>';
        li.appendChild(link);

        // Append li to ul
        choreList.appendChild(li);
    });
}

// Add Chore
function addChore(e) {
    // Checks if input is empty
    if (choreInput.value === '') {
        alert('Add a chore');
    }

    // Creates new li element
    const li = document.createElement('li')
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(choreInput.value));

    // Creates new a element
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="fa fa-remove"></i>';
    li.appendChild(link);

    choreList.appendChild(li);

    // calls function to store user input in localstorage
    storeChoreInLocalStorage(choreInput.value);

    // resets value in chore input
    choreInput.value = '';

    e.preventDefault();
}

// Store Chore
function storeChoreInLocalStorage(chore) {
    let chores;

    // Checks localstorage for chores
    if (localStorage.getItem('chores') === null) {
        chores = [];
    } else {
        chores = JSON.parse(localStorage.getItem('chores'));
    }

    // Pushes choreInout value to chores array in localstorage
    chores.push(chore);
    localStorage.setItem('chores', JSON.stringify(chores));
}

// Remove Chore
function removeChore(e) {

    console.log(e.target.classList)
    // Checks if parent element of remove button has delete-item class
    if (e.target.parentElement.classList.contains('delete-item')) {
        if (confirm('Are you sure?')) {
            e.target.parentElement.parentElement.remove();

            // Remove chore from localstorage
            removeChoreFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

// Remove from LS
function removeChoreFromLocalStorage(choreItem) {
    let chores;
    // Checks localstorage for chores
    if (localStorage.getItem('chores') === null) {
        chores = [];
    } else {
        chores = JSON.parse(localStorage.getItem('chores'));
    }


    chores.forEach(function (chore, index) {
        if (choreItem.textContent === chore) {
            chores.splice(index, 1);
        }
    });
    localStorage.setItem('chores', JSON.stringify(chores));
}

// Clear Chores
function clearChores() {
    while (choreList.firstChild) {
        choreList.removeChild(choreList.firstChild);
    }

    // Clear from localstorage
    clearChoresFromLocalStorage();
}

// Clear Chores from localstorage
function clearChoresFromLocalStorage() {
    localStorage.clear();
}

// Filter Chores
function filterChores(e) {
    const text = e.target.value.toLowerCase();
    
    document.querySelectorAll('.collection-item').forEach(
        function (chore) {
            const item = chore.firstChild.textContent;
            if (item.toLowerCase().indexOf(text) != -1) {
                
            } else {
                chore.style.display = 'none';
            }
        });
}