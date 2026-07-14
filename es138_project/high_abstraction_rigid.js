function setup() {
  createCanvas(windowHeight, windowHeight);
  noLoop();
}

function windowResized() {
  resizeCanvas(windowHeight, windowHeight);
  redraw();
}

function draw() {
  background(156, 146, 150);
  
  // standard height for rows
  let evenRows = height * 0.125;
  let oddRows = height * 0.25;
  
  let rowHeights = [oddRows, evenRows, oddRows, evenRows, oddRows];
  
  let colWidths = [oddRows, evenRows, oddRows, evenRows, oddRows];
  
  let yPos = 0;
  for (let j = 0; j < rowHeights.length; j++) {       
    let xPos = 0;
    for (let i = 0; i < colWidths.length; i++) {  
      drawTiles(xPos, yPos, colWidths[i], rowHeights[j], i, j);
      xPos += colWidths[i];  // move to next column
    }
    yPos += rowHeights[j];   // move to next row
  }

}


function drawTiles(x, y, tile_width, tile_height, i, j) {
  
  // vanishing point of tile (center)
  // cx = x + tile_width / 2;
  // cy = y + tile_height / 2;
  
  // colors of each section
  let light = color(221, 221, 231);
  let mid = color(185, 175, 185);
  let dark = color(155, 150, 160);
  let colors = ["#637994", "#5794FF", "#D9C6AC", "#296795"];

  
  let topBottomColor = mid;
  let sideColor = light;
  // alternate between light and mid for each side of the "room"
  if ((i + j) % 2 === 0) {
    topBottomColor = light;
    sideColor = mid;
  } 
  else if ((i + j) % 3 === 0 || random(1) < 0.5) {
    topBottomColor = dark;
  }
    
  noStroke();
  
  // center rectangle
  let rx = x + tile_width * 0.3;
  let ry = y + tile_height * 0.2;
  let rw = tile_width * 0.4;
  let rh = tile_height * 0.6;
  
  // set rectangle color randomly
  let randomColor = colors[floor(random(1) * colors.length)];
  fill(randomColor);
  rect(rx, ry, rw, rh);
  
  
  // random circle "outside" of room (on rectangle)
  let circleColors = [...colors,"#1B233B", "#87b1c4"]
  let randomCircleColor = circleColors[floor(random(circleColors.length))];
  
  if (random(1) < 0.7) {
    let diameter = tile_width * random(0.2, 0.35);
    let radius = diameter / 2;
    let centerx = rx + rw / 2;
    let centery = ry + rh / 2;
    
    let cx = centerx + randomGaussian() * (rw * 0.18);
    let cy = centery + randomGaussian() * (rh * 0.18);
    
    while (randomCircleColor === randomColor) {
        randomCircleColor = random(circleColors);
    }
    fill(randomCircleColor);
    ellipse(cx, cy, diameter);
  }
  
    // top
  fill(topBottomColor);
  quad(x, y, x + tile_width, y, rx + rw, ry, rx, ry);
  
  // right
  fill(sideColor);
  quad(x + tile_width, y, x + tile_width, y + tile_height, rx + rw, ry + rh, rx + rw, ry);
  
  // bottom
  fill(topBottomColor);
  quad(x + tile_width, y + tile_height, x, y + tile_height, rx, ry + rh, rx + rw, ry + rh);
  
  // left
  fill(sideColor);
  quad(x, y + tile_height, x, y, rx, ry, rx, ry + rh);
  
  
  // random circles on walls 

  if (random(1) < 0.2) {
    // skip top wall: no circles can be placed here
    // 1 = right wall, 2 = floor (bottom), 3 = left wall
    let wall = random([1, 2, 3]);
    
    let diameter = tile_width * random(0.1, 0.18);
    let radius = diameter / 2;
    
    let cx, cy;
    
    // if left or right walls, allow circle placement in regular colors
    if (wall === 1) {
      cx = random(rx + rw + radius, x + tile_width - radius);
      cy = random(y + radius, y + tile_height - radius);
      randomCircleColor = circleColors[floor(random(circleColors.length))];
      fill(randomCircleColor);
      
    } else if (wall === 3) {
      cx = random(x + radius, rx - radius);
      cy = random(y + radius, y + tile_height - radius);
      randomCircleColor = circleColors[floor(random(circleColors.length))];
      fill(randomCircleColor);
    } 
    // bottom (floor)
    else if (wall === 2) {
      cx = random(x + radius, x + tile_width - radius);
      cy = random(ry + rh + radius, y + tile_height - radius);
      
      let r = red(topBottomColor);
      let g = green(topBottomColor);
      let b = blue(topBottomColor);
      
      let factor = 0.7;
      r = floor(r * factor);
      g = floor(g * factor);
      b = floor(b * factor);

      let darkerColorObj = color(r, g, b);

      let darkerHex = darkerColorObj.toString('#rrggbb');

      fill(darkerHex);
    }
    ellipse(cx, cy, diameter);
  }
  
}
