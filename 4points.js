// We need to use jQuery for the following:

var player1 = prompt("Player One: Enter Your Name , you will be Blue");
var player1Color = 'rgb(86, 151, 255)';

var player2 = prompt("Player Two: Enter Your Name, you will be Red");
var player2Color = 'rgb(237, 45, 73)';

// player2.css('text-color', 'yellow');

var game_on = true;
var table = $('table tr');
function reportwin(rownum, colnum) {
    console.log("You won the game starting at this row and column");
    console.log(rownum);
    console.log(colnum);
}

function change(rowi, coli, color) {
    return table.eq(rowi).find('td').eq(coli).find('button').css('background-color', color);

}

function retcol(rowi, coli) {
    return table.eq(rowi).find('td').eq(coli).find('button').css('background-color');

}

function checkbottom(coli) {
    var colorrepoert = retcol(5, coli);
    for (var row = 5; row > -1; row--) {
        colorrepoert = retcol(row, coli);
        if (colorrepoert === 'rgb(128, 128, 128)') {
            return row
        }
    }
}
function colormatchcheck(one, two, three, four) {
    return (one === two && one === three && one === four && one !== 'rgb(128, 128, 128)' && one !== undefined)
}

function horizontalwincheck() {
    for (var row = 0; row < 6; row++)
        for (var col = 0; col < 4; col++) {
            if (colormatchcheck(retcol(row, col), retcol(row, col + 1), retcol(row, col + 2), retcol(row, col + 3))) {
                console.log('Horizontal');
                reportwin(row, col);
                return true;
            }
            else
                continue;
        }
}

// function verticalwincheck() {
//     for (var row = 0; row < 6; row++)
//         for (var col = 0; col < 4; col++) {
//             if (colormatchcheck(retcol(row, col), retcol(row + 1, col), retcol(row + 2, col), retcol(row + 3, col))) {
//                 console.log('Horizontal');
//                 reportwin(row, col);
//                 return true;
//             }
//             else
//                 continue;
//         }
// }
function verticalwincheck() {
    for (var col = 0; col < 7; col++)
        for (var row = 0; row < 3; row++) {
            if (colormatchcheck(retcol(row, col), retcol(row + 1, col), retcol(row + 2, col), retcol(row + 3, col))) {
                console.log('Vertical');
                reportwin(row, col);
                return true;
            }
            else
                continue;
        }
}
function diagonalwincheck() {
    for (var col = 0; col < 5; col++)
        for (var row = 0; row < 7; row++) {
            if (colormatchcheck(retcol(row, col), retcol(row + 1, col + 1), retcol(row + 2, col + 2), retcol(row + 3, col + 3))) {
                console.log('Diagonal');
                reportwin(row, col);
                return true;
            }
            else if (colormatchcheck(retcol(row, col), retcol(row - 1, col + 1), retcol(row - 2, col + 2), retcol(row - 3, col + 3))) {
                console.log('Diagonal');
                reportwin(row, col);
                return true;
            }
            else
                continue;
        }
}

var curplayer = 1;
var currentName = player1;
var currentcolor = player1Color;
$('h3').text(player1 + " it is your turn, pick a column to drop in!")

$('.board button').on('click', function () {
    var col = $(this).closest('td').index();
    var bottomavail = checkbottom(col);
    change(bottomavail, col, currentcolor);
    if (horizontalwincheck() || verticalwincheck() || diagonalwincheck()) {
        $('h1').text(currentName + ", you have won!!!  Reresh to play again.");
        $('h3').fadeOut('fast');
        $('h2').fadeOut('fast');
    }
    curplayer = curplayer * -1;
    if (curplayer === 1) {
        currentName = player1;
        $('h3').text(currentName + " its your turn.")
        currentcolor = player1Color;
    }
    else {
        currentName = player2;
        $('h3').text(currentName + " its your turn.")
        currentcolor = player2Color;
    }
})
