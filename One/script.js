const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext('2d');
console.log(ctx);

// setting the height and width of the canvas
const CANVAS_WIDTH = canvas.width = 600
const CANVAS_HEIGHT = canvas.height = 600

const playerImage = new Image()
playerImage.src = 'shadow_dog.png'
let animationStateName = 'jump';
let animationStates = [
  {
    name: "idle",
    frame: 7,
  },
  {
    name: "jump",
    frame: 7,
  },

  {
    name: "fall",
    frame: 7,
  },
  {
    name: "run",
    frame: 9,
  },
  {
    name: "dizzy",
    frame: 11,
  },
  {
    name: "sit",
    frame: 5,
  },
  {
    name: "roll",
    frame: 7,
  },
  {
    name: "bark",
    frame: 7,
  },
  {
    name: "ko",
    frame: 12,
  },
  {
    name: "getHit",
    frame: 4,
  },
];
let spriteAnimationPositions = [

];

let x = 0;
let reverse = false;
let splitWidth = 575;
let splitHeight = 523;
let staggeredFrame = 5; // stagered farmes are those frames 
// in which the animations don't happen
let gameFrame = 0;

let frameX = 0; // this frameX will move the clips of the 
// photo in horizontal direction
let frameY = 0; // this frameY will move the clips of the 
// photo in vertical direction

// populate with the frames
animationStates.forEach((states, index) => {
  let locs = [];
  for (let i = 0; i < states.frame; i++) {
    let positionX = i * splitWidth;
    let positionY = index * splitHeight;
    locs.push({ x: positionX, y: positionY })
  }
  spriteAnimationPositions[states.name] = {
    locs: locs
  };
});

let animateIndex = 0;
let staggeredAnimationStates = 30;
let gameStateFrame = 0;

function animate() {
  animationStateName = animationStates[animateIndex].name;
  setTitle()
  // clear the pixel if it drawn 
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  let size = spriteAnimationPositions[animationStateName].locs.length
  // ctx.fillRect(x, 0, 100, 100);
  let position = Math.floor(gameFrame / staggeredFrame)
    % size  // console.log(position);
  // lets draw an image
  frameX = spriteAnimationPositions[animationStateName].locs[position].x;
  frameY = spriteAnimationPositions[animationStateName].locs[position].y;
  ctx.drawImage(
    playerImage,
    frameX, frameY,
    splitWidth, splitHeight,
    0, 0, splitWidth, splitHeight
  );

  animateIndex = Math.floor(gameStateFrame/staggeredAnimationStates)
    % animationStates.length

  console.log(animateIndex);
  if (position == size-1) {
    console.log(animationStateName);
    gameStateFrame++;
  }

  // if (animateIndex == animationStates.length) {
  //   animateIndex = 0;
  // }

  // if (gameFrame%staggeredFrame==0) {
  //   // console.log(frameX);
  //   if (frameX < 6) {
  //     frameX++;
  //   } else {
  //     frameX = 0;
  //   }
  // }

  gameFrame++;

  requestAnimationFrame(animate);
}

function setTitle() {
 const h1 =  document.getElementById("animationState");
 h1.title = animationStateName;
 h1.textContent = animationStateName;
}
animate()
