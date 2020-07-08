//! dropdown menu styling
const options = document.querySelectorAll(
  ".service-wrapper .menu-wrapper .options div"
);

const displayOptions = () => {
  optionsWrapper.classList.remove("hide");
  optionsWrapper.classList.add("show");
};
const hideOptions = () => {
  optionsWrapper.classList.remove("show");
  optionsWrapper.classList.add("hide");
};

const toggleOptions = () => {
  if (optionsWrapper.classList.contains("hide")) {
    displayOptions();
    focusLastKnownoption();
    reflectOPtionchange();
  } else if (optionsWrapper.classList.contains("show")) {
    hideOptions();
  } else {
    optionsWrapper.classList.add("show");
    focusLastKnownoption();
    reflectOPtionchange();
  }
};

let lastKnownoption;
const focusLastKnownoption = () => {
  if (typeof lastKnownoption === "undefined") {
    options[0].focus();
  } else {
    i = getOptionIndex(lastKnownoption);
    options[i].focus();
  }
};

const getOptionIndex = (currentEle) => {
  if (typeof currentEle === "undefined") {
    currentEle = document.activeElement;
  }

  for (let i = 0; i < options.length; i++) {
    if (currentEle.className === options[i].className) return i;
  }
};

const reflectOPtionchange = (i) => {
  if (typeof i === "undefined") {
    i = getOptionIndex();
  }
  selectMenu.children[0].innerText = options[i].innerText;
};

const changeOption = (selectedOptionEle, selectedOptionText) => {
  lastKnownoption = selectedOptionEle;
  selectMenu.children[0].innerText = selectedOptionText;
  selectMenu.focus();
  hideOptions();
};

selectMenu.addEventListener("click", () => {
  toggleOptions();
});

let i = -1;
selectMenu.addEventListener("keydown", (e) => {
  if (e.code === "Space" || e.code === "Enter") {
    e.preventDefault();
    toggleOptions();
  } else if (e.code === "ArrowDown") {
    e.preventDefault();
    i++;
    if (i < options.length) {
      selectMenu.children[0].innerText = options[i].innerText;
    } else {
      i--;
    }
  } else if (e.code === "ArrowUp") {
    e.preventDefault();
    i--;
    if (i >= 0) {
      selectMenu.children[0].innerText = options[i].innerText;
    } else {
      i++;
    }
  }

  lastKnownoption = options[i];
});

optionsWrapper.addEventListener("keydown", (e) => {
  e.preventDefault();

  let i = getOptionIndex();

  if (e.code === "ArrowDown") {
    i++;
    if (i < options.length) {
      options[i].focus();
      reflectOPtionchange(i);
    }
  } else if (e.code === "ArrowUp") {
    i--;
    if (i >= 0) {
      options[i].focus();
      reflectOPtionchange(i);
    }
  } else if (e.code === "Enter" || e.code === "Escape") {
    changeOption(document.activeElement, document.activeElement.textContent);
  }
});

optionsWrapper.addEventListener("click", (e) => {
  e.preventDefault();
  changeOption(e.target, e.target.textContent);
});

optionsWrapper.addEventListener("mousemove", (e) => {
  e.preventDefault();
  document.activeElement.blur();
  e.target.focus();
});

// for (let i = 0; i < options.length; i++) {
//   if (options[i].className != document.activeElement.className) {
//     hideOptions();
//   }
// }
