var counter = 0;
var cells = document.querySelectorAll('#field td');
var header = document.getElementById('header');

function isVictory() {
    var combinations = [];

    // горизонталь
    for (var i = 0; i < 20; i++) {
        for (var j = 0; j <= 15; j++) {
            combinations.push([i * 20 + j, i * 20 + j + 1, i * 20 + j + 2, i * 20 + j + 3, i * 20 + j + 4]);
        }
    }

    // вертикаль
    for (var i = 0; i < 20; i++) {
        for (var j = 0; j <= 15; j++) {
            combinations.push([j * 20 + i, (j + 1) * 20 + i, (j + 2) * 20 + i, (j + 3) * 20 + i, (j + 4) * 20 + i]);
        }
    }

    // диагональ с левого верх угла до правого ниж
    for (var i = 0; i <= 15; i++) {
        for (var j = 0; j <= 15; j++) {
            combinations.push([i * 20 + j, (i + 1) * 20 + j + 1, (i + 2) * 20 + j + 2, (i + 3) * 20 + j + 3, (i + 4) * 20 + j + 4]);
        }
    }

    // диагональ с правого верх угла до левого ниж
    for (var i = 0; i <= 15; i++) {
        for (var j = 19; j >= 4; j--) {
            combinations.push([i * 20 + j, (i + 1) * 20 + j - 1, (i + 2) * 20 + j - 2, (i + 3) * 20 + j - 3, (i + 4) * 20 + j - 4]);
        }
    }

    for (var c of combinations) {
        if (
            cells[c[0]].innerHTML == cells[c[1]].innerHTML &&
            cells[c[1]].innerHTML == cells[c[2]].innerHTML &&
            cells[c[2]].innerHTML == cells[c[3]].innerHTML &&
            cells[c[3]].innerHTML == cells[c[4]].innerHTML &&
            cells[c[0]].innerHTML != ''

        ) 
        {
            return true;
        }
    }
    return false;
}


function tap(event) {
    if (counter % 2 == 0){
        event.target.innerHTML = '<img src="close.png" width=23>';
    }
    else{
        event.target.innerHTML = '<img src="circle.png" width=23>';
    }
    if (isVictory()) {
        for (var cell of cells) {
            cell.removeEventListener('click', tap);
        }
        if (counter % 2 == 0) {
            header.innerText = 'Крестики победили!';
        }
        else{
            header.innerText = 'Нолики победили!';
        }
    }
    else if (counter == (20 * 20 - 1)) {
        header.innerText = 'Ничья!';
    }
    counter++;
    event.target.removeEventListener('click', tap);
}

function startGame() {
    header.innerText = 'Крестики-нолии';
    counter = 0;
    for (var cell of cells) {
        cell.innerHTML = '';
        cell.addEventListener('click', tap);
    }
}

startGame()