//! dropdown menu styling

const selectMenu = document.querySelector(
  ".service-wrapper .menu-wrapper .select"
);
const optionsWrapper = document.querySelector(
  ".service-wrapper .menu-wrapper .options"
);
const options = document.querySelectorAll(
  ".service-wrapper .menu-wrapper .options div"
);

//! class
class DropDownStyle {
  constructor() {
    this.lastKnownOption;
  }

  displayOptions() {
    optionsWrapper.classList.remove("hide");
    optionsWrapper.classList.add("show");
  }
  hideOptions() {
    optionsWrapper.classList.remove("show");
    optionsWrapper.classList.add("hide");
  }

  toggleOptions() {
    if (optionsWrapper.classList.contains("hide")) {
      this.displayOptions();
      this.focusLastKnownoption();
      this.reflectOPtionchange();
    } else if (optionsWrapper.classList.contains("show")) {
      this.hideOptions();
    } else {
      optionsWrapper.classList.add("show");
      this.focusLastKnownoption();
      this.reflectOPtionchange();
    }
  }

  focusLastKnownoption() {
    if (typeof this.lastKnownOption === "undefined") {
      options[0].focus();
    } else {
      let i = this.getOptionIndex(this.lastKnownOption);
      options[i].focus();
    }
  }

  getOptionIndex(currentEle) {
    if (typeof currentEle === "undefined") {
      currentEle = document.activeElement;
    }

    for (let i = 0; i < options.length; i++) {
      if (currentEle.className === options[i].className) return i;
    }
  }

  reflectOPtionchange(i) {
    if (typeof i === "undefined") {
      i = this.getOptionIndex();
    }
    selectMenu.children[0].innerText = options[i].innerText;
  }

  changeOption() {
    this.lastKnownOption = document.activeElement;
    selectMenu.children[0].innerText = document.activeElement.textContent;
    selectMenu.focus();
    this.hideOptions();
  }
}

//! main
export default function () {
  let dropDown = new DropDownStyle();

  selectMenu.addEventListener("click", () => {
    dropDown.toggleOptions();
  });

  let i = -1;
  selectMenu.addEventListener("keydown", (e) => {
    if (e.code === "Space" || e.code === "Enter") {
      e.preventDefault();
      dropDown.toggleOptions();
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

    dropDown.lastKnownOption = options[i];
  });

  optionsWrapper.addEventListener("keydown", (e) => {
    e.preventDefault();

    let i = dropDown.getOptionIndex();

    if (e.code === "ArrowDown") {
      i++;
      if (i < options.length) {
        options[i].focus();
        dropDown.reflectOPtionchange(i);
      }
    } else if (e.code === "ArrowUp") {
      i--;
      if (i >= 0) {
        options[i].focus();
        dropDown.reflectOPtionchange(i);
      }
    } else if (e.code === "Enter" || e.code === "Escape") {
      dropDown.changeOption();
    }
  });

  optionsWrapper.addEventListener("click", () => {
    dropDown.changeOption();
  });

  optionsWrapper.addEventListener("mousemove", (e) => {
    e.preventDefault();
    document.activeElement.blur();
    e.target.focus();
  });
}
