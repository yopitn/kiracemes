const tags_input = document.getElementById("tags");
const tags_data = document.querySelectorAll(".editor__forms-tags .tag[data-value]");

let tags_arr = [];

if (tags_data && tags_data.length > 0) {
  tags_data.forEach((tag) => {
    tags_arr.push(tag.dataset.value);
  });
}

function searchTags(e) {
  const tags_data = document.querySelectorAll(".editor__forms-tdata > li");
  let time_out = 0;

  clearTimeout(time_out);

  time_out = setTimeout(() => {
    if (e.target.value !== "") {
      fetch(`${BASE_API}/tags/search?q=${e.target.value}`)
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
        })
        .then((json) => {
          if (json.errors) {
            throw new Error(json.errors[0].message);
          } else {
            showTags(json.tags);
          }
        })
        .catch((error) => {
          throw new Error(error);
        });
    }
  });

  if (tags_data.length > 0 && e.target.value === "") {
    tags_data.forEach((tag) => {
      tag.remove();
    });
  }
}

function removeSearchTagsOnFocusOut(e) {
  const tags_data = document.querySelectorAll(".editor__forms-tdata > li");

  if (tags_data.length > 0 && !tags_input.contains(e.target)) {
    tags_data.forEach((tag) => {
      if (!tag.contains(e.target)) {
        tag.remove();
      }
    });
  }
}

function showTags(tags) {
  const tags_data = document.querySelector(".editor__forms-tdata");
  tags_data.innerHTML = "";

  tags.map((tag) => {
    if (!tags_arr.includes(tag.name)) {
      const el = document.createElement("li");
      el.setAttribute("data-value", tag.name);
      el.innerHTML = tag.name;

      el.addEventListener("click", (e) => {
        if ((e.target.nodeName = "LI")) {
          if (!tags_arr.includes(e.target.dataset.name)) {
            tags_arr.push(e.target.dataset.value);
          }
        }

        addElementTag();

        tags_data.innerHTML = "";
        tags_input.value = "";
      });

      tags_data.appendChild(el);
    }
  });
}

function createElementTag(tag) {
  const div = document.createElement("div");
  div.className = "tag";
  div.setAttribute("data-value", tag);

  const span = document.createElement("span");
  span.className = "name";
  span.innerHTML = tag;

  const close = document.createElement("span");
  close.className = "close";
  close.setAttribute("role", "button");
  close.innerHTML = `
  <svg viewBox="0 0 24 24">
    <path d="M 4.7070312 3.2929688 L 3.2929688 4.7070312 L 10.585938 12 L 3.2929688 19.292969 L 4.7070312 20.707031 L 12 13.414062 L 19.292969 20.707031 L 20.707031 19.292969 L 13.414062 12 L 20.707031 4.7070312 L 19.292969 3.2929688 L 12 10.585938 L 4.7070312 3.2929688 z"></path>
  </svg>
  `;

  close.addEventListener("click", () => {
    const arr_index = tags_arr.indexOf(tag);

    arr_index !== -1 && tags_arr.splice(arr_index, 1);
    div.remove();
  });

  div.appendChild(span);
  div.appendChild(close);

  return div;
}

function resetElementTags() {
  document.querySelectorAll(".editor__forms-tags .tag").forEach((tag) => {
    tag.parentElement.removeChild(tag);
  });
}

function resetElementTagsOnLoad() {
  const tags_parent = document.querySelector(".editor__forms-tags");

  resetElementTags();

  tags_arr
    .slice()
    .reverse()
    .forEach((tag) => {
      tags_parent.prepend(createElementTag(tag));
    });
}

function addElementTag() {
  const tags_parent = document.querySelector(".editor__forms-tags");

  resetElementTags();

  tags_arr
    .slice()
    .reverse()
    .forEach((tag) => {
      tags_parent.prepend(createElementTag(tag));
    });
}

function addElementTagToParent(e) {
  const tags = tags_input.value.trim();
  const tag = tags.replace(/,/g, "");

  if (e.code === "Comma") {
    if (tags.slice(-1) === "," && tag.length > 0) {
      if (tags_arr.includes(tag) === false) {
        tags_arr.push(tag);
      }

      addElementTag();

      tags_input.value = "";
    }
  }
}

tags_input.addEventListener("input", searchTags);
tags_input.addEventListener("keyup", addElementTagToParent);
tags_input.addEventListener("focusin", searchTags);
document.addEventListener("mouseup", removeSearchTagsOnFocusOut);
window.addEventListener("load", resetElementTagsOnLoad);
