let parentBlock = document.querySelector('.col-md-8'),
    scoreBlock = document.querySelector('.scoreBlock'),
    bestScoreBlock = document.querySelector('.bestScoreBlock'),
    timerBlock = document.querySelector('.timerBlock'),
    gameBlock = document.querySelector('.gameBlock'),
    snakeBlock = document.querySelector('.snake'),
    head_snake = document.querySelector('.head_snake'),
    buttonStart = document.querySelector('.buttonStart'); // Получение элементов верстки

let allCoordinates_top = ['0', '20px', '40px', '60px', '80px', '120px', '140px', '160px', '180px', '200px', '220px', '240px', '260px', '280px', '300px', '320px', '340px', '360px', '380px', '400px', '420px', '440px', '460px', '480px']; // Все координаты по оси Y
let allCoordinates_left = ['0', '20px', '40px', '60px', '80px', '120px', '140px', '160px', '180px', '200px', '220px', '240px', '260px', '280px', '300px', '320px', '340px', '360px', '380px', '400px', '420px', '440px', '460px', '480px', '500px', '520px', '540px', '560px', '580px', '600px', '620px', '640px', '660px', '680px', '700px', '720px', '740px']; // Все координаты по оси X
let currentOrientation = 'rotate(180deg)'; // Текущая ориентация поворота головы змеи
let currentDirecrion = ''; // Текущее направление, куда смотрит змейка (право, вниз, лево, вверх)
let valueSpeedSnake = 100; // Текущая скорость змейки
let timeCurr = 0; // Текущий показатель времени в секундах
let scoreCurr = 0; // Текущий показатель счета
let bestScoreCurr = 0; // Текущий показатель лучшего счета

let currentCoordinatesLeft = []; // Координата x головы змейки (всегда положительное значение)
let currentCoordinatesTop = []; // Координата y головы змейки (всегда положительное значение)
let paramsFoodSnake; // Параметры еды, которые создаются в момент создания пищи для змейки


window.addEventListener('keydown', function (event) { // Вещаем обработчик события на весь экран и отслеживаем нажатие клавиш на нем, для управления змейки и в случае нажатия клавиши, меняем текущее направление
    let key = event.keyCode; // Получение кода нажатой клавиши

    if ((key == 39 || key == 68) && currentOrientation !== 'rotate(0deg)') { // Нажата правая клавиша или клавиша "D"
        currentDirecrion = 'Право';
    }

    if ((key == 40 || key == 83) && currentOrientation !== 'rotate(90deg)') { // Нажата нижняя клавиша или клавиша "S"
        currentDirecrion = 'Вниз';
    }

    if ((key == 37 || key == 65) && currentOrientation !== 'rotate(180deg)') { // Нажата левая клавиша или клавиша "A"
        currentDirecrion = 'Лево';
    }

    if ((key == 38 || key == 87) && currentOrientation !== 'rotate(270deg)') { // Нажата верхняя клавиша или клавиша "W"
        currentDirecrion = 'Вверх';
    }
});

buttonStart.addEventListener('click', function () { // Повесили обработчик события на кнопку "начать игру"
    buttonStart.disabled = 'true'; // Сделали кнопочку не активной и не кликабельной
    if (paramsFoodSnake == undefined) { // Вызываем функцию, которая заспавнит еду для змейки, а так же вернут нам массив с информацией о этой еде
        paramsFoodSnake = createSnakeFood();
    }

    let timerTime = setInterval(function () { // Запустили таймер времени в секундах
        timerBlock.innerHTML = 'Время: ' + timeCurr + ' сек';
        timeCurr++;
    }, 1000);

    let speedSnake = setInterval(function () { // Запустили движение змейки по скорости, определенной в переменной
        if (currentDirecrion == '') { // Если пока что не присвоена никакая ориентация, т.к. клавиши еще не нажаты, то змейка движется слева направо
            let bodySnakes = document.querySelectorAll('.body_snake');
            let currentCoordinatesHeadSnake_left = getComputedStyle(head_snake).left;
            let currentCoordinatesHeadSnake_top = getComputedStyle(head_snake).top;
            chekingSnakeEatFoodAndExpansionSnake(currentCoordinatesHeadSnake_top, currentCoordinatesHeadSnake_left, paramsFoodSnake['Y'], paramsFoodSnake['X'], paramsFoodSnake['elem'], bodySnakes); // Проверка на то скушала ли змейка еду
            if (currentOrientation == 'rotate(180deg)') {
                currentCoordinatesLeft.push(currentCoordinatesHeadSnake_left);

                for (let i = 0; i < bodySnakes.length - 1; i++) {
                    currentCoordinatesLeft.push(getComputedStyle(bodySnakes[i]).left);
                }

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
        } else if (currentDirecrion == 'Право') { // Змейка движется направо
            currentOrientation = 'rotate(180deg)';
            let bodySnakes = document.querySelectorAll('.body_snake');
            let currentCoordinatesHeadSnake_left = getComputedStyle(head_snake).left;
            let currentCoordinatesHeadSnake_top = getComputedStyle(head_snake).top;
            chekingSnakeEatFoodAndExpansionSnake(currentCoordinatesHeadSnake_top, currentCoordinatesHeadSnake_left, paramsFoodSnake['Y'], paramsFoodSnake['X'], paramsFoodSnake['elem'], bodySnakes);
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
        } else if (currentDirecrion == 'Вниз') { // Змейка движется вниз
            currentOrientation = 'rotate(270deg)';
            let bodySnakes = document.querySelectorAll('.body_snake');
            let currentCoordinatesHeadSnake_left = getComputedStyle(head_snake).left;
            let currentCoordinatesHeadSnake_top = getComputedStyle(head_snake).top;
            chekingSnakeEatFoodAndExpansionSnake(currentCoordinatesHeadSnake_top, currentCoordinatesHeadSnake_left, paramsFoodSnake['Y'], paramsFoodSnake['X'], paramsFoodSnake['elem'], bodySnakes);
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
        } else if (currentDirecrion == 'Лево') { // Змейка движется влево
            currentOrientation = 'rotate(0deg)';
            let bodySnakes = document.querySelectorAll('.body_snake');
            let currentCoordinatesHeadSnake_left = getComputedStyle(head_snake).left;
            let currentCoordinatesHeadSnake_top = getComputedStyle(head_snake).top;
            chekingSnakeEatFoodAndExpansionSnake(currentCoordinatesHeadSnake_top, currentCoordinatesHeadSnake_left, paramsFoodSnake['Y'], paramsFoodSnake['X'], paramsFoodSnake['elem'], bodySnakes);
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
        } else if (currentDirecrion == 'Вверх') { // Змейка движется вверх
            currentOrientation = 'rotate(90deg)';
            let bodySnakes = document.querySelectorAll('.body_snake');
            let currentCoordinatesHeadSnake_left = getComputedStyle(head_snake).left;
            let currentCoordinatesHeadSnake_top = getComputedStyle(head_snake).top;
            chekingSnakeEatFoodAndExpansionSnake(currentCoordinatesHeadSnake_top, currentCoordinatesHeadSnake_left, paramsFoodSnake['Y'], paramsFoodSnake['X'], paramsFoodSnake['elem'], bodySnakes);
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
        }

        if (paramsFoodSnake == undefined) { // Вызываем функцию, которая заспавнит еду для змейки, а так же вернут нам массив с информацией о этой еде
            paramsFoodSnake = createSnakeFood();
        }
        checkLoseAndRestartGame(timerTime, speedSnake); // Проверка на то, не врезалась ли змейка сама в себя и не окончилась ли игра из-за этого
    }, valueSpeedSnake);
});


function createSnakeFood() { // Функция, которая создает и добавляет визуально еду для змейки
    let snakeFoodElem = document.querySelector('.snake_food');
    let coordinatesTopFromCurrentSnake = [];
    let coordinatesLeftFromCurrentSnake = [];
    let chekingArr = [];

    if (snakeFoodElem == null) { // Если полученного элемента на странице нет, значит еда для змейки не создана и ее нужно создать
        let head_snake = document.querySelector('.head_snake');
        let body_snakes = document.querySelectorAll('.body_snake');

        coordinatesTopFromCurrentSnake.push(getComputedStyle(head_snake).top);
        coordinatesLeftFromCurrentSnake.push(getComputedStyle(head_snake).left);

        for (let i = 0; i < body_snakes.length; i++) { // Заполняем массивы с координатами, которые сейчас имеет змейка
            coordinatesTopFromCurrentSnake.push(getComputedStyle(body_snakes[i]).top);
            coordinatesLeftFromCurrentSnake.push(getComputedStyle(body_snakes[i]).left);
        }

        while (true) {
            let randomCoordinateY = parseInt(allCoordinates_top[getRandomIntInclusive(0, allCoordinates_top.length - 1)]) + 'px',
                randomCoordinateX = parseInt(allCoordinates_left[getRandomIntInclusive(0, allCoordinates_left.length - 1)]) + 'px'; // Рандомно получаем координаты по X и Y

            for (let i = 0; i < coordinatesTopFromCurrentSnake.length; i++) { // Делаем проверку на то, что координаты не повторяются со змейкой
                if ((coordinatesTopFromCurrentSnake[i] !== randomCoordinateY && coordinatesLeftFromCurrentSnake[i] !== randomCoordinateX) ||
                    (coordinatesTopFromCurrentSnake[i] == randomCoordinateY && coordinatesLeftFromCurrentSnake[i] !== randomCoordinateX) ||
                    (coordinatesLeftFromCurrentSnake[i] == randomCoordinateX && coordinatesTopFromCurrentSnake[i] !== randomCoordinateY)) {
                    chekingArr.push('true');
                } else {
                    chekingArr.push('false');
                }
            }

            let check = chekingArr.every(function (item) {
                if (item == 'true') {
                    return true;
                } else {
                    return false;
                }
            });

            if (check) { // Если координаты не повторяются со змейкой, тогда создаем змейку по этим координатам, а если повторяются, тогда вызываем функцию заново
                let foodSnake = createElement('div', snakeBlock, ['snake_food']);
                foodSnake.style.top = randomCoordinateY;
                foodSnake.style.left = randomCoordinateX;

                return {
                    'Y': randomCoordinateY,
                    'X': randomCoordinateX,
                    'elem': foodSnake
                };
            }
        }
    }
};

function chekingSnakeEatFoodAndExpansionSnake(coordinateTopHeadSnake, coordinateLeftHeadSnake, coordinateTopFood, coordinateLeftFood, elemFood, bodySnakes) { // Функция, которая проверяет скушала ли змейка еду и если да, тогда удаляет старую еду и потом создается новая
    if (coordinateTopHeadSnake == coordinateTopFood && coordinateLeftHeadSnake == coordinateLeftFood) {
        elemFood.remove();
        paramsFoodSnake = undefined;

        let lastBodySnake = bodySnakes[bodySnakes.length - 1];

        let x = getComputedStyle(lastBodySnake).left;
        let y = getComputedStyle(lastBodySnake).top;

        let elem = createElement('div', snakeBlock, ['body_snake']);
        elem.style.left = x;
        elem.style.top = y;

        scoreCurr++;
        bestScoreCurr++;
        scoreBlock.innerHTML = 'Счет: ' + scoreCurr;
        bestScoreBlock.innerHTML = 'Лучший счет: ' + scoreCurr;
    }
};

function checkLoseAndRestartGame(timerId1, timerId2) { // Функция, которая проверяет не совпали ли показатели головы змейки с ее туловищем и если совпали, то игра окончена и соответственно появляется кнопочка, которая позволяет перезагрузить игру в полном объеме
    let head_snake = document.querySelector('.head_snake');
    let body_snakes = document.querySelectorAll('.body_snake');

    let chekingObj = {
        'top': [],
        'left': []
    };

    let head_snakeCoordinateTop = getComputedStyle(head_snake).top;
    let head_snakeCoordinateLeft = getComputedStyle(head_snake).left;

    for (let i = 0; i < body_snakes.length; i++) {
        chekingObj['top'].push(getComputedStyle(body_snakes[i]).top);
        chekingObj['left'].push(getComputedStyle(body_snakes[i]).left);
    }

    for (let i = 0; i < chekingObj['left'].length; i++) {
        if (chekingObj['left'][i] == head_snakeCoordinateLeft && chekingObj['top'][i] == head_snakeCoordinateTop) {
            clearInterval(timerId1);
            clearInterval(timerId2);

            // СЮДА ДОБАВЛЯЕТСЯ ПРОВЕРКА НА ЛОКАЛЬНОЕ ХРАНИЛИЩЕ!!!
            let buttonRestart = createElement('button', parentBlock, ['btn', 'btn-danger', 'buttonRestart']);
            buttonRestart.innerHTML = 'Начать игру сначала';

            buttonRestart.addEventListener('click', function(){
                buttonRestart.remove();
                
                if(paramsFoodSnake['elem'] !== undefined){
                    paramsFoodSnake['elem'].remove();
                    paramsFoodSnake = undefined;
                    buttonStart.removeAttribute('disabled');

                    let bodySnakes = document.querySelectorAll('.body_snake');
                    for(let i = 0; i < bodySnakes.length; i++){
                        bodySnakes[i].remove();
                    }

                    head_snake.style.transform = 'rotate(180deg)';
                    head_snake.style.top = '80px';
                    head_snake.style.left = '80px';

                    createElement('div', snakeBlock, ['body_snake_1', 'body_snake']);
                    createElement('div', snakeBlock, ['body_snake_2', 'body_snake']);
                    createElement('div', snakeBlock, ['body_snake_3', 'body_snake']);

                    timeCurr = 0;
                    scoreCurr = 0;
                    scoreBlock.innerHTML = 'Счет: 0';
                    timerBlock.innerHTML = 'Время: 0';
                    currentOrientation = 'rotate(180deg)';
                    currentDirecrion = '';
                }
            });

            alert('Игра окончена, Вы проиграли!');
        }
    }
};




function getRandomIntInclusive(min, max) { // Функция, которая отдаем рандомное число в соотвествии с переданными промежутками
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; // Максимум и минимум включаются
};

function createElement(selector, parent, className) { // Функция, которая создает новый элемент на странице
    let elem = document.createElement(selector);
    for (let i = 0; i < className.length; i++) {
        elem.classList.add(className[i]);
    }
    parent.append(elem);

    return elem;
};