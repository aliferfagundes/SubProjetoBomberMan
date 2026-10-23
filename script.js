const button = document.getElementById('start');
const menu = document.getElementById('menu');
const game = document.getElementById('game');
const COLS = 21, ROWS = 15, TILE = 48;
const ROWSLIMIT = 15, COLSLIMIT =20;
let posicaox = 1,posicaoy = 1;
const JOGADOR = document.getElementById('personagem')
function carregarPersonagem(x,y){
    JOGADOR.style.left = (x*TILE) + 'px';
    JOGADOR.style.top = (y*TILE) + 'px';
}
function comecaFase01(){
    for (let y = 0; y < ROWS; y++) {
        for (let x = 0; x < COLS; x++) {
            const tile = document.createElement('div');
            const borda = (x === 0 || y === 0 || x === COLS - 1 || y === ROWS - 1);
            const wall = !borda && (x%2===0 && y%2===0);
            tile.className = borda ? 'outsideTile' : 'tile'
            if(wall){tile.classList.add('wall')}
            tile.style.left = (x * TILE) + 'px';
            tile.style.top  = (y * TILE) + 'px';
            game.appendChild(tile);
        }
    }
    carregarPersonagem(1,2);

}
function transicao(){
    menu.style.display = 'none';
    game.style.display = 'block';
    comecaFase01();
}
button.addEventListener('click', transicao);






