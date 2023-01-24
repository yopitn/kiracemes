// Show more dropdown
(function () {
  const more_button = document.querySelectorAll("[data-button='more']");

  more_button.forEach((button) => {
    let dropdown = button.children[1];

    button.addEventListener("click", () => {
      dropdown.classList.toggle("s");
    });

    document.addEventListener("mouseup", (e) => {
      if (dropdown.classList.contains("s") && !button.contains(e.target)) {
        dropdown.classList.remove("s");
      }
    });
  });
})();

// Delete post function
(function () {
  const delete_button = document.querySelectorAll("[data-button='delete-page']");
  const table_wrap = document.querySelector(".table__wrap");

  delete_button.forEach((button, index) => {
    button.addEventListener("click", () => {
      const page_id = button.dataset.id.split("-").reverse()[0];
      const page_title = document.querySelectorAll(".post__title")[index].innerText;

      const modal = document.createElement("div");
      modal.className = "modal__wrap";
      modal.innerHTML = `
      <div class="modal__inner">
        <div class="modal__header">
          <div class="modal__title">
            <span class="title">Are you sure want to delete this post?</span>
          </div>

          <div class="modal__close" data-button="close-modal" role="button">
            <svg viewBox="0 0 24 24">
              <path d="M 4.7070312 3.2929688 L 3.2929688 4.7070312 L 10.585938 12 L 3.2929688 19.292969 L 4.7070312 20.707031 L 12 13.414062 L 19.292969 20.707031 L 20.707031 19.292969 L 13.414062 12 L 20.707031 4.7070312 L 19.292969 3.2929688 L 12 10.585938 L 4.7070312 3.2929688 z"></path>
            </svg>
          </div>
        </div>

        <div class="modal__content">
          <span class="modal__message">You want to delete "<b>${page_title}</b>", it will be deleted permanently. If you sure click "<b>Delete</b>" to confirm.</span>
        </div>

        <div class="modal__footer">
          <div class="btn btn-light" data-button="close-modal" role="button">Cancel</div>
          <div class="btn btn-danger" data-button="submit-modal" role="button">Delete</div>
        </div>
      </div>

      <div class="modal__overlay"></div>
      `;

      table_wrap.parentNode.insertBefore(modal, table_wrap.nextSibling);

      const close_button = document.querySelectorAll("[data-button='close-modal']");
      const submit_button = document.querySelector("[data-button='submit-modal']");

      close_button.forEach((button) => {
        button.addEventListener("click", () => {
          modal.remove();
        });
      });

      submit_button.addEventListener("click", () => {
        fetch(`${BASE_API}/pages/${page_id}`, {
          method: "DELETE",
        })
          .then((res) => {
            if (res.ok) {
              return window.location.reload();
            } else {
              return res.json();
            }
          })
          .then((json) => {
            if (json.errors) {
              if (!editor_message) {
                let message = document.createElement("div");
                message.className = "editor__message";
                message.innerHTML = `
                <div class="alert danger">
                  <span class="text">${json.errors[0].message}</span>
                </div>
                `;

                editor_wrap.appendChild(message);

                setTimeout(() => {
                  message.remove();
                }, 5000);
              }
            }
          })
          .catch((error) => {
            throw new Error(error);
          });
      });
    });
  });
})();

// Show filter dropdown
(function () {
  const filter_button = document.querySelectorAll("[data-button='filter']");

  filter_button.forEach((button) => {
    button.addEventListener("click", () => {
      button.parentNode.classList.toggle("s");
    });

    document.addEventListener("mouseup", (e) => {
      if (button.parentNode.classList.contains("s") && !button.contains(e.target)) {
        button.parentNode.classList.remove("s");
      }
    });
  });
})();

// Filter status handler function
(function () {
  const option_button = document.querySelectorAll("[data-button='status-option']");
  const filter_button = document.querySelector("[data-button='current-status']");

  const search_query = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });

  const status_query = search_query.status;

  if (status_query) {
    filter_button.innerText = status_query;
  }

  option_button.forEach((button) => {
    let option_value = button.dataset.value;

    if (option_value === status_query) {
      button.setAttribute("aria-selected", true);
    } else if (!status_query && option_value == "all pages") {
      button.setAttribute("aria-selected", true);
    } else {
      button.setAttribute("aria-selected", false);
    }

    button.addEventListener("click", () => {
      if (option_value === "all pages") {
        window.location.href = updateQueryStringParameter(window.location.href, "status", undefined);
      } else {
        window.location.href = updateQueryStringParameter(window.location.href, "status", option_value);
      }
    });
  });
})();

// Search form handler function
(function () {
  const reset_button = document.getElementById("search-reset");
  const search_input = document.getElementById("search");

  const query = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });

  const search_query = query.q;

  search_input.value = search_query;

  reset_button.addEventListener("click", () => {
    if (search_query) {
      window.location.href = updateQueryStringParameter(window.location.href, "q", undefined);
    }
  });
})();