import { v4 as uuid } from 'uuid';

const birdSpecies = ['Macaws', 'Toucan', 'Cardinal', 'Canary', 'Cockatoo', 'Scarlet', 'Spoonbill', 'Geese', 'Pigeon', 'Owl'];
const habitatTypes = ['Nest', 'Roost', 'Perch', 'Hollow', 'Burrow', 'Lodge', 'Shelter'];

// Randomizers
function getRandomLongitude() {
    return Math.random() * 360 - 180;
}

function getRandomLatitude() {
    return Math.random() * 180 - 90;
}

function randomNumber() {
    return Math.floor(Math.random() * 10);
}

// Function to generate birdhouse names
function generateBirdhouseName() {
    const randomSpeciesIndex = Math.floor(Math.random() * birdSpecies.length);
    const randomHabitatIndex = Math.floor(Math.random() * habitatTypes.length);

    const birdSpeciesName = birdSpecies[randomSpeciesIndex];
    const habitatTypeName = habitatTypes[randomHabitatIndex];

    return `${birdSpeciesName} ${habitatTypeName}`;
}

// Create birdhouses
const numberOfBirdhouses = 10; // Change this to the desired number
const birdhouses = [];

for (let i = 0; i < numberOfBirdhouses; i++) {
    birdhouses.push({
        ubid: uuid(),
        name: generateBirdhouseName(),
        longitude: getRandomLongitude(),
        latitude: getRandomLatitude(),
        birds: randomNumber(),
        eggs: randomNumber(),
    });
}

export { birdhouses };
