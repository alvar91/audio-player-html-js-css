const $restartButton = document.getElementById("restartButton");
const $results = document.getElementById("results");

$restartButton.addEventListener("click", () => {
  window.location.href = "index.html";
});

const moves = localStorage.getItem("moves");

const currentResult = JSON.parse(localStorage.getItem("result"))?.result || [];

$results.innerHTML = `
<p>Количество затраченных движений: ${moves}</p>

<table>
  <caption>Таблица результатов</caption>
  <tr>
    <th>№</th>
    <th>Количество карточек</th>
    <th>Количество затраченных движений</th>
    <th>Дата игры</th>
  </tr>
  ${currentResult
    .map(({ moves, level, date }, index) => {
      return `<tr>
      <td>${index + 1}</td>
      <td>${level}</td>
      <td>${moves}</td>
      <td>${new Date(date).toLocaleDateString()}</td>
    </tr>`;
    })
    .join("")}
</table>`;
