function solvePuzzle(pieces) {
    console.log(pieces[0]);
    let result = [];




    let firstLine = [];

    let testedgeTypeId = pieces[0]['edges']['bottom']['edgeTypeId'];
    let testType = pieces[0]['edges']['bottom']['type'];

    let test = pieces.filter(function (elem) {
        if (elem['edges']['top'] !== null) {
            if (elem['edges']['top']['edgeTypeId'] == testedgeTypeId && elem['edges']['top']['type'] !== testType) {
                return true;
            } else {
                return false;
            }
        }
    });

    firstLine.push(test[0]);

    for(let i = 0; i < 8; i++){
        let testedgeTypeId1 = firstLine[i]['edges']['bottom']['edgeTypeId'];
        let testType1 = firstLine[i]['edges']['bottom']['type'];
    
        let test1 = pieces.filter(function (elem) {
            if (elem['edges']['top'] !== null) {
                if (elem['edges']['top']['type'] !== testType1 && elem['edges']['top']['edgeTypeId'] == testedgeTypeId1) {
                    return true;
                } else {
                    return false;
                }
            }
        });

        firstLine.push(test1[0]);
    }
    firstLine.unshift(pieces[0]);
    console.log(firstLine);


    let twoLine = [];

    let testedgeTypeId1 = firstLine[0]['edges']['left']['edgeTypeId'];
    let testType1 = firstLine[0]['edges']['left']['type'];

    let test1 = pieces.filter(function (elem) {
        if (elem['edges']['right'] !== null) {
            if (elem['edges']['right']['edgeTypeId'] == testedgeTypeId1 && elem['edges']['right']['type'] !== testType1) {
                return true;
            } else {
                return false;
            }
        }
    });

    twoLine.push(test1[0]);


    for(let i = 0; i < 9; i++){
        let testedgeTypeId1 = twoLine[i]['edges']['bottom']['edgeTypeId'];
        let testType1 = twoLine[i]['edges']['bottom']['type'];
    
        let test1 = pieces.filter(function (elem) {
            if (elem['edges']['top'] !== null) {
                if (elem['edges']['top']['type'] !== testType1 && elem['edges']['top']['edgeTypeId'] == testedgeTypeId1) {
                    return true;
                } else {
                    return false;
                }
            }
        });

        twoLine.push(test1[0]);
    }





    let threeLine = [];

    let testedgeTypeId2 = twoLine[0]['edges']['left']['edgeTypeId'];
    let testType2 = twoLine[0]['edges']['left']['type'];

    let test2 = pieces.filter(function (elem) {
        if (elem['edges']['right'] !== null) {
            if (elem['edges']['right']['edgeTypeId'] == testedgeTypeId2 && elem['edges']['right']['type'] !== testType2) {
                return true;
            } else {
                return false;
            }
        }
    });

    threeLine.push(test2[0]);


    for(let i = 0; i < 9; i++){
        let testedgeTypeId1 = threeLine[i]['edges']['bottom']['edgeTypeId'];
        let testType1 = threeLine[i]['edges']['bottom']['type'];
    
        let test1 = pieces.filter(function (elem) {
            if (elem['edges']['top'] !== null) {
                if (elem['edges']['top']['type'] !== testType1 && elem['edges']['top']['edgeTypeId'] == testedgeTypeId1) {
                    return true;
                } else {
                    return false;
                }
            }
        });

        threeLine.push(test1[0]);
    }






    let fourLine = [];

    let testedgeTypeId3 = threeLine[0]['edges']['left']['edgeTypeId'];
    let testType3 = threeLine[0]['edges']['left']['type'];

    let test3 = pieces.filter(function (elem) {
        if (elem['edges']['right'] !== null) {
            if (elem['edges']['right']['edgeTypeId'] == testedgeTypeId3 && elem['edges']['right']['type'] !== testType3) {
                return true;
            } else {
                return false;
            }
        }
    });

    fourLine.push(test3[0]);


    for(let i = 0; i < 9; i++){
        let testedgeTypeId1 = fourLine[i]['edges']['bottom']['edgeTypeId'];
        let testType1 = fourLine[i]['edges']['bottom']['type'];
    
        let test1 = pieces.filter(function (elem) {
            if (elem['edges']['top'] !== null) {
                if (elem['edges']['top']['type'] !== testType1 && elem['edges']['top']['edgeTypeId'] == testedgeTypeId1) {
                    return true;
                } else {
                    return false;
                }
            }
        });

        fourLine.push(test1[0]);
    }








    let fiveLine = [];

    let testedgeTypeId4 = fourLine[0]['edges']['left']['edgeTypeId'];
    let testType4 = fourLine[0]['edges']['left']['type'];

    let test4 = pieces.filter(function (elem) {
        if (elem['edges']['right'] !== null) {
            if (elem['edges']['right']['edgeTypeId'] == testedgeTypeId4 && elem['edges']['right']['type'] !== testType4) {
                return true;
            } else {
                return false;
            }
        }
    });

    fiveLine.push(test4[0]);


    for(let i = 0; i < 9; i++){
        let testedgeTypeId1 = fiveLine[i]['edges']['bottom']['edgeTypeId'];
        let testType1 = fiveLine[i]['edges']['bottom']['type'];
    
        let test1 = pieces.filter(function (elem) {
            if (elem['edges']['top'] !== null) {
                if (elem['edges']['top']['type'] !== testType1 && elem['edges']['top']['edgeTypeId'] == testedgeTypeId1) {
                    return true;
                } else {
                    return false;
                }
            }
        });

        fiveLine.push(test1[0]);
    }




    let sixLine = [];

    let testedgeTypeId5 = fiveLine[0]['edges']['left']['edgeTypeId'];
    let testType5 = fiveLine[0]['edges']['left']['type'];

    let test5 = pieces.filter(function (elem) {
        if (elem['edges']['right'] !== null) {
            if (elem['edges']['right']['edgeTypeId'] == testedgeTypeId5 && elem['edges']['right']['type'] !== testType5) {
                return true;
            } else {
                return false;
            }
        }
    });

    sixLine.push(test5[0]);


    for(let i = 0; i < 9; i++){
        let testedgeTypeId1 = sixLine[i]['edges']['bottom']['edgeTypeId'];
        let testType1 = sixLine[i]['edges']['bottom']['type'];
    
        let test1 = pieces.filter(function (elem) {
            if (elem['edges']['top'] !== null) {
                if (elem['edges']['top']['type'] !== testType1 && elem['edges']['top']['edgeTypeId'] == testedgeTypeId1) {
                    return true;
                } else {
                    return false;
                }
            }
        });

        sixLine.push(test1[0]);
    }






    let sevenLine = [];

    let testedgeTypeId6 = sixLine[0]['edges']['left']['edgeTypeId'];
    let testType6 = sixLine[0]['edges']['left']['type'];

    let test6 = pieces.filter(function (elem) {
        if (elem['edges']['right'] !== null) {
            if (elem['edges']['right']['edgeTypeId'] == testedgeTypeId6 && elem['edges']['right']['type'] !== testType6) {
                return true;
            } else {
                return false;
            }
        }
    });

    sevenLine.push(test6[0]);


    for(let i = 0; i < 9; i++){
        let testedgeTypeId1 = sevenLine[i]['edges']['bottom']['edgeTypeId'];
        let testType1 = sevenLine[i]['edges']['bottom']['type'];
    
        let test1 = pieces.filter(function (elem) {
            if (elem['edges']['top'] !== null) {
                if (elem['edges']['top']['type'] !== testType1 && elem['edges']['top']['edgeTypeId'] == testedgeTypeId1) {
                    return true;
                } else {
                    return false;
                }
            }
        });

        sevenLine.push(test1[0]);
    }








    let eigthLine = [];

    let testedgeTypeId7 = sevenLine[0]['edges']['left']['edgeTypeId'];
    let testType7 = sevenLine[0]['edges']['left']['type'];

    let test7 = pieces.filter(function (elem) {
        if (elem['edges']['right'] !== null) {
            if (elem['edges']['right']['edgeTypeId'] == testedgeTypeId7 && elem['edges']['right']['type'] !== testType7) {
                return true;
            } else {
                return false;
            }
        }
    });

    eigthLine.push(test7[0]);


    for(let i = 0; i < 9; i++){
        let testedgeTypeId1 = eigthLine[i]['edges']['bottom']['edgeTypeId'];
        let testType1 = eigthLine[i]['edges']['bottom']['type'];
    
        let test1 = pieces.filter(function (elem) {
            if (elem['edges']['top'] !== null) {
                if (elem['edges']['top']['type'] !== testType1 && elem['edges']['top']['edgeTypeId'] == testedgeTypeId1) {
                    return true;
                } else {
                    return false;
                }
            }
        });

        eigthLine.push(test1[0]);
    }








    let nineLine = [];

    let testedgeTypeId8 = eigthLine[0]['edges']['left']['edgeTypeId'];
    let testType8 = eigthLine[0]['edges']['left']['type'];

    let test8 = pieces.filter(function (elem) {
        if (elem['edges']['right'] !== null) {
            if (elem['edges']['right']['edgeTypeId'] == testedgeTypeId8 && elem['edges']['right']['type'] !== testType8) {
                return true;
            } else {
                return false;
            }
        }
    });

    nineLine.push(test8[0]);


    for(let i = 0; i < 9; i++){
        let testedgeTypeId1 = nineLine[i]['edges']['bottom']['edgeTypeId'];
        let testType1 = nineLine[i]['edges']['bottom']['type'];
    
        let test1 = pieces.filter(function (elem) {
            if (elem['edges']['top'] !== null) {
                if (elem['edges']['top']['type'] !== testType1 && elem['edges']['top']['edgeTypeId'] == testedgeTypeId1) {
                    return true;
                } else {
                    return false;
                }
            }
        });

        nineLine.push(test1[0]);
    }






    
    let tenLine = [];

    let testedgeTypeId9 = nineLine[0]['edges']['left']['edgeTypeId'];
    let testType9 = nineLine[0]['edges']['left']['type'];

    let test9 = pieces.filter(function (elem) {
        if (elem['edges']['right'] !== null) {
            if (elem['edges']['right']['edgeTypeId'] == testedgeTypeId9 && elem['edges']['right']['type'] !== testType9) {
                return true;
            } else {
                return false;
            }
        }
    });

    tenLine.push(test9[0]);


    for(let i = 0; i < 9; i++){
        let testedgeTypeId1 = tenLine[i]['edges']['bottom']['edgeTypeId'];
        let testType1 = tenLine[i]['edges']['bottom']['type'];
    
        let test1 = pieces.filter(function (elem) {
            if (elem['edges']['top'] !== null) {
                if (elem['edges']['top']['type'] !== testType1 && elem['edges']['top']['edgeTypeId'] == testedgeTypeId1) {
                    return true;
                } else {
                    return false;
                }
            }
        });

        tenLine.push(test1[0]);
    }


    // let testedgeTypeId = pieces[0]['edges']['bottom']['edgeTypeId'];
    // let testType = pieces[0]['edges']['bottom']['type'];

    // let test = pieces.filter(function (elem) {
    //     if (elem['edges']['top'] !== null) {
    //         if (elem['edges']['top']['type'] !== testType && elem['edges']['top']['edgeTypeId'] == testedgeTypeId) {
    //             return true;
    //         } else {
    //             return false;
    //         }
    //     }
    // });
    // console.log(test[0]);

    // let testedgeTypeId1 = test[0]['edges']['bottom']['edgeTypeId'];
    // let testType1 = test[0]['edges']['bottom']['type'];

    // let test1 = pieces.filter(function (elem) {
    //     if (elem['edges']['top'] !== null) {
    //         if (elem['edges']['top']['type'] !== testType1 && elem['edges']['top']['edgeTypeId'] == testedgeTypeId1) {
    //             return true;
    //         } else {
    //             return false;
    //         }
    //     }
    // });
    // console.log(test1[0]);

    // let testedgeTypeId2 = test1[0]['edges']['bottom']['edgeTypeId'];
    // let testType2 = test1[0]['edges']['bottom']['type'];

    // let test2 = pieces.filter(function (elem) {
    //     if (elem['edges']['top'] !== null) {
    //         if (elem['edges']['top']['type'] !== testType2 && elem['edges']['top']['edgeTypeId'] == testedgeTypeId2) {
    //             return true;
    //         } else {
    //             return false;
    //         }
    //     }
    // });
    // console.log(test2[0]);

    // let testedgeTypeId3 = test2[0]['edges']['bottom']['edgeTypeId'];
    // let testType3 = test2[0]['edges']['bottom']['type'];

    // let test3 = pieces.filter(function (elem) {
    //     if (elem['edges']['top'] !== null) {
    //         if (elem['edges']['top']['type'] !== testType3 && elem['edges']['top']['edgeTypeId'] == testedgeTypeId3) {
    //             return true;
    //         } else {
    //             return false;
    //         }
    //     }
    // });
    // console.log(test3[0]);

    for(let i = 0; i < firstLine.length; i++){
        result.push(firstLine[i].id);
    }

    for(let i = 0; i < twoLine.length; i++){
        result.push(twoLine[i].id);
    }

    for(let i = 0; i < threeLine.length; i++){
        result.push(threeLine[i].id);
    }
    
    for(let i = 0; i < fourLine.length; i++){
        result.push(fourLine[i].id);
    }

    for(let i = 0; i < fiveLine.length; i++){
        result.push(fiveLine[i].id);
    }

    for(let i = 0; i < sixLine.length; i++){
        result.push(sixLine[i].id);
    }

    for(let i = 0; i < sevenLine.length; i++){
        result.push(sevenLine[i].id);
    }

    for(let i = 0; i < eigthLine.length; i++){
        result.push(eigthLine[i].id);
    }

    for(let i = 0; i < nineLine.length; i++){
        result.push(nineLine[i].id);
    }

    for(let i = 0; i < tenLine.length; i++){
        result.push(tenLine[i].id);
    }

    return result;
}

// Не удаляйте эту строку
window.solvePuzzle = solvePuzzle;