const canvas = document.getElementById("grid");
const ctx = canvas.getContext("2d");

let originMousePosition = null;
let startPosition = null;

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

function endDraw(originMousePosition) {
  ctx.beginPath();
  ctx.moveTo(originMousePosition.x, originMousePosition.y);
  ctx.lineTo(startPosition.x, startPosition.y);
  ctx.stroke();
}

canvas.addEventListener("click", (event) => {
  let mousePosition = getMousePositionInCanvas(event);

  if (originMousePosition === null) {
    saveOriginPoint(event);
    startPosition = originMousePosition;
  } else {
    draw(mousePosition, originMousePosition);
    originMousePosition = mousePosition;
  }
});

const endDrawingButton = document.getElementById("end-drawing");
endDrawingButton.addEventListener("click", (event) => {
  endDraw(originMousePosition);
  originMousePosition = null;
  startPosition = null;
});
