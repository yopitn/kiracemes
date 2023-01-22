const publish_button = document.querySelector("[data-button='publish']");
const save_button = document.querySelector("[data-button='save']");
const editor_wrap = document.querySelector(".editor__wrap");
const editor_message = document.querySelector(".editor__message");

const title = document.getElementById("title");
const slug = document.getElementById("slug");
const featured = document.getElementById("featured");
const meta_title = document.getElementById("meta-title");
const meta_description = document.getElementById("meta-description");
// const og_image = document.getElementById("facebook-image");
const og_title = document.getElementById("facebook-title");
const og_description = document.getElementById("facebook-description");
// const twitter_image = document.getElementById("twitter-image");
const twitter_title = document.getElementById("twitter-title");
const twitter_description = document.getElementById("twitter-description");

function createPostAsPublished() {
  const tags_data = document.querySelectorAll(".editor__forms-tags .tag[data-value]");
  const content = iframe_body.innerHTML;

  let tags = [];

  if (tags_data && tags_data.length > 0) {
    tags_data.forEach((tag) => {
      tags.push(tag.dataset.value);
    });
  }

  const data = {
    title: title.value,
    slug: slug.slug,
    content: content,
    featured: featured.checked,
    status: "published",
    meta_title: meta_title.value,
    meta_description: meta_description.value,
    // og_image: og_image.value,
    og_title: og_title.value,
    og_description: og_description.value,
    // twitter_image: twitter_image.value,
    twitter_title: twitter_title.value,
    twitter_description: twitter_description.value,
    tags: tags,
  };

  fetch(`${BASE_API}/posts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((res) => {
      if (res.ok) {
        return (window.location.href = "/admin/posts/");
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

function createPoshAsDraft() {
  const tags_data = document.querySelectorAll(".editor__forms-tags .tag[data-value]");
  const content = iframe_body.innerHTML;
  let tags = [];

  if (tags_data && tags_data.length > 0) {
    tags_data.forEach((tag) => {
      tags.push(tag.dataset.value);
    });
  }

  const data = {
    title: title.value ? title.value : "untitled",
    slug: slug.slug,
    content: content,
    featured: featured.checked,
    status: "draft",
    meta_title: meta_title.value,
    meta_description: meta_description.value,
    // og_image: og_image.value,
    og_title: og_title.value,
    og_description: og_description.value,
    // twitter_image: twitter_image.value,
    twitter_title: twitter_title.value,
    twitter_description: twitter_description.value,
    tags: tags,
  };

  fetch(`${BASE_API}/posts`, {
    method: "POST",
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
        return (window.location.href = `/admin/post/edit/${json.post.id}`);
      }
    })
    .catch((error) => {
      throw new Error(error);
    });
}

publish_button.addEventListener("click", createPostAsPublished);
save_button.addEventListener("click", createPoshAsDraft);
