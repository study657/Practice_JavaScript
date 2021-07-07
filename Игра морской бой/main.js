let game = document.querySelector('.game');
let ship_4_0 = document.querySelector('.ship_4_0');
let ship_4_1 = document.querySelector('.ship_4_1');
let trs = document.querySelectorAll('tr');
let tds = game.querySelectorAll('td');

for (let i = 0; i < tds.length; i++) {
    tds[i].id = i + 1;
}

for (let i = 0; i < trs.length; i++) {
    trs[i].dataset.num = i;
    for (let k = 0; k < trs[i].children.length; k++) {
        trs[i].children[k].dataset.num = k;
    }
}


function shipPlacement(ship) {
    if (randonDirection() == 'horizontal') {
        let top_coordinates = ['0', '40px', '80px', '120px', '160px', '200px', '240px', '280px', '320px', '360px'];
        let left_coordinates = ['0', '40px', '80px', '120px', '160px', '200px', '240px'];

        let topCurrentCoordinate = top_coordinates[getRandomIntInclusive(0, top_coordinates.length - 1)];
        let leftCurrentCoordinate = left_coordinates[getRandomIntInclusive(0, left_coordinates.length - 1)];

        ship.style.top = topCurrentCoordinate;
        ship.style.left = leftCurrentCoordinate;




        let shipOnCells = getCellsOnShip(topCurrentCoordinate, leftCurrentCoordinate, 4); // Массив из ячеек где стоит корабль

        if (!checkOnAvailabilityShipOnCell(shipOnCells) && !checkCellsAboutShip(shipOnCells, 4, 'horizontal')) {
            ship.style.display = 'block';

            for (let i = 0; i < shipOnCells.length; i++) {
                shipOnCells[i].className = 'parking';
            }
        } else {
            ship.style.display = 'none';
            shipPlacement(ship);
        }
    } else {
        let top_coordinates = ['0', '40px', '80px', '120px', '160px', '200px', '240px'];
        let left_coordinates = ['40px', '80px', '120px', '160px', '200px', '240px', '280px', '320px', '360px', '400px'];

        let topCurrentCoordinate = top_coordinates[getRandomIntInclusive(0, top_coordinates.length - 1)];
        let leftCurrentCoordinate = left_coordinates[getRandomIntInclusive(0, left_coordinates.length - 1)];

        ship.style.top = topCurrentCoordinate;
        ship.style.left = leftCurrentCoordinate;

        let shipOnCells = getCellsOnShipVertical(topCurrentCoordinate, leftCurrentCoordinate, 4); // Массив из ячеек где стоит корабль

        if (!checkOnAvailabilityShipOnCell(shipOnCells) && !checkCellsAboutShip(shipOnCells, 4, 'vertical')) {
            ship.style.display = 'block';
            ship.style.transform = 'rotate(90deg)';

            for (let i = 0; i < shipOnCells.length; i++) {
                shipOnCells[i].className = 'parking';
            }
        } else {
            ship.style.display = 'none';
            shipPlacement(ship);
        }
    }
};


function getCellsOnShip(top, left, ship) { // функция которая получает все колонки в виде массива, куда встает корабль. Где ship - это разряд корабля
    if (ship == 4) {
        let allCels = [];
        let topStartCell = parseFloat(top) / 40;
        let leftStartCell = parseFloat(left) / 40;

        for (let i = 0; i <= 3; i++) {
            let cell = trs[topStartCell].querySelectorAll('td')[leftStartCell + i];
            allCels.push(cell);
        }

        return allCels;
    }
};

function getCellsOnShipVertical(top, left, ship) { // функция которая получает все колонки в виде массива, куда встает корабль. Где ship - это разряд корабля
    if (ship == 4) {
        let allCels = [];
        let topStartCell = parseFloat(top) / 40;
        let leftStartCell = (parseFloat(left) / 40) - 1;

        let startCell = trs[topStartCell].querySelectorAll('td')[leftStartCell].id;

        for (let i = 0; i <= 3; i++) {
            let cell = document.getElementById(String(Number(startCell) + (i * 10)));
            allCels.push(cell);
        }

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

function checkCellsAboutShip(shipOnCells, ship, orientation) { // Функция, которая проверяет все ячейки близлежащего корабля и выводит эти ячейки нам в виде массима
    if (ship == 4 && orientation == 'horizontal') {
        let cellsAboutShip = [];

        let data_numFirstCell = parseFloat(shipOnCells[0].id);

        let lineOnShip = document.getElementById(String(data_numFirstCell)).parentElement;
        let leftCallFromShip = lineOnShip.children[document.getElementById(data_numFirstCell).dataset.num - 1];
        let rigthCallFromShip = lineOnShip.children[Number(document.getElementById(data_numFirstCell).dataset.num) + 4];

        if (leftCallFromShip !== undefined) {
            cellsAboutShip.push(leftCallFromShip);
        }

        if (rigthCallFromShip !== undefined) {
            cellsAboutShip.push(rigthCallFromShip);
        }

        let lineUpAbotShip = document.getElementById(String(data_numFirstCell)).parentElement.previousElementSibling;
        if (lineUpAbotShip !== null) {
            let firstCheckCallOnLine = document.getElementById(String(data_numFirstCell - 10));
            let numberCall = firstCheckCallOnLine.dataset.num - 1;

            for (let i = 0; i <= 5; i++) {
                if (lineUpAbotShip.children[numberCall + i] !== undefined) {
                    cellsAboutShip.push(lineUpAbotShip.children[numberCall + i]);
                }
            }
        }


        let lineDownAbotShip = document.getElementById(String(data_numFirstCell)).parentElement.nextElementSibling;
        if (lineDownAbotShip !== null) {
            let firstCheckCallOnLine = document.getElementById(String(data_numFirstCell + 10));

            let numberCall = firstCheckCallOnLine.dataset.num - 1;

            for (let i = 0; i <= 5; i++) {
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

    if (ship == 4 && orientation == 'vertical') {
        let cellsAboutShip = [];
        let data_numFirstCell = parseFloat(shipOnCells[0].id);

        let numberRowWhereShip = Number(document.getElementById(String(data_numFirstCell)).parentElement.dataset.num);
        let numberUpRowWhereShip = Number(trs[numberRowWhereShip - 1].dataset.num);

        let numberCallBehindShip = Number(document.getElementById(String(data_numFirstCell)).dataset.num) - 1;

        for (let i = 0; i <= 5; i++) {
            if (trs[numberUpRowWhereShip + i] !== undefined) {
                if (trs[numberUpRowWhereShip + i].children[numberCallBehindShip] !== undefined) {
                    cellsAboutShip.push(trs[numberUpRowWhereShip + i].children[numberCallBehindShip]);
                }
            }
        }

        let numberCallFrontShip = Number(document.getElementById(String(data_numFirstCell)).dataset.num) + 1;

        for (let i = 0; i <= 5; i++) {
            if (trs[numberUpRowWhereShip + i] !== undefined) {
                if (trs[numberUpRowWhereShip + i].children[numberCallFrontShip] !== undefined) {
                    cellsAboutShip.push(trs[numberUpRowWhereShip + i].children[numberCallFrontShip]);
                }
            }
        }

        let rowUpShip = trs[numberRowWhereShip - 1];
        let rowDownShip = trs[numberRowWhereShip + 4];
        let numberCallWhereIsShip = document.getElementById(String(data_numFirstCell)).dataset.num;

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

function randonDirection() {
    if (getRandomIntInclusive(0, 1) == 0) {
        return 'horizontal';
    } else {
        return 'vertical';
    }
};

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
};














shipPlacement(ship_4_0);
shipPlacement(ship_4_1);