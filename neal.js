// Sandboxels AI Controller Mod
// Version 1.0

var aiEnabled = true;

function runAI() {
    if (!aiEnabled) return;

    // 1. Pick a random coordinate
    let x = Math.floor(Math.random() * width);
    let y = Math.floor(Math.random() * height);

    // 2. "See" what is currently there
    let currentPixel = pixelMap[x][y];

    // 3. Logic: Decide what to place based on surroundings
    if (isEmpty(x, y)) {
        // If empty, 10% chance to start "Life" or "Weather"
        let dice = Math.random();
        if (dice < 0.05) {
            createPixel("dirt", x, y);
        } else if (dice < 0.08) {
            createPixel("water", x, y);
        }
    } else {
        // Interaction Logic: If it sees water, try to grow something
        if (currentPixel.element === "water") {
            if (Math.random() < 0.1) {
                createPixel("algae", x, y - 1);
            }
        }
        // If it sees fire, try to extinguish it
        if (currentPixel.element === "fire") {
            createPixel("water", x, y - 5);
        }
    }
}

// Hook into the game's tick (runs every frame)
let oldTick = tick;
tick = function() {
    oldTick();
    // Run the AI 5 times per frame for speed
    for(let i=0; i<5; i++) {
        runAI();
    }
};

console.log("AI Controller Mod Loaded! The AI is now playing.");
