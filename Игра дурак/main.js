let computer_block = document.querySelector('.computer_block'),
    game_block = document.querySelector('.game_block'),
    koloda = document.querySelector('.koloda'),
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
let startMovie; // Определение на то, кто первый ходит. Если статус переменной true, то ходит первый игрок, если false, то компьютер

function startGame() { // Функция, которая делает раздачу карт игрокам и проверяет, чтобы все соответсвовало требованиям карточной игры
    distributionСardsAtBeginningGame('card_player', 'card', player_block, cardsPlayer, 'showCard'); // Произвели раздачу 6-и карт игроку
    distributionСardsAtBeginningGame('card_computer', 'zero', computer_block, cardsComputer); // Произвели раздачу 6-и карт компьютеру


    let randomMastiForKozir = allMasti[getRandomIntInclusive(0, allMasti.length - 1)]; // Получение рандомной масти для определения козыря
    trumpCard = randomMastiForKozir; // Записали это в главный козырь карт
    let randomCardIndextext = getRandomIntInclusive(0, allCards[randomMastiForKozir].length - 1);
    let randomCardKozir = allCards[randomMastiForKozir][randomCardIndextext]; // Получили саму карту с козырем

    let cardKozir = createElement('div', ['card_kozir'], koloda); // Создали данную карту с козырем на странице
    cardKozir.style.backgroundImage = 'url(images/cards/' + randomMastiForKozir + randomCardKozir + '.jpg)'; // Показали данную карту с козырем на странице
    console.log(trumpCard);





    startMovie = checkOnFirstMove(); // Определение на то, кто первый ходит. Если статус переменной true, то ходит первый игрок, если false, то компьютер

    sortCardsForPlayer(cardsPlayer); // Сортировка карт для игрока по значениям карт от большего к меньшему
    checkOnFiveIdenticallyCards(cardsPlayer, cardsComputer); // Проверка на то, что мы не раздаем подряд 5 карт одной и той же масти одному из игроков
};
startGame();

console.log(startMovie);
console.log(allCards);
console.log(cardsPlayer);
console.log(cardsComputer);




function distributionСardsAtBeginningGame(card_ClassName, cardOrZeroClassName, parentBlock, cardsPerson, showCard = null) { // Функция, которая рандомно раздает карты обоим игрокам в начале игры, а так же помещает эти карты в нужные массивы в зависимости от того, кому карта раздалась
    for (let i = 0; i < 6; i++) {
        let randomMasti = allMasti[getRandomIntInclusive(0, allMasti.length - 1)];

        if (allCards[randomMasti].length > 0) {
            let randomCardIndex = getRandomIntInclusive(0, allCards[randomMasti].length - 1);
            let randomCard = allCards[randomMasti][randomCardIndex];
            allCards[randomMasti].splice(randomCardIndex, 1);



            let card = createElement('div', [card_ClassName, cardOrZeroClassName + (i + 1), randomMasti, randomCard], parentBlock);
            if (showCard !== null) {
                card.style.backgroundImage = 'url(images/cards/' + randomMasti + randomCard + '.jpg)';
            }
            cardsPerson.push(card);
        } else {
            i - 1;
        }
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
    if (card.classList[card.classList.length - 2] !== mastKozir && card.classList[card.classList.length - 1] == 'six') {
        return 0;
    } else if (card.classList[card.classList.length - 2] !== mastKozir && card.classList[card.classList.length - 1] == 'seven') {
        return 1;
    } else if (card.classList[card.classList.length - 2] !== mastKozir && card.classList[card.classList.length - 1] == 'eigth') {
        return 2;
    } else if (card.classList[card.classList.length - 2] !== mastKozir && card.classList[card.classList.length - 1] == 'nine') {
        return 3;
    } else if (card.classList[card.classList.length - 2] !== mastKozir && card.classList[card.classList.length - 1] == 'ten') {
        return 4;
    } else if (card.classList[card.classList.length - 2] !== mastKozir && card.classList[card.classList.length - 1] == 'eleven') {
        return 5;
    } else if (card.classList[card.classList.length - 2] !== mastKozir && card.classList[card.classList.length - 1] == 'twelve') {
        return 6;
    } else if (card.classList[card.classList.length - 2] !== mastKozir && card.classList[card.classList.length - 1] == 'thirteen') {
        return 7;
    } else if (card.classList[card.classList.length - 2] !== mastKozir && card.classList[card.classList.length - 1] == 'fourteen') {
        return 8;
    } else if (card.classList[card.classList.length - 2] == mastKozir && card.classList[card.classList.length - 1] == 'six') {
        return 9;
    } else if (card.classList[card.classList.length - 2] == mastKozir && card.classList[card.classList.length - 1] == 'seven') {
        return 10;
    } else if (card.classList[card.classList.length - 2] == mastKozir && card.classList[card.classList.length - 1] == 'eigth') {
        return 11;
    } else if (card.classList[card.classList.length - 2] == mastKozir && card.classList[card.classList.length - 1] == 'nine') {
        return 12;
    } else if (card.classList[card.classList.length - 2] == mastKozir && card.classList[card.classList.length - 1] == 'ten') {
        return 13;
    } else if (card.classList[card.classList.length - 2] == mastKozir && card.classList[card.classList.length - 1] == 'eleven') {
        return 14;
    } else if (card.classList[card.classList.length - 2] == mastKozir && card.classList[card.classList.length - 1] == 'twelve') {
        return 15;
    } else if (card.classList[card.classList.length - 2] == mastKozir && card.classList[card.classList.length - 1] == 'thirteen') {
        return 16;
    } else if (card.classList[card.classList.length - 2] == mastKozir && card.classList[card.classList.length - 1] == 'fourteen') {
        return 17;
    } else {
        alert('Произошла ошибка получения значения карты');
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

            for(let k = 0; k < cardPlayer.length; k++){
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

function sortCardsForPlayer(cardsArr) { // Функция, которая сортирует карты по их значениям от большего к меньшему и выводит их красиво на странице
    let sortWeigthCards = [];
    let curr = 1;

    for (let i = 0; i < cardsArr.length; i++) {
        sortWeigthCards.push(getweigthCardRegardingMasti(cardsArr[i], trumpCard));
    }

    while (curr < 7) {
        let minWeigthCard = Math.min(...sortWeigthCards);
        let indexMinWeigthCard = sortWeigthCards.indexOf(minWeigthCard);
        cardsArr[indexMinWeigthCard].classList.remove(cardsArr[indexMinWeigthCard].classList[1]);
        cardsArr[indexMinWeigthCard].classList.add('card' + curr);

        sortWeigthCards.splice(indexMinWeigthCard, 1, (100 + curr));

        curr++;
    }
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