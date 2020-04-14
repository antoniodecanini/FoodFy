const showHideButton = document.querySelectorAll('.show-hide');
const currentPage = location.pathname;
const menuItems = document.querySelectorAll("header .links a");

for(item of menuItems) {
  if(currentPage.includes(item.getAttribute("href"))) {
    item.classList.add("active")
  }
}

for (let button of showHideButton) {
  button.addEventListener("click", function() {
    idTopic = button.getAttribute('id');
    
    if (document.querySelector(`.${idTopic}`).getAttribute('class') == `${idTopic}`) {
      document.querySelector(`.${idTopic}`).classList.add('deactive');
      button.innerHTML = 'Mostrar';
    } else {
      document.querySelector(`.${idTopic}`).classList.remove('deactive');
      button.innerHTML = 'Ocultar';
    }
  });
}

function addIngredient() {
  const ingredients = document.querySelector("#ingredients");
  const fieldContainer = document.querySelectorAll(".ingredient");

  // Realiza um clone do último ingrediente adicionado
  const newField = fieldContainer[fieldContainer.length - 1].cloneNode(true);

  // Não adiciona um novo input se o último tem um valor vazio
  if (newField.children[0].value == "") return false;

  // Deixa o valor do input vazio
  newField.children[0].value = "";
  ingredients.appendChild(newField);
}

document
  .querySelector(".add-ingredient")
  .addEventListener("click", addIngredient);

  
  
function addStep() {
  const steps = document.querySelector("#steps");
  const fieldContainer = document.querySelectorAll(".step");

  const newField = fieldContainer[fieldContainer.length - 1].cloneNode(true);

  if (newField.children[0].value == "") return false;

  newField.children[0].value = "";
  steps.appendChild(newField);
}

document
  .querySelector(".add-step")
  .addEventListener("click", addStep);