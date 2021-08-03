let scoreBlock = document.querySelector('.scoreBlock');
let bestScoreBlock = document.querySelector('.bestScoreBlock');
let timerBlock = document.querySelector('.timerBlock');
let timeCurr = 0;


let head_snake = document.querySelector('.head_snake');
let buttonStart = document.querySelector('.buttonStart');

let coordinates_top = ['0', '20px', '40px', '60px', '80px', '120px', '140px', '160px', '180px', '200px', '220px', '240px', '260px', '280px', '300px', '320px', '340px', '360px', '380px', '400px', '420px', '440px', '460px', '480px'];
let coordinates_left = ['0', '20px', '40px', '60px', '80px', '120px', '140px', '160px', '180px', '200px', '220px', '240px', '260px', '280px', '300px', '320px', '340px', '360px', '380px', '400px', '420px', '440px', '460px', '480px', '500px', '520px', '540px', '560px', '580px', '600px', '620px', '640px', '660px', '680px', '700px', '720px', '740px'];

// Концепция логики довольно проста. Необходимо чтобы последующие тельца змейки повторяли предыдущие значения координат частей впереди стоящего тельца змейки. 
// И менялись бы по ходу поворота змейки в нужное направление, при этом обновление это происходило бы за 1 секунду с помощью setInterval

buttonStart.addEventListener('click', function () {
    buttonStart.disabled = 'true';

    let timerTime = setInterval(function () {
        timerBlock.innerHTML = 'Время: ' + timeCurr + ' сек';
        timeCurr++;
    }, 1000);

    let speedSnake = setInterval(function () {
        let bodySnakes = document.querySelectorAll('.body_snake');
        let headCoordinates_left = getComputedStyle(head_snake).left;

        for (let i = 0; i < bodySnakes.length; i++) {
            let curr = parseInt(headCoordinates_left) + 20 + 'px';
            head_snake.style.left = curr;
            bodySnakes[i].style.left = parseInt(getComputedStyle(bodySnakes[i]).left) + 20 + 'px';
        }
    }, 1000);
});