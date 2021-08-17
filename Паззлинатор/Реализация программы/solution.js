function solvePuzzle(pieces) {
    let testedgeTypeId = pieces[0]['edges']['left']['edgeTypeId'];
    let testType = pieces[0]['edges']['left']['type'];
    let arr = ['top', 'right', 'bottom', 'left'];
    let k = 0;

    let test = pieces.filter(function (elem) {
        // for(let i = 0; i < arr.length; i++){
            if (elem['edges'][arr[i]] !== null) {
                if (elem['edges'][arr[i]]['type'] !== testType && elem['edges'][arr[i]]['edgeTypeId'] == testedgeTypeId) {
                    return true;
                } else {
                    return false;
                }
            }
        // }
        // if(elem['edges']['right']['edgeTypeId'] == testedgeTypeId){
        //     return true;
        // }else{
        //     return false;
        // }
    });
    for(let i = 0; i < pieces.length; i++){
        console.log(pieces[i]);
        if(pieces[i].id == test[0].id){
            k = i;
        }
    }
    console.log(testedgeTypeId, testType, pieces[0].id, test[0], k);
    return [pieces[0].id, pieces[k].id];
}

// Не удаляйте эту строку
window.solvePuzzle = solvePuzzle;