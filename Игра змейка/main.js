let scoreBlock = document.querySelector('.scoreBlock');
let bestScoreBlock = document.querySelector('.bestScoreBlock');
let timerBlock = document.querySelector('.timerBlock');
let gameBlock = document.querySelector('.gameBlock');
let timeCurr = 0;


let head_snake = document.querySelector('.head_snake');
let buttonStart = document.querySelector('.buttonStart');

let coordinates_top = ['0', '20px', '40px', '60px', '80px', '120px', '140px', '160px', '180px', '200px', '220px', '240px', '260px', '280px', '300px', '320px', '340px', '360px', '380px', '400px', '420px', '440px', '460px', '480px'];
let coordinates_left = ['0', '20px', '40px', '60px', '80px', '120px', '140px', '160px', '180px', '200px', '220px', '240px', '260px', '280px', '300px', '320px', '340px', '360px', '380px', '400px', '420px', '440px', '460px', '480px', '500px', '520px', '540px', '560px', '580px', '600px', '620px', '640px', '660px', '680px', '700px', '720px', '740px'];
let currentOrientation = 'rotate(180deg)';

let currentCoordinatesLeft = [];
let currentCoordinatesTop = [];
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
        let currentCoordinatesHeadSnake_left = getComputedStyle(head_snake).left;
        if (currentOrientation == 'rotate(180deg)') {
            currentCoordinatesLeft.push(currentCoordinatesHeadSnake_left);

            for (let i = 0; i < bodySnakes.length - 1; i++) {
                currentCoordinatesLeft.push(getComputedStyle(bodySnakes[i]).left);
            }
            console.log(currentCoordinatesLeft);

            for (let i = 0; i < bodySnakes.length + 1; i++) {
                if (i == 0) {
                    if (currentCoordinatesHeadSnake_left == '740px') {
                        head_snake.style.left = '0';
                    } else {
                        head_snake.style.left = parseInt(currentCoordinatesHeadSnake_left) + 20 + 'px';
                    }
                } else {
                    bodySnakes[i - 1].style.left = currentCoordinatesLeft[i - 1];
                }
            }
            currentCoordinatesLeft.length = 0;
        }
    }, 1000);

    let speedSnakes1;
    let speedSnakes2;
    let speedSnakes3;
    let speedSnakes4;

    window.addEventListener('keydown', function (event) {
        clearInterval(speedSnake);
        clearInterval(speedSnakes1);
        clearInterval(speedSnakes2);
        clearInterval(speedSnakes3);
        clearInterval(speedSnakes4);
        let key = event.keyCode;


        if (key == 39 || key == 68) { // Право
            currentOrientation = 'rotate(180deg)';
            speedSnakes3 = setInterval(function () {
                let bodySnakes = document.querySelectorAll('.body_snake');
                let currentCoordinatesHeadSnake_left = getComputedStyle(head_snake).left;
                let currentCoordinatesHeadSnake_top = getComputedStyle(head_snake).top;
                if (currentOrientation == 'rotate(180deg)') {
                    currentCoordinatesLeft.push(currentCoordinatesHeadSnake_left);
                    currentCoordinatesTop.push(currentCoordinatesHeadSnake_top);

                    for (let i = 0; i < bodySnakes.length - 1; i++) {
                        currentCoordinatesLeft.push(getComputedStyle(bodySnakes[i]).left);
                        currentCoordinatesTop.push(getComputedStyle(bodySnakes[i]).top);
                    }

                    for (let i = 0; i < bodySnakes.length + 1; i++) {
                        if (i == 0) {
                            if (currentCoordinatesHeadSnake_left == '740px') {
                                head_snake.style.left = '0';
                            } else {
                                head_snake.style.left = parseInt(currentCoordinatesHeadSnake_left) + 20 + 'px';
                                head_snake.style.transform = currentOrientation;
                            }
                        } else {
                            bodySnakes[i - 1].style.left = currentCoordinatesLeft[i - 1];
                            bodySnakes[i - 1].style.top = currentCoordinatesTop[i - 1];
                        }
                    }
                    currentCoordinatesLeft.length = 0;
                    currentCoordinatesTop.length = 0;
                }
            }, 1000);
        }


        if (key == 40 || key == 83) { // Вниз
            currentOrientation = 'rotate(270deg)';
            speedSnakes1 = setInterval(function () {
                let bodySnakes = document.querySelectorAll('.body_snake');
                let currentCoordinatesHeadSnake_left = getComputedStyle(head_snake).left;
                let currentCoordinatesHeadSnake_top = getComputedStyle(head_snake).top;
                if (currentOrientation == 'rotate(270deg)') {
                    currentCoordinatesLeft.push(currentCoordinatesHeadSnake_left);
                    currentCoordinatesTop.push(currentCoordinatesHeadSnake_top);

                    for (let i = 0; i < bodySnakes.length - 1; i++) {
                        currentCoordinatesLeft.push(getComputedStyle(bodySnakes[i]).left);
                        currentCoordinatesTop.push(getComputedStyle(bodySnakes[i]).top);
                    }

                    for (let i = 0; i < bodySnakes.length + 1; i++) {
                        if (i == 0) {
                            if (currentCoordinatesHeadSnake_top == '480px') {
                                head_snake.style.top = '0';
                            } else {
                                head_snake.style.top = parseInt(currentCoordinatesHeadSnake_top) + 20 + 'px';
                                head_snake.style.transform = currentOrientation;
                            }
                        } else {
                            bodySnakes[i - 1].style.left = currentCoordinatesLeft[i - 1];
                            bodySnakes[i - 1].style.top = currentCoordinatesTop[i - 1];
                        }
                    }
                    currentCoordinatesLeft.length = 0;
                    currentCoordinatesTop.length = 0;
                }
            }, 1000);
        }


        if (key == 37 || key == 65) { // Лево
            currentOrientation = 'rotate(0deg)';
            speedSnakes4 = setInterval(function () {
                let bodySnakes = document.querySelectorAll('.body_snake');
                let currentCoordinatesHeadSnake_left = getComputedStyle(head_snake).left;
                let currentCoordinatesHeadSnake_top = getComputedStyle(head_snake).top;
                if (currentOrientation == 'rotate(0deg)') {
                    currentCoordinatesLeft.push(currentCoordinatesHeadSnake_left);
                    currentCoordinatesTop.push(currentCoordinatesHeadSnake_top);

                    for (let i = 0; i < bodySnakes.length - 1; i++) {
                        currentCoordinatesLeft.push(getComputedStyle(bodySnakes[i]).left);
                        currentCoordinatesTop.push(getComputedStyle(bodySnakes[i]).top);
                    }

                    for (let i = 0; i < bodySnakes.length + 1; i++) {
                        if (i == 0) {
                            if (currentCoordinatesHeadSnake_left == '0px') {
                                head_snake.style.left = '740px';
                            } else {
                                head_snake.style.left = parseInt(currentCoordinatesHeadSnake_left) - 20 + 'px';
                                head_snake.style.transform = currentOrientation;
                            }
                        } else {
                            bodySnakes[i - 1].style.left = currentCoordinatesLeft[i - 1];
                            bodySnakes[i - 1].style.top = currentCoordinatesTop[i - 1];
                        }
                    }
                    currentCoordinatesLeft.length = 0;
                    currentCoordinatesTop.length = 0;
                }
            }, 1000);
        }


        if (key == 38 || key == 87) { // Вверх
            currentOrientation = 'rotate(90deg)';
            speedSnakes2 = setInterval(function () {
                let bodySnakes = document.querySelectorAll('.body_snake');
                let currentCoordinatesHeadSnake_left = getComputedStyle(head_snake).left;
                let currentCoordinatesHeadSnake_top = getComputedStyle(head_snake).top;
                if (currentOrientation == 'rotate(90deg)') {
                    currentCoordinatesLeft.push(currentCoordinatesHeadSnake_left);
                    currentCoordinatesTop.push(currentCoordinatesHeadSnake_top);

                    for (let i = 0; i < bodySnakes.length - 1; i++) {
                        currentCoordinatesLeft.push(getComputedStyle(bodySnakes[i]).left);
                        currentCoordinatesTop.push(getComputedStyle(bodySnakes[i]).top);
                    }

                    for (let i = 0; i < bodySnakes.length + 1; i++) {
                        if (i == 0) {
                            if (currentCoordinatesHeadSnake_top == '0px') {
                                head_snake.style.top = '480px';
                            } else {
                                head_snake.style.top = parseInt(currentCoordinatesHeadSnake_top) - 20 + 'px';
                                head_snake.style.transform = currentOrientation;
                            }
                        } else {
                            bodySnakes[i - 1].style.left = currentCoordinatesLeft[i - 1];
                            bodySnakes[i - 1].style.top = currentCoordinatesTop[i - 1];
                        }
                    }
                    currentCoordinatesLeft.length = 0;
                    currentCoordinatesTop.length = 0;
                }
            }, 1000);
        }
    });
});