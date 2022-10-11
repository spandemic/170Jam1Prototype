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

    ENEMY_MIN_BASE_SPEED: 1.0,
    ENEMY_MAX_BASE_SPEED: 2.0
};

options = {
    viewSize: {
        x: G.WIDTH,
        y: G.HEIGHT
    },
    theme: "dark"
};

/**
 * @typedef {{
 * pos: number,
 * state: number,
 * }} Player
 */

/**
 * @type { Player }
 */
let player;

/**
 * @typedef {{
 * pos: Vector,
 * type: number
 * }} Cell
 */

/**
 * @type { Cell [] }
 */
let cells;

/**
 * @type { number }
 */
let waveCount;

/**
 * @type { number }
 */
let cellSpeed;

function update() {
  if (!ticks) {
    player = {
        pos: vec(G.WIDTH * 0.5, G.HEIGHT * 0.5),
        state: 0
    };

    cells = [];
    waveCount = 0;
    cellSpeed = 0;

  }

  if (cells.length === 0) {
    cellSpeed = rnd(G.ENEMY_MIN_BASE_SPEED, G.ENEMY_MAX_BASE_SPEED);
    for (let i = 0; i < 9; i++) {
        const posX = rnd(0, G.WIDTH);
        const posY = rnd(0, G.HEIGHT);
        const cellType = rnd(0, 1);
        cells.push({ 
            pos: vec(posX, posY),
            type: cellType });
    }
    waveCount++;
}

  
  if (input.isJustPressed) {
    if (player.state == 0) {
        color("red");
        player.state = 1;
    } else if (player.state == 1) {
        color("green");
        player.state = 0;
    }
    }
  char("a", player.pos);

  remove(cells, (e) => {
    color("black");
    e.pos.angleTo(player.pos);
    e.posX += cellSpeed;
    e.posY += cellSpeed;
    // if (e.firingCooldown <= 0) {
    //     eBullets.push({
    //         pos: vec(e.pos.x, e.pos.y),
    //         angle: e.pos.angleTo(player.pos),
    //         rotation: rnd()
    //     });
    //     e.firingCooldown = G.ENEMY_FIRE_RATE;
    //     play("select"); // Be creative, you don't always have to follow the label
    // }

    // const isCollidingWithFBullets = char("b", e.pos).isColliding.char.a;
    // if (isCollidingWithFBullets) {
    //     color("yellow");
    //     particle(e.pos);
    //     play("explosion");
    //     addScore(10 * waveCount, e.pos);
    // }

    const isCollidingWithPlayer = char("b", e.pos).isColliding.char.a;
    if (isCollidingWithPlayer) {
        console.log('hello');
        play("powerUp");
    }

    // return (isCollidingWithFBullets || e.pos.y > G.HEIGHT);
});
}