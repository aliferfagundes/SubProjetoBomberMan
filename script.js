const button = document.getElementById('start');
const menu = document.getElementById('menu');
const game = document.getElementById('game');
function transicao(){
    menu.style.display = 'none';
    game.style.display = 'block';
}
button.addEventListener('click', transicao);
