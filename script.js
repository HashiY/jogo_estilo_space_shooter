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

//função de subir
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

//função de descer
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

window.addEventListener("keydown", flyShip);