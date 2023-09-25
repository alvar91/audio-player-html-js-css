document.addEventListener("DOMContentLoaded", function () {
  (function () {
    const unsplashKey = "WntP27Ue-I5ibIP914RypeNizeWqcXLRC9JmhMbgKI0";

    const $container = document.querySelector(".js-gallery");

    const $form = document.querySelector(".js-form");
    $form.addEventListener("submit", (e) => {
      e.preventDefault();

      const query = e.target.elements[0].value;

      if (query) fetchImages(query);
    });

    const $search = document.querySelector(".js-search");
    $search.focus();

    async function fetchImages(query = "random") {
      const response = await fetch(
        `https://api.unsplash.com/search/photos?page=1&per_page=12&query=${query}&orientation=landscape&client_id=${unsplashKey}`
      );

      const data = await response.json();

      render($container, data);
    }

    function render($container, data) {
      $container.innerHTML = "";

      const { results } = data;
      const $ul = document.createElement("ul");
      $ul.className = "gallery__list";

      results.forEach(({ urls }) => {
        const $li = document.createElement("li");
        $li.className = "gallery__item";

        $li.innerHTML = `<img class="gallery__image" src=${urls.regular}>`;
        $ul.append($li);
      });

      $container.append($ul);
    }

    fetchImages();
  })();
});
