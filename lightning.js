const canvas = document.getElementById("lightning");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let lightningBolts = [];
let lightTimeCurrent = 0;
let lightTimeTotal = 1000;

// Helper function for random values
function rand(min, max) {
  return Math.random() * (max - min) + min;
}

// Create a lightning bolt object
function createLightning(x, y, canBranch) {
  return {
    x: x,
    y: y,
    xRange: rand(5, 30),
    yRange: rand(10, 20),
    path: [{ x: x, y: y }],
    pathLimit: rand(10, 35),
    canBranch: canBranch,
  };
}

// Update the lightning bolts
function updateLightning() {
  for (let i = lightningBolts.length - 1; i >= 0; i--) {
    const bolt = lightningBolts[i];
    const last = bolt.path[bolt.path.length - 1];

    bolt.path.push({
      x: last.x + rand(-bolt.xRange / 2, bolt.xRange / 2),
      y: last.y + bolt.yRange,
    });

    if (bolt.path.length > bolt.pathLimit) {
      lightningBolts.splice(i, 1);
    }

    // Add branches occasionally
    if (bolt.canBranch && Math.random() < 0.1) {
      lightningBolts.push(createLightning(last.x, last.y, false));
    }
  }
}

// Draw the lightning bolts
function drawLightning() {
  ctx.strokeStyle = "rgba(255, 255, 255, 0.8)";
  ctx.lineWidth = 2;

  for (const bolt of lightningBolts) {
    ctx.beginPath();
    ctx.moveTo(bolt.path[0].x, bolt.path[0].y);

    for (const segment of bolt.path) {
      ctx.lineTo(segment.x, segment.y);
    }

    ctx.stroke();
  }
}

// Clear the canvas with a slight fade
function clearCanvas() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Lightning generation timer
function lightningTimer() {
  lightTimeCurrent += 16; // Assuming ~60fps
  if (lightTimeCurrent >= lightTimeTotal) {
    const x = rand(100, canvas.width - 100);
    const y = rand(0, canvas.height / 2);
    lightningBolts.push(createLightning(x, y, true));
    lightTimeCurrent = 0;
    lightTimeTotal = rand(500, 1500); // Adjust timing dynamically
  }
}

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  clearCanvas();
  updateLightning();
  drawLightning();
}

// Start animation after delay
setTimeout(() => {
  animate();
}, 2000); // 2-second delay to show the company name first
