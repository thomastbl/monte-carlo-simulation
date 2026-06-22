const canvas = document.getElementById("grid");
const ctx = canvas.getContext("2d");

let mousePosition = {
  x: 0,
  y: 0,
};

ctx.beginPath();
ctx.moveTo(mousePosition.x, mousePosition.y);

canvas.addEventListener("click", (event) => {
  const canvasData = canvas.getBoundingClientRect();

  mousePosition.x = event.clientX - canvasData.x;
  mousePosition.y = event.clientY - canvasData.y;
  ctx.lineTo(mousePosition.x, mousePosition.y);

  ctx.stroke();
});
