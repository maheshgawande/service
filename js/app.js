const apiUrl =
  "https://raw.githubusercontent.com/nevken7/services_data/master/services.json";

const selectMenu = document.querySelector(
  ".service-wrapper .menu-wrapper .select"
);
const optionsWrapper = document.querySelector(
  ".service-wrapper .menu-wrapper .options"
);

const createOption = (text) => {
  let option = document.createElement("div");
  option.classList.add(text.replace(" ", "-"));
  option.classList.add("option");
  option.tabIndex = -1;
  option.setAttribute("aria", text);
  option.innerHTML = `<p>${text}</p>`;
  return option;
};

//! callback
// const getData = (url, callback) => {
//   fetch(url).then((response) => {
//     if (response.status === 200) {
//       response.json().then((data) => {
//         callback(null, data);
//       });
//     } else {
//       callback(new Error("Something went wrong!"));
//     }
//   });
// };

// getData(
//   apiUrl,
//   (err, data) => {
//     if (err) {
//       console.log(err.message);
//     } else {
//       data.services[0].main.forEach((service) => {
//         let createdOption = createOption(service);
//         optionsWrapper.appendChild(createdOption);
//       });

//       let script = document.createElement("script");
//       script.src = "./js/dropDownStyle.js";
//       document.body.appendChild(script);
//     }
//   }
// );

const getData = () => {
  return new Promise((resolve, reject) => {
    fetch(apiUrl).then((result) => {
      if (result.status === 200) {
        result.json().then((data) => {
          resolve(data);
        });
      } else {
        reject(new Error("Something went wrong!"));
      }
    });
  });
};

getData().then(
  (data) => {
    data.services[0].main.forEach((service) => {
      let createdOption = createOption(service);
      optionsWrapper.appendChild(createdOption);
    });

    let script = document.createElement("script");
    script.src = "./js/dropDownStyle.js";
    document.body.appendChild(script);
  },
  (err) => console.log(err)
);
