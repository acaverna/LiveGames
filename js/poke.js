const cigarra = document.querySelector('.cigarra');
const lifeBar = document.querySelector('.life-bar');
const message = document.querySelector('.message');
const damageMessage = document.querySelector('#damage');
const pointsPanel = document.querySelector('#points-panel');
const audio = document.querySelector('#soco');
const audioCigarra = document.querySelector('#cigarra-audio');

let screenWidth = screen.width;
let screenHeight = screen.height;
let points = 0;
let lifePoke = 100;

cigarra.addEventListener('click', () => {
    audio.play();

    points += 10;

    pointsPanel.innerText = points;

    showCigarra();
});

function damagePoke() {
    if (Math.random() < 0.30) {
        const damage = Math.floor(Math.random() * 10);

        lifePoke -= damage;

        if (lifePoke < 0) {
            alert('Você perdeu o jogo');
            location.reload();
            audioCigarra.play();
        }

        lifeBar.style.width = `${lifePoke}%`;

        damageMessage.innerText = damage;
        message.style.display = 'block';

        setTimeout(() => {
            message.style.display = 'none';
        }, 2000);
    }
}

function showCigarra() {
    const positionX = Math.floor(Math.random() * (screenWidth - 160));
    const positionY = Math.floor(Math.random() * (screenHeight - 160));

    cigarra.setAttribute('style', `
        top: ${positionY}px;
        left: ${positionX}px;
    `);
}

showCigarra();

setInterval(() => {
    damagePoke();
    showCigarra();
}, 3000);