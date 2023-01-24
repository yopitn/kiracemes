function updateQueryStringParameter(uri, key, value) {
  let re = new RegExp("([?&])" + key + "=.*?(&|#|$)", "i");

  if (value === undefined) {
    if (uri.match(re)) {
      return uri
        .replace(re, "$1$2")
        .replace(/[?&]$/, "")
        .replaceAll(/([?&])&+/g, "$1")
        .replace(/[?&]#/, "#");
    } else {
      return uri;
    }
  } else {
    if (uri.match(re)) {
      return uri.replace(re, "$1" + key + "=" + value + "$2");
    } else {
      let hash = "";
      if (uri.indexOf("#") !== -1) {
        hash = uri.replace(/.*#/, "#");
        uri = uri.replace(/#.*/, "");
      }
      let separator = uri.indexOf("?") !== -1 ? "&" : "?";
      return uri + separator + key + "=" + value + hash;
    }
  }
}

(function () {
  const profile_button = document.querySelector("[data-button='profile']");

  profile_button.addEventListener("click", () => {
    profile_button.parentNode.classList.toggle("s");
  });

  document.addEventListener("mouseup", (e) => {
    if (profile_button.parentNode.classList.contains("s") && !profile_button.contains(e.target)) {
      profile_button.parentNode.classList.remove("s");
    }
  });
})();
