const editable = document.getElementById("editable");
const iframe_doc = editable.contentDocument || editable.contentWindow;
const iframe_head = iframe_doc.head;
const iframe_body = iframe_doc.body;
const insert_link = document.querySelector("[data-command='insertLinkUrl']");
const insert_image = document.querySelector("[data-command='editImage']");

// Set content editable
(function () {
  const current_content = document.getElementById("content");

  iframe_body.setAttribute("contenteditable", "true");
  iframe_body.setAttribute("spellcheck", "false");
  iframe_body.setAttribute("role", "textbox");
  iframe_body.innerHTML = current_content ? (current_content.textContent === "" ? "<p><br></p>" : current_content.textContent) : "<p><br></p>";

  const iframe_style = iframe_doc.createElement("style");
  iframe_style.innerHTML = `
  @font-face {font-family: 'Roboto';font-style: normal;font-weight: 400;font-display: swap;src: url(https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Mu4mxK.woff2) format('woff2');}@font-face {font-family: 'Roboto';font-style: italic;font-weight: 400;font-display: swap;src: url(https://fonts.gstatic.com/s/roboto/v30/KFOkCnqEu92Fr1Mu51xIIzI.woff2) format('woff2');}@font-face {font-family: 'Roboto';font-style: normal;font-weight: 700;font-display: swap;src: url(https://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmWUlfBBc4.woff2) format('woff2');}@font-face {font-family: 'Roboto';font-style: italic;font-weight: 700;font-display: swap;src: url(https://fonts.gstatic.com/s/roboto/v30/KFOjCnqEu92Fr1Mu51TzBic6CsQ.woff2) format('woff2');}:root {--content-bg: #fefefe;--title-color: #273239;--text-color: #273239;--link-color: #1f28eb;--body-font: "Roboto", sans-serif;}::selection {background: rgba(0, 0, 0, 0.1);}*,:after,:before {-webkit-box-sizing: border-box;box-sizing: border-box;}a {color: #1f28eb}h1,h2,h3,h4,h5,h6 {margin: 0;font-weight: 700;color: #273239;}h1 {font-size: 1.8rem;}h2 {font-size: 1.6rem;}h3 {font-size: 1.5rem;}h4 {font-size: 1.3rem;}h5 {font-size: 1.2rem;}h6 {font-size: 1.1rem;}img {position: relative;display: block;max-width: 100%;height: auto;}html {min-width: 0;overflow-x: hidden;}body {position: relative;margin: 0;padding: 20px 16px !important;width: 100%;min-width:0;direction:ltr;text-align:left;font-family: "Roboto", sans-serif;font-size: 16px;color: #273239;background-color: #fefefe;-webkit-font-smoothing: antialiased;word-break: break-word;transition: 0.1s ease;}
  `;

  iframe_head.appendChild(iframe_style);

  iframe_doc.execCommand("defaultParagraphSeparator", false, "p");

  iframe_body.addEventListener("paste", (e) => {
    e.preventDefault();

    const text = e.clipboardData.getData("text/plain");

    iframe_doc.execCommand("insertText", false, text);
  });
})();

// Toolbar handler
(function () {
  const command = document.querySelectorAll("[data-command]");

  command.forEach((cmd) => {
    cmd.addEventListener("mousedown", () => {
      iframe_doc.execCommand(cmd.dataset.command, false, null);
    });
  });
})();

// Toolbar styled handler
(function () {
  const command = document.querySelectorAll("[data-styled]");

  command.forEach((cmd) => {
    cmd.addEventListener("mousedown", () => {
      iframe_doc.execCommand("formatBlock", false, cmd.dataset.styled);
    });
  });
})();

// Show styled dropdown
(function () {
  const button = document.querySelector("[data-button='styled-dropdown']");
  const dropdown = button.parentElement.children[1];

  button.addEventListener("click", () => {
    dropdown.classList.toggle("s");
  });

  document.addEventListener("mouseup", (e) => {
    if (dropdown.classList.contains("s") && !button.contains(e.target)) {
      dropdown.classList.remove("s");
    }
  });
})();

// Show insert link modal function
function showInsertLinkModal() {
  const children = document.querySelector(".editor__toolbar");
  const parent = children.parentNode;

  const modal = document.createElement("div");
  modal.className = "editor__modal-wrap";
  modal.innerHTML = `
    <div class="editor__modal-inner">
      <div class="editor__modal-header">
        <h3 class="editor__modal-title">
          <span class="title">Insert link</span>
        </h3>

        <div class="editor__modal-close" role="button" data-button="close-modal">
          <svg viewBox="0 0 50 50">
            <path d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z" />
          </svg>
        </div>
      </div>

      <div class="editor__modal-content">
        <div class="editor__modal-group">
          <label for="link">Link</label>
          <input type="text" id="link" autocomplite="off" placeholder="Place your link here" required />
        </div>

        <div class="editor__modal-group">
          <input class="hidden" type="checkbox" id="checkbox"/>
          <label for="checkbox">Open in new tab</label>
        </div>
      </div>

      <div class="editor__modal-button">
        <div class="btn btn-danger" aria-label="Cancel" role="button" data-button="close-modal">
          <span class="text">Cancel</span>
        </div>

        <div class="btn btn-primary" aria-label="Submit" role="button" data-button="submit-modal">
          <span class="text">Submit</span>
        </div>
      </div>
    </div>

    <div class="editor__modal-overlay" data-button="close-modal"></div>
  `;

  parent.insertBefore(modal, children.nextSibling);

  const close_button = document.querySelectorAll("[data-button='close-modal'");
  const submit_button = document.querySelector("[data-button='submit-modal'");

  close_button.forEach((button) => {
    button.addEventListener("click", () => {
      modal.remove();
    });
  });

  submit_button.addEventListener("click", () => {
    let link = document.getElementById("link");
    let checkbox = document.getElementById("checkbox");

    if (iframe_doc.getSelection().toString()) {
      let el = iframe_doc.createElement("a");
      el.href = link.value === "" ? "#" : link.value;
      if (checkbox.checked) el.target = "_blank";

      iframe_doc.getSelection().getRangeAt(0).surroundContents(el);
    }

    modal.remove();
  });
}

// Show insert image modal function
function showInsertImageModal() {
  const children = document.querySelector(".editor__toolbar");
  const parent = children.parentNode;

  const modal = document.createElement("div");
  modal.className = "editor__modal-wrap";
  modal.innerHTML = `
    <div class="editor__modal-inner">
      <div class="editor__modal-header">
        <h3 class="editor__modal-title">
          <span class="title">Insert image</span>
        </h3>

        <div class="editor__modal-close" role="button" data-button="close-modal">
          <svg viewBox="0 0 50 50">
            <path d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z" />
          </svg>
        </div>
      </div>

      <div class="editor__modal-content">
        <div class="editor__modal-group images">
          <input class="hidden" type="file" name="images" id="images">
          <label for="images">
            <svg viewBox="0 0 24 24">
              <g transform="translate(2.000000, 2.000000)" >
                <path d="M3,7.447 C3,4.996 5.03023915,3 7.52453297,3 L12.4856437,3 C14.9748492,3 17,4.99 17,7.437 L17,18.553 C17,21.005 14.9697608,23 12.4744494,23 L7.51537399,23 C5.02515083,23 3,21.01 3,18.563 L3,17.623 L3,7.447 Z" opacity="0.400000006" transform="translate(10.000000, 13.000000) rotate(-90.000000) translate(-10.000000, -13.000000) "/>
                <path d="M16.3795776,6.0556077 L13.5337878,3.1466077 C13.2396645,2.8466077 12.7663401,2.8466077 12.4731906,3.1486077 C12.1810151,3.4506077 12.181989,3.9376077 12.4751385,4.2376077 L14.0343819,5.8306077 L12.5394171,5.8306077 L4.14910952,5.8306077 C3.73519417,5.8306077 3.3991923,6.1756077 3.3991923,6.6006077 C3.3991923,7.0266077 3.73519417,7.3706077 4.14910952,7.3706077 L14.0343819,7.3706077 L12.4751385,8.9636077 C12.181989,9.2636077 12.1810151,9.7506077 12.4731906,10.0526077 C12.6202523,10.2036077 12.8121143,10.2796077 13.0049501,10.2796077 C13.1958381,10.2796077 13.3877001,10.2036077 13.5337878,10.0546077 L16.3795776,7.1466077 C16.5207958,7.0016077 16.6006571,6.8056077 16.6006571,6.6006077 C16.6006571,6.3966077 16.5207958,6.2006077 16.3795776,6.0556077" transform="translate(9.999925, 6.600732) rotate(-90.000000) translate(-9.999925, -6.600732) "/>
              </g>
            </svg>

            <span>Upload</span>
          </label>
        </div>

        <div class="editor__modal-images"></div>

        <div class="editor__modal-group">
          <label for="alt-image">Alt image</label>
          <input type="text" id="alt-image" autocomplite="off" placeholder="Alt image" />
        </div>

        <div class="editor__modal-group">
          <label for="title-image">Title image</label>
          <input type="text" id="title-image" autocomplite="off" placeholder="Title image" />
        </div>
      </div>

      <div class="editor__modal-button">
        <div class="btn btn-danger" aria-label="Cancel" role="button" data-button="close-modal">
          <span class="text">Cancel</span>
        </div>

        <div class="btn btn-primary" aria-label="Submit" role="button" data-button="submit-modal">
          <span class="text">Submit</span>
        </div>
      </div>
    </div>

    <div class="editor__modal-overlay" data-button="close-modal"></div>
  `;

  parent.insertBefore(modal, children.nextSibling);

  const images = document.getElementById("images");
  const show_images = document.querySelector(".editor__modal-images");
  const close_button = document.querySelectorAll("[data-button='close-modal']");
  const submit_button = document.querySelector("[data-button='submit-modal']");

  images.addEventListener("change", () => {
    const [file] = images.files;

    if (file) {
      const image_url = URL.createObjectURL(file);

      show_images.style.display = "block";
      show_images.style.backgroundImage = `url(${image_url})`;
    }
  });

  close_button.forEach((button) => {
    button.addEventListener("click", () => {
      modal.remove();
    });
  });

  submit_button.addEventListener("click", () => {
    const editor_wrap = document.querySelector(".editor__wrap");
    const editor_message = document.querySelector(".editor__message");

    const data = new FormData();

    data.append("images", images.files[0]);

    if (images.files[0]) {
      fetch(`${BASE_API}/images/upload`, {
        method: "POST",
        body: data,
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
            const image_url = json.images[0].url;
            const image_alt = document.getElementById("alt-image");
            const image_title = document.getElementById("title-image");

            let image = iframe_doc.createElement("img");
            image.src = image_url;
            if (image_alt.value !== "") image.alt = image_alt;
            if (image_title.value !== "") image.title = image_title;

            let paragraph = iframe_doc.createElement("p");
            paragraph.innerHTML = "<br>";

            let sel, range, node, parent;

            if (iframe_doc.getSelection) {
              sel = iframe_doc.getSelection();

              if (sel.getRangeAt && sel.rangeCount && sel.focusNode.nodeName.toLowerCase() !== "body") {
                range = sel.getRangeAt(0);
                range.deleteContents();

                node = range.commonAncestorContainer;

                parent = node.parentNode;
                parent.insertBefore(image, node.nextSibling);
                parent.insertBefore(paragraph, image.nextSibling);

                node.remove();
              }
            }

            modal.remove();
          }
        })
        .catch((error) => {
          throw new Error(error);
        });
    } else {
      modal.remove();
    }
  });
}

insert_link.addEventListener("click", showInsertLinkModal);
insert_image.addEventListener("click", showInsertImageModal);
