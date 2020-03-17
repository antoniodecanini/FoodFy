const modalOverlay = document.querySelector('.modal-overlay');
const cards = document.querySelectorAll('.cards');

for (let card of cards) {
  card.addEventListener("click", function(){
    const srcImg = card.querySelector('img').getAttribute('src');
    const txth2 = card.querySelector('h2').innerText;
    const txtP = card.querySelector('p').innerText;
    modalOverlay.classList.add('active');
    modalOverlay.querySelector('img').src = `${srcImg}`;
    modalOverlay.querySelector('h2').innerHTML = `${txth2}`
    modalOverlay.querySelector('p').innerHTML = `${txtP}`
  })
}

document.querySelector('.close-modal').addEventListener("click", function(){
  modalOverlay.classList.remove('active');
})