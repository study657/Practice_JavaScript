let game = document.querySelector('.game');
let ship_4 = document.querySelector('.ship_4');
let trs = document.querySelectorAll('tr');
let tds = game.querySelectorAll('td');

for (let i = 0; i < tds.length; i++) {
    tds[i].id = i + 1;
}


function shipPlacement(ship) {
    let top_coordinates = ['0', '40px', '80px', '120px', '160px', '200px', '240px', '280px', '320px', '360px'];
    let left_coordinates = ['0', '40px', '80px', '120px', '160px', '200px', '240px'];

    if (randonDirection() == 'horizontal') {
        ship.style.display = 'block';

        let topCurrentCoordinate = top_coordinates[getRandomIntInclusive(0, top_coordinates.length - 1)];
        let leftCurrentCoordinate = left_coordinates[getRandomIntInclusive(0, left_coordinates.length - 1)];

        ship.style.top = topCurrentCoordinate;
        ship.style.left = leftCurrentCoordinate;




        let shipOnCells = getCellsOnShip(topCurrentCoordinate, leftCurrentCoordinate, 4); // Массив из ячеек где стоит корабль
        let cellsAboutShip = getCellsAboutShip(shipOnCells, 4);


        if (checkOnAvailabilityShipOnCell(shipOnCells)) {
            let check = cellsAboutShip.some(function(item){
                if(item.classList.contains('parking')){
                    return true;
                }else{
                    return false;
                }
            });

            if(!check){
                for(let i = 0; i < shipOnCells.length; i++){
                    shipOnCells[i].className = 'parking';
                }
            }else{
                ship.style.display = 'none';
                cellsAboutShip.length = 0;
                shipPlacement(ship_4);
            }

        } else {
            ship.style.display = 'none';
            cellsAboutShip.length = 0;
            shipPlacement(ship_4);
        }
    }else{

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

function checkOnAvailabilityShipOnCell(shipOnCells) { // Проверка на наличие корабля куда встал новый корабль
    return check = shipOnCells.some(function (item) {
        if (item.classList.contains('parking')) {
            return false;
        } else {
            return true;
        }
    });
};

function getCellsAboutShip(shipOnCells, ship) {
    if (ship == 4) {
        let cellsAboutShip = [];
        let data_numFirstCell = parseFloat(shipOnCells[0].id) - 1;

        let test0 = document.getElementById(String(data_numFirstCell));
        let test1 = document.getElementById(String(parseFloat(data_numFirstCell) + 10));
        let test2 = document.getElementById(String(parseFloat(data_numFirstCell) + 11));
        let test3 = document.getElementById(String(parseFloat(data_numFirstCell) - 10));
        let test4 = document.getElementById(String(parseFloat(data_numFirstCell) - 9));

        if (test0 !== null) {
            cellsAboutShip.push(test0);
        } 
        if (test1 !== null) {
            cellsAboutShip.push(test1);
        } 
        if (test2 !== null) {
            cellsAboutShip.push(test2);
        }
        if (test3 !== null) {
            cellsAboutShip.push(test3);
        }
        if (test4 !== null) {
            cellsAboutShip.push(test4);
        }


        let data_numLastCell = parseFloat(shipOnCells[shipOnCells.length - 1].id) + 1;
        
        let test5 = document.getElementById(String(data_numLastCell));
        let test6 = document.getElementById(String(parseFloat(data_numLastCell) + 9));
        let test7 = document.getElementById(String(parseFloat(data_numLastCell) + 10));
        let test8 = document.getElementById(String(parseFloat(data_numLastCell) - 10));
        let test9 = document.getElementById(String(parseFloat(data_numLastCell) - 11));

        if (test5 !== null) {
            cellsAboutShip.push(test5);
        } 
        if (test6 !== null) {
            cellsAboutShip.push(test6);
        } 
        if (test7 !== null) {
            cellsAboutShip.push(test7);
        }
        if (test8 !== null) {
            cellsAboutShip.push(test8);
        }
        if (test9 !== null) {
            cellsAboutShip.push(test9);
        }

        let data_numFirstCenterCell = parseFloat(shipOnCells[1].id);
        
        let test10 = document.getElementById(String(parseFloat(data_numFirstCenterCell) - 10));
        let test11 = document.getElementById(String(parseFloat(data_numFirstCenterCell) + 10));

        if (test10 !== null) {
            cellsAboutShip.push(test10);
        } 
        if (test11 !== null) {
            cellsAboutShip.push(test11);
        }


        let data_numSecondCenterCell = parseFloat(shipOnCells[2].id);
        
        let test13 = document.getElementById(String(parseFloat(data_numSecondCenterCell) - 10));
        let test14 = document.getElementById(String(parseFloat(data_numSecondCenterCell) + 10));

        if (test13 !== null) {
            cellsAboutShip.push(test13);
        } 
        if (test14 !== null) {
            cellsAboutShip.push(test14);
        }

        return cellsAboutShip;
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














shipPlacement(ship_4);