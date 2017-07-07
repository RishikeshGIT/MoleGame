$(init);

var theGameVariables = {
    'levelSelected' : 0,
    'gridDimension' : 0,
    'randomArray' : 0,
    'trialCounter' : 0,
    'startTime' : 0,
    'timeToPlayInMillis' : 30
};

function init() {
    $("#btnSelectLevel").on("click", onBtnSelectClick);
    $("#playStartbtn").on("click", startGame);
    $(document.body).on("click", "td", takeActionUponClick);
    $("#resetbtn").on("click", cleanGrid);
}

function onBtnSelectClick() {
    theGameVariables.levelSelected = selectGameLevel();
    drawCanvas();
}

function selectGameLevel() {
    return $("#gameLevel").val();
}

function drawCanvas() {
    switch (theGameVariables.levelSelected) {
        case "Level01":
            theGameVariables.gridDimension = 4;
            break;
        case "Level02":
            theGameVariables.gridDimension = 5;
            break;
        case "Level03":
            theGameVariables.gridDimension = 6;
            break;
        case "Advance":
            theGameVariables.gridDimension = parseInt(getDimensionsFromUser(), 10);
            break;
        default:
            console.log("Enjoy! ");
    }
    constructGridAndShow();
}

function getDimensionsFromUser() {
    var cellCount;
    do {
        cellCount = prompt("Enter the grid dimension would you like to play with (e.g. 2x2, 3x3, 4,4, 5x5 etc.)");
        var cellNum1 = parseInt((cellCount.split('x'))[0], 10);
        var cellNum2 = parseInt((cellCount.split('x'))[1], 10);
        cellCount = cellNum1 * cellNum2;
        if (cellNum1 !== cellNum2) {
            alert("enter proper grid dimensions!");
        }
    } while(Math.sqrt(cellCount) === NaN);
    return cellNum1;
}


function constructGridAndShow() {
    var myTableDiv = document.getElementById("gamePanel");
    document.getElementById("gamePanel").innerHTML = "";
            
    var tableTemplate = document.createElement('table');
    tableTemplate.border='1';
    tableTemplate.setAttribute("id", "gameTable");

    var tableBodyTemplate = document.createElement('tbody');
    tableTemplate.appendChild(tableBodyTemplate);

    for (var i=0; i<theGameVariables.gridDimension; i++){
        var it = i*theGameVariables.gridDimension + 1;
        var tr = document.createElement('tr');
        tableBodyTemplate.appendChild(tr);
        for (var j=0; j<theGameVariables.gridDimension; j++){
            var td = document.createElement('td');
            td.setAttribute('id', 'td'+(it+j));
            td.width='75';
            td.height='75';
            td.appendChild(document.createTextNode(""));
            td.setAttribute('class', 'untouchedTd');
            tr.appendChild(td);
        }
    }
    myTableDiv.appendChild(tableTemplate);
    makeActionButtonsVisible();
    theGameVariables.randomArray = generateRandomArray(theGameVariables.gridDimension*theGameVariables.gridDimension);
}
        
function makeActionButtonsVisible() {
    $("#playStartbtn").attr('style', 'display: inline-block');
    $("#resetbtn").attr('style', 'display:inline-block');
}

function cleanGrid() {
    $('#gameTable tr td').each(function(){
            $(this).attr('class', 'untouchedTd');
    });
    theGameVariables.randomArray = generateRandomArray(theGameVariables.gridDimension*theGameVariables.gridDimension);
}
        
function startGame() {
    theGameVariables.trialCounter++;
    theGameVariables.startTime = new Date().getTime();
    if (theGameVariables.trialCounter <= 3) {
        console.log("Game Started!");
        //Start coloring cells randomnly.
        var gridTable = document.getElementById('gameTable');
        colorGridCell(3);
    } else {
        console.log("You've reached the trial limit");
        alert("You've lost your 3 trials... Good Luck for the next time....");
    }
}
        
function takeActionUponClick() {
    var curTime = new Date().getTime();
    if (((curTime - theGameVariables.startTime) / 1000) < theGameVariables.timeToPlayInMillis) {
        if(this.getAttribute('class') === 'unClickedTd') {
            this.setAttribute('class', 'clickedTd');
        }
        var x = Math.floor((Math.random() * 3) + 1);
        if((theGameVariables.randomArray.length === 0) && (isGridClicked())) {
            alert("Winner....!!!! You won!");
        } else {
            theGameVariables.randomArray.length >= x ? colorGridCell(x) : colorGridCell(1);
        }
    } else {
        alert("Time's over.... !!! Try again");
    }
}
        
function colorGridCell(cellCount) {
    if (theGameVariables.randomArray.length >= cellCount) {
        for (var i = 0; i < cellCount; i++) {
            var id = ('td'+theGameVariables.randomArray.pop()).toString();
            document.getElementById(id).setAttribute('class', 'unClickedTd');
        }
    } else if (theGameVariables.randomArray.length === 0) {
        if(isGridClicked()) {
            alert("Winner....!!!! You won!");
        }
    }  
}

function isGridClicked() {
    for (var i = 1; i <= theGameVariables.gridDimension*theGameVariables.gridDimension; i++) {
        if(document.getElementById('td'+i).getAttribute('class') === 'unClickedTd') {
            return false;
        }
    }
    return true;
}
        
function generateRandomArray(num) {
    theGameVariables.randomArray = new Array();
    while(theGameVariables.randomArray.length < num) {
        var n = Math.floor((Math.random() * num) + 1);
        if (theGameVariables.randomArray.indexOf(n) === -1)
            theGameVariables.randomArray.push(n);
    }
    return theGameVariables.randomArray;
}

function sleep(milliseconds) {
      var start = new Date().getTime();
      for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds){
          break;
        }
      }
}