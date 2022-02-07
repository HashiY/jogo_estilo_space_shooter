const yourShip = document.querySelector('.player-shooter');
const playArea = document.querySelector('#main-play-area');

//movimento e tiro da nave
function flyShip(event) {
    if(event.key === 'ArrowUp') {
        event.preventDefault();
        moveUp();
    } else if(event.key === 'ArrowDown') {
        event.preventDefault();
        moveDown();
    } else if(event.key === " ") {
        event.preventDefault();
        fireLaser();
    }
}

//funcao de subir
function moveUp(){
    let topPosition = getComputedStyle(yourShip).getPropertyValue('top');//do css
    if(topPosition === "0px"){
        return;
    }
    else {
        let position = parseInt(topPosition);
        position -= 50;                         // sobe
        yourShip.style.top = `${position}px`;
    }
}

//funcao de descer
function moveDown() {
    let topPosition = getComputedStyle(yourShip).getPropertyValue('top');
    if(topPosition === "550px"){
        return;
    } else {
        let position = parseInt(topPosition);
        position += 50;                         //descer
        yourShip.style.top = `${position}px`;
    }
}

//funcionalidade de tiro
function fireLaser() {
    let laser = createLaserElement();
    playArea.appendChild(laser);
    moveLaser(laser);
}

//img de tiro
function createLaserElement(){
    //posicao do jogador
    let xPosition = parseInt(window.getComputedStyle(yourShip).getPropertyValue('left'));
    let yPosition = parseInt(window.getComputedStyle(yourShip).getPropertyValue('top'));
    //criando a imagem
    let newLaser = document.createElement('img');
    newLaser.src = 'img/shoot.png';
    newLaser.classList.add('laser'); // para editar no css
    newLaser.style.left = `${xPosition}px`;
    newLaser.style.top = `${yPosition - 10}px`; // para sair do meio da nave
    return newLaser;
}

//movimentar o tiro
function moveLaser(){

}

window.addEventListener("keydown", flyShip);