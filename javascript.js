const canvas = document.getElementById("grid");
const ctx = canvas.getContext("2d");

let mousePosition = {
  x: 0,
  y: 0,
};

const canvasData = canvas.getBoundingClientRect();

canvas.addEventListener("mousemove", (event) => {
  mousePosition.x = event.clientX - canvasData.x;
  mousePosition.y = event.clientY - canvasData.y;
});
