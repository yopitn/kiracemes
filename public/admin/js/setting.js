(function () {
  const favicon = document.getElementById("favicon");
  const show_favicon = document.querySelector("[data-show='show-favicon']");
  const robot_txt_button = document.querySelector("[data-button='robottxt']");
  const profile_save_button = document.querySelector("[data-button='save-profile']");
  const main_wrap = document.querySelector(".main__wrap .container");
  const main_message = document.querySelector(".editor__message");

  const blogtitle = document.getElementById("blogname");
  const blogdescription = document.getElementById("blogdescription");
  const meta_title = document.getElementById("meta-title");
  const meta_description = document.getElementById("meta-description");
  const posts_per_page = document.getElementById("posts-per-page");

  favicon.addEventListener("change", () => {
    const [file] = favicon.files;

    if (file && file.type == "image/x-icon") {
      const images_url = URL.createObjectURL(file);

      show_favicon.style.backgroundImage = `url(${images_url})`;
    }

    const data = new FormData();
    data.append("favicon", favicon.files[0]);

    fetch(`${BASE_ADMIN}/setting/favicon`, {
      method: "PUT",
      body: data,
    })
      .then((res) => {
        if (res.ok) {
          if (!main_message) {
            let message = document.createElement("div");
            message.className = "main__message";
            message.innerHTML = `
              <div class="alert success">
                <span class="text">Favicon successfully changed</span>
              </div>
            `;

            main_wrap.appendChild(message);

            setTimeout(() => {
              message.remove();
            }, 5000);

            return false;
          }

          return false;
        } else {
          return res.json();
        }
      })
      .then((json) => {
        if (json.errors) {
          if (!main_message) {
            let message = document.createElement("div");
            message.className = "main__message";
            message.innerHTML = `
              <div class="alert danger">
                <span class="text">${json.errors[0].message}</span>
              </div>
            `;

            main_wrap.appendChild(message);

            setTimeout(() => {
              message.remove();
            }, 5000);

            return false;
          }
        }
      })
      .catch((error) => {
        throw new Error(error);
      });
  });

  robot_txt_button.addEventListener("click", async () => {
    const getRobotsTxt = await fetch(`${BASE_ADMIN}/setting/robots-txt`);
    const robotsTxt = await getRobotsTxt.json();

    const modal = document.createElement("div");
    modal.className = "modal__wrap";
    modal.innerHTML = `
    <div class="modal__inner">
      <div class="modal__header">
        <div class="modal__title">
          <span class="title">robots.txt</span>
        </div>
      </div>

      <div class="modal__content">
        <div class="main__form">
          <textarea name="robots_txt" id="robots_txt" autocomplete="off" style="min-height: 180px;font-family: monospace;">${robotsTxt.text}</textarea>
        </div>
      </div>

      <div class="modal__footer">
        <div class="btn btn-light" data-button="close-modal" role="button">Cancel</div>
        <div class="btn btn-primary" data-button="submit-modal" role="button">Save</div>
      </div>
    </div>

    <div class="modal__overlay"></div>
    `;

    main_wrap.appendChild(modal);

    const close_button = document.querySelector("[data-button='close-modal']");
    const submit_button = document.querySelector("[data-button='submit-modal']");
    const robots_txt = document.getElementById("robots_txt");

    close_button.addEventListener("click", () => {
      modal.remove();
    });

    submit_button.addEventListener("click", () => {
      const data = {
        robots_txt: robots_txt.value,
      };

      fetch(`${BASE_ADMIN}/setting/robots-txt`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
        .then((res) => {
          if (res.ok) {
            if (!main_message) {
              let message = document.createElement("div");
              message.className = "main__message";
              message.innerHTML = `
              <div class="alert success">
                <span class="text">robots.txt updated successfully</span>
              </div>
              `;

              main_wrap.appendChild(message);

              setTimeout(() => {
                message.remove();
              }, 5000);

              return false;
            }
          } else {
            return res.json();
          }
        })
        .then((json) => {
          if (json.errors) {
            if (!main_message) {
              let message = document.createElement("div");
              message.className = "main__message";
              message.innerHTML = `
              <div class="alert danger">
                <span class="text">${json.errors[0].message}</span>
              </div>
            `;

              main_wrap.appendChild(message);

              setTimeout(() => {
                message.remove();
              }, 5000);

              return false;
            }
          }
        })
        .catch((error) => {
          throw new Error(error);
        });

      modal.remove();
    });
  });

  profile_save_button.addEventListener("click", async () => {
    const data = {
      settings: [
        { name: "title", value: blogtitle.value },
        { name: "description", value: blogdescription.value },
        { name: "meta_title", value: meta_title.value },
        { name: "meta_description", value: meta_description.value },
        { name: "posts_per_page", value: posts_per_page.value },
      ],
    };

    fetch(`${BASE_ADMIN}/setting`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.ok) {
          if (!main_message) {
            let message = document.createElement("div");
            message.className = "main__message";
            message.innerHTML = `
            <div class="alert success">
              <span class="text">Settings updated successfully</span>
            </div>
            `;

            main_wrap.appendChild(message);

            setTimeout(() => {
              message.remove();
            }, 5000);

            return false;
          }

          return false;
        } else {
          return res.json();
        }
      })
      .then((json) => {
        if (json.errors) {
          if (!main_message) {
            let message = document.createElement("div");
            message.className = "main__message";
            message.innerHTML = `
            <div class="alert danger">
              <span class="text">${json.errors[0].message}</span>
            </div>
            `;

            main_wrap.appendChild(message);

            setTimeout(() => {
              message.remove();
            }, 5000);

            return false;
          }
        }
      })
      .catch((error) => {
        throw new Error(error);
      });
  });
})();
