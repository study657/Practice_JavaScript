function solvePuzzle(pieces) {
    let result = [];
    let puzzles = [];

    puzzles.push(pieces[0]);
    for (let i = 0; i < 9; i++) {
        let edgeTypeId = puzzles[i]['edges']['bottom']['edgeTypeId'];
        let type = puzzles[i]['edges']['bottom']['type'];

        let puzle = pieces.filter(function (elem) {
            if (elem['edges']['top'] !== null) {
                if (elem['edges']['top']['type'] !== type && elem['edges']['top']['edgeTypeId'] == edgeTypeId) {
                    return true;
                } else {
                    return false;
                }
            }
        });

        puzzles.push(puzle[0]);
    }

    
    for (let i = 0; i < 9; i++) {
        let iterationPuzzle = [];

        let edgeTypeId = puzzles[i * 10]['edges']['left']['edgeTypeId'];
        let type = puzzles[i * 10]['edges']['left']['type'];

        let puzle = pieces.filter(function (elem) {
            if (elem['edges']['right'] !== null) {
                if (elem['edges']['right']['edgeTypeId'] == edgeTypeId && elem['edges']['right']['type'] !== type) {
                    return true;
                } else {
                    return false;
                }
            }
        });

        iterationPuzzle.push(puzle[0]);


        for (let k = 0; k < 9; k++) {
            let edgeTypeId = iterationPuzzle[k]['edges']['bottom']['edgeTypeId'];
            let type = iterationPuzzle[k]['edges']['bottom']['type'];

            let puzle = pieces.filter(function (elem) {
                if (elem['edges']['top'] !== null) {
                    if (elem['edges']['top']['type'] !== type && elem['edges']['top']['edgeTypeId'] == edgeTypeId) {
                        return true;
                    } else {
                        return false;
                    }
                }
            });

            iterationPuzzle.push(puzle[0]);
        }

        for (let j = 0; j < iterationPuzzle.length; j++) {
            puzzles.push(iterationPuzzle[j]);
        }
    }

    for (let i = 0; i < puzzles.length; i++) {
        result.push(puzzles[i].id);
    }

    return result;
}

// Не удаляйте эту строку
window.solvePuzzle = solvePuzzle;