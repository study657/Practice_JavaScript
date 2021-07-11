let client = document.querySelector('.client');
let game_client = document.querySelector('.game_client');
let server = document.querySelector('.server');
let game_server = document.querySelector('.game_server');
let trs_client = game_client.querySelectorAll('tr');
let tds_client = game_client.querySelectorAll('td');
let trs_server = game_server.querySelectorAll('tr');
let tds_server = game_server.querySelectorAll('td');
let random = document.querySelector('.random');
let start_game = document.querySelector('.start_game');
let navigation = document.querySelector('.navigation');
let top_coordinates = ['0', '40px', '80px', '120px', '160px', '200px', '240px', '280px', '320px', '360px', '400px'];
let left_coordinates = ['0', '40px', '80px', '120px', '160px', '200px', '240px', '280px', '320px', '360px', '400px'];

markTdsAndTrs(tds_client, trs_client);
markTdsAndTrs(tds_server, trs_server);


function shipPlacement(shipLength, selectorGame, trs, genSelector, showShips = null) { // Основная функция, которая создает корабль, исходя из параметров его длины
    if (randonDirection() == 'horizontal') { // Ветка, если корабль получился рандомно с расположением ГОРИЗОНТАЛЬНЫМ
        let maxCoordinateFromArr_top_coordinates = 0;
        let maxCoordinateFromArr_left_coordinates = 0;

        if (shipLength == 4) {
            maxCoordinateFromArr_top_coordinates = 9;
            maxCoordinateFromArr_left_coordinates = 6;
        }

        if (shipLength == 3) {
            maxCoordinateFromArr_top_coordinates = 9;
            maxCoordinateFromArr_left_coordinates = 7;
        }

        if (shipLength == 2) {
            maxCoordinateFromArr_top_coordinates = 9;
            maxCoordinateFromArr_left_coordinates = 8;
        }

        if (shipLength == 1) {
            maxCoordinateFromArr_top_coordinates = 9;
            maxCoordinateFromArr_left_coordinates = 9;
        }

        let topCurrentCoordinate = top_coordinates[getRandomIntInclusive(0, maxCoordinateFromArr_top_coordinates)]; // Получение рандомной координаты по массиву top_coordinates
        let leftCurrentCoordinate = left_coordinates[getRandomIntInclusive(0, maxCoordinateFromArr_left_coordinates)]; // Получение рандомной координаты по массиву left_coordinates
        let shipOnCells = getCellsOnShipHorizontal(topCurrentCoordinate, leftCurrentCoordinate, shipLength, trs); // Массив из ячеек где стоит корабль

        if (!checkOnAvailabilityShipOnCell(shipOnCells) && !checkCellsAboutShip(shipOnCells, shipLength, 'horizontal', trs, genSelector)) { // Проверки на то, что сам корабль встал не на другой корабль, а так же, что рядом нет мешающих кораблей
            if (showShips !== null) {
                let ship = createShip(shipLength, selectorGame);
                ship.style.top = topCurrentCoordinate;
                ship.style.left = leftCurrentCoordinate;
            }

            for (let i = 0; i < shipOnCells.length; i++) {
                shipOnCells[i].className = 'parking';
            }
        } else {
            shipPlacement(shipLength, selectorGame, trs, genSelector, showShips); // Если проверка не прошла, то функция вызывается повторно
        }
    } else { // Ветка, если корабль получился рандомно с расположением ВЕРТИКАЛЬНЫМ
        let maxCoordinateFromArr_top_coordinates = 0;
        let maxCoordinateFromArr_left_coordinates = 0;

        if (shipLength == 4) {
            maxCoordinateFromArr_top_coordinates = 6;
            maxCoordinateFromArr_left_coordinates = 10;
        }

        if (shipLength == 3) {
            maxCoordinateFromArr_top_coordinates = 7;
            maxCoordinateFromArr_left_coordinates = 10;
        }

        if (shipLength == 2) {
            maxCoordinateFromArr_top_coordinates = 8;
            maxCoordinateFromArr_left_coordinates = 10;
        }

        if (shipLength == 1) {
            maxCoordinateFromArr_top_coordinates = 9;
            maxCoordinateFromArr_left_coordinates = 10;
        }

        let topCurrentCoordinate = top_coordinates[getRandomIntInclusive(0, maxCoordinateFromArr_top_coordinates)];
        let leftCurrentCoordinate = left_coordinates[getRandomIntInclusive(1, maxCoordinateFromArr_left_coordinates)];
        let shipOnCells = getCellsOnShipVertical(topCurrentCoordinate, leftCurrentCoordinate, shipLength, trs, genSelector);

        if (!checkOnAvailabilityShipOnCell(shipOnCells) && !checkCellsAboutShip(shipOnCells, shipLength, 'vertical', trs, genSelector)) {
            if (showShips !== null) {
                let ship = createShip(shipLength, selectorGame);
                ship.style.top = topCurrentCoordinate;
                ship.style.left = leftCurrentCoordinate;
                ship.style.transform = 'rotate(90deg)';
            }

            for (let i = 0; i < shipOnCells.length; i++) {
                shipOnCells[i].className = 'parking';
            }
        } else {
            shipPlacement(shipLength, selectorGame, trs, genSelector, showShips);
        }
    }


    function getCellsOnShipHorizontal(top, left, shipLength, trs) { // Функция которая получает все колонки в виде массива, куда встает корабль, который имеет горизонтальное положение. Где shipLength - это разряд корабля
        if (shipLength == 4) {
            let allCels = [];
            let topStartCell = parseFloat(top) / 40;
            let leftStartCell = parseFloat(left) / 40;

            for (let i = 0; i <= 3; i++) {
                let cell = trs[topStartCell].querySelectorAll('td')[leftStartCell + i];
                allCels.push(cell);
            }

            return allCels;
        }

        if (shipLength == 3) {
            let allCels = [];
            let topStartCell = parseFloat(top) / 40;
            let leftStartCell = parseFloat(left) / 40;

            for (let i = 0; i <= 2; i++) {
                let cell = trs[topStartCell].querySelectorAll('td')[leftStartCell + i];
                allCels.push(cell);
            }

            return allCels;
        }

        if (shipLength == 2) {
            let allCels = [];
            let topStartCell = parseFloat(top) / 40;
            let leftStartCell = parseFloat(left) / 40;

            for (let i = 0; i <= 1; i++) {
                let cell = trs[topStartCell].querySelectorAll('td')[leftStartCell + i];
                allCels.push(cell);
            }

            return allCels;
        }

        if (shipLength == 1) {
            let allCels = [];
            let topStartCell = parseFloat(top) / 40;
            let leftStartCell = parseFloat(left) / 40;

            let cell = trs[topStartCell].querySelectorAll('td')[leftStartCell];
            allCels.push(cell);

            return allCels;
        }
    };

    function getCellsOnShipVertical(top, left, shipLength, trs, genSelector) { // Функция которая получает все колонки в виде массива, куда встает корабль, который имеет вертикальное положение. Где shipLength - это разряд корабля
        if (shipLength == 4) {
            let allCels = [];
            let topStartCell = parseFloat(top) / 40;
            let leftStartCell = (parseFloat(left) / 40) - 1;

            let startCell = trs[topStartCell].querySelectorAll('td')[leftStartCell].getAttribute('name');

            for (let i = 0; i <= 3; i++) {
                let cell = genSelector.querySelector('[name="' + String(Number(startCell) + (i * 10)) + '"]');
                allCels.push(cell);
            }

            return allCels;
        }

        if (shipLength == 3) {
            let allCels = [];
            let topStartCell = parseFloat(top) / 40;
            let leftStartCell = (parseFloat(left) / 40) - 1;

            let startCell = trs[topStartCell].querySelectorAll('td')[leftStartCell].getAttribute('name');

            for (let i = 0; i <= 2; i++) {
                let cell = genSelector.querySelector('[name="' + String(Number(startCell) + (i * 10)) + '"]');
                allCels.push(cell);
            }

            return allCels;
        }

        if (shipLength == 2) {
            let allCels = [];
            let topStartCell = parseFloat(top) / 40;
            let leftStartCell = (parseFloat(left) / 40) - 1;

            let startCell = trs[topStartCell].querySelectorAll('td')[leftStartCell].getAttribute('name');

            for (let i = 0; i <= 1; i++) {
                let cell = genSelector.querySelector('[name="' + String(Number(startCell) + (i * 10)) + '"]');
                allCels.push(cell);
            }

            return allCels;
        }

        if (shipLength == 1) {
            let allCels = [];
            let topStartCell = parseFloat(top) / 40;
            let leftStartCell = (parseFloat(left) / 40) - 1;

            let startCell = trs[topStartCell].querySelectorAll('td')[leftStartCell].getAttribute('name');

            let cell = genSelector.querySelector('[name="' + String(Number(startCell)) + '"]');
            allCels.push(cell);

            return allCels;
        }
    };

    function checkOnAvailabilityShipOnCell(shipOnCells) { // Проверка на наличие корабля, чтобы новый корабль не встал туда, где корабль уже есть
        return check = shipOnCells.some(function (item) {
            if (item.classList.contains('parking')) {
                return true;
            } else {
                return false;
            }
        });
    };

    function checkCellsAboutShip(shipOnCells, shipLength, orientation, trs, genSelector) { // Функция, которая проверяет все ячейки близлежащего корабля и выводит false если корабль поставить можно и true, если нельзя
        if (orientation == 'horizontal') { // Если расположение корабля ГОРИЗОНТАЛЬНОЕ
            let itarations = 0;
            if (shipLength == 4) {
                itarations = 5;
            }
            if (shipLength == 3) {
                itarations = 4;
            }
            if (shipLength == 2) {
                itarations = 3;
            }
            if (shipLength == 1) {
                itarations = 2;
            }

            let cellsAboutShip = [];

            let data_numFirstCell = parseFloat(shipOnCells[0].getAttribute('name'));

            let lineOnShip = genSelector.querySelector('[name="' + String(data_numFirstCell) + '"]').parentElement;
            let leftCallFromShip = lineOnShip.children[genSelector.querySelector('[name="' + data_numFirstCell + '"]').dataset.num - 1];
            let rigthCallFromShip = lineOnShip.children[Number(genSelector.querySelector('[name="' + data_numFirstCell + '"]').dataset.num) + (itarations - 1)];

            if (leftCallFromShip !== undefined) {
                cellsAboutShip.push(leftCallFromShip);
            }

            if (rigthCallFromShip !== undefined) {
                cellsAboutShip.push(rigthCallFromShip);
            }

            let lineUpAbotShip = genSelector.querySelector('[name="' + String(data_numFirstCell) + '"]').parentElement.previousElementSibling;
            if (lineUpAbotShip !== null) {
                let firstCheckCallOnLine = genSelector.querySelector('[name="' + String(data_numFirstCell - 10) + '"]');
                let numberCall = firstCheckCallOnLine.dataset.num - 1;

                for (let i = 0; i <= itarations; i++) {
                    if (lineUpAbotShip.children[numberCall + i] !== undefined) {
                        cellsAboutShip.push(lineUpAbotShip.children[numberCall + i]);
                    }
                }
            }


            let lineDownAbotShip = genSelector.querySelector('[name="' + String(data_numFirstCell) + '"]').parentElement.nextElementSibling;
            if (lineDownAbotShip !== null) {
                let firstCheckCallOnLine = genSelector.querySelector('[name="' + String(data_numFirstCell + 10) + '"]');

                let numberCall = firstCheckCallOnLine.dataset.num - 1;

                for (let i = 0; i <= itarations; i++) {
                    if (lineDownAbotShip.children[numberCall + i] !== undefined) {
                        cellsAboutShip.push(lineDownAbotShip.children[numberCall + i]);
                    }
                }
            }

            let check = cellsAboutShip.some(function (item) {
                if (item.classList.contains('parking')) {
                    return true;
                } else {
                    return false;
                }
            });

            return check;
        }



        if (orientation == 'vertical') { // Если расположение корабля ВЕРТИКАЛЬНОЕ
            let itarations = 0;
            if (shipLength == 4) {
                itarations = 5;
            }
            if (shipLength == 3) {
                itarations = 4;
            }
            if (shipLength == 2) {
                itarations = 3;
            }
            if (shipLength == 1) {
                itarations = 2;
            }

            let cellsAboutShip = [];
            let data_numFirstCell = parseFloat(shipOnCells[0].getAttribute('name'));

            let numberRowWhereShip = Number(genSelector.querySelector('[name="' + String(data_numFirstCell) + '"]').parentElement.dataset.num);
            let numberCallBehindShip = Number(genSelector.querySelector('[name="' + String(data_numFirstCell) + '"]').dataset.num) - 1;
            let numberCallFrontShip = Number(genSelector.querySelector('[name="' + String(data_numFirstCell) + '"]').dataset.num) + 1;
            let numberUpRowWhereShip = '';
            if (trs[numberRowWhereShip - 1] !== undefined) {
                numberUpRowWhereShip = Number(trs[numberRowWhereShip - 1].dataset.num);
                for (let i = 0; i <= itarations; i++) {
                    if (trs[numberUpRowWhereShip + i] !== undefined) {
                        if (trs[numberUpRowWhereShip + i].children[numberCallBehindShip] !== undefined) {
                            cellsAboutShip.push(trs[numberUpRowWhereShip + i].children[numberCallBehindShip]);
                        }
                    }
                }

                for (let i = 0; i <= itarations; i++) {
                    if (trs[numberUpRowWhereShip + i] !== undefined) {
                        if (trs[numberUpRowWhereShip + i].children[numberCallFrontShip] !== undefined) {
                            cellsAboutShip.push(trs[numberUpRowWhereShip + i].children[numberCallFrontShip]);
                        }
                    }
                }
            } else {
                numberUpRowWhereShip = Number(trs[numberRowWhereShip].dataset.num);
                for (let i = 0; i < itarations; i++) {
                    if (trs[numberUpRowWhereShip + i] !== undefined) {
                        if (trs[numberUpRowWhereShip + i].children[numberCallBehindShip] !== undefined) {
                            cellsAboutShip.push(trs[numberUpRowWhereShip + i].children[numberCallBehindShip]);
                        }
                    }
                }

                for (let i = 0; i < itarations; i++) {
                    if (trs[numberUpRowWhereShip + i] !== undefined) {
                        if (trs[numberUpRowWhereShip + i].children[numberCallFrontShip] !== undefined) {
                            cellsAboutShip.push(trs[numberUpRowWhereShip + i].children[numberCallFrontShip]);
                        }
                    }
                }
            }


            let rowUpShip = trs[numberRowWhereShip - 1];
            let rowDownShip = trs[numberRowWhereShip + (itarations - 1)];
            let numberCallWhereIsShip = genSelector.querySelector('[name="' + String(data_numFirstCell) + '"]').dataset.num;

            if (rowUpShip !== undefined) {
                cellsAboutShip.push(rowUpShip.children[numberCallWhereIsShip]);
            }

            if (rowDownShip !== undefined) {
                cellsAboutShip.push(rowDownShip.children[numberCallWhereIsShip]);
            }

            let check = cellsAboutShip.some(function (item) {
                if (item.classList.contains('parking')) {
                    return true;
                } else {
                    return false;
                }
            });

            return check;
        }
    };

    function randonDirection() { // Функция, которая рандомно определяет направление корабля (Горизонтальное или Вертикальное)
        if (getRandomIntInclusive(0, 1) == 0) {
            return 'horizontal';
        } else {
            return 'vertical';
        }
    };

    function getRandomIntInclusive(min, max) { // Функция, которая отдаем рандомное число в соотвествии с переданными промежутками
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min; // Максимум и минимум включаются
    };

    function createShip(shipLength, parent) { // Функция, которая создает новый корабль, в зависимости от его параметра длины
        let ship = document.createElement('div');
        if (shipLength == 4) {
            ship.classList.add('ship_4', 'ship');
            parent.append(ship);
            return ship;
        }

        if (shipLength == 3) {
            ship.classList.add('ship_3', 'ship');
            parent.append(ship);
            return ship;
        }

        if (shipLength == 2) {
            ship.classList.add('ship_2', 'ship');
            parent.append(ship);
            return ship;
        }

        if (shipLength == 1) {
            ship.classList.add('ship_1', 'ship');
            parent.append(ship);
            return ship;
        }
    };
};
shipPlacement(4, game_client, trs_client, client, 'yes');
shipPlacement(3, game_client, trs_client, client, 'yes');
shipPlacement(3, game_client, trs_client, client, 'yes');
shipPlacement(2, game_client, trs_client, client, 'yes');
shipPlacement(2, game_client, trs_client, client, 'yes');
shipPlacement(2, game_client, trs_client, client, 'yes');
shipPlacement(1, game_client, trs_client, client, 'yes');
shipPlacement(1, game_client, trs_client, client, 'yes');
shipPlacement(1, game_client, trs_client, client, 'yes');
shipPlacement(1, game_client, trs_client, client, 'yes');


random.addEventListener('click', function () { // При нажатии на кнопку "Изменить рандом кораблей", происходит сброс всех классов parking (там где стоят корабли), удаление кораблей, а после создаются новые
    for (let i = 0; i < tds_client.length; i++) {
        if (tds_client[i].classList.contains('parking')) {
            tds_client[i].classList.remove('parking');
        }
    }

    let ships = document.querySelectorAll('.ship');

    for (let i = 0; i < ships.length; i++) {
        ships[i].remove();
    }

    shipPlacement(4, game_client, trs_client, client, 'yes');
    shipPlacement(3, game_client, trs_client, client, 'yes');
    shipPlacement(3, game_client, trs_client, client, 'yes');
    shipPlacement(2, game_client, trs_client, client, 'yes');
    shipPlacement(2, game_client, trs_client, client, 'yes');
    shipPlacement(2, game_client, trs_client, client, 'yes');
    shipPlacement(1, game_client, trs_client, client, 'yes');
    shipPlacement(1, game_client, trs_client, client, 'yes');
    shipPlacement(1, game_client, trs_client, client, 'yes');
    shipPlacement(1, game_client, trs_client, client, 'yes');
});


start_game.addEventListener('click', function () {
    game_server.style.display = 'block';
    navigation.style.display = 'none';

    shipPlacement(4, game_server, trs_server, server);
    shipPlacement(3, game_server, trs_server, server);
    shipPlacement(3, game_server, trs_server, server);
    shipPlacement(2, game_server, trs_server, server);
    shipPlacement(2, game_server, trs_server, server);
    shipPlacement(2, game_server, trs_server, server);
    shipPlacement(1, game_server, trs_server, server);
    shipPlacement(1, game_server, trs_server, server);
    shipPlacement(1, game_server, trs_server, server);
    shipPlacement(1, game_server, trs_server, server);
});


function markTdsAndTrs(tds, trs) {
    for (let i = 0; i < tds.length; i++) {
        tds[i].setAttribute('name', i + 1);
    }

    for (let i = 0; i < trs.length; i++) {
        trs[i].dataset.num = i;
        for (let k = 0; k < trs[i].children.length; k++) {
            trs[i].children[k].dataset.num = k;
        }
    }
};






for(let i = 0; i < tds_server.length; i++){
    tds_server[i].addEventListener('click', function(){
        console.log('dsfsdfds');
    });
}