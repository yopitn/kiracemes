const publish_button = document.querySelector("[data-button='publish']");
const update_button = document.querySelector("[data-button='update']");
const save_button = document.querySelector("[data-button='save']");
const draft_button = document.querySelector("[data-button='draft']");
const editor_wrap = document.querySelector(".editor__wrap");
const editor_message = document.querySelector(".editor__message");

const title = document.getElementById("title");
const slug = document.getElementById("slug");
const meta_title = document.getElementById("meta-title");
const meta_description = document.getElementById("meta-description");
// const og_image = document.getElementById("facebook-image");
const og_title = document.getElementById("facebook-title");
const og_description = document.getElementById("facebook-description");
// const twitter_image = document.getElementById("twitter-image");
const twitter_title = document.getElementById("twitter-title");
const twitter_description = document.getElementById("twitter-description");

function updatePageAsPublished() {
  const content = iframe_body.innerHTML;
  const page_id = window.location.pathname.split("/").reverse()[0];

  const data = {
    title: title.value,
    slug: slug.value,
    content: content,
    status: "published",
    meta_title: meta_title.value,
    meta_description: meta_description.value,
    // og_image: og_image.value,
    og_title: og_title.value,
    og_description: og_description.value,
    // twitter_image: twitter_image.value,
    twitter_title: twitter_title.value,
    twitter_description: twitter_description.value,
  };

  fetch(`${BASE_API}/pages/${page_id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((res) => {
      if (res.ok) {
        return (window.location.href = "/admin/pages/");
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
}

function updatePageAsDraft() {
  const content = iframe_body.innerHTML;
  const page_id = window.location.pathname.split("/").reverse()[0];

  const data = {
    title: title.value,
    slug: slug.value,
    content: content,
    status: "draft",
    meta_title: meta_title.value,
    meta_description: meta_description.value,
    // og_image: og_image.value,
    og_title: og_title.value,
    og_description: og_description.value,
    // twitter_image: twitter_image.value,
    twitter_title: twitter_title.value,
    twitter_description: twitter_description.value,
  };

  fetch(`${BASE_API}/pages/${page_id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
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
}

function updatePage() {
  const content = iframe_body.innerHTML;
  const page_id = window.location.pathname.split("/").reverse()[0];

  const data = {
    title: title.value,
    slug: slug.value,
    content: content,
    meta_title: meta_title.value,
    meta_description: meta_description.value,
    // og_image: og_image.value,
    og_title: og_title.value,
    og_description: og_description.value,
    // twitter_image: twitter_image.value,
    twitter_title: twitter_title.value,
    twitter_description: twitter_description.value,
  };

  fetch(`${BASE_API}/pages/${page_id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((res) => {
      return res.json();
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
      } else {
        if (!editor_message) {
          let message = document.createElement("div");
          message.className = "editor__message";
          message.innerHTML = `
          <div class="alert success">
            <span class="text">${json.page[0].message}</span>
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
}

if (publish_button) {
  publish_button.addEventListener("click", updatePageAsPublished);
}

if (update_button) {
  update_button.addEventListener("click", updatePage);
}

if (save_button) {
  save_button.addEventListener("click", updatePage);
}

if (draft_button) {
  draft_button.addEventListener("click", updatePageAsDraft);
}
