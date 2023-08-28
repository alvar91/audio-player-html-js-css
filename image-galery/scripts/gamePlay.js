import { ICON, RESULT_LENGTH } from "./constant.js";
import Game from "./classes/game.js";
import Card from "./classes/card.js";
import Timer from "./classes/timer.js";

const reset = () => {
  timer.stopTime();
  localStorage.setItem("moves", moves);
  window.location.href = "game-end.html";
};

// Timer
const $timer = document.getElementById("timer");
const timer = new Timer(reset);
timer.printTime($timer);

const $resetButton = document.getElementById("resetButton");
$resetButton.addEventListener("click", () => {
  reset();
});

// Board
const currentLevel = localStorage.getItem("level");
const gameObj = new Game(currentLevel);
const cardArray = [];
let lastElement = null;
let moves = 0;

// Game play
const main = () => {
  gameObj.board.forEach((value, index) => {
    cardArray.push(new Card(ICON[value % (gameObj.boardSize / 2)], index));
  });

  render(currentLevel);
  timer.start();
};

const render = () => {
  const gameDiv = document.querySelector("#gameDiv");
  let str = "";
  cardArray.forEach((card) => {
    str += `
            <div class="flip-container" id="flip_${
              card.pos
            }" data='${JSON.stringify(card)}'>
                <div class="flipper">
                    <div class="front"></div>
                    <div class="back">
                        <i class="icon-font fa ${card.icon}"></i>
                    </div>
                </div>
            </div>
    `;
  });

  gameDiv.innerHTML = str;

  gameDiv.addEventListener("click", (e) => {
    if (e.target.parentNode.parentNode.hasAttribute("data")) {
      clickCardEvent(e.target.parentNode.parentNode);
    }
  });
};

const clickCardEvent = (el) => {
  if (el.classList.contains("completed")) {
    return;
  }

  el.classList.toggle("flipped");
  moves++;

  setTimeout(() => {
    if (lastElement === null) {
      lastElement = el;
    } else if (lastElement !== null && lastElement !== el) {
      const lastCardValue = JSON.parse(lastElement.attributes.data.value);
      const currentCardValue = JSON.parse(el.attributes.data.value);
      if (lastCardValue.icon === currentCardValue.icon) {
        lastElement.classList.add("completed");
        el.classList.add("completed");
        gameObj.board[lastCardValue.pos] = 0;
        gameObj.board[currentCardValue.pos] = 0;
        if (gameObj.checkWin()) {
          localStorage.setItem("moves", moves);

          const currentResult =
            JSON.parse(localStorage.getItem("result"))?.result || [];

          const level = localStorage.getItem("level");

          currentResult.unshift({ moves, level, date: new Date() });

          localStorage.setItem(
            "result",
            JSON.stringify({
              result: [
                ...currentResult
                  .slice(0, RESULT_LENGTH),
              ],
            })
          );

          window.location.href = "game-end.html";
        }
      } else {
        el.classList.toggle("flipped");
        lastElement.classList.toggle("flipped");
        lastElement = null;
      }
      lastElement = null;
    } else {
      el.classList.toggle("flipped");
      lastElement.classList.toggle("flipped");
      lastElement = null;
    }
  }, 1000);
};

main();
