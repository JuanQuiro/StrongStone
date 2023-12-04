var TILES = new Array();
var SELECT = false;
var T;
var X=0;
var Y=0;
var TICK = 5;
/* Grid properties →
    Rotation canvas: -0.4636476090008061 = -26.56º
    Inclination angle: 0.9272952180016122 = 51,34º
    Proportion tile cell: 0.8
    Canvas measurements: width height
 */
const grid = new Grid(20,-0.4636476090008061,0.9272952180016122,0.8,canvas.width,canvas.height);
const sprite_character_kinght = new Sprite(moviment,1,132,86,10,".\\asstes\\img\\characters\\characters_knight_sprites.png","AntonioScalia");
console.log('θ: ' + grid.defaultAngle);

function setup() {
  frameRate(60);
  //paint the grid
  grid.deploy();
  
  //capa tiles
  let tc = createCanvas(grid._width,grid._height);
  tc.id("lay02");
  tc.parent("wrapper");

  TILES = grid.populateTiles(TILES);
}

let currentLoopIndex = 0;
let frame = 0;
function draw() {
  frame++;
  if(frame % sprite_character_kinght.q_frameRate == 0){
    drawFrameInMenu(
      sprite_character_kinght.image_,
      sprite_character_kinght.width, 
      sprite_character_kinght.height,
      sprite_character_kinght.moviment_tree.run.sprite[currentLoopIndex],
      sprite_character_kinght.moviment_tree.run.rowSprite,
      10,  //X in canvas menu
      10); //Y in canvas menu
    currentLoopIndex++;
    if (currentLoopIndex >= sprite_character_kinght.moviment_tree.run.sprite.length) {
      currentLoopIndex = 0;
    }
  }
  if(frame == 100000){
    frame = 0;
  }
}

function displayTooltip(){
  let tooltip = createDiv('Id:' + T.id);
  tooltip.parent("wrapper");
  tooltip.id("hovertooltip");
  tooltip.class("tooltip");
  tooltip.position(T.position.xCanvas + grid.lx[0], T.position.yCanvas + grid.lx[1] - 30);
  let span = createSpan(T.tooltip_text);
  span.class("tooltiptext");
  span.parent("hovertooltip");
}

window.addEventListener('mousemove',(e)=>{
  if(Math.abs(e.movimentX) > 0 || Math.abs(e.movementY) > 0 ){
    clear();
    T = grid.computeHoverTile(TILES,mouseX,mouseY);
    grid.paintHoverTile(T);
  }
  /*
  clear();
  fill("black");
  textSize(40);
  text('X: ' + mouseX, width/2, height/2); // + Math.abs(pmouseX)
  text('Y: ' + mouseY, width/2, height/2 + 40); // + Math.abs(pmouseY) */
});

window.addEventListener('click',(e)=>{
  SELECT = true;
  clear();
  try {
    document.getElementById("hovertooltip").remove();
  } catch (ex) {
    console.warn('-',ex.message);
  }
  T = grid.computeHoverTile(TILES,mouseX,mouseY);
  X = T.position.row;
  Y = T.position.column + grid.columns;
  grid.paintHoverTile(T);
  displayTooltip();
})

window.addEventListener('keydown',(e)=>{
  clear();
  switch(e.key){
    case 'd':
      X+=1;
      break;
    case 'a':
      X-=1;
      break;
    case 'w':
      Y+=1;
      break;
    case 's':
      Y-=1;
      break;
    default:
      break;
  }
  T = TILES[X][Y];
  grid.paintHoverTile(T);
})