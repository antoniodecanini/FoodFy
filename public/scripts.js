const cards = document.querySelectorAll('.cards');
const showHideButton = document.querySelectorAll('.show-hide');

const currentPage = location.pathname;
const menuItems = document.querySelectorAll("header .links a");

for(item of menuItems) {
  if(currentPage.includes(item.getAttribute("href"))) {
    item.classList.add("active")
  }
}

for (let card of cards) {
  card.addEventListener("click", function() {
    const id = card.getAttribute('id');
    window.location.href = `/receitas/${id}`
  });
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