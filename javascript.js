const canvas = document.getElementById("grid");
const endDrawingButton = document.getElementById("end-drawing");
const ctx = canvas.getContext("2d");
const rangeSlider = document.getElementById("rangeSlider");
const rangeSliderValue = document.getElementById("rangeSliderValue");
const projectionButtonStart = document.getElementById("projectionButtonStart");
const projectionButtonStop = document.getElementById("projectionButtonStop");
const dotCountSpan = document.getElementById("dotCountSpan");
const step = document.getElementById("step");
const stepDisplay = document.getElementById("stepDisplay");
const interiorDotDisplay = document.getElementById("interiorDotDisplay");
const interiorDotRatio = document.getElementById("interiorDotRatio");
const results = document.getElementById("results");
const figuresArray = [];

let randomDotCoordinates = null;
let originMousePosition = null;
let startPosition = null;
let currentFigure = [];
let currentPoint = null;
let lineWidth = 1;
let interval_ID = null;
let dotCount = 0;
let insideDotCount = 0;
let outsideDotCount = 0;

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

function drawRandomDot(color, xDotWidth, yDotWidth) {
  const randomDot = {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
  };
  let ratio = (
    (insideDotCount / (outsideDotCount + insideDotCount)) *
    100
  ).toFixed(2);
  if (isInsideFigure(randomDot)) {
    ctx.fillStyle = "green";
    ctx.fillRect(randomDot.x, randomDot.y, xDotWidth, yDotWidth);
    insideDotCount++;
  } else {
    ctx.fillStyle = color;
    ctx.fillRect(randomDot.x, randomDot.y, xDotWidth, yDotWidth);
    outsideDotCount++;
  }

  const fraction = insideDotCount / (insideDotCount + outsideDotCount);
  interiorDotDisplay.textContent = `|| ${insideDotCount} points à l'intérieur`;
  interiorDotRatio.textContent = `|| ${(fraction * 100).toFixed(2)}%`;
  results.textContent = `Sur un plan de 1 m², l'aire polygonale estimée est de ≈ ${fraction.toFixed(3)} m²`;

  return randomDot;
}

function isInsideFigure(originCoordinates) {
  let count = 0;

  for (const figure of figuresArray) {
    for (const [i, point] of figure.entries()) {
      const A = point;
      const B = figure[(i + 1) % figure.length];
      const ratio = (originCoordinates.y - A.y) / (B.y - A.y);
      const xInter = A.x + ratio * (B.x - A.x);

      if (
        A.y <= originCoordinates.y &&
        B.y > originCoordinates.y &&
        originCoordinates.x < xInter
      ) {
        count++;
      } else if (
        A.y > originCoordinates.y &&
        B.y <= originCoordinates.y &&
        originCoordinates.x < xInter
      ) {
        count--;
      }
    }
  }
  return count !== 0;
}

function updateRangeSliderDisplay() {
  rangeSliderValue.textContent = `${rangeSlider.value} points projetés par secondes`;
}

function updateStepsDisplay() {
  stepDisplay.textContent = `${step.value} steps`;
}

canvas.addEventListener("click", (event) => {
  let mousePosition = getMousePositionInCanvas(event);
  if (originMousePosition === null) {
    saveOriginPoint(event);
    startPosition = originMousePosition;
    savePointInFigure(originMousePosition.x, originMousePosition.y);
  } else {
    draw(mousePosition, originMousePosition, 2, "blue");
    originMousePosition = mousePosition;
    savePointInFigure(mousePosition.x, mousePosition.y);
  }
});

endDrawingButton.addEventListener("click", () => {
  endDraw(originMousePosition);
  figuresArray.push(currentFigure);
  originMousePosition = null;
  startPosition = null;
  currentFigure = [];
  currentPoint = null;
});

projectionButtonStart.addEventListener("click", () => {
  clearInterval(interval_ID);
  interval_ID = setInterval(() => {
    for (let i = 0; i < step.value; i++) {
      randomDotCoordinates = drawRandomDot("red", 3, 3);
      dotCount++;
    }
    dotCountSpan.textContent = `${dotCount} points projetés`;
  }, 1000 / rangeSlider.value);
});

projectionButtonStop.addEventListener("click", () => {
  clearInterval(interval_ID);
});

updateRangeSliderDisplay();
rangeSlider.addEventListener("input", updateRangeSliderDisplay);

updateStepsDisplay();
step.addEventListener("input", updateStepsDisplay);

drawGridBackground();
