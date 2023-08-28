const $level = document.getElementById("level");
const $startButton = document.getElementById("startButton");
const $output = document.getElementById("output");

const isValidRange = () => {
  if (
    $level.value &&
    $level.value > 0 &&
    $level.value <= 10 &&
    $level.value % 2 === 0
  ) {
    return true;
  }
  return false;
};

$startButton.addEventListener("click", () => {
  if (isValidRange()) {
    localStorage.setItem("level", $level.value);
    window.location.href = "game.html";
  } else {
    $level.value = 4;
    $output.innerText = "Ошибка: Введите четное количество карточек от 2 до 10";
  }
});