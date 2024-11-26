var pixelCanvas = document.getElementById("pixelCanvas");
var pixelCtx = pixelCanvas.getContext("2d");
pixelCanvas.width = window.innerWidth;
pixelCanvas.height = window.innerHeight;

var pixelSize = 10;
var text = "AFRICA TECHNOLOGIES";
var startX = 100;
var startY = window.innerHeight / 2;

function drawPixelLetter(x, y, char) {
  var fontMap = {
    A: ["  111  ", " 1   1 ", "1111111", "1     1", "1     1"],
    F: ["111111", "1     ", "111111", "1     ", "1     "],
    // Add remaining letters
    " ": ["       ", "       ", "       ", "       ", "       "],
  };

  var pattern = fontMap[char.toUpperCase()] || fontMap[" "];
  pattern.forEach((row, rowIndex) => {
    row.split("").forEach((cell, colIndex) => {
      if (cell === "1") {
        pixelCtx.fillStyle = "#FFD700"; // Golden color
        pixelCtx.fillRect(
          x + colIndex * pixelSize,
          y + rowIndex * pixelSize,
          pixelSize,
          pixelSize
        );
      }
    });
  });
}

function drawText(text, startX, startY) {
  let x = startX;
  let spaceBetweenLetters = pixelSize * 8;

  for (let char of text) {
    drawPixelLetter(x, startY, char);
    x += spaceBetweenLetters;
  }
}

drawText(text, startX, startY);
