title = "ACHILLES WHEEL";

description = `
`;

characters = [
`
gggggg
g    g
g gg g
g gg g
g    g
gggggg
`,`
y yy y
 y  y 
  yy  
yy  yy
y    y
`,`
gggggg
gggggg
gggggg
gggggg
gggggg
gggggg
`,`
rrrrrr
rrrrrr
rrrrrr
rrrrrr
rrrrrr
rrrrrr
`
];

const G = {
    WIDTH: 200,
    HEIGHT: 200,

    ENEMY_BASE_SPEED: 70,

    GAP: 6
};

options = {
    viewSize: {
        x: G.WIDTH,
        y: G.HEIGHT
    },
    theme: "dark"
};

/**
 * @type {{pos: Vector}}
 */
let player;

/**
 * @type {{pos: Vector, type: number}[]}
 */
let cells;
let nextCellTicks;

/**
 * @type {{pos: Vector, type: number}[]}
 */
let wallBlock;
let wallFacing;

let waveDiff;
let playerHealth;

function update() {
  if (!ticks) {
    player = {
      pos: vec(G.WIDTH / 2, G.HEIGHT / 2)
    };
    cells = [];
    nextCellTicks = 0;
    wallBlock = [];

    wallFacing = 1;

    waveDiff = 1;
    playerHealth = 3;

    // times(40, (i) => {
    //   const pos = vec(G.WIDTH/2, G.HEIGHT/2).addWithAngle(i / (PI * 2), 30);
    //   const type = i < 10 ? 1 : 0;
    //   wallBlock.push({ pos, type });
    // })

    // fuck this shit LMAO
    wallBlock.push({ pos: vec(G.WIDTH/2 - 3 * G.GAP, G.HEIGHT/2 - 3 * G.GAP), type: 1});
    wallBlock.push({ pos: vec(G.WIDTH/2 - 2 * G.GAP, G.HEIGHT/2 - 3 * G.GAP), type: 1});
    wallBlock.push({ pos: vec(G.WIDTH/2 - 1 * G.GAP, G.HEIGHT/2 - 3 * G.GAP), type: 1});
    wallBlock.push({ pos: vec(G.WIDTH/2, G.HEIGHT/2 - 3 * G.GAP), type: 1});
    wallBlock.push({ pos: vec(G.WIDTH/2 + 1 * G.GAP, G.HEIGHT/2 - 3 * G.GAP), type: 1});
    wallBlock.push({ pos: vec(G.WIDTH/2 + 2 * G.GAP, G.HEIGHT/2 - 3 * G.GAP), type: 1});
    wallBlock.push({ pos: vec(G.WIDTH/2 + 3 * G.GAP, G.HEIGHT/2 - 3 * G.GAP), type: 0});
    wallBlock.push({ pos: vec(G.WIDTH/2 + 3 * G.GAP, G.HEIGHT/2 - 2 * G.GAP), type: 0});
    wallBlock.push({ pos: vec(G.WIDTH/2 + 3 * G.GAP, G.HEIGHT/2 - 1 * G.GAP), type: 0});
    wallBlock.push({ pos: vec(G.WIDTH/2 + 3 * G.GAP, G.HEIGHT/2), type: 0});
    wallBlock.push({ pos: vec(G.WIDTH/2 + 3 * G.GAP, G.HEIGHT/2 + 1 * G.GAP), type: 0});
    wallBlock.push({ pos: vec(G.WIDTH/2 + 3 * G.GAP, G.HEIGHT/2 + 2 * G.GAP), type: 0});
    wallBlock.push({ pos: vec(G.WIDTH/2 + 3 * G.GAP, G.HEIGHT/2 + 3 * G.GAP), type: 0});
    wallBlock.push({ pos: vec(G.WIDTH/2 + 2 * G.GAP, G.HEIGHT/2 + 3 * G.GAP), type: 0});
    wallBlock.push({ pos: vec(G.WIDTH/2 + 1 * G.GAP, G.HEIGHT/2 + 3 * G.GAP), type: 0});
    wallBlock.push({ pos: vec(G.WIDTH/2, G.HEIGHT/2 + 3 * G.GAP), type: 0});
    wallBlock.push({ pos: vec(G.WIDTH/2 - 1 * G.GAP, G.HEIGHT/2 + 3 * G.GAP), type: 0});
    wallBlock.push({ pos: vec(G.WIDTH/2 - 2 * G.GAP, G.HEIGHT/2 + 3 * G.GAP), type: 0});
    wallBlock.push({ pos: vec(G.WIDTH/2 - 3 * G.GAP, G.HEIGHT/2 + 3 * G.GAP), type: 0});
    wallBlock.push({ pos: vec(G.WIDTH/2 - 3 * G.GAP, G.HEIGHT/2 + 2 * G.GAP), type: 0});
    wallBlock.push({ pos: vec(G.WIDTH/2 - 3 * G.GAP, G.HEIGHT/2 + 1 * G.GAP), type: 0});
    wallBlock.push({ pos: vec(G.WIDTH/2 - 3 * G.GAP, G.HEIGHT/2), type: 0});
    wallBlock.push({ pos: vec(G.WIDTH/2 - 3 * G.GAP, G.HEIGHT/2 - 1 * G.GAP), type: 0});
    wallBlock.push({ pos: vec(G.WIDTH/2 - 3 * G.GAP, G.HEIGHT/2 - 2 * G.GAP), type: 0});
  }

  if (playerHealth === 3) {
    color("green");
  } else if (playerHealth === 2){
    color("yellow");
  } else if (playerHealth === 1) {
    color("red");
  } else {
    color("light_red")
    end();
  }
  char("a", player.pos.x, player.pos.y);
  
  

  if(input.isJustPressed) {
    let counter = 0;
    for(i = 0; i < wallBlock.length; i++) {
      if(wallBlock[i].type == 1 && counter < 6) {
        let index = i;
        let wallType = i + 6 > 23 ? (index - 24) + 6 : index + 6;
        wallBlock[wallType].type = 1;
        wallBlock[i].type = 0;

        counter++;
      }
    }
    counter = 0;
  }

  nextCellTicks--;
  if (nextCellTicks < 0) {
    let i = floor(rnd(3, 9) * difficulty);
    times(i, () => {
      const pos = vec(G.WIDTH / 2, G.HEIGHT / 2).addWithAngle(rnd(PI * 2), rnd(200, 600));
      const type = (rnd(10, 50) < 40 ? 1 : 0);
      cells.push({ pos, type });
    });
    nextCellTicks = rnd(80, 120);
    waveDiff += 1;
    if (G.ENEMY_BASE_SPEED > 40 && waveDiff % 11 === 0) {
      G.ENEMY_BASE_SPEED -= 5;
      console.log("speedup");
    }
  }

  remove(wallBlock, (w) => {
    color(w.type === 1 ? "cyan" : "red");
    w.type === 1 ? char("c", w.pos) : char("d", w.pos);
  });

  remove(cells, (c) => {
    
    // moves cells towards player/center of screen
    const xAngle = c.pos.x - G.WIDTH / 2;
    const yAngle = c.pos.y - G.HEIGHT / 2;
    xAngle < 0 ? c.pos.x += -(xAngle / G.ENEMY_BASE_SPEED) : c.pos.x -= (xAngle / G.ENEMY_BASE_SPEED);
    yAngle < 0 ? c.pos.y += -(yAngle / G.ENEMY_BASE_SPEED) : c.pos.y -= (yAngle / G.ENEMY_BASE_SPEED);
    
    color(c.type == 1 ? "cyan" : "red");
    const isCollidingWithWall = char("b", c.pos).isColliding.char.d;
    const isCollidingWithAbsorber = char("b", c.pos).isColliding.char.c;
    const isCollidingWithPlayer = char("b", c.pos).isColliding.char.a;

    if(isCollidingWithPlayer) {
      if (c.type === 1) {
        addScore(10 + waveDiff, c.pos);
        play("powerUp");
        color("green");
        particle(c.pos);
      } else {
        color("red");
        particle(c.pos);
        play("hit");
        playerHealth--
      }
    }

    if(isCollidingWithAbsorber && input.isJustPressed) {
      color(c.type == 1 ? "cyan" : "red");
      particle(c.pos);
      play("coin");
      addScore(10, c.pos);
    }

    return(isCollidingWithWall || isCollidingWithPlayer);
  });
}
