const button = document.getElementById('start');
const menu = document.getElementById('menu');
const game = document.getElementById('game');
const gameWrapper = document.getElementById('game-wrapper');
const COLS = 21, ROWS = 15, TILE = 48;
const ROWSLIMIT = 15, COLSLIMIT = 20;
const FIMDEJOGO = document.getElementById('gameover');
const FIMDEJOGO_TITULO = document.getElementById('gameover-titulo');
const buttonrestart = document.getElementById('retry');
const buttonmenu = document.getElementById('mainmenu');
 const backgroundSound = new Audio('./source/soundtrack.mp3');
let podeAndar = true;
let bombaSolta = false;
let podeAndar2 = true;
let p1EstaMorto = false;
let p2EstaMorto = false;
let distanciaBomba = 20;
let mapa = Array.from({ length: COLS }, () => Array(ROWS).fill(0));
let posicaox = 3, posicaoy = 3;
let posicaox2 = 17, posicaoy2 = 11;

const JOGADOR = document.getElementById('personagem');
const JOGADOR2 = document.getElementById('personagem2');

function carregarPersonagem(){
    mapa[posicaox][posicaoy] = 1;
    JOGADOR.style.left = (posicaox * TILE) + 'px';
    JOGADOR.style.top = (posicaoy * TILE) + 'px';
    JOGADOR.style.backgroundImage = 'url("./assets/character/idle-frontsf.gif")';
}

function carregarPersonagem2(){
    mapa[posicaox2][posicaoy2] = 7;
    JOGADOR2.style.left = (posicaox2 * TILE) + 'px';
    JOGADOR2.style.top = (posicaoy2 * TILE) + 'px';
    JOGADOR2.style.backgroundImage = 'url("./assets/character/idle-backsf.gif")';
}

function sound(audio){
    const som = new Audio(audio);
    som.volume=0.7;
    som.play();
}

function andar(npx, npy){
    if ((posicaox + npx > 0 && posicaox + npx < COLS - 1 && posicaoy + npy > 0 && posicaoy + npy < ROWS - 1)
        && mapa[posicaox + npx][posicaoy + npy] === 0
        && !(mapa[posicaox + npx][posicaoy + npy] === 3|| mapa[posicaox+npx][posicaoy+npy]===9 || mapa[posicaox+npx][posicaoy+npy]===15)) {
        if (!podeAndar) return;
        podeAndar = false;
        const temBomba = mapa[posicaox][posicaoy] === 3 || mapa[posicaox][posicaoy]===9 || mapa[posicaox][posicaoy]===15;
        if (!temBomba) { mapa[posicaox][posicaoy] = 0; }else{mapa[posicaox][posicaoy] = 3;}
        posicaox += npx;
        posicaoy += npy;
        mapa[posicaox][posicaoy] = 1;
        carregarPersonagem();
        let som = "./source/walk.mp3"
        sound(som);
        setTimeout(() => { if(!p2EstaMorto || !p1EstaMorto){podeAndar = true;} }, 200);
    }
}

function andar2(npx, npy){
    if ((posicaox2 + npx > 0 && posicaox2 + npx < COLS - 1 && posicaoy2 + npy > 0 && posicaoy2 + npy < ROWS - 1)
        && mapa[posicaox2 + npx][posicaoy2 + npy] === 0
        && !(mapa[posicaox2 + npx][posicaoy2 + npy] === 3|| mapa[posicaox2+npx][posicaoy2+npy]===9 || mapa[posicaox2+npx][posicaoy2+npy]===15)) {
        if (!podeAndar2) return;
        podeAndar2 = false;
        const temBomba = mapa[posicaox2][posicaoy2] === 3 || mapa[posicaox2][posicaoy2]===9 || mapa[posicaox2][posicaoy2]===15;
        if (!temBomba) { mapa[posicaox2][posicaoy2] = 0; }else{mapa[posicaox2][posicaoy2] = 3;}
        posicaox2 += npx;
        posicaoy2 += npy;
        mapa[posicaox2][posicaoy2] = 7;
        carregarPersonagem2();
        let som = "./source/walk.mp3"
        sound(som);
        setTimeout(() => { if(!p2EstaMorto || !p1EstaMorto){podeAndar2 = true}; },200);
    }
}

function criarExplosao(x, y) {
    const explosao = document.createElement('div');
    explosao.className = 'explosao';
    explosao.style.left = (x * TILE) + 'px';
    explosao.style.top = (y * TILE) + 'px';
    game.appendChild(explosao);
    setTimeout(() => explosao.remove(), 500);
}

function carregarObstaculos(){
    for (let x = 0; x < COLS; x++) {
        for (let y = 0; y < ROWS; y++) {
            const spawnZone1 = (x === 3 && y ===2) || (x === 3 && y ===4) ||(x === 2 && y ===3) ||(x === 4 && y ===3);
            const spawnZone2 = (x === 17 && y ===12) || (x === 17 && y ===10) ||(x === 16 && y ===11) ||(x === 18 && y === 11);
            if (mapa[x][y] === 0 && Math.random() < 0.7 && !(x === 3 && y === 3) && mapa[x][y] != 6 && !spawnZone1 && !spawnZone2) {
                const paredequebravel = document.createElement('div');
                paredequebravel.className = 'paredequebravel';
                paredequebravel.id = `caixa-${x}-${y}`;
                paredequebravel.style.left = (x * TILE) + 'px';
                paredequebravel.style.top = (y * TILE) + 'px';
                mapa[x][y] = 4;
                game.appendChild(paredequebravel);
            }
        }
    }
}

function soltarBomba(posicaox, posicaoy){
    let som01 = "./source/deployBomb.mp3";
    sound(som01);
    if (mapa[posicaox][posicaoy] === 3) return;

    const bomb = document.createElement('div');
    const explosaoposicaox = posicaox;
    const explosaoposicaoy = posicaoy;
    bomb.className = 'bomba';
    bomb.style.left = (posicaox * TILE) + 'px';
    bomb.style.top = (posicaoy * TILE) + 'px';
    game.appendChild(bomb);
    bombaSolta = true;
    if(mapa[posicaox][posicaoy] === 1){
        mapa[posicaox][posicaoy] = 9;
    }else if(mapa[posicaox][posicaoy] === 7){
        mapa[posicaox][posicaoy] = 15;
    }else{
        mapa[posicaox][posicaoy] = 3;
    }
    console.log(mapa);
    setTimeout(() => {
        bomb.remove();
        bombaSolta = false;

        criarExplosao(explosaoposicaox, explosaoposicaoy);

        const direcoes = [
            [1, 0], [-1, 0], [0, 1], [0, -1]
        ];

        direcoes.forEach(dir => {
            for (let i = 0; i <= distanciaBomba; i++) {
                let alvoX = explosaoposicaox + (dir[0] * i);
                let alvoY = explosaoposicaoy + (dir[1] * i);

                if (alvoX <= 0 || alvoX >= COLS - 1 || alvoY <= 0 || alvoY >= ROWS - 1) break;
                if (mapa[alvoX][alvoY] === 2) break;

                if (mapa[alvoX][alvoY] === 4) {
                    const caixa = document.getElementById(`caixa-${alvoX}-${alvoY}`);
                    if (caixa) caixa.remove();

                    const tile = document.createElement('div');
                    tile.className = 'tile';
                    tile.style.left = (alvoX * TILE) + 'px';
                    tile.style.top = (alvoY * TILE) + 'px';
                    game.appendChild(tile);

                    criarExplosao(alvoX, alvoY);

                    mapa[alvoX][alvoY] = 0;
                    let som = "./source/wallBreak.mp3";
                    sound(som);
                    break;
                }
                function morto(){
                    podeAndar=false;
                    podeAndar2=false;
                    
                    setTimeout(()=>{
                        podeAndar= true;
                        podeAndar2 = true;
                    },3000)
                }

                if ((mapa[alvoX][alvoY] === 1|| mapa[alvoX][alvoY] === 9)&& !p2EstaMorto) {
                    morto();
                    p1EstaMorto = true;
                    backgroundSound.pause();
                    JOGADOR.style.backgroundImage = 'url(./source/deathGif_sem_fundo.gif)';
                    JOGADOR2.style.backgroundImage = 'url(./assets/character/win-frontsf.gif)';
                    
                    JOGADOR.style.backgroundSize = '100% 100%';
                    setTimeout(() => {
                        morte();
                        p1EstaMorto = false;
                    }, 700);
                    
                    break;
                }
                if((mapa[alvoX][alvoY] === 7 || mapa[alvoX][alvoY] ===15) && !p1EstaMorto) {
                    morto();
                    p2EstaMorto = true;
                    backgroundSound.pause();
                    JOGADOR2.style.backgroundImage = 'url(./source/deathGif_sem_fundo.gif)';
                    JOGADOR.style.backgroundImage = 'url(./assets/character/win-frontsf.gif)';
                    JOGADOR2.style.backgroundSize = '100% 100%';
                    setTimeout(() => {
                        morte2();
                        p2EstaMorto = false;
                    }, 700);
                    
                    break;
                    
                }
                criarExplosao(alvoX, alvoY);
            }
        });
        let som = "./source/boom.mp3";
        sound(som);
        mapa[explosaoposicaox][explosaoposicaoy] = 0;
    }, 2000);

}

document.addEventListener('keydown', (e) => {
    if ((e.key === 'q' || e.key === 'Q') && podeAndar) {
        soltarBomba(posicaox, posicaoy);
    }
});
document.addEventListener('keydown', (e) => {
    if (e.key === 'w' && podeAndar) { andar(0, -1); JOGADOR.style.backgroundImage = 'url(./assets/character/walk-backsf.gif)'; setTimeout(()=>{ JOGADOR.style.backgroundImage = 'url(./assets/character/idle-backsf.gif)'; JOGADOR.style.animationDuration ='200ms'},200) }
    if (e.key === 's' && podeAndar) { andar(0, 1); JOGADOR.style.backgroundImage = 'url(./assets/character/walk-frontsf.gif)'; setTimeout(()=>{JOGADOR.style.backgroundImage = 'url(./assets/character/idle-frontsf.gif)';JOGADOR.style.animationDuration ='200ms'},200) }
    if (e.key === 'a' && podeAndar) { andar(-1, 0); JOGADOR.style.backgroundImage = 'url(./assets/character/walk-leftsf.gif)'; setTimeout(()=>{ JOGADOR.style.backgroundImage = 'url(./assets/character/idle-leftsf.gif)'; JOGADOR.style.animationDuration ='200ms'},200) }
    if (e.key === 'd' && podeAndar) { andar(1, 0); JOGADOR.style.backgroundImage = 'url(./assets/character/walk-rightsf.gif)'; setTimeout(()=>{JOGADOR.style.backgroundImage = 'url(./assets/character/idle-rightsf.gif)'; JOGADOR.style.animationDuration ='200ms'},200) }
});
document.addEventListener('keydown', (e) => {
    if ((e.key === ';' || e.key === ':')&& podeAndar2) {
        soltarBomba(posicaox2, posicaoy2);
    }
});
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp'&& podeAndar2) { andar2(0, -1); JOGADOR2.style.backgroundImage = 'url(./assets/character/walk-backsf.gif)';    setTimeout(()=>{JOGADOR2.style.backgroundImage = 'url(./assets/character/idle-backsf.gif)'; JOGADOR2.style.animationDuration ='200ms'}, 200)}
    if (e.key === 'ArrowDown'&& podeAndar2) { andar2(0, 1); JOGADOR2.style.backgroundImage = 'url(./assets/character/walk-frontsf.gif)';  setTimeout(()=>{JOGADOR2.style.backgroundImage = 'url(./assets/character/idle-frontsf.gif)'; JOGADOR2.style.animationDuration ='200ms'}, 200)}
    if (e.key === 'ArrowLeft'&& podeAndar2) { andar2(-1, 0); JOGADOR2.style.backgroundImage = 'url(./assets/character/walk-leftsf.gif)';  setTimeout(()=>{JOGADOR2.style.backgroundImage = 'url(./assets/character/idle-leftsf.gif)'; JOGADOR2.style.animationDuration ='200ms'}, 200)}
    if (e.key === 'ArrowRight'&& podeAndar2) { andar2(1, 0); JOGADOR2.style.backgroundImage = 'url(./assets/character/walk-rightsf.gif)'; setTimeout(()=>{JOGADOR2.style.backgroundImage = 'url(./assets/character/idle-rightsf.gif)'; JOGADOR2.style.animationDuration ='200ms'}, 200)}
});

function comecaFase01(){
    posicaox = 3; posicaoy = 3;
    posicaox2 = 17; posicaoy2 = 11;
    for (let y = 0; y < ROWS; y++) {
        for (let x = 0; x < COLS; x++) {
            const tile = document.createElement('div');
            const borda = (x === 0 || y === 0 || x === COLS - 1 || y === ROWS - 1);
            const wall = !borda && (x % 2 === 0 && y % 2 === 0);
            tile.className = borda ? 'outsideTile' : 'tile';
            if (borda) { mapa[x][y] = 6; }
            if (wall) { tile.classList.add('wall'); mapa[x][y] = 2; }
            if(Math.random() > 0.7 && !borda && !wall){tile.style.backgroundPosition = '200% 100%'};
            tile.style.left = (x * TILE) + 'px';
            tile.style.top = (y * TILE) + 'px';
            game.appendChild(tile);
        }
    }
    carregarPersonagem();
    carregarPersonagem2();
    carregarObstaculos();
    backgroundSound.currentTime = 0;
    backgroundSound.loop = true;
    backgroundSound.play();
    backgroundSound.volume = 0.4;
}

function transicao(){
    FIMDEJOGO.style.display = 'none';
    menu.style.display = 'none';
    gameWrapper.style.display = 'flex';
    comecaFase01();
}

function deVoltaAoMenu(){
    menu.style.display = 'block';
    FIMDEJOGO.style.display = 'none';
}

button.addEventListener('click', transicao);

function limparTabuleiro(){
    Array.from(game.children).forEach(child => {
        if (child.id !== 'personagem' && child.id !== 'personagem2') {
            child.remove();
        }
    });
    for (let x = 0; x < COLS; x++) {
        for (let y = 0; y < ROWS; y++) {
            mapa[x][y] = 0;
        }
    }
}

function morte(){
    gameWrapper.style.display = 'none';
    FIMDEJOGO_TITULO.textContent = 'JOGADOR 2 VENCEU!';
    FIMDEJOGO.style.display = 'flex';
    mapa[posicaox][posicaoy] = 0;
    let som = "./source/win.mp3";
    sound(som);
    limparTabuleiro();
}

function morte2(){
    gameWrapper.style.display = 'none';
    FIMDEJOGO_TITULO.textContent = 'JOGADOR 1 VENCEU!';
    FIMDEJOGO.style.display = 'flex';
    mapa[posicaox2][posicaoy2] = 0;
    
    let som = "./source/win.mp3";
    sound(som);
    limparTabuleiro();
}

buttonrestart.addEventListener('click', transicao);
buttonmenu.addEventListener('click', deVoltaAoMenu);
