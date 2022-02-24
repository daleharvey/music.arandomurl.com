let $ = document.querySelector.bind(document);

let hashChanged = () => {
  let src = document.location.hash.slice(1);
  let dialog = $("#dialog");
  if (src) {
    $("#dialog img").src = src;
    dialog.removeAttribute("hidden");
    // Need to trigger a reflow to animate the
    // dialog in.
    dialog.offsetHeight;
    $("#dialog").classList.remove("hidden");
  } else if (!src && !dialog.hidden) {
    dialog.addEventListener("transitionend", () => {
      dialog.hidden = true;
    }, { once: true });
    dialog.classList.add("hidden");
    $("#dialog img").src = "";
  }
};

$("#dialog").addEventListener("click", () => {
  if (document.location.hash.length) {
    // Doesn't trigger a scroll.
    history.replaceState({}, "", "#");
    hashChanged();
  }
}, false);


window.addEventListener("hashchange", hashChanged, false);
hashChanged();

