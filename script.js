const yourShip = document.querySelector('.player-shooter');
const playArea = document.querySelector('#main-play-area');
const aliensImg = ['img/monster-1.png', 'img/monster-2.png', 'img/monster-3.png'];
const instructionsText = document.querySelector('.game-instructions');
const startButton = document.querySelector('.start-button');
let alienInterval;

//movimento e tiro da nave
function flyShip(event) {
    if(event.key === 'ArrowUp') {
        event.preventDefault();
        moveUp();
    } 
    else if(event.key === 'ArrowDown') {
        event.preventDefault();
        moveDown();
    } 
    else if(event.key === " ") {
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
    } 
    else {
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
function moveLaser(laser){
    //tempo para surgir um novo laser
    let laserInterval = setInterval(() => {
        let xPosition = parseInt(laser.style.left); //posicao do laser que foi criado
        let aliens = document.querySelectorAll('.alien');
        
        //comparando se cada alien foi atingido, se sim, troca o src da imagem
        aliens.forEach((alien) => { 
            if(checkLaserCollision(laser, alien)) {
                alien.src = 'img/explosion.png';
                alien.classList.remove('alien');
                alien.classList.add('dead-alien');
            }
        })

        if(xPosition === 340) {
            laser.remove();
        } 
        else {
            laser.style.left = `${xPosition + 8}px`;
        }
    }, 10);
}

//função para criar inimigos aleatórios
function createAliens() {
    let newAlien = document.createElement('img');
    let alienSprite = aliensImg[Math.floor(Math.random() * aliensImg.length)]; //sorteio de imagens
    newAlien.src = alienSprite;
    newAlien.classList.add('alien'); //css
    newAlien.classList.add('alien-transition');
    newAlien.style.left = '370px';
    newAlien.style.top = `${Math.floor(Math.random() * 330) + 30}px`;
    playArea.appendChild(newAlien);
    moveAlien(newAlien);
}

//função para movimentar os inimigos
function moveAlien(alien) {
    let moveAlienInterval = setInterval(() => {
        let xPosition = parseInt(window.getComputedStyle(alien).getPropertyValue('left'));
        if(xPosition <= 50) {
            //se inclui o dead-alien
            if(Array.from(alien.classList).includes('dead-alien')) {
                alien.remove();
            } 
            else {
                gameOver();
            }
        } 
        else {
            alien.style.left = `${xPosition - 4}px`; // movimento
        }
    }, 30);
}

//função para colisão
function checkLaserCollision(laser, alien) {
    //posicao do laser
    let laserTop = parseInt(laser.style.top);
    let laserLeft = parseInt(laser.style.left);
    let laserBottom = laserTop - 20;
    //posicao do alien
    let alienTop = parseInt(alien.style.top);
    let alienLeft = parseInt(alien.style.left);
    let alienBottom = alienTop - 30;

    if(laserLeft != 340 && laserLeft + 40 >= alienLeft) {
        if(laserTop <= alienTop && laserTop >= alienBottom) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

//inicio do jogo
startButton.addEventListener('click', (event) => {
    playGame();
})

function playGame() {
    startButton.style.display = 'none';
    instructionsText.style.display = 'none';
    window.addEventListener('keydown', flyShip);
    //aparece os aliens
    alienInterval = setInterval(() => {
        createAliens();
    }, 2000);
}

//função de game over
function gameOver() {
    window.removeEventListener('keydown', flyShip);
    clearInterval(alienInterval);
    //remove os aliens
    let aliens = document.querySelectorAll('.alien');
    aliens.forEach((alien) => alien.remove());
    //remove o laser
    let lasers = document.querySelectorAll('.laser');
    lasers.forEach((laser) => laser.remove());
    
    setTimeout(() => {
        alert('game over!');
        yourShip.style.top = "250px";
        startButton.style.display = "block";
        instructionsText.style.display = "block";
    });
}