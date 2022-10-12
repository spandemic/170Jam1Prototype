title = "ACHILLES WHEEL";

description = `
`;

characters = [
`
gggggg
gggggg
gggggg
gggggg
gggggg
gggggg
`,`
y yy y
 y  y 
  yy  
yy  yy
y    y
`
];

const G = {
    WIDTH: 200,
    HEIGHT: 200,

    ENEMY_BASE_SPEED: 60
};

options = {
    viewSize: {
        x: G.WIDTH,
        y: G.HEIGHT
    },
    theme: "dark"
};

/**
 * @type {{pos: Vector, vel: Vector, radius: number}}
 */
let player;

/**
 * @type {{pos: Vector, type: number, vel: number, speed: number}[]}
 */
let cells;
let nextCellTicks;

/**
 * @type {{pos: Vector, radius: number}[]}
 */
let explosions;
let waveDiff;

function update() {
  if (!ticks) {
    player = {
      pos: vec(G.WIDTH / 2, G.HEIGHT / 2),
      vel: vec(),
      radius: 0
    };
    cells = [];
    nextCellTicks = 0;
    explosions = [];
    waveDiff = 1;
  }

  color("black");
  char("a", player.pos.x, player.pos.y);
  
  nextCellTicks--;
  if (nextCellTicks < 0) {
    let i = floor(rnd(5, 10) * difficulty);
    times(i, () => {
      const pos = vec(G.WIDTH / 2, G.HEIGHT / 2).addWithAngle(rnd(PI * 2), rnd(40, 150));
      const type = (rnd(10, 50) < 40 ? 1 : 0);
      const vel = rnd(1, sqrt(difficulty)) * 0.01;
      const speed = sqrt(difficulty) * 0.4;
      cells.push({ pos, type, vel, speed });
    });
    nextCellTicks = rnd(50, 80);
  }
  
  remove(cells, (c) => {
    
    // moves cells towards player/center of screen
    const xAngle = c.pos.x - G.WIDTH / 2;
    const yAngle = c.pos.y - G.HEIGHT / 2;
    xAngle < 0 ? c.pos.x += -(xAngle / G.ENEMY_BASE_SPEED) : c.pos.x -= (xAngle / G.ENEMY_BASE_SPEED);
    yAngle < 0 ? c.pos.y += -(yAngle / G.ENEMY_BASE_SPEED) : c.pos.y -= (yAngle / G.ENEMY_BASE_SPEED);
    
    color(c.type == 1 ? "cyan" : "red");
    char("b", c.pos);

    // return()
  })

}