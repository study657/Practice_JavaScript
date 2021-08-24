let computer_block = document.querySelector('.computer_block'),
    game_block = document.querySelector('.game_block'),
    koloda = document.querySelector('.koloda'),
    player_block = document.querySelector('.player_block');


let allCards = {
    'bubi_': ['six', 'seven', 'eigth', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen'],
    'chervi_': ['six', 'seven', 'eigth', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen'],
    'kresti_': ['six', 'seven', 'eigth', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen'],
    'piki_': ['six', 'seven', 'eigth', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen']
};
let allMasti = ['bubi_', 'chervi_', 'kresti_', 'piki_'];

let cardsPlayer = [];
let cardsComputer = [];
let trumpCard;



for(let i = 0; i < 6; i++){
    let randomMasti = allMasti[getRandomIntInclusive(0, allMasti.length - 1)];
    let randomCardIndex = getRandomIntInclusive(0, allCards[randomMasti].length - 1);
    let randomCard = allCards[randomMasti][randomCardIndex];
    allCards[randomMasti].splice(randomCardIndex, 1);



    let card = createElement('div', ['card_player', 'card' + (i + 1), randomMasti + randomCard], player_block);
    card.style.backgroundImage = 'url(images/cards/' + randomMasti + randomCard + '.jpg)';
    cardsPlayer.push(card);
}




for(let i = 0; i < 6; i++){
    let randomMasti = allMasti[getRandomIntInclusive(0, allMasti.length - 1)];
    let randomCardIndex = getRandomIntInclusive(0, allCards[randomMasti].length - 1);
    let randomCard = allCards[randomMasti][randomCardIndex];
    allCards[randomMasti].splice(randomCardIndex, 1);



    let card = createElement('div', ['zero' + (i + 1), randomMasti + randomCard], computer_block);
    cardsComputer.push(card);
}





let randomMastitest = allMasti[getRandomIntInclusive(0, allMasti.length - 1)];
trumpCard = randomMastitest;
let randomCardIndextext = getRandomIntInclusive(0, allCards[randomMastitest].length - 1);
let randomCardKozir = allCards[randomMastitest][randomCardIndextext];

let cardKozir = createElement('div', ['card_kozir'], koloda);
cardKozir.style.backgroundImage = 'url(images/cards/' + randomMastitest + randomCardKozir + '.jpg)';
console.log(trumpCard);







console.log(allCards);
console.log(cardsPlayer);
console.log(cardsComputer);





function getRandomIntInclusive(min, max) { // Функция, которая отдаем рандомное число в соотвествии с переданными промежутками
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; // Максимум и минимум включаются
};

function createElement(selector, clasesName, parent){
    let elem = document.createElement(selector);
    for(let i = 0; i < clasesName.length; i++){
        elem.classList.add(clasesName[i]);
    }
    parent.append(elem);

    return elem;
};