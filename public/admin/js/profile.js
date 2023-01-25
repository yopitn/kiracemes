(function () {
  const save_profile_button = document.querySelector("[data-button='save-profile']");
  const save_password_button = document.querySelector("[data-button='save-password']");
  const show_images = document.querySelector("[data-show='images']");
  const main_wrap = document.querySelector(".main__wrap .container");
  const main_message = document.querySelector(".editor__message");
  const images = document.getElementById("images");
  const username = document.getElementById("username");
  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const bio = document.getElementById("bio");
  const location = document.getElementById("location");
  const old_password = document.getElementById("old-password");
  const new_password = document.getElementById("new-password");
  const verify_password = document.getElementById("verify-password");

  images.addEventListener("change", () => {
    const [file] = images.files;

    if (file) {
      if (file.type == "image/png" || file.type == "image/jpg" || file.type == "image/jpeg" || file.type == "image/webp") {
        const images_url = URL.createObjectURL(file);

        show_images.style.backgroundImage = `url(${images_url})`;
        show_images.classList.remove("images-empty");
        show_images.classList.add("images");
        show_images.innerHTML = "";
      }
    }

    const data = new FormData();
    data.append("images", images.files[0]);

    if (images.files[0]) {
      fetch(`${BASE_ADMIN}/profile/image`, {
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
                  <span class="text">Image successfully changed</span>
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
            }
          }
        })
        .catch((error) => {
          throw new Error(error);
        });
    }
  });

  save_profile_button.addEventListener("click", () => {
    const data = {
      username: username.value,
      name: name.value,
      email: email.value,
      bio: bio.value,
      location: location.value,
    };

    fetch(`${BASE_ADMIN}/profile`, {
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
                <span class="text">Saved</span>
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
          }
        }
      })
      .catch((error) => {
        throw new Error(error);
      });
  });

  save_password_button.addEventListener("click", () => {
    const data = {
      old_password: old_password.value,
      new_password: new_password.value,
      verify_password: verify_password.value,
    };

    fetch(`${BASE_ADMIN}/profile/password`, {
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
              <span class="text">Password updated successfully</span>
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
  });
})();
