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

let sideColors = [
  "#CBACA2",
  "#ba7065",
  "#bf907c"
];

let bottomColors = [
  "#725645",
  "#513626",
  "#916c58"
];

let tileDesigns = [];

function setup() {
  createCanvas(windowHeight, windowHeight);
  
  cellW = width / cols;
  cellH = height / rows;
  
  generateDesigns();
  noLoop();
}

function generateDesigns() {
  // colors of each section
  let colors = ["#637994", "#B8D2FF", "#D9C6AC", "#4A8ABA"];
  let circleColors = [...colors,"#1B233B", "#87b1c4"];

  tileDesigns = modules.map((m, idx) => {
    let insetXFrac = random(0.15, 0.35);
    let insetYFrac = random(0.15, 0.35);

    let offsetXFrac = 0, offsetYFrac = 0;
    if (random() < 0.4) {
      offsetXFrac = random(-0.12, 0.12);
      offsetYFrac = random(-0.12, 0.12);
    }
    
    let randomColor = random(colors);

    // random circle "outside" of room (on rectangle)
    let randomCircleColor = random(circleColors);
    while (randomCircleColor === randomColor) {
        randomCircleColor = random(circleColors);
    }

    let hasCircle = random(1) < 0.7;
    let diameterFrac = random(0.18, 0.25);

    let cxJitter = randomGaussian() * 0.18;
    let cyJitter = randomGaussian() * 0.18;

    let topBottomColor = random() < 0.2 ? random(topColors) : topColors[idx % topColors.length];
    let sideColor = random() < 0.2 ? random(sideColors) : sideColors[(idx + 1) % sideColors.length];
    let bottomColor = random() < 0.2 ? random(bottomColors) : bottomColors[idx % bottomColors.length];

    let hasWallCircle = random(1) < 0.2;
    let wall = random([1, 2, 3]);
    let wallDiameterFrac = random(0.1, 0.17);
    let wallCX = random(); 
    let wallCY = random();
    let wallCircleColor = random(circleColors);

    return {
      insetXFrac, insetYFrac, offsetXFrac, offsetYFrac,
      randomColor, hasCircle, randomCircleColor, diameterFrac, cxJitter, cyJitter,
      topBottomColor, sideColor, bottomColor,
      hasWallCircle, wall, wallDiameterFrac, wallCX, wallCY, wallCircleColor
    };

  });

}


function windowResized() {
  resizeCanvas(windowHeight, windowHeight);
  cellW = width / cols;
  cellH = height / rows;
  redraw();
}

function draw() {
  background(156, 146, 150);
  for (let idx = 0; idx < modules.length; idx++) {
    let m = modules[idx];
    drawTiles(
      m.x * cellW, m.y * cellH,
      m.w * cellW, m.h * cellH,
      tileDesigns[idx]
    );
  }
}

function drawTiles(x, y, tile_width, tile_height, d) {
  noStroke();
  
  let insetX = tile_width * d.insetXFrac;
  let insetY = tile_height * d.insetYFrac;

  let rw = tile_width - insetX * 2;
  let rh = tile_height - insetY * 2;

  let offsetX = tile_width * d.offsetXFrac;
  let offsetY = tile_height * d.offsetYFrac;
  
  let rx = x + insetX + offsetX;
  let ry = y + insetY + offsetY;
  
  // set rectangle color randomly
  fill(d.randomColor);
  rect(rx, ry, rw, rh);
  
  if (d.hasCircle) {
    let diameter = tile_width * d.diameterFrac;
    let radius = diameter / 2;
    let centerx = rx + rw / 2;
    let centery = ry + rh / 2;
    
    let cx = centerx + rw * d.cxJitter;
    let cy = centery + rh * d.cyJitter;
    
    fill(d.randomCircleColor);
    ellipse(cx, cy, diameter);
  }
  
  // top
  fill(d.topBottomColor);
  quad(x, y, x + tile_width, y, rx + rw, ry, rx, ry);
  
  // right
  fill(d.sideColor);
  quad(x + tile_width, y, x + tile_width, y + tile_height, rx + rw, ry + rh, rx + rw, ry);
  
  // bottom
  fill(d.bottomColor);
  quad(x + tile_width, y + tile_height, x, y + tile_height, rx, ry + rh, rx + rw, ry + rh);
  
  // left
  fill(d.sideColor);
  quad(x, y + tile_height, x, y, rx, ry, rx, ry + rh);
  
  
  // random circles on walls 
  if (d.hasWallCircle) {
    // skip top wall: no circles can be placed here
    // 1 = right wall, 2 = floor (bottom), 3 = left wall
    let diameter = tile_width * d.wallDiameterFrac;
    let radius = diameter / 2;
    let cx, cy;
    
    // if left or right walls, allow circle placement in regular colors
    if (d.wall === 1) {
        cx = lerp(rx + rw + radius, x + tile_width - radius, d.wallCX);
        cy = lerp(y + radius, y + tile_height - radius, d.wallCY);
        fill(d.wallCircleColor);
      } else if (d.wall === 3) {
        cx = lerp(x + radius, rx - radius, d.wallCX);
        cy = lerp(y + radius, y + tile_height - radius, d.wallCY);
        fill(d.wallCircleColor);
      // bottom wall with darker shade
      } else {
        cx = lerp(x + radius, x + tile_width - radius, d.wallCX);
        cy = lerp(ry + rh + radius, y + tile_height - radius, d.wallCY);
        let r = red(d.topBottomColor) * 0.7;
        let g = green(d.topBottomColor) * 0.7;
        let b = blue(d.topBottomColor) * 0.7;
        fill(color(floor(r), floor(g), floor(b)));
      }
    ellipse(cx, cy, diameter);
  }
}
