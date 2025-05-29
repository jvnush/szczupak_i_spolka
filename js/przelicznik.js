
document.getElementById('pullForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const mass = parseFloat(document.getElementById('mass').value);
  const lineLength = parseFloat(document.getElementById('lineLength').value);
  const angle = parseFloat(document.getElementById('angle').value) * Math.PI / 180;
  const drag = parseFloat(document.getElementById('drag').value);

  const g = 9.81;
  const force = mass * g + drag * lineLength * Math.sin(angle);

  document.getElementById('result').textContent = `Przybliżona siła holowania: ${force.toFixed(2)} N`;

  // WYKRES
  const canvas = document.getElementById('forceCanvas');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const angleValues = Array.from({length: 91}, (_, i) => i);
  const forces = angleValues.map(a => mass * g + drag * lineLength * Math.sin(a * Math.PI / 180));

  const maxForce = Math.max(...forces);
  const xScale = canvas.width / angleValues.length;
  const yScale = (canvas.height - 40) / maxForce;

  ctx.beginPath();
  ctx.moveTo(0, canvas.height - forces[0] * yScale);

  forces.forEach((f, i) => {
    const x = i * xScale;
    const y = canvas.height - f * yScale;
    ctx.lineTo(x, y);
  });

  ctx.strokeStyle = 'blue';
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.fillStyle = 'black';
  ctx.font = '12px Arial';
  ctx.fillText('Kąt nachylenia (°)', canvas.width / 2 - 40, canvas.height - 10);

  ctx.save();
  ctx.rotate(-Math.PI / 2);
  ctx.fillText('Siła (N)', -canvas.height / 2, 15);
  ctx.restore();
});
