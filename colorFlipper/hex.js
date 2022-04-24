// Array for generating hex code
const hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];

// UI variables
const btn = document.getElementById('btn');
const color = document.querySelector('.color')

// Click event lisenner for generating hex
btn.addEventListener('click', function() {
    let hexColor = '#';

    // Loop that generaties a random character for each position
    for(let i = 0; i < 6; i++){
        hexColor += hex[getRandomNumber()]
    }

    // Variables for showing the new generated hex color
    color.textContent = hexColor;
    document.body.style.backgroundColor = hexColor;
});

// function that Generates a random number
function getRandomNumber() {
    return Math.floor(Math.random() * hex.length);
}
