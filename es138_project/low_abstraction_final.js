// underlying grid 
let cols = 8;
let rows = 5;

// define these
let cellw;
let cellh;

let modules = [
  // row 1
  { x: 0, y: 0, w: 3, h: 1 },
  { x: 3, y: 0, w: 2, h: 1 },
  { x: 5, y: 0, w: 3, h: 1 },

  // row 2
  { x: 0, y: 1, w: 1, h: 1 },
  { x: 1, y: 1, w: 1, h: 1 },
  { x: 2, y: 1, w: 1, h: 1 },
  { x: 3, y: 1, w: 2, h: 1 },
  { x: 5, y: 1, w: 1, h: 1 },
  { x: 6, y: 1, w: 2, h: 1 },

  // row 3
  { x: 0, y: 2, w: 3, h: 1 },
  { x: 3, y: 2, w: 1, h: 1 },
  { x: 4, y: 2, w: 1, h: 1 },
  { x: 5, y: 2, w: 3, h: 1 },

  // row 4
  { x: 0, y: 3, w: 2, h: 1 },
  { x: 2, y: 3, w: 1, h: 1 },
  { x: 3, y: 3, w: 1, h: 1 },
  { x: 4, y: 3, w: 1, h: 1 },
  { x: 5, y: 3, w: 2, h: 1 },
  { x: 7, y: 3, w: 1, h: 1 },

  // row 5
  { x: 0, y: 4, w: 3, h: 1 },
  { x: 3, y: 4, w: 2, h: 1 },
  { x: 5, y: 4, w: 3, h: 1 },
];

let topColors = [
  "#E7D6D0",
  "#ab8479"
];

let rightColors = [
  "#CBACA2",
  "#ba7065",
  "#a3796d"
  
];

let leftColors = [
  "#875546",
  "#ba7065",
  "#bf907c"
];

let bottomColors = [
  "#725645",
  "#513626",
  "#916c58"
];

function setup() {
  createCanvas(windowHeight, windowHeight);
  
  cellW = width / cols;
  cellH = height / rows;
  
  noLoop();
}

function windowResized() {
  resizeCanvas(windowHeight, windowHeight);
  cellW = width / cols;
  cellH = height / rows;
  redraw();
}

function draw() {
  background(156, 146, 150);
    
  for (let m of modules) {
    drawTiles(
      m.x * cellW,
      m.y * cellH,
      m.w * cellW,
      m.h * cellH,
      m.x,
      m.y
    );
  }
}


function drawTiles(x, y, tile_width, tile_height, i, j) {
  
  // vanishing point of tile (center)
  // cx = x + tile_width / 2;
  // cy = y + tile_height / 2;
  
  // colors of each section
  let colors = ["#637994", "#B8D2FF", "#D9C6AC", "#4A8ABA"];
  let wallColors = ["#A2574B", "#513626", "#D3B1A4", "#E7D6D0", "#B67E72", "#D1A59E","#725645", "#916c58"]
    
  noStroke();
  
  let insetX = tile_width * random(0.15, 0.35);
  let insetY = tile_height * random(0.15, 0.35);

  let rw = tile_width - insetX * 2;
  let rh = tile_height - insetY * 2;
  
  let offsetX = 0;
  let offsetY = 0;

  if (random() < 0.4) {

    offsetX = random(
      -tile_width * 0.12,
       tile_width * 0.12
    );

    offsetY = random(
      -tile_height * 0.12,
       tile_height * 0.12
    );
  }
  
  let rx = x + insetX + offsetX;
  let ry = y + insetY + offsetY;
  
  // set rectangle color randomly
  let randomColor = random(colors);
  fill(randomColor);
  rect(rx, ry, rw, rh);
  
  // random circle "outside" of room (on rectangle)
  let circleColors = [...colors,"#1B233B", "#87b1c4"]
  let randomCircleColor = random(circleColors);
  
  if (random(1) < 0.8) {
    let diameter = tile_width * random(0.18, 0.25);
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
    
    // rose window detail
if (diameter > tile_width * 0.1) {

  push();
  translate(cx, cy);

  stroke(230, 220, 210);
  strokeWeight(diameter * 0.03);

  noFill();

  let petals = 8;
  let ringR = diameter * 0.28;
  let smallD = diameter * 0.32;

  for (let i = 0; i < petals; i++) {

    let angle = TWO_PI * i / petals;

    let px = cos(angle) * ringR;
    let py = sin(angle) * ringR;

    ellipse(px, py, smallD, smallD);
  }

  // center circle
  ellipse(0, 0, diameter * 0.28);

  pop();
}
  }
  
  // let traceryColor = random(colors);
  // while (traceryColor === randomColor) {
  //       traceryColor = random(colors);
  //   }
  
  let traceryColor = "#A2574B";
  
  if (random() < 0.6) {
    drawTracery(rx, ry, rw, rh, traceryColor);
  }
  
    let idx = modules.findIndex(
      m => m.x === i && m.y === j
  );

  let topBottomColor =
    topColors[idx % topColors.length];

  let rightColor =
    rightColors[(idx + 1) % rightColors.length];

  let leftColor =
    leftColors[(idx + 1) % leftColors.length];
  
  let bottomColor =
    bottomColors[idx % bottomColors.length];
  
  let lancetColors = ["#145585", "#1B233B"];
  let chosenColor = random(lancetColors);
  let hasLancets = random() < 0.65;
  let lancetCount = floor(random(2, 4));
  let lancetHeight = tile_height * 0.35;
  
  // top
  if (random() < 0.2) {
    topBottomColor = random(topColors); 
  }
  fill(topBottomColor);
  quad(x, y, x + tile_width, y, rx + rw, ry, rx, ry);
  
  // right
  fill(rightColor);
  quad(x + tile_width, y, x + tile_width, y + tile_height, rx + rw, ry + rh, rx + rw, ry);
  
  let rightWallW = x + tile_width - (rx + rw);
  let wallSkew = (y + tile_height) - (ry + rh);
  
  if (hasLancets && rightWallW > 25) {
    let lancetRW = constrain(rightWallW * 0.18, 4, 14);
    let gap = lancetRW * 0.35;
    
    for (let n = 0; n < lancetCount; n++) {
      let lx = 3*gap + rx + rw + gap + n * (lancetRW + gap);
      let ly = ry + rh * 0.5;
      
      let t = n / max(1, lancetCount - 1);
      let skew = lerp(wallSkew * 0.25, wallSkew, t);
      
      drawLancet(lx, ly + skew*0.1, lancetRW, lancetHeight, skew, chosenColor);
    }
  }
  
  // bottom
  if (random() < 0.2) {
    topBottomColor = random(bottomColors); 
  }
  fill(bottomColor);
  quad(x + tile_width, y + tile_height, x, y + tile_height, rx, ry + rh, rx + rw, ry + rh);
  
  // left wall
  if (random() < 0.2) {
    sideColor = random(rightColors);
  }
  fill(leftColor);
  quad(x, y + tile_height, x, y, rx, ry, rx, ry + rh);
  
  // draw lancets on left wall
  let leftWallW = rx - x;
  
  if (hasLancets && leftWallW > 25) {
    let lancetLW = leftWallW * 0.18;
    lancetLW = constrain(lancetLW, 4, 14);
    
    let gap = lancetLW * 0.35;
    
    for (let n = 0; n < lancetCount; n++) {

      // let lx = 3*gap + x + gap + n * (lancetLW + gap);
      let lx = rx - 3*gap - n*(lancetLW + gap) - gap;
      let ly = ry + rh * 0.5;
      
      let t = n / max(1, lancetCount - 1);
      let skew = lerp(wallSkew*0.25, wallSkew, t);
      
      drawLancet(lx, ly, lancetLW, lancetHeight, -skew, chosenColor);
    }
  }
  
  let bannerColor = random(colors);
  if (random() < 0.7) {
    fill(bannerColor);
    quad(x + tile_width, y + tile_height/6, x + tile_width, y + tile_height/10, rx + rw, ry + rh/8, rx + rw, ry + rh/6);
    
    fill(bannerColor);
    quad(x, y + tile_height/6, x, y + tile_height/10, rx, ry + rh/8, rx, ry + rh/6);
  }
  else if (hasLancets === false) {
    
    // top banner
    bannerColor = random(colors);
    fill(bannerColor);
    quad(x + tile_width, y + tile_height/6, x + tile_width, y + tile_height/10, rx + rw, ry + rh/8, rx + rw, ry + rh/6);

    fill(bannerColor);
    quad(x, y + tile_height/6, x, y + tile_height/10, rx, ry + rh/8, rx, ry + rh/6);
    
    let newBannerColor = random(colors);
    while (newBannerColor === bannerColor) {
      newBannerColor = random(colors);
    }
    
    fill(newBannerColor);
    quad(x + tile_width, y + tile_height * 0.3, x + tile_width, y + tile_height * 0.25, rx + rw, ry + rh * 0.25, rx + rw, ry + rh * 0.3);
    
    fill(newBannerColor);
    quad(x, y + tile_height * 0.3, x, y + tile_height * 0.25, rx, ry + rh * 0.25, rx, ry + rh * 0.3);
  }
  
  
  // random circles on walls 

  if (random(1) < 0.2) {
    // skip top wall: no circles can be placed here
    // 1 = right wall, 2 = floor (bottom), 3 = left wall
    let wall = 2;
    
    let diameter = tile_width * random(0.1, 0.15);
    let radius = diameter / 2;
    
    let cx, cy;
    
    // if left or right walls, allow circle placement in regular colors
    if (wall === 2) {
      cx = random(x + radius, x + tile_width - radius);
      cy = random(ry + rh + radius, y + tile_height - radius);
      
      let r = red(topBottomColor);
      let g = green(topBottomColor);
      let b = blue(topBottomColor);
      
      let factor = 0.5;
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

// function drawTracery(x, y, w, h, baseColor) {

//   let c = color(baseColor);

//   stroke(c);
//   strokeWeight(min(w, h) * 0.08);

//   noFill();

//   // arches at window
//   if (random() < 0.6) {

//     arc(
//       x + w * 0.64 + w * 0.15, 
//       y + h + h * 0.05,
//       w * 1.25,
//       h * 2,
//       PI, 
//       PI + HALF_PI, OPEN
//     );
    
//     arc(
//       x + w * 0.36, 
//       y + h + h * 0.05,
//       w * 1.25,
//       h * 2,
//       HALF_PI + PI,
//       TWO_PI, OPEN
//     );
//   }
//   noStroke();
// }


function drawTracery(x, y, w, h, baseColor) {

  let c = color(baseColor);

  let pg = createGraphics(w, h);

  pg.noStroke();
  pg.fill(c);

  // local rectangle
  pg.rect(0, 0, w, h);

    pg.erase();

    pg.beginShape();

    pg.vertex(w * 0.2, h);

    pg.quadraticVertex(
      w * 0.2,
      h * 0.35,
      w * 0.5,
      h * 0.05
    );

    pg.quadraticVertex(
      w * 0.8,
      h * 0.35,
      w * 0.8,
      h
    );

    pg.vertex(w * 0.8, h);
    pg.vertex(w * 0.2, h);

    pg.endShape(CLOSE);

    pg.noErase();

    // outlines
    // pg.stroke(230, 220, 210);
    // pg.strokeWeight(min(w, h) * 0.06);
    // pg.noFill();
  
    let sw = min(w, h) * 0.06;
    pg.strokeWeight(sw);

    pg.stroke(230,220,210);
    pg.strokeWeight(sw);
    pg.noFill();

    pg.beginShape();

    pg.vertex(w * 0.2, h);

    pg.quadraticVertex(
      w * 0.2,
      h * 0.35,
      w * 0.5,
      h * 0.05
    );

    pg.quadraticVertex(
      w * 0.8,
      h * 0.35,
      w * 0.8,
      h
    );

    pg.endShape();

  image(pg, x, y);
}

function drawLancet(cx, cy, w, h, skew, c) {

  fill(c);
  
  stroke(230, 220, 210, 180);
  strokeWeight(max(1, w * 0.15));
  
  let archHeight = h * 0.35;

  beginShape();
  

  // bottom left
  if (skew > 0) {
    vertex(cx - w / 2, cy + h / 2 + skew*0.15);
  }
  else {
    vertex(cx - w / 2, cy + h / 2 - skew*0.25);
  }

  // left side
  vertex(cx - w / 2, cy);
  
  // left arch curve
  vertex(cx - w * 0.25, cy - h /2  + archHeight * 0.25);

  // pointed top
  vertex(cx, cy - (0.95*(h / 2)));
  
  // right arch curve 
  vertex(cx + w * 0.25, cy - h / 2 + archHeight * 0.25);

  // right side
  vertex(cx + w / 2, cy);

  // bottom right
  if (skew > 0) {
      vertex(cx + w / 2, cy + h / 2 + skew*0.35);
  }
  else {
    vertex(cx + w / 2, cy + h / 2 + skew*0.05);
  }
  endShape(CLOSE);
  
  noStroke();
}



