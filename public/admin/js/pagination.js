(function () {
  let pagination = document.querySelector(".table__pagination");

  let ul = "<ul>";

  ul += `
  <li>
    <div class="link" data-prev="prev">
      <span class="icon">
        <svg class="line" viewBox="0 0 24 24">
          <g transform="translate(12.000000, 12.000000) rotate(-270.000000) translate(-12.000000, -12.000000) translate(5.000000, 8.500000)">
            <polyline points="14 0 7 7 0 0"></polyline>
          </g>
        </svg>
      </span>
    </div>
  </li>
  `;

  if (num_of_pages > 0) {
    for (let i = 1; i <= num_of_pages; i++) {
      if (current_page == i) {
        ul += `
        <li>
          <div class="link current">
            <span class="num">${i}</span>
          </div>
        </li>
        `;
      } else {
        ul += `
        <li>
          <div class="link" data-num="${i}">
            <span class="num">${i}</span>
          </div>
        </li>
        `;
      }
    }
  }

  ul += `
  <li>
    <div class="link" data-next="next">
      <span class="icon">
        <svg class="line" viewBox="0 0 24 24">
          <g transform="translate(12.000000, 12.000000) rotate(-90.000000) translate(-12.000000, -12.000000) translate(5.000000, 8.500000)">
            <polyline points="14 0 7 7 0 0"></polyline>
          </g>
        </svg>
      </span>
    </div>
  </li>
  `;

  ul += "</ul>";

  pagination.innerHTML = ul;

  let num_button = document.querySelectorAll("[data-num]");
  let prev_button = document.querySelector("[data-prev]");
  let next_button = document.querySelector("[data-next]");

  num_button.forEach((button) => {
    button.addEventListener("click", () => {
      if (button.dataset.num == 1) {
        window.location.href = updateQueryStringParameter(window.location.href, "page", undefined);
      } else {
        window.location.href = updateQueryStringParameter(window.location.href, "page", button.dataset.num);
      }
    });
  });

  for (let i = 1; i <= num_of_pages; i++) {
    if (current_page == i) {
      if (i == 1 && i != num_of_pages) {
        prev_button.classList.add("inactive");

        next_button.addEventListener("click", () => {
          window.location.href = updateQueryStringParameter(window.location.href, "page", parseInt(i) + 1);
        });
      } else if (i == num_of_pages && i != 1) {
        if (parseInt(i) - 1 == 1) {
          prev_button.addEventListener("click", () => {
            window.location.href = updateQueryStringParameter(window.location.href, "page", undefined);
          });
        } else {
          prev_button.addEventListener("click", () => {
            window.location.href = updateQueryStringParameter(window.location.href, "page", parseInt(i) - 1);
          });
        }

        next_button.classList.add("inactive");
      } else if (i == 1 && i == num_of_pages) {
        prev_button.classList.add("inactive");
        next_button.classList.add("inactive");
      } else {
        if (parseInt(i) - 1 == 1) {
          prev_button.addEventListener("click", () => {
            window.location.href = updateQueryStringParameter(window.location.href, "page", undefined);
          });
        } else {
          prev_button.addEventListener("click", () => {
            window.location.href = updateQueryStringParameter(window.location.href, "page", parseInt(i) - 1);
          });
        }

        next_button.addEventListener("click", () => {
          window.location.href = updateQueryStringParameter(window.location.href, "page", parseInt(i) + 1);
        });
      }
    }
  }
})();
