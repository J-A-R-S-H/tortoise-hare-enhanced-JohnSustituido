//Start the race with a button click
// move the tortoise and the hare every 1 seconds randomly
//render the track
//trigger the move every second
//fix position if they go beyond the range of the (0-70) cannot have negative numbers
// render the track with the new positions
// when one of the animals reach 70 or more show results message

// for constant variables
const TRACK_LENGTH = 70;

const startBtn = document.getElementById("startBtn");
const track = document.getElementById("track");
const message = document.getElementById("message");
const hareScoreEl = document.getElementById("hare-score");
const tortoiseScoreEl = document.getElementById("tortoise-score");

// numeric counters for wins
let hareScore = 0;
let tortoiseScore = 0;

let tortoisePosition = 1;
let harePosition = 1;
let raceIntervalId = null;
let stepCount = 0;

startBtn.addEventListener("click", startRace);

function startRace() {
  tortoisePosition = 1;
  harePosition = 1;
  stepCount = 0; // reset steps for new race

  if (raceIntervalId !== null) {
    clearInterval(raceIntervalId);
  }

  startBtn.disabled = true;

  message.textContent = "And they're off to the races ~ folks!";
  raceIntervalId = setInterval(() => {
    raceStep();
  }, 1000);
}

function raceStep() {
  stepCount++;

  moveTortoise();
  moveHare();
  clampPositions();
  if (tortoisePosition >= TRACK_LENGTH || harePosition >= TRACK_LENGTH) {
    clearInterval(raceIntervalId);
    startBtn.disabled = false;
    showResults();
  }

  renderTrack();
}

function moveTortoise() {
  let roll = Math.floor(Math.random() * 10) + 1;
  if (roll >= 1 && roll <= 5) {
    tortoisePosition += 40;
  } else if (roll >= 6 && roll <= 7) {
    tortoisePosition -= 1;
  } else {
    tortoisePosition += 1;
  }
}

function moveHare() {
  let roll = Math.floor(Math.random() * 10) + 1;
  if (roll >= 1 && roll <= 3) {
    harePosition += 5;
  } else if (roll >= 4 && roll <= 6) {
    harePosition -= 2;
  } else if (roll >= 7 && roll <= 8) {
    harePosition += 40;
  } else {
    harePosition -= 4;
  }
}

function clampPositions() {
  tortoisePosition = Math.min(TRACK_LENGTH, Math.max(1, tortoisePosition));
  harePosition = Math.min(TRACK_LENGTH, Math.max(1, harePosition));
}

function renderTrack() {
  track.innerHTML = "";

  for (let i = 1; i <= TRACK_LENGTH; i++) {
    let cell = document.createElement("div");
    cell.classList.add("cell");

    let isTortoiseHere = i === tortoisePosition;
    let isHareHere = i === harePosition;

    if (isTortoiseHere && isHareHere) {
      cell.classList.add("both");
      cell.textContent = "🔥";
    } else if (isTortoiseHere) {
      cell.classList.add("tortoise");
      cell.textContent = "🐢";
    } else if (isHareHere) {
      cell.classList.add("hare");
      cell.textContent = "🐇";
    }

    track.appendChild(cell);
  }
}

function showResults() {
  if (tortoisePosition >= TRACK_LENGTH && harePosition >= TRACK_LENGTH) {
    message.textContent = "It's a tie!";
    hareScore++;
    tortoiseScore++;
  } else if (tortoisePosition >= TRACK_LENGTH) {
    message.textContent = "The tortoise wins!";
    tortoiseScore++;
  } else if (harePosition >= TRACK_LENGTH) {
    message.textContent = "The hare wins!";
    hareScore++;
  } else {
    message.textContent = "Unexpected result!";
  }
  message.textContent += `Race finished in ${stepCount} steps! Tortoise: ${tortoisePosition}, Hare: ${harePosition}`;

  hareScoreEl.textContent = `Hare Score: ${hareScore}`;
  tortoiseScoreEl.textContent = `Tortoise Score: ${tortoiseScore}`;
}

renderTrack();

hareScoreEl.textContent = `Hare Score: ${hareScore}`;
tortoiseScoreEl.textContent = `Tortoise Score: ${tortoiseScore}`;
