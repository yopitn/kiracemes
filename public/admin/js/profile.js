(function () {
  const save_profile_button = document.querySelector("[data-button='save-profile']");
  const show_photo = document.querySelector("[data-show='photo']");
  const main_wrap = document.querySelector(".main__wrap .container");
  const main_message = document.querySelector(".editor__message");
  const photo = document.getElementById("photo");
  const username = document.getElementById("username");
  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const bio = document.getElementById("bio");
  const location = document.getElementById("location");

  // photo.addEventListener("change", () => {
  //   const [file] = photo.files;

  //   if (file) {
  //     const photo_url = URL.createObjectURL(file);

  //     show_photo.style.backgroundImage = `url(${photo_url})`;
  //     show_photo.classList.remove("photo-empty");
  //     show_photo.classList.add("photo");
  //     show_photo.innerHTML = "";
  //   }
  // });

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
})();
