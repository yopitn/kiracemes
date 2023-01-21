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
  const delete_button = document.querySelectorAll("[data-button='delete-post']");
  const table_wrap = document.querySelector(".table__wrap");

  delete_button.forEach((button, index) => {
    button.addEventListener("click", () => {
      const post_id = button.dataset.id.split("-").reverse()[0];
      const post_title = document.querySelectorAll(".post__title")[index].innerText;

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
          <span class="modal__message">You want to delete "<b>${post_title}</b>", it will be deleted permanently. If you are sure click "<b>Delete</b>" to confirm.</span>
        </div>

        <div class="modal__footer">
          <div class="btn btn-light" data-button="close-modal" role="button">Cancel</div>
          <div class="btn btn-danger" data-button="submit-modal" role="button">Delete</div>
        </div>
      </div>

      <div class="modal__overlay" data-button="close-modal"></div>
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
        fetch(`${BASE_API}/posts/${post_id}`, {
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
