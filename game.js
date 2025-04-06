// Game setup
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 400;
canvas.height = 600;

// Game variables
let score = 0;
let gameOver = false;
let animationId;

// Player (Hanuman)
const player = {
    x: canvas.width / 2 - 25,
    y: canvas.height - 100,
    width: 50,
    height: 60,
    speed: 5,
    dx: 0,
    dy: 0
};

// Platforms
const platforms = [];
for (let i = 0; i < 5; i++) {
    platforms.push({
        x: Math.random() * (canvas.width - 70),
        y: canvas.height - i * 150,
        width: 70,
        height: 15
    });
}

// Game loop
function update() {
    if (gameOver) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw player (simple rectangle for now)
    ctx.fillStyle = '#d4af37';
    ctx.fillRect(player.x, player.y, player.width, player.height);
    
    // Draw platforms
    ctx.fillStyle = '#87CEEB';
    platforms.forEach(platform => {
        ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
    });
    
    // Movement
    player.x += player.dx;
    
    // Apply gravity
    player.dy += 0.2;
    player.y += player.dy;
    
    // Platform collision
    platforms.forEach(platform => {
        if (player.y + player.height >= platform.y && 
            player.y <= platform.y + platform.height &&
            player.x + player.width >= platform.x && 
            player.x <= platform.x + platform.width &&
            player.dy > 0) {
            player.dy = -10; // Jump
        }
    });
    
    // Game over check
    if (player.y > canvas.height) {
        gameOver = true;
        alert(`Game Over! Score: ${score}`);
    }
    
    // Score (based on height)
    if (player.y < canvas.height / 2) {
        score += 1;
        document.getElementById('score').textContent = score;
    }
    
    animationId = requestAnimationFrame(update);
}

// Keyboard controls
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') player.dx = player.speed;
    if (e.key === 'ArrowLeft') player.dx = -player.speed;
});

document.addEventListener('keyup', () => {
    player.dx = 0;
});

// Start game
update();
