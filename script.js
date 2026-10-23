const button = document.getElementById('start');
const menu = document.getElementById('menu');
const game = document.getElementById('game');
const COLS = 21, ROWS = 15, TILE = 48;
const ROWSLIMIT = 15, COLSLIMIT =20;
let podeAndar = true;
let distanciaBomba = 1;
let mapa = Array.from({ length: COLS }, () => Array(ROWS).fill(0));
let posicaox = 3,posicaoy = 3;
const JOGADOR = document.getElementById('personagem')
function carregarPersonagem(){
    mapa[posicaox][posicaoy]= 1;
    JOGADOR.style.left = (posicaox*TILE) + 'px';
    JOGADOR.style.top = (posicaoy*TILE) + 'px';
}
function andar(npx,npy){
    if((posicaox+npx> 0 && posicaox+npx<COLS-1 && posicaoy+npy>0 && posicaoy+npy<ROWS-1) && mapa[posicaox + npx][posicaoy+npy] ===0 && !(mapa[posicaox + npx][posicaoy+npy] ===3)){
    if (!podeAndar) return;
    podeAndar=false;
    mapa[posicaox][posicaoy] = 0;
    posicaox += npx;
    posicaoy += npy;
    carregarPersonagem();
    setTimeout(() => {
        podeAndar = true;

    }, 150)
    }
    
}
function criarExplosao(x, y) {
    const explosao = document.createElement('div');
    explosao.className = 'explosao';
    explosao.style.left = (x * TILE) + 'px';
    explosao.style.top  = (y * TILE) + 'px';
    game.appendChild(explosao);
    
 
    setTimeout(() => explosao.remove(), 500); 
}
function carregarObstaculos(){

}
function soltarBomba(){

    if (mapa[posicaox][posicaoy] === 3) return;

    const bomb = document.createElement('div');
    const explosaoposicaox =posicaox;
    const explosaoposicaoy = posicaoy;
    bomb.className = 'bomba';
    bomb.style.left = (posicaox * TILE) + 'px';
    bomb.style.top  = (posicaoy * TILE) + 'px';
    game.appendChild(bomb); 
    

    mapa[posicaox][posicaoy] = 3;

    setTimeout(() => {

        bomb.remove();
        mapa[explosaoposicaox][explosaoposicaoy] = 0; 


        criarExplosao(explosaoposicaox,explosaoposicaoy);


        const direcoes = [
            [1, 0], [-1, 0], [0, 1], [0, -1]
        ];

        direcoes.forEach(dir => {
            for (let i = 1; i <= distanciaBomba; i++) {
                let alvoX = explosaoposicaox + (dir[0] * i);
                let alvoY = explosaoposicaoy + (dir[1] * i);

                
                if (alvoX <= 0 || alvoX >= COLS-1 || alvoY <= 0 || alvoY >= ROWS-1) break;

                
                if (mapa[alvoX][alvoY] === 2) break;
                 
                if ((mapa[alvoX][alvoY]) ===4){
                    caixa.remove;
                    const caixa = document.getElementById(`tile-${alvoX}-${alvoY}`);
                    const tile = document.createElement('div');
                    tile.className = 'tile';
                    tile.style.left = alvoX*TILE + 'px';
                    tile.style.top = alvoY*TILE + 'px';
                    criarExplosao(alvoX,alvoY);
                    mapa[alvoX][alvoY] = 0;
                    break;
                }
                if ((mapa[alvoX][alvoY] ===5)){
                    //condição da vitoria no caso a chave para a porta, ou a porta em sí vou decidir
                }
                
                criarExplosao(alvoX, alvoY);
            }
            
        });
    }, 2000);
}
document.addEventListener('keydown', (e)=>{
if(e.key === 'x' || e.key === 'X' ) {
    soltarBomba()
}});
document.addEventListener('keydown', (e)=>{
      
    if(e.key === 'ArrowUp') andar(0,-1);
    if(e.key === 'ArrowDown') andar(0,1);
    if(e.key === 'ArrowLeft') andar(-1,0);
    if(e.key === 'ArrowRight') andar(1,0);
  
    
});
function comecaFase01(){
    for (let y = 0; y < ROWS; y++) {
        for (let x = 0; x < COLS; x++) {
            const tile = document.createElement('div');
            const borda = (x === 0 || y === 0 || x === COLS - 1 || y === ROWS - 1);
            const wall = !borda && (x%2===0 && y%2===0);
            tile.className = borda ? 'outsideTile' : 'tile'
            if(wall){tile.classList.add('wall'); mapa[x][y] = 2;}
            tile.style.left = (x * TILE) + 'px';
            tile.style.top  = (y * TILE) + 'px';
            game.appendChild(tile);
        }
    }
    carregarPersonagem();
}
function transicao(){
    menu.style.display = 'none';
    game.style.display = 'block';
    comecaFase01();
}
button.addEventListener('click', transicao);






