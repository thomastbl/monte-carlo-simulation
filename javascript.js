const canvas = document.getElementById("grid");
const endDrawingButton = document.getElementById("end-drawing");
const ctx = canvas.getContext("2d");

let originMousePosition = null;
let startPosition = null;
let currentFigure = [];
let currentPoint = null;
const figuresArray = [];
let lineWidth = 1;

// à faire dans l'ordre

// / Mettre en place le repère orthonormé
// / Construire la mécanique de projection sur le canvas
// / Utiliser le produit vectoriel pour calculer chaque intersection
// depuis les point projetés
// -> Produit vectoriel : d = (Bx - Ax)·(Py - Ay) - (By - Ay)·(Px - Ax)
// / Intépréter les résultats au regard du nombre de projections

function saveOriginPoint(event) {
  originMousePosition = getMousePositionInCanvas(event);
}

function getMousePositionInCanvas(event) {
  let mousePosition = {
    x: 0,
    y: 0,
  };

  const relativeCanvasData = canvas.getBoundingClientRect();
  mousePosition.x =
    (event.clientX - relativeCanvasData.x) *
    (canvas.width / relativeCanvasData.width);
  mousePosition.y =
    (event.clientY - relativeCanvasData.y) *
    (canvas.height / relativeCanvasData.height);
  return mousePosition;
}

function draw(mousePosition, originMousePosition, lineWidth, lineColor) {
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = lineColor;
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

function savePointInFigure(x, y) {
  currentPoint = {
    x: x,
    y: y,
  };
  currentFigure.push(currentPoint);
}

function coordinatesToPixels(x, y) {
  let x_px = x + 500;
  let y_px = 500 - y;
  return { x, y };
}

function drawGridBackground() {
  for (let i = 0; i <= canvas.width; i += 50) {
    if (i === 500) {
      lineWidth = 3;
    }
    const start_pixels = coordinatesToPixels(i, 0);
    const end_pixels = coordinatesToPixels(i, 1000);
    i === 500
      ? draw(start_pixels, end_pixels, 3, "black")
      : draw(start_pixels, end_pixels, 1, "black");
  }

  for (let i = 0; i <= canvas.height; i += 50) {
    const start_pixels = coordinatesToPixels(0, i);
    const end_pixels = coordinatesToPixels(1000, i);
    i === 500
      ? draw(start_pixels, end_pixels, 3, "black")
      : draw(start_pixels, end_pixels, 1, "black");
  }
}

canvas.addEventListener("click", (event) => {
  let mousePosition = getMousePositionInCanvas(event);
  if (originMousePosition === null) {
    saveOriginPoint(event);
    startPosition = originMousePosition;
    savePointInFigure(originMousePosition.x, originMousePosition.y);
  } else {
    draw(mousePosition, originMousePosition, 2, "orange");
    originMousePosition = mousePosition;
    savePointInFigure(mousePosition.x, mousePosition.y);
  }
});

endDrawingButton.addEventListener("click", (event) => {
  endDraw(originMousePosition);
  figuresArray.push(currentFigure);
  console.log(figuresArray);
  originMousePosition = null;
  startPosition = null;
  currentFigure = [];
  currentPoint = null;
});

drawGridBackground();
