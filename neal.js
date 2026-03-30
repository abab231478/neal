// Sandboxels AI Controller - Safe Version
(function() {
    console.log("AI Mod Initializing...");

    // Function to handle the AI's logic
    function aiTick() {
        if (!window.gameActive || !window.pixelMap) return;

        // Try 10 actions per tick
        for (let i = 0; i < 10; i++) {
            let x = Math.floor(Math.random() * width);
            let y = Math.floor(Math.random() * height);

            // 1. If empty, randomly seed the world
            if (isEmpty(x, y)) {
                let r = Math.random();
                if (r < 0.01) createPixel("dirt", x, y);
                if (r > 0.99) createPixel("water", x, y);
            } 
            
            // 2. React to existing pixels
            else {
                let p = pixelMap[x][y];
                // If it sees fire, try to "help" with water
                if (p.element === "fire") {
                    createPixel("water", x, y - 2);
                }
                // If it sees plant life, give it a friend
                if (p.element === "grass" && Math.random() > 0.95) {
                    createPixel("flower", x + 1, y);
                }
            }
        }
    }

    // Safely hook into the game loop
    if (window.update) {
        let oldUpdate = window.update;
        window.update = function() {
            oldUpdate();
            aiTick();
        };
        console.log("AI Mod Active! Watch the canvas.");
    } else {
        console.error("Game engine not found. Are you on neal.fun/sandboxels?");
    }
})();
