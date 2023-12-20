const container = document.querySelector(".container");
const input = document.querySelector(".box_input_btn input");
const buttonAdd = document.querySelector(".add");
const buttonSave = document.querySelector(".save");

window.addEventListener("load", () => {
  const getStorage = localStorage.getItem("dashboardItems");

  if (getStorage) {

    let options = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    };
    

    function callback(entries, observer) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          console.log(true);
          console.log(entry.target);
        } else{console.log(false);}
      });
    };
    const observer = new IntersectionObserver(callback, options)
    
    
    
    const parseItemsStorage = JSON.parse(getStorage);
    parseItemsStorage.forEach((element) => {
      createElementLi(element.value, element.btnColor);
    });
  }
});



function addItem() {
  const valueInput = input.value;
  if (valueInput.trim() !== "") {
    createElementLi(valueInput, "rgb(221, 221, 221)");
    input.value = "";
    saveStorage();
  }
}

buttonAdd.addEventListener("click", addItem);
buttonSave.addEventListener("click", saveStorage);

input.addEventListener("keypress", (event) => {
  if (event.key === "Enter") addItem();
});

function createElementLi(string, btnPreview_color) {
  const li = document.createElement("li");
  const p = document.createElement("p");
  p.contentEditable = true;
  p.textContent = string;

  const btnDelet = document.createElement("button");
  const btnColors = document.createElement("button");
  btnColors.style.backgroundColor = btnPreview_color;
  btnColors.style.padding = "10px";
  li.style.boxShadow = `0 0 5px ${btnPreview_color}`;
  btnDelet.textContent = "Eliminar";

  btnColors.classList.add("btn_preview_colors");
  btnDelet.classList.add("btn_delet_element");

  btnDelet.addEventListener("click", function () {
    li.remove();
    saveStorage();
  });
  li.appendChild(btnColors);
  li.appendChild(p);
  li.appendChild(btnDelet);
  container.appendChild(li);

  btnColors.addEventListener("click", function () {
    const currentIndex = colors.indexOf(btnColors.style.backgroundColor);
    const nextIndex = (currentIndex + 1) % colors.length;
    const nextColor = colors[nextIndex];
    btnColors.style.backgroundColor = nextColor;
    li.style.boxShadow = `0 0 5px ${nextColor}`;
    saveStorage();
  });
}

function saveStorage() {
  const elementInProcess = Array.from(container.children).map((li) => {
    return {
      value: li.children[1].textContent,
      color: li.style.boxShadow,
      btnColor: li.children[0].style.backgroundColor,
    };
  });
  localStorage.setItem("dashboardItems", JSON.stringify(elementInProcess));
}

const colors = [
  "rgb(221, 221, 221)",
  "rgb(48, 117, 255)",
  "rgb(0, 153, 0)",
  "rgb(255, 102, 0)",
];
