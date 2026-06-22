const canvas = document.getElementById("grid");
const ctx = canvas.getContext("2d");

let originMousePosition = null;

function saveOriginPoint(event) {
  originMousePosition = getMousePositionInCanvas(event);
}

function getMousePositionInCanvas(event) {
  let mousePosition = {
    x: 0,
    y: 0,
  };

  const canvasData = canvas.getBoundingClientRect();
  mousePosition.x = event.clientX - canvasData.x;
  mousePosition.y = event.clientY - canvasData.y;
  return mousePosition;
}

function draw(mousePosition, originMousePosition) {
  ctx.beginPath();
  ctx.moveTo(originMousePosition.x, originMousePosition.y);
  ctx.lineTo(mousePosition.x, mousePosition.y);
  ctx.stroke();
}

canvas.addEventListener("click", (event) => {
  let mousePosition = getMousePositionInCanvas(event);

  if (originMousePosition === null) {
    saveOriginPoint(event);
  } else {
    draw(mousePosition, originMousePosition);
    originMousePosition = mousePosition;
  }
});
