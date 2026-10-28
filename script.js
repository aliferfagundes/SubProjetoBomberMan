const button = document.getElementById('start');
const menu = document.getElementById('menu');
const game = document.getElementById('game');
const COLS = 21, ROWS = 15, TILE = 48;
const ROWSLIMIT = 15, COLSLIMIT =20;
const FIMDEJOGO = document.getElementById('gameover');
const FIMDEJOGO2 = document.getElementById('gameover2');
const buttonrestart = document.getElementById('retry');
const buttonmenu = document.getElementById('mainmenu');
const buttonrestart2 = document.getElementById('retry2');
const buttonmenu2 = document.getElementById('mainmenu2');
let podeAndar = true;
let bombaSolta = false;
let podeAndar2 = true;
let distanciaBomba = 20;
let mapa = Array.from({ length: COLS }, () => Array(ROWS).fill(0));
let posicaox = 3,posicaoy = 3;
let posicaox2 = 17,posicaoy2 = 11;
const JOGADOR = document.getElementById('personagem');
const JOGADOR2 = document.getElementById('personagem2');


function carregarPersonagem(){
    mapa[posicaox][posicaoy]= 1;
    JOGADOR.style.left = (posicaox*TILE) + 'px';
    JOGADOR.style.top = (posicaoy*TILE) + 'px';
    JOGADOR.style.backgroundImage = 'url("./assets/character/idle-front.png")';
}
function carregarPersonagem2(){
    mapa[posicaox2][posicaoy2]= 7;
    JOGADOR2.style.left = (posicaox2*TILE) + 'px';
    JOGADOR2.style.top = (posicaoy2*TILE) + 'px';
    JOGADOR2.style.backgroundImage = 'url("./assets/character/idle-back.png")';
}
function sound(){
    const som = new Audio('./source/walk.mp3');
    som.play();
}
function andar(npx,npy){
    if((posicaox+npx> 0 && posicaox+npx<COLS-1 && posicaoy+npy>0 && posicaoy+npy<ROWS-1) && mapa[posicaox + npx][posicaoy+npy] ===0 && !(mapa[posicaox + npx][posicaoy+npy] ===3)){
    if (!podeAndar) return;
    podeAndar=false;
    temBomba= mapa[posicaox][posicaoy] === 3;
    if(!temBomba){mapa[posicaox][posicaoy] = 0}
    posicaox += npx;
    posicaoy += npy;
    mapa[posicaox][posicaoy] = 1;
    carregarPersonagem();
    sound();
    setTimeout(() => {
        podeAndar = true;

    }, 150)
    }
    
}
function andar2(npx,npy){
    if((posicaox2+npx> 0 && posicaox2+npx<COLS-1 && posicaoy2+npy>0 && posicaoy2+npy<ROWS-1) && mapa[posicaox2 + npx][posicaoy2+npy] ===0 && !(mapa[posicaox2 + npx][posicaoy2+npy] ===3)){
    if (!podeAndar2) return;
    podeAndar2=false;
    temBomba= mapa[posicaox2][posicaoy2] === 3;
    if(!temBomba){mapa[posicaox2][posicaoy2] = 0}
    posicaox2 += npx;
    posicaoy2 += npy;
    mapa[posicaox2][posicaoy2] = 7;
    carregarPersonagem2();
    sound();
    setTimeout(() => {
        podeAndar2 = true;

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
       for(let x = 0; x < COLS; x++){
        for (let y = 0; y < ROWS; y++){
            /*
            direcoes.forEach(dir => {
            for (let i = 1; i <= 1; i++) {
                let alvoX = 1 + (dir[0] * i);
                let alvoY = 1 + (dir[1] * i);
                if (alvoX <= 0 || alvoX >= COLS-1 || alvoY <= 0 || alvoY >= ROWS-1) break;

            }
                });
                */
            if(mapa[x][y] === 0 && Math.random() < 0.7 && !(x === 3 && y === 3) && mapa[x][y] !=6) {
                const paredequebravel = document.createElement('div');
                paredequebravel.className = 'paredequebravel';
                paredequebravel.id = `caixa-${x}-${y}`;
                paredequebravel.style.left = (x * TILE) + 'px';
                paredequebravel.style.top  = (y * TILE) + 'px';
                mapa[x][y] = 4;
                game.appendChild(paredequebravel);  
            }
        }
    }
}

function soltarBomba(posicaox,posicaoy){

    if (mapa[posicaox][posicaoy] === 3) return;

    const bomb = document.createElement('div');
    const explosaoposicaox =posicaox;
    const explosaoposicaoy = posicaoy;
    bomb.className = 'bomba';
    bomb.style.left = (posicaox * TILE) + 'px';
    bomb.style.top  = (posicaoy * TILE) + 'px';
    game.appendChild(bomb); 
    bombaSolta = true;

    mapa[posicaox][posicaoy] = 3;


    setTimeout(() => {

        bomb.remove();
        mapa[explosaoposicaox][explosaoposicaoy] = 0; 
        bombaSolta = false;
        
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
                 
               if (mapa[alvoX][alvoY] === 4){
    
    const caixa = document.getElementById(`caixa-${alvoX}-${alvoY}`);
        if (caixa) caixa.remove();
    
    
            const tile = document.createElement('div');
            tile.className = 'tile';
            tile.style.left = (alvoX * TILE) + 'px';
            tile.style.top = (alvoY * TILE) + 'px';
            game.appendChild(tile); // Faltava isso!
    
    
            criarExplosao(alvoX, alvoY);
    
    
            mapa[alvoX][alvoY] = 0;
            break; 
                }
                if ((mapa[alvoX][alvoY] ===1)){
                    JOGADOR.style.backgroundImage = 'url(./assets/character/death-front.png)';
                    JOGADOR2.style.backgroundImage = 'url(./assets/character/win-front.png)';
                    JOGADOR2.style.backgroundSize = '48px 96px';
                    JOGADOR2.style.backgroundPosition ='0px 0px';
                    setTimeout(()=>{
                        JOGADOR2.style.backgroundSize = '400% 100%';
                        JOGADOR2.style.backgroundPosition ='0% 0%';
                        morte();
                    }, 1500);
                    break;
                }
                if ((mapa[alvoX][alvoY] ===7)){
                    JOGADOR2.style.backgroundImage = 'url(./assets/character/death-front.png)';
                    JOGADOR.style.backgroundImage = 'url(./assets/character/win-front.png)';
                    JOGADOR.style.backgroundSize = '96px 48px';
                    JOGADOR.style.backgroundPosition ='0px 0px';
                    JOGADOR2.style.backgroundSize = '164px 32px';
                    JOGADOR2.style.backgroundPosition ='0px 0px';
                    setTimeout(()=>{
                        JOGADOR.style.backgroundSize = '400% 100%';
                    JOGADOR.style.backgroundPosition ='0% 0%';
                    JOGADOR2.style.backgroundSize = '400% 100%';
                        JOGADOR2.style.backgroundPosition ='0% 0%';
                        morte2();
                    }, 1500);
                    break;
                }
                criarExplosao(alvoX, alvoY);
            }
            
            
        });
    }, 2000);
}
document.addEventListener('keydown', (e)=>{
if(e.key === ':' || e.key === ';' ) {
    soltarBomba(posicaox,posicaoy);
}});
document.addEventListener('keydown', (e)=>{
      
   if(e.key === 'ArrowUp'){ andar(0,-1); JOGADOR.style.backgroundImage = 'url(./assets/character/walk-back.png)'};
    if(e.key === 'ArrowDown'){ andar(0,1); JOGADOR.style.backgroundImage = 'url(./assets/character/walk-front.png)'};
    if(e.key === 'ArrowLeft'){ andar(-1,0); JOGADOR.style.backgroundImage = 'url(./assets/character/walk-left.png)'};
    if(e.key === 'ArrowRight'){ andar(1,0); JOGADOR.style.backgroundImage = 'url(./assets/character/walk-right.png)'};
  
    
});
document.addEventListener('keydown', (e)=>{
if(e.key === 'q' || e.key === 'Q' ) {
    soltarBomba(posicaox2,posicaoy2);
}});
document.addEventListener('keydown', (e)=>{
      
    if(e.key === 'w'){ andar2(0,-1); JOGADOR2.style.backgroundImage = 'url(./assets/character/walk-back.png)'};
    if(e.key === 's'){ andar2(0,1); JOGADOR2.style.backgroundImage = 'url(./assets/character/walk-front.png)'};
    if(e.key === 'a'){ andar2(-1,0); JOGADOR2.style.backgroundImage = 'url(./assets/character/walk-left.png)'};
    if(e.key === 'd'){ andar2(1,0); JOGADOR2.style.backgroundImage = 'url(./assets/character/walk-right.png)'};
  
    
});
function comecaFase01(){
    posicaox = 3,posicaoy = 3;
    posicaox2 = 17; posicaoy2=11;
    for (let y = 0; y < ROWS; y++) {
        for (let x = 0; x < COLS; x++) {
            const tile = document.createElement('div');
            const borda = (x === 0 || y === 0 || x === COLS - 1 || y === ROWS - 1);
            const wall = !borda && (x%2===0 && y%2===0);
            tile.className = borda ? 'outsideTile' : 'tile'
            if(borda){mapa[x][y] = 6}
            if(wall){tile.classList.add('wall'); mapa[x][y] = 2;}
            tile.style.left = (x * TILE) + 'px';
            tile.style.top  = (y * TILE) + 'px';
            game.appendChild(tile);
        }
    }
    carregarPersonagem();
    carregarPersonagem2();
    carregarObstaculos();
}
function transicao(){
    FIMDEJOGO.style.display = 'none';
    menu.style.display =  'none';
    game.style.display = 'block';
    comecaFase01();
}
function deVoltaAoMenu(){
    menu.style.display ='block';
    FIMDEJOGO.style.display = 'none';
}
button.addEventListener('click', transicao);
function morte(){
    game.style.display =  'none';
    FIMDEJOGO.style.display = 'block';
    mapa[posicaox][posicaoy] = 0;
    Array.from(game.children).forEach(child => {
    if (child.id !== 'personagem' && child.id !=='personagem2') {
        child.remove();
    }
});
     for(let x = 0; x < COLS; x++){
        for (let y = 0; y < ROWS; y++){
    mapa[x][y] = 0;
        }}
}
function morte2(){
    game.style.display =  'none';
    FIMDEJOGO2.style.display = 'block';
    mapa[posicaox2][posicaoy2] = 0;
    Array.from(game.children).forEach(child => {
    if (child.id !== 'personagem' && child.id !=='personagem2') {
        child.remove();
    }
});
     for(let x = 0; x < COLS; x++){
        for (let y = 0; y < ROWS; y++){
    mapa[x][y] = 0;
        }}
}

buttonrestart.addEventListener('click', transicao);
buttonmenu.addEventListener('click',deVoltaAoMenu);
buttonrestart2.addEventListener('click', transicao);
buttonmenu2.addEventListener('click',deVoltaAoMenu);





