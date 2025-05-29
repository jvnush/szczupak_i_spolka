const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// --- Łódka ---
const boat = {
  x: 100,
  y: 40,
  width: 100,
  height: 30,
  speed: 5
};

// --- Haczyk ---
const hook = {
  y: boat.y + boat.height,
  width: 12,
  height: 40,
  speed: 5
};

// --- Rodzaje ryb ---
const fishTypes = [
  { color: '#FFA500', points: 1, speed: 2, size: 30 },  // Pomarańczowa
  { color: '#FF6347', points: 3, speed: 3, size: 40 },  // Czerwona
  { color: '#FFD700', points: 5, speed: 4, size: 50 }   // Złota
];

let fishArray = [];
function createFish() {
  const type = fishTypes[Math.floor(Math.random() * fishTypes.length)];
  const y = Math.random() * (canvas.height - 150) + 120;
  fishArray.push({
    x: canvas.width + 60,
    y,
    width: type.size,
    height: type.size / 2,
    color: type.color,
    speed: type.speed,
    points: type.points
  });
}

let keys = {};
let score = 0;
let timeLeft = 60;

// Obsługa klawiszy
window.addEventListener("keydown", function(e) {
  if(["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
    e.preventDefault();
    keys[e.key] = true;
  }
}, { passive: false });

window.addEventListener("keyup", e => {
  keys[e.key] = false;
});

function drawBoat() {
  // Gradient drewna z większą głębią
  const grad = ctx.createLinearGradient(boat.x, boat.y, boat.x + boat.width, boat.y + boat.height);
  grad.addColorStop(0, "#a67c52");
  grad.addColorStop(0.5, "#8B5A2B");
  grad.addColorStop(1, "#5C4033");

  // Kadłub z lekkim zaokrągleniem i detalami
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.moveTo(boat.x, boat.y + boat.height * 0.7);
  ctx.quadraticCurveTo(boat.x + boat.width / 2, boat.y + boat.height + 8, boat.x + boat.width, boat.y + boat.height * 0.7);
  ctx.lineTo(boat.x + boat.width - 10, boat.y);
  ctx.lineTo(boat.x + 10, boat.y);
  ctx.closePath();
  ctx.fill();

  // Kontur kadłuba
  ctx.strokeStyle = "#3a1f0f";
  ctx.lineWidth = 2;
  ctx.stroke();

  // Linie desek (detal)
  ctx.strokeStyle = "rgba(60,40,20,0.3)";
  ctx.lineWidth = 1;
  for (let i = 1; i < 4; i++) {
    ctx.beginPath();
    ctx.moveTo(boat.x + i * boat.width / 4, boat.y + 6);
    ctx.lineTo(boat.x + i * boat.width / 4, boat.y + boat.height * 0.7);
    ctx.stroke();
  }

  // Maszt
  ctx.strokeStyle = "#444";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(boat.x + boat.width / 2, boat.y);
  ctx.lineTo(boat.x + boat.width / 2, boat.y - 40);
  ctx.stroke();

  // Żagiel z lekkim cieniem
  ctx.fillStyle = "#fff";
  ctx.beginPath();
  ctx.moveTo(boat.x + boat.width / 2, boat.y - 40);
  ctx.lineTo(boat.x + boat.width / 2 + 20, boat.y - 10);
  ctx.lineTo(boat.x + boat.width / 2, boat.y - 10);
  ctx.closePath();
  ctx.shadowColor = "rgba(0,0,0,0.15)";
  ctx.shadowBlur = 6;
  ctx.fill();
  ctx.shadowBlur = 0;
  ctx.strokeStyle = "#bbb";
  ctx.stroke();
}

function drawHook() {
  const hookX = boat.x + boat.width / 2;
  const hookTopY = boat.y + boat.height;
  const shaftLen = hook.height * 0.6;
  const bendRadius = 13;

  // Linka
  ctx.strokeStyle = '#555';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(hookX, hookTopY);
  ctx.lineTo(hookX, hook.y);
  ctx.stroke();

  // Oczko haczyka (na górze)
  ctx.beginPath();
  ctx.arc(hookX, hook.y, 3, 0, Math.PI * 2);
  ctx.fillStyle = "#222";
  ctx.fill();

  // Trzon haczyka
  ctx.strokeStyle = '#222';
  ctx.lineWidth = 2.2;
  ctx.beginPath();
  ctx.moveTo(hookX, hook.y);
  ctx.lineTo(hookX, hook.y + shaftLen);
  ctx.stroke();

  // Zakrzywiony łuk haczyka (bardziej otwarty)
  ctx.beginPath();
  ctx.arc(
    hookX,
    hook.y + shaftLen,
    bendRadius,
    Math.PI * 0.85,
    Math.PI * 2.1,
    false
  );
  ctx.stroke();

  // Ostry czubek
  ctx.beginPath();
  ctx.moveTo(
    hookX + bendRadius * Math.cos(Math.PI * 2.1),
    hook.y + shaftLen + bendRadius * Math.sin(Math.PI * 2.1)
  );
  ctx.lineTo(
    hookX + bendRadius * Math.cos(Math.PI * 2.1) + 10,
    hook.y + shaftLen + bendRadius * Math.sin(Math.PI * 2.1) - 4
  );
  ctx.stroke();

  // Zadzior (mały haczyk skierowany do środka)
  ctx.beginPath();
  ctx.moveTo(
    hookX + bendRadius * Math.cos(Math.PI * 2.1) + 5,
    hook.y + shaftLen + bendRadius * Math.sin(Math.PI * 2.1) - 2
  );
  ctx.lineTo(
    hookX + bendRadius * Math.cos(Math.PI * 2.1) + 7,
    hook.y + shaftLen + bendRadius * Math.sin(Math.PI * 2.1) - 7
  );
  ctx.stroke();
}


// Rysowanie ryby z ogonem
function drawFish(fish) {
  ctx.save();
  ctx.translate(fish.x, fish.y);

  // Ciało ryby (owalne)
  ctx.fillStyle = fish.color;
  ctx.beginPath();
  ctx.ellipse(0, 0, fish.width * 0.7, fish.height * 0.8, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "#333";
  ctx.lineWidth = 1;
  ctx.stroke();

  // Ogon po prawej (z tyłu ryby, która płynie w lewo)
  ctx.beginPath();
  ctx.moveTo(fish.width * 0.7, 0); // Punkt przyczepienia ogona
  ctx.lineTo(fish.width * 0.9, -fish.height * 0.6);
  ctx.lineTo(fish.width * 0.9, fish.height * 0.6);
  ctx.closePath();
  ctx.fill();

  // Oko z przodu (lewa część ryby)
  ctx.fillStyle = '#000';
  ctx.beginPath();
  ctx.arc(-fish.width * 0.3, -fish.height * 0.3, 3, 0, 2 * Math.PI);
  ctx.fill();

  ctx.restore();
}

// Fale u góry
function drawWaves() {
  ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
  for (let i = 0; i < 15; i++) {
    const waveX = (i * 60) + (Date.now() * 0.005 % 60);
    const waveY = 60 + Math.sin(Date.now() * 0.005 + i) * 8;
    ctx.beginPath();
    ctx.arc(waveX, waveY, 40, 0, Math.PI, false);
    ctx.fill();
  }
}

// Wynik i czas
function drawScoreboard() {
  ctx.fillStyle = "#fff";
  ctx.font = "22px Arial";
  ctx.shadowColor = "black";
  ctx.shadowBlur = 5;
  ctx.fillText(`Wynik: ${score}`, 20, 40);
  ctx.fillText(`Czas: ${timeLeft}s`, canvas.width - 140, 40);
  ctx.shadowBlur = 0;
}

// Kolizja
function checkCollisions() {
  const hookX = boat.x + boat.width / 2 - hook.width / 2;
  for (let i = 0; i < fishArray.length; i++) {
    const f = fishArray[i];
    if (
      hookX < f.x + f.width &&
      hookX + hook.width > f.x &&
      hook.y < f.y + f.height &&
      hook.y + hook.height > f.y
    ) {
      score += f.points;
      fishArray.splice(i, 1);
      break;
    }
  }
}

// Ruch
function update() {
  if (keys["ArrowLeft"] && boat.x > 0) boat.x -= boat.speed;
  if (keys["ArrowRight"] && boat.x < canvas.width - boat.width) boat.x += boat.speed;

  const hookMinY = boat.y + boat.height;
  const hookMaxY = canvas.height - hook.height;
  if (keys["ArrowUp"] && hook.y > hookMinY) hook.y -= hook.speed;
  if (keys["ArrowDown"] && hook.y < hookMaxY) hook.y += hook.speed;

  for (let fish of fishArray) fish.x -= fish.speed;
  fishArray = fishArray.filter(f => f.x + f.width > 0);

  checkCollisions();
}

// Główna pętla
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawWaves();
  for (let fish of fishArray) drawFish(fish);
  drawBoat();
  drawHook();
  drawScoreboard();
}

function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

gameLoop();
setInterval(() => createFish(), 1000);

const timer = setInterval(() => {
  timeLeft--;
  if (timeLeft <= 0) {
    clearInterval(timer);
    alert("⏰ Koniec gry! Twój wynik: " + score);
    location.reload();
  }
}, 1000);