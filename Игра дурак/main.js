let computer_block = document.querySelector('.computer_block'),
    game_block = document.querySelector('.game_block'),
    table_game = document.querySelector('.table_game'),
    koloda = document.querySelector('.koloda'),
    controlGameBita = document.querySelector('.controlGameBita'),
    controlGameVse = document.querySelector('.controlGameVse'),
    all_cards = document.querySelector('.all_cards'),
    player_block = document.querySelector('.player_block'); // Получение элементов с html страницы


let allCards = { // Все карты, где six - это карта шестерка, а fourteen - это туз
    'bubi_': ['six', 'seven', 'eigth', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen'],
    'chervi_': ['six', 'seven', 'eigth', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen'],
    'kresti_': ['six', 'seven', 'eigth', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen'],
    'piki_': ['six', 'seven', 'eigth', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen']
};
let allMasti = ['bubi_', 'chervi_', 'kresti_', 'piki_']; // Все действующие масти у карт

let cardsPlayer = []; // Все карты игрока в виде массива со ссылкой на html элемент
let cardsComputer = []; // Все карты компьютера в виде массива со ссылкой на html элемент
let trumpCard; // Масть козыря
let randomCardKozir; // Значение карты козыря
let cardKozir; // Сама карта с козырем на странице
let startMovie; // Определение на то, кто первый ходит. Если статус переменной true, то ходит первый игрок, если false, то компьютер
let cardsOnTable = []; // Массив, в котором будут лежать карты, которые находятся на данный момент на столе
let tableCurr = 0; // Данный параметр показывает сколько карт на данный момент на столе
let checkCanBeat = true; // Проверка на то, может ли побить карту компьютер

function startGame() { // Функция, которая делает раздачу карт игрокам и проверяет, чтобы все соответсвовало требованиям карточной игры
    distributionСardsAtBeginningGame('card_player', 'card', player_block, cardsPlayer, 6, 'showCard'); // Произвели раздачу 6-и карт игроку
    distributionСardsAtBeginningGame('card_computer', 'zero', computer_block, cardsComputer, 6); // Произвели раздачу 6-и карт компьютеру


    let randomMastiForKozir = allMasti[getRandomIntInclusive(0, allMasti.length - 1)]; // Получение рандомной масти для определения козыря
    trumpCard = randomMastiForKozir; // Записали это в главный козырь карт
    let randomCardIndextext = getRandomIntInclusive(0, allCards[randomMastiForKozir].length - 1);
    randomCardKozir = allCards[randomMastiForKozir][randomCardIndextext]; // Получили значение карты с козырем

    cardKozir = createElement('div', [trumpCard, randomCardKozir, 'card_kozir'], koloda); // Создали данную карту с козырем на странице
    cardKozir.style.backgroundImage = 'url(images/cards/' + randomMastiForKozir + randomCardKozir + '.jpg)'; // Показали данную карту с козырем на странице
    allCards[trumpCard].splice(randomCardIndextext, 1); // Вырезали наш козырь из общего объекта с картами
    console.log(trumpCard);





    startMovie = checkOnFirstMove(); // Определение на то, кто первый ходит. Если статус переменной true, то ходит первый игрок, если false, то компьютер

    sortCardsForPlayer(cardsPlayer, 'card'); // Сортировка карт для игрока по значениям карт от большего к меньшему
    sortCardsForPlayer(cardsComputer, 'zero'); // Сортировка карт для компьютера по значениям карт от большего к меньшему
    checkOnFiveIdenticallyCards(cardsPlayer, cardsComputer); // Проверка на то, что мы не раздаем подряд 5 карт одной и той же масти одному из игроков
};
startGame();

// console.log(startMovie);
// console.log(cardsPlayer);
// console.log(cardsComputer);
// console.log(allCards);


function logicGame() {
    if (startMovie) { // Проверка на определение того, кто должен ходить (ХОДИТ ИГРОК)
        if (cardsOnTable.length == 0) { // Если на столе 0 карт, т.е. никто еще не ходил, тогда вешается обработчик события на все карты игрока для выбора с какой начать ход
            for (let i = 0; i < cardsPlayer.length; i++) {
                cardsPlayer[i].addEventListener('click', logicForMoviePlayer);
            }
        } else { // Если на столе уже есть какие-то карты, тогда мы даем возможность пойти игроку только теми картами, которые на данный момент есть на столе
            for (let i = 0; i < cardsPlayer.length; i++) {
                let check = cardsOnTable.some(function (elem) {
                    if (cardsPlayer[i].classList[1] == elem.classList[1]) {
                        return true;
                    } else {
                        return false;
                    }
                });

                if (check) {
                    cardsPlayer[i].addEventListener('click', logicForMoviePlayer);
                }
            }
        }
    } else { // ХОДИТ КОМПЬЮТЕР
        if (tableCurr == 0) { // Проверка есть ли карты на столе или же нет, т.е. когда игрок бьет карту, то в след.раз логика компьютера меняется
            // controlGameVse.style.display = 'block'; 
            let weigthCards = [];
            for (let i = 0; i < cardsComputer.length; i++) {
                weigthCards.push(getweigthCardRegardingMasti(cardsComputer[i], trumpCard));
            }

            let minCardWeigth = Math.min(...weigthCards);
            let index = weigthCards.indexOf(minCardWeigth);
            let minCard = cardsComputer[index]; // Произошло получение самой минимальной карты компьютера для хода
            cardsComputer.splice(index, 1); // Удаляем эту карту с массива общих карт игрока
            cardsOnTable.push(minCard); // Добавляем эту карту в массив карт, которые на столе
            tableCurr++; // Увеличиваем показатель кол-ва карт на столе
            // console.log(minCard);


            minCard.classList.remove(minCard.classList[minCard.classList.length - 1]); // Удаляем визуально эту карту с карт игрока
            minCard.classList.remove('card_computer');

            minCard.classList.add('beat' + tableCurr); // Добавляем визуально эту карту на стол
            minCard.style.backgroundImage = 'url(images/cards/' + minCard.classList[0] + minCard.classList[1] + '.jpg)';
            table_game.append(minCard);




            let cardsForBeatCardComputer = getAbilityBeatComputerCard(cardsPlayer, minCard); // Получаем все карты игрока, которые могут побить карту компьютера

            controlGameVse.style.display = 'block';
            controlGameVse.addEventListener('click', logicForVseButton);

            if (cardsForBeatCardComputer.length > 0) { // Если игрок может побить карту, тогда вешается обработчик события на доступные карты для битья
                for (let i = 0; i < cardsForBeatCardComputer.length; i++) {
                    cardsForBeatCardComputer[i].addEventListener('click', logicForMovieComputer);
                }
            } else { // Если игроку просто нечем бить карту, тогда мы вешаем логику на кнопочку "Всё"
                // СДЕЛАТЬ ЛОГИКУ ПОДКИДЫВАНИЯ НЕ НУЖНЫХ КАРТ ИГРОКУ ОТ КОМПЬЮТЕРА!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                controlGameVse.style.display = 'block'; // Показываем кнопочку "Всё"
                let cardsForGame = []; // Получаем карты компьютера, которые он может подкинуть игроку (не нужные карты)

                for (let i = 0; i < cardsOnTable.length; i++) {
                    for (let k = 0; k < cardsComputer.length; k++) {
                        if (getweigthCardRegardingMasti(cardsOnTable[i], trumpCard) == getweigthCardRegardingMasti(cardsComputer[k], trumpCard) && getweigthCardRegardingMasti(cardsComputer[k], trumpCard) <= 6) {
                            cardsForGame.push(cardsComputer[k]);
                        }
                    }
                }

                if (cardsForGame.length > 0) { // Если такие карты имеются, тогда мы их закидываем на стол и показываем
                    for (let i = 0; i < cardsForGame.length; i++) {
                        let index = cardsComputer.indexOf(cardsForGame[i]);

                        cardsForGame[i].classList.remove(cardsForGame[i].classList[cardsForGame[i].classList.length - 1]);
                        cardsForGame[i].classList.remove('card_computer');
                        cardsForGame[i].classList.add('beat' + tableCurr);
                        cardsForGame[i].style.backgroundImage = 'url(images/cards/' + cardsForGame[i].classList[0] + cardsForGame[i].classList[1] + '.jpg)';
                        table_game.append(cardsForGame[i]);


                        cardsComputer.splice(index, 1);
                        cardsOnTable.push(cardsForGame[i]);
                        tableCurr++;
                    }
                }

                controlGameVse.addEventListener('click', logicForVseButton);
            }
        } else { // Т.е. игрок побил первую карту компьютера, поэтому должна быть уже другая логика выборки карт, которые компьютер может подкинуть или же нет
            for (let i = 0; i < cardsPlayer.length; i++) { // Снимаем логику предыдующую с карт
                cardsPlayer[i].removeEventListener('click', logicForMovieComputer);
                cardsPlayer[i].removeEventListener('click', logicForMovieComputer);
            }


            let check = allMasti.some(function (elem) { // Мы проверяем есть ли карты в колоде или же нет
                if (allCards[elem].length !== 0) {
                    return true;
                } else {
                    return false;
                }
            });

            if (check) { // Если карты в колоде еще остались
                let cardsForGame = []; // Получаем карты компьютера, которые он может подкинуть игроку

                for (let i = 0; i < cardsOnTable.length; i++) {
                    for (let k = 0; k < cardsComputer.length; k++) {
                        if (getweigthCardRegardingMasti(cardsOnTable[i], trumpCard) == getweigthCardRegardingMasti(cardsComputer[k], trumpCard)) {
                            cardsForGame.push(cardsComputer[k]);
                        }
                    }
                }
                console.log(cardsForGame);

                if (cardsForGame.length > 0) { // Если такие карты есть, которые компьютер может подкинуть игроку, тогда он это делает
                    let weigtsCardsForGame = [];

                    for (let i = 0; i < cardsForGame.length; i++) {
                        weigtsCardsForGame.push(getweigthCardRegardingMasti(cardsForGame[i], trumpCard));
                    }

                    let minCardWeigth = Math.min(...weigtsCardsForGame);
                    let index = weigtsCardsForGame.indexOf(minCardWeigth);
                    let minCard = cardsForGame[index];

                    let indexC = cardsComputer.indexOf(minCard); // Нашли ту карту которую подкинули в общем массиве с картами компьютера
                    cardsComputer.splice(indexC, 1); // Вырезали эту карту из общего массива
                    cardsOnTable.push(minCard);
                    tableCurr++;

                    minCard.classList.remove(minCard.classList[minCard.classList.length - 1]);
                    minCard.classList.remove('card_computer');

                    minCard.classList.add('beat' + tableCurr);
                    minCard.style.backgroundImage = 'url(images/cards/' + minCard.classList[0] + minCard.classList[1] + '.jpg)';
                    table_game.append(minCard);


                    let cardsForBeatCardComputer = getAbilityBeatComputerCard(cardsPlayer, minCard);

                    if (cardsForBeatCardComputer.length > 0) { // Если игрок может побить карту, тогда вешается обработчик события на доступные карты для битья
                        for (let i = 0; i < cardsForBeatCardComputer.length; i++) {
                            cardsForBeatCardComputer[i].addEventListener('click', logicForMovieComputer);
                        }
                    } else {



                        // ВЫПОЛНЯЕТСЯ ЛОГИКА КОГДА ИГРОК НЕ МОЖЕТ ПОБИТЬ ПОДКИДАННЫЕ КАРТЫ КОМПЬЮТЕРА!!!
                        let cardsForGame = []; // Получаем карты компьютера, которые он может подкинуть игроку (не нужные карты)

                        for (let i = 0; i < cardsOnTable.length; i++) {
                            for (let k = 0; k < cardsComputer.length; k++) {
                                if (getweigthCardRegardingMasti(cardsOnTable[i], trumpCard) == getweigthCardRegardingMasti(cardsComputer[k], trumpCard) && getweigthCardRegardingMasti(cardsComputer[k], trumpCard) <= 6) {
                                    cardsForGame.push(cardsComputer[k]);
                                }
                            }
                        }

                        if (cardsForGame.length > 0) { // Если такие карты имеются, тогда мы их закидываем на стол и показываем
                            for (let i = 0; i < cardsForGame.length; i++) {
                                let index = cardsComputer.indexOf(cardsForGame[i]);

                                cardsForGame[i].classList.remove(cardsForGame[i].classList[cardsForGame[i].classList.length - 1]);
                                cardsForGame[i].classList.remove('card_computer');
                                cardsForGame[i].classList.add('beat' + tableCurr);
                                cardsForGame[i].style.backgroundImage = 'url(images/cards/' + cardsForGame[i].classList[0] + cardsForGame[i].classList[1] + '.jpg)';
                                table_game.append(cardsForGame[i]);


                                cardsComputer.splice(index, 1);
                                cardsOnTable.push(cardsForGame[i]);
                                tableCurr++;
                            }
                        }




                        controlGameVse.style.display = 'block';
                        controlGameVse.addEventListener('click', logicForVseButton);
                    }
                } else { // Если карт для подкидывания у компьютера больше нет, тогда невидимая бита
                    for (let i = 0; i < cardsOnTable.length; i++) { // Очистили все карты со стола
                        cardsOnTable[i].remove();
                    }
                    for (let i = 0; i < cardsPlayer.length; i++) { // Удалили все события с карт игрока
                        cardsPlayer[i].removeEventListener('click', logicForMovieComputer);
                        cardsPlayer[i].removeEventListener('click', logicForMovieComputer);
                    }

                    cardsOnTable.length = 0; // Зачистили массив с картами на столе
                    tableCurr = 0; // Обнулили текущий показатель карт на столе
                    startMovie = true; // Сказали, что ходит теперь игрок

                    let quantityCardsPlayer = 6 - cardsPlayer.length,
                        quantityCardsComputer = 6 - cardsComputer.length; // Взяли кол-во карт, которое не достает до нужного (6 карт)
                    distributionСardsAtBeginningGame('card_computer', 'zero', computer_block, cardsComputer, quantityCardsComputer); // Раздали карты компьютеру, т.к. он ходил
                    distributionСardsAtBeginningGame('card_player', 'card', player_block, cardsPlayer, quantityCardsPlayer, 'showCard'); // Раздали карты игроку, т.к. он отбивался
                    sortCardsForPlayer(cardsPlayer, 'card'); // Произвели сортировку карт игрока
                    sortCardsForPlayer(cardsComputer, 'zero'); // Произвели сортировку карт игрока для того, чтобы они красиво выстроились в ряд
                    logicGame();
                }
            } else { // Если карт в колоде уже нет, тогда мы можем подбрасывать и козыри
                // ВЕТКА, КОГДА КОМПЬЮТЕР ДОЛЖЕН ПОДБРАСЫВАТЬ КОЗЫРИ, Т.К. КАРТ БОЛЬШЕ НЕ ОСТАЛОСЬ В КОЛОДЕ
            }
        }
    }
};
logicGame();

function logicForMoviePlayer() { // Функция-обработчик события, которая вешается на карту и выполняет определенную логику с ходом, при условии что компьютер отбивается
    tableCurr++; // Увеличивает текущий показатель карт на столе
    let index = cardsPlayer.indexOf(this); // Получаем индекс карты, которую выбрали для хода из общего массива карт игрока
    this.classList.remove(this.classList[this.classList.length - 1]); // Удаляем последний класс у данной карты
    this.classList.remove('card_player'); // Удаляем класс card_player у данной карты

    this.classList.add('beat' + tableCurr); // Добавляем класс beat к выбранной карте для хода
    table_game.append(this); // Показываем эту карту на столе

    cardsPlayer.splice(index, 1); // Удаляем эту карту из массива с картами игрока
    cardsOnTable.push(this); // Добавляем эту карту в массив с картами на столе
    console.log(cardsPlayer);

    let cardForBeat; // Создается переменная, в которую мы положим карту, которой компьютер может побить нашу карту

    if (checkAbilityBeatPlayerCard(cardsComputer, this) && !this.classList.contains(trumpCard)) { // Проверка чтобы карта для битья у компьютера такая была и чтобы у нашей выбранной карты масть козыря не совпадали
        cardForBeat = checkAbilityBeatPlayerCard(cardsComputer, this);
    } else { // Алтернативная ветка, когда что-то из выше излагаемого не сработало
        if (this.classList.contains(trumpCard)) { // Проверка на то, что наша взятая карта для компьютера является ли козырем или нет
            cardForBeat = checkAbilityBeatPlayerCard(cardsComputer, this);
            // console.log('Это козырь и мы бьем его козырем!', cardForBeat);
        } else { // Карта не является козырем, т.е. это обычная карта
            cardForBeat = getKozirForBeatPlayerCard(cardsComputer);
            // console.log('Это обычная карта, но ее нет у игрока и мы бьем козырем!', cardForBeat);
        }
    }
    console.log(cardForBeat);

    if (cardForBeat && checkCanBeat) { // Проверка на то, есть ли нужная карта, которую компьютер может побить
        let index = cardsComputer.indexOf(cardForBeat); // Получаем индекс в массиве карт компьютера той карты, которая была выбрана, чтобы карта игрока была побита
        cardForBeat.classList.remove(cardForBeat.classList[cardForBeat.classList.length - 1]); // Удаляем последний класс у данной карты
        cardForBeat.classList.remove('card_computer'); // Удаляем класс card_computer у данной карты

        cardForBeat.classList.add('recapture' + tableCurr); // Добавляем новые классы
        cardForBeat.style.backgroundImage = 'url(images/cards/' + cardForBeat.classList[0] + cardForBeat.classList[1] + '.jpg)'; // Сделали карту отображаемой в нужном виде
        table_game.append(cardForBeat); // Показали данную карту на странице

        cardsComputer.splice(index, 1); // Удалили эту карту из массива общих карт компьютера
        cardsOnTable.push(cardForBeat); // Добавили данную карту в массив с картами на столе
        this.removeEventListener('click', logicForMoviePlayer); // Сняли обработчик события с той карты, на которую игрок кликал и которая уже на столе

        for (let i = 0; i < cardsPlayer.length; i++) { // Так же прошлись по всем картам и с них тоже сняли обработчики события по данной логике
            cardsPlayer[i].removeEventListener('click', logicForMoviePlayer);
        }

        controlGameBita.style.display = 'block'; // Затем показали кнопочку "Бита" на нашей странице
        controlGameBita.addEventListener('click', logicForBitaButton); // На кнопочку "Бита" навесили обработчик события

        logicGame();
        // console.log(cardsOnTable);
    } else { // Проверка на то, что компьютер уже не может побить карту
        checkCanBeat = false; // В параметр записали, что карта уже не может быть побита, а значит логика выше уже не исполнется
        controlGameBita.style.display = 'none'; // Убрали кнопочку "Бита"
        controlGameVse.style.display = 'block'; // Показали кнопочку "Всё"
        for (let i = 0; i < cardsPlayer.length; i++) { // На всякий случай зачистили обработчики событий с наших карт игрока, чтобы не мог пойти игрок, а точнее мог бы лишь подбросить карту, но не более
            cardsPlayer[i].removeEventListener('click', logicForMoviePlayer);
        }


        controlGameVse.addEventListener('click', function () { // На нашу кнопочку "Всё" вешается обработчик события
            controlGameVse.style.display = 'none'; // При нажатии на кнопку эту кнопка удаляется со страницы
            let quantityCardsPlayer = 6 - cardsPlayer.length; // Получаем кол-во карт, которое нужно игроку (до 6 карт)
            distributionСardsAtBeginningGame('card_player', 'card', player_block, cardsPlayer, quantityCardsPlayer, 'showCard'); // Раздаем игроку карты до 6 штук
            sortCardsForPlayer(cardsPlayer, 'card'); // Сортируем красиво карты игрока

            let quantityCardsComputer = cardsComputer.length; // Получааем текущее кол-во карт у компьютера
            for (let i = 0; i < cardsOnTable.length; i++) { // Запускается цикл, который будет крутиться столько раз, сколько было карт на столе
                cardsOnTable[i].classList.remove(cardsOnTable[i].classList[cardsOnTable[i].classList.length - 1]); // Удаляем с карт на столе последний класс
                cardsOnTable[i].classList.add('card_computer'); // Удаляем с карт на столе класс card_computer
                cardsOnTable[i].classList.add('zero' + (quantityCardsComputer + 1)); // Добавляем класс zero
                cardsComputer.push(cardsOnTable[i]); // Добавляем в массив с картами компьютера все карты со стола
                computer_block.append(cardsOnTable[i]); // Показываем эту карту в картах компьютера
                cardsOnTable[i].style.backgroundImage = 'url(images/cards/reverseSide.jpg'; // Отображаем ее
                quantityCardsComputer++; // Увеличиваем кол-во карт у игрока на 1
            }
            sortCardsForPlayer(cardsComputer, 'zero'); // Производим сортировку всех текущих карт игрока

            startMovie = true; // Гооврим, что ходит попрежнему игрок
            cardsOnTable.length = 0; // Обнуляем наш массив с картами на столе
            tableCurr = 0; // Обнулили текущий показатель карт на столе
            checkCanBeat = true; // Перевели параметр по возможности отбития карты в true
            logicGame();
        });
        logicGame();
        console.log('Не могу побить карту');
    }
};

function logicForMovieComputer() { // Функция-обработчик события, которая выполняет определенную логику с ходом компьютера
    controlGameVse.style.display = 'none';

    let index = cardsPlayer.indexOf(this);
    this.classList.remove(this.classList[this.classList.length - 1]);
    this.classList.remove('card_player');
    this.classList.add('recapture' + tableCurr);
    cardsPlayer.splice(index, 1);
    table_game.append(this);

    cardsOnTable.push(this);

    this.removeEventListener('click', logicForMovieComputer);
    logicGame();
};

function logicForBitaButton() { // Функция-обработчик события, которая вешается на кнопочку Бита и при нажатии на нее выполняется определенная логика
    controlGameBita.style.display = 'none'; // При нажатии на кнопочку, удалили кнопочку "Бита" со страницы

    for (let i = 0; i < cardsOnTable.length; i++) { // Очистили все карты со стола
        cardsOnTable[i].remove();
    }
    for (let i = 0; i < cardsPlayer.length; i++) { // Удалили все события с карт игрока
        cardsPlayer[i].removeEventListener('click', logicForMoviePlayer);
    }

    cardsOnTable.length = 0; // Зачистили массив с картами на столе
    tableCurr = 0; // Обнулили текущий показатель карт на столе
    startMovie = false; // Сказали, что ходит теперь компьютер

    let quantityCardsPlayer = 6 - cardsPlayer.length,
        quantityCardsComputer = 6 - cardsComputer.length; // Взяли кол-во карт, которое не достает до нужного (6 карт)
    distributionСardsAtBeginningGame('card_player', 'card', player_block, cardsPlayer, quantityCardsPlayer, 'showCard'); // Раздали карты сначала игроку, т.к. он ходил первый
    distributionСardsAtBeginningGame('card_computer', 'zero', computer_block, cardsComputer, quantityCardsComputer); // Раздали карты компьютеру, т.к. он отбивался
    sortCardsForPlayer(cardsPlayer, 'card'); // Произвели сортировку карт игрока
    sortCardsForPlayer(cardsComputer, 'zero'); // Произвели сортировку карт игрока для того, чтобы они красиво выстроились в ряд
    logicGame();
};

function logicForVseButton(){
    controlGameVse.style.display = 'none'; // При нажатии на кнопку эту кнопка удаляется со страницы
    let quantityCardsComputer = 6 - cardsComputer.length; // Получаем кол-во карт, которое нужно компьютеру (до 6 карт)
    distributionСardsAtBeginningGame('card_computer', 'zero', computer_block, cardsComputer, quantityCardsComputer); // Раздаем компьютеру карты до 6 штук
    sortCardsForPlayer(cardsComputer, 'zero'); // Сортируем красиво карты компьютера

    let quantityCardsPlayer = cardsPlayer.length; // Получаем текущее кол-во карт у Игрока
    for (let i = 0; i < cardsOnTable.length; i++) { // Запускается цикл, который будет крутиться столько раз, сколько было карт на столе
        cardsOnTable[i].classList.remove(cardsOnTable[i].classList[cardsOnTable[i].classList.length - 1]); // Удаляем с карт на столе последний класс
        cardsOnTable[i].classList.add('card_player'); // Удаляем с карт на столе класс card_computer
        cardsOnTable[i].classList.add('card' + (quantityCardsPlayer + 1)); // Добавляем класс zero
        cardsPlayer.push(cardsOnTable[i]); // Добавляем в массив с картами компьютера все карты со стола
        player_block.append(cardsOnTable[i]); // Показываем эту карту в картах компьютера
        cardsOnTable[i].style.backgroundImage = 'url(images/cards/' + cardsOnTable[i].classList[0] + cardsOnTable[i].classList[1] + '.jpg)'; // Отображаем ее
        quantityCardsPlayer++; // Увеличиваем кол-во карт у игрока на 1
    }
    sortCardsForPlayer(cardsPlayer, 'card'); // Производим сортировку всех текущих карт игрока

    startMovie = false; // Гооврим, что ходит попрежнему компьютер
    cardsOnTable.length = 0; // Обнуляем наш массив с картами на столе
    tableCurr = 0; // Обнулили текущий показатель карт на столе
    checkCanBeat = true; // Перевели параметр по возможности отбития карты в true
    logicGame();
}


function distributionСardsAtBeginningGame(card_ClassName, cardOrZeroClassName, parentBlock, cardsPerson, quantityCardsForDistribution, showCard = null) { // Функция, которая рандомно раздает карты обоим игрокам в начале игры, а так же помещает эти карты в нужные массивы в зависимости от того, кому карта раздалась
    let paramQualityCards = quantityCardsForDistribution;
    let i = 0;

    while (paramQualityCards > 0) {
        let check = allMasti.some(function (elem) {
            if (allCards[elem].length !== 0) {
                return true;
            } else {
                return false;
            }
        });

        if (check) {
            let randomMasti = allMasti[getRandomIntInclusive(0, allMasti.length - 1)];

            if (allCards[randomMasti].length > 0) {
                let randomCardIndex = getRandomIntInclusive(0, allCards[randomMasti].length - 1);
                let randomCard = allCards[randomMasti][randomCardIndex];
                allCards[randomMasti].splice(randomCardIndex, 1);



                let card = createElement('div', [randomMasti, randomCard, card_ClassName, cardOrZeroClassName + (i + 1)], parentBlock);
                if (showCard !== null) {
                    card.style.backgroundImage = 'url(images/cards/' + randomMasti + randomCard + '.jpg)';
                }
                cardsPerson.push(card);
                paramQualityCards--;
                i++;
            }
        }

        if (!check && cardKozir !== undefined) {
            all_cards.style.display = 'none';
            cardKozir.classList.remove('card_kozir');
            cardKozir.classList.add(card_ClassName);
            cardKozir.classList.add(cardOrZeroClassName + (i + 1));
            if(parentBlock == computer_block){
                cardKozir.style.backgroundImage = 'url(images/cards/reverseSide.jpg';
            }
            cardsPerson.push(cardKozir);
            parentBlock.append(cardKozir);
            cardKozir = undefined;
            break;
        }

        if (!check && cardKozir == undefined) {
            break;
        }
    };

    for (let k = 0; k < cardsPerson.length; k++) { // Добавление тегов card или zero по номерам грамотно!
        cardsPerson[k].classList.remove(cardsPerson[k].classList[cardsPerson[k].classList.length - 1]);
        cardsPerson[k].classList.add(cardOrZeroClassName + (k + 1));
    }
};

function checkOnFirstMove() { // Функция, которая возвращает показание того, кто первый ходит игрок или компьютер
    let checkHaveKozirAtPlayer = cardsPlayer.some(function (card) { // Проверка на то, есть ли козыри у игрока
        return card.classList.contains(trumpCard);
    });

    let checkHaveKozirAtComputer = cardsComputer.some(function (card) { // Проверка на то, есть ли козыри у компьютера
        return card.classList.contains(trumpCard);
    });

    if (checkHaveKozirAtPlayer && !checkHaveKozirAtComputer) { // В соответствии с наличием или не наличием козырей далее определяется игрок, который пойдет первый в соответствии с правилами карточной игры
        return true;
    } else if (!checkHaveKozirAtPlayer && checkHaveKozirAtComputer) {
        return false;
    } else if (!checkHaveKozirAtPlayer && !checkHaveKozirAtComputer) {
        return true;
    } else { // Если у обоих игроков есть козыря, тогда делаем банальную проверку на то, у кого же меньшее значение карты
        let weigthCardsPlayer = [];
        let weigthCardsComputer = [];

        for (let i = 0; i < cardsPlayer.length; i++) {
            if (cardsPlayer[i].classList.contains(trumpCard)) {
                weigthCardsPlayer.push(getweigthCardRegardingMasti(cardsPlayer[i], trumpCard));
            }
        }

        for (let i = 0; i < cardsComputer.length; i++) {
            if (cardsComputer[i].classList.contains(trumpCard)) {
                weigthCardsComputer.push(getweigthCardRegardingMasti(cardsComputer[i], trumpCard));
            }
        }

        let totalArr = weigthCardsPlayer.concat(weigthCardsComputer);
        let minimumWeigthCard = Math.min(...totalArr);

        if (weigthCardsPlayer.indexOf(minimumWeigthCard) !== -1) {
            return true;
        } else {
            return false;
        }
    }
};

function getweigthCardRegardingMasti(card, mastKozir) { // Функция, которая возвращает вес карты в виде числового значения. Где (любой масти) шестерка - это 0, а туз - это 8
    if (card.classList[0] !== mastKozir && card.classList[1] == 'six') {
        return 0;
    } else if (card.classList[0] !== mastKozir && card.classList[1] == 'seven') {
        return 1;
    } else if (card.classList[0] !== mastKozir && card.classList[1] == 'eigth') {
        return 2;
    } else if (card.classList[0] !== mastKozir && card.classList[1] == 'nine') {
        return 3;
    } else if (card.classList[0] !== mastKozir && card.classList[1] == 'ten') {
        return 4;
    } else if (card.classList[0] !== mastKozir && card.classList[1] == 'eleven') {
        return 5;
    } else if (card.classList[0] !== mastKozir && card.classList[1] == 'twelve') {
        return 6;
    } else if (card.classList[0] !== mastKozir && card.classList[1] == 'thirteen') {
        return 7;
    } else if (card.classList[0] !== mastKozir && card.classList[1] == 'fourteen') {
        return 8;
    } else if (card.classList[0] == mastKozir && card.classList[1] == 'six') {
        return 9;
    } else if (card.classList[0] == mastKozir && card.classList[1] == 'seven') {
        return 10;
    } else if (card.classList[0] == mastKozir && card.classList[1] == 'eigth') {
        return 11;
    } else if (card.classList[0] == mastKozir && card.classList[1] == 'nine') {
        return 12;
    } else if (card.classList[0] == mastKozir && card.classList[1] == 'ten') {
        return 13;
    } else if (card.classList[0] == mastKozir && card.classList[1] == 'eleven') {
        return 14;
    } else if (card.classList[0] == mastKozir && card.classList[1] == 'twelve') {
        return 15;
    } else if (card.classList[0] == mastKozir && card.classList[1] == 'thirteen') {
        return 16;
    } else if (card.classList[0] == mastKozir && card.classList[1] == 'fourteen') {
        return 17;
    }
};

function checkOnFiveIdenticallyCards(cardsAfterDistributionPlayer, cardsAfterDistributionComputer) { // Функция, которая проверяет, чтобы в начале не раздалось подряд 5 идентичных мастей, потому что по правилам игры при таком раскладе должна быть пересдача карт
    let copyAllMasti = allMasti.slice();

    while (copyAllMasti.length > 0) {
        let firstElemFrom_copyAllMasti = copyAllMasti.splice(0, 1)[0];
        let currForPlayer = 0;
        let currForComputer = 0;

        for (let i = 0; i < cardsAfterDistributionPlayer.length; i++) {
            if (cardsAfterDistributionPlayer[i].classList.contains(firstElemFrom_copyAllMasti)) {
                currForPlayer++;
            }

            if (cardsAfterDistributionComputer[i].classList.contains(firstElemFrom_copyAllMasti)) {
                currForComputer++;
            }
        }

        if (currForPlayer == 5 || currForComputer == 5) {
            allCards = {
                'bubi_': ['six', 'seven', 'eigth', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen'],
                'chervi_': ['six', 'seven', 'eigth', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen'],
                'kresti_': ['six', 'seven', 'eigth', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen'],
                'piki_': ['six', 'seven', 'eigth', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen']
            };

            let cardPlayer = document.querySelectorAll('.card_player');
            let card_kozir = document.querySelector('.card_kozir');
            card_kozir.remove();

            for (let k = 0; k < cardPlayer.length; k++) {
                cardPlayer[k].remove();
                cardsComputer[k].remove();
            }

            cardsPlayer.length = 0;
            cardsComputer.length = 0;
            trumpCard = undefined;

            console.log('Произошла перездача карт');
            startGame();
            break;
        }
    }
};

function sortCardsForPlayer(cardsArr, className) { // Функция, которая сортирует карты по их значениям от большего к меньшему и выводит их красиво на странице
    let sortWeigthCards = [];
    let curr = 1;

    for (let i = 0; i < cardsArr.length; i++) {
        sortWeigthCards.push(getweigthCardRegardingMasti(cardsArr[i], trumpCard));
    }

    while (curr < (cardsArr.length + 1)) {
        let minWeigthCard = Math.min(...sortWeigthCards);
        let indexMinWeigthCard = sortWeigthCards.indexOf(minWeigthCard);
        cardsArr[indexMinWeigthCard].classList.remove(cardsArr[indexMinWeigthCard].classList[3]);
        cardsArr[indexMinWeigthCard].classList.add(className + curr);

        sortWeigthCards.splice(indexMinWeigthCard, 1, (100 + curr));

        curr++;
    }
};

function checkAbilityBeatPlayerCard(cardsComputer, card) { // Функция, которая делает проверку на то, способен ли компьютер побить обычную карту игрока, т.е. проверка на данную масть и если такая масть имеется, которая выше, чем у игрока, тогда мы возвращаем этот элемент
    let cardsAloneMasti = [];
    let weigthCardsAloneMasti = [];
    let mastCard = card.classList[0];
    let weigthCard = getweigthCardRegardingMasti(card, trumpCard);

    for (let i = 0; i < cardsComputer.length; i++) {
        if (cardsComputer[i].classList.contains(mastCard)) {
            if (getweigthCardRegardingMasti(cardsComputer[i], trumpCard) > weigthCard) {
                cardsAloneMasti.push(cardsComputer[i]);
            }
        }
    }

    if (cardsAloneMasti.length == 0) {
        return false;
    } else {
        for (let i = 0; i < cardsAloneMasti.length; i++) {
            weigthCardsAloneMasti.push(getweigthCardRegardingMasti(cardsAloneMasti[i], trumpCard));
        }

        let minWeigthCard = Math.min(...weigthCardsAloneMasti);
        let index = weigthCardsAloneMasti.indexOf(minWeigthCard);

        return cardsAloneMasti[index];
    }
};

function getKozirForBeatPlayerCard(cardsComputer) { // Функция, которая отдает нам карту, которая козырная и происходит это в том случае, если у компьютер не может побить карту без козыря и у него просто нет подходящей карты
    let kozirsComputerArr = [];
    let weigthComputerArr = [];

    for (let i = 0; i < cardsComputer.length; i++) {
        if (cardsComputer[i].classList.contains(trumpCard)) {
            kozirsComputerArr.push(cardsComputer[i]);
        }
    }

    if (kozirsComputerArr.length == 0) {
        return false;
    } else {
        for (let i = 0; i < kozirsComputerArr.length; i++) {
            weigthComputerArr.push(getweigthCardRegardingMasti(kozirsComputerArr[i], trumpCard));
        }

        let minWeigthCard = Math.min(...weigthComputerArr);
        let index = weigthComputerArr.indexOf(minWeigthCard);

        return kozirsComputerArr[index];
    }
};

function getAbilityBeatComputerCard(cardsPlayer, cardComputer) { // Функция, которая будет возвращать массив с картами, которые игрок может побить в данный момент исходя из хода компьютера
    let result = [];
    let mastCard = cardComputer.classList[0];
    let weigthCardComputer = getweigthCardRegardingMasti(cardComputer, trumpCard);

    for (let i = 0; i < cardsPlayer.length; i++) {
        if (cardsPlayer[i].classList[0] == mastCard && getweigthCardRegardingMasti(cardsPlayer[i], trumpCard) > weigthCardComputer) {
            result.push(cardsPlayer[i]);
        }

        if (cardsPlayer[i].classList[0] == trumpCard && getweigthCardRegardingMasti(cardsPlayer[i], trumpCard) > weigthCardComputer) {
            result.push(cardsPlayer[i]);
        }
    }

    return result;
};



function getRandomIntInclusive(min, max) { // Функция, которая отдаем рандомное число в соотвествии с переданными промежутками
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; // Максимум и минимум включаются
};

function createElement(selector, clasesName, parent) { // Функция, которая создает и добавляет новый элемент на страницу
    let elem = document.createElement(selector);
    for (let i = 0; i < clasesName.length; i++) {
        elem.classList.add(clasesName[i]);
    }
    parent.append(elem);

    return elem;
};