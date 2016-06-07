// we creat four 2d arrays/matrices one for each color , coding with zero and one if a cell is coloured in the respective color
// we create 4 arrays for each col containing the letters
var redMatrix=createMatrix(8);
var yellowMatrix=createMatrix(8);
var blueMatrix=createMatrix(8);
var greenMatrix=createMatrix(8);
var redArray=[];
var yellowArray=[];
var blueArray=[];
var greenArray=[];
var _currentColor='white';

function returnOldState(){
    var magicNumber=0;
    for ( i = 0; i < 8; i++) {
        
        for (j = 0; j < 8; j++) {
            
            currID=getDivId(i,j);
            if ( localStorage.redMatrix[magicNumber]==1){    _currentColor='red';
                                                             changeCellCol(currID);};
            if ( localStorage.yellowMatrix[magicNumber]==1){    _currentColor='yellow';
                                                             changeCellCol(currID);};
            if ( localStorage.blueMatrix[magicNumber]==1){    _currentColor='blue';
                                                             changeCellCol(currID);};
            if ( localStorage.greenMatrix[magicNumber]==1){    _currentColor='green';
                                                             changeCellCol(currID);};                                                                                                                                                  
            magicNumber+=2;
            
        }
    }
    _currentColor='white';
};



// creates rows with premade divs using the createOneDiv funtcion
function createRow (divClass,rowCounter, size ,celltext){
    var result=''
    for (var colCounter = 0; colCounter < size; colCounter++) {
        result=result+createOneDiv(divClass,celltext,rowCounter,colCounter);
        
    }
    
    return result;
}
function getDivId(row,col){
  return 'divIDRow' + row+'Col' +col ;
} 
function createOneDiv (  divClass , cellText, rowCounter , colCounter  ){
  var returnValue="<div onclick='changeCellCol("+ '"'+getDivId(rowCounter , colCounter)+'"' +")' id='" + getDivId(rowCounter , colCounter) + "' " + ((typeof divClass=='undefined') && (divClass==="")?"":"class='"+divClass+"'")+ ">" 
        + ((typeof cellText=='undefined')?'test':cellText)+"</div>";
  return returnValue; 
}
function createTable (divClass,size, celltext){
    var result='';
    for (var rowCounter = 0; rowCounter <size; rowCounter++) {
        result=result+"<div class='"+divClass+"'>"+createRow(divClass,rowCounter,size,celltext)+"</div>"
       
    }
    return result;
}

// changes the currently selected color
function applyNewColor(color){ 
    var foundElement = document.getElementById("swatch");
    if (typeof foundElement!="undefined")
        foundElement.style.backgroundColor = color; 
    _currentColor=color;
    return foundElement;
}
function getCurrentColor(){
    return _currentColor;
}

//removes the letter in the cell from the 'old' color array
function removeLetter (letter,ID){
    var color=document.getElementById(ID).style.backgroundColor;
    var pos;
    console.log(color);
    switch (color) {
            case 'red':
            pos=redArray.indexOf(letter);
            redArray.splice(pos,1);
            console.log('removed from red');
            break;
            case 'blue':
            pos=blueArray.indexOf(letter);
            blueArray.splice(pos,1);
            console.log('removed from blue');
            break;
            case 'green':
            pos=greenArray.indexOf(letter);
            greenArray.splice(pos,1);
            console.log('removed from green');
            break;
            case 'yellow':
            pos=yellowArray.indexOf(letter);
            yellowArray.splice(pos,1);
            console.log('removed from  yellow');
            break;
        };  
}

// does a  lot of stuff !
function changeCellCol(currId){    
    var inner=document.getElementById(currId).innerHTML;                 // first read cell letter (inner Html)
    if (!inner=='') removeLetter(inner,currId);                          // second read 'old' color and remove letter from coresponding array
    document.getElementById(currId).style.backgroundColor = _currentColor;   // than change to new (currentCOl) color in the  DOM
    console.log(inner);
    var row=currId.charAt(8);
    var col=currId.charAt(12);
    console.log(' row ' + row + ' col '+col);
    
    switch(_currentColor) {                                                   // change the backlogic of color arrays 
    case 'white':
        redMatrix[row][col]=0;
        yellowMatrix[row][col]=0;
        blueMatrix[row][col]=0;
        greenMatrix[row][col]=0;
        break;
    case 'red':
        if (!inner=='') {redArray.push(inner)};
        redMatrix[row][col]=1;
        yellowMatrix[row][col]=0;
        blueMatrix[row][col]=0;
        greenMatrix[row][col]=0;
        break;
    case 'yellow':
        if (!inner=='') {yellowArray.push(inner)};
        redMatrix[row][col]=0;
        yellowMatrix[row][col]=1;
        blueMatrix[row][col]=0;
        greenMatrix[row][col]=0;
        break;
    case 'blue':
        if (!inner=='') {blueArray.push(inner)};
        redMatrix[row][col]=0;
        yellowMatrix[row][col]=0;
        blueMatrix[row][col]=1;
        greenMatrix[row][col]=0;
        break;
    case 'green':
        if (!inner=='') {greenArray.push(inner)};
        redMatrix[row][col]=0;
        yellowMatrix[row][col]=0;
        blueMatrix[row][col]=0;
        greenMatrix[row][col]=1;
        break;}
}

// aids in constructiing the game inital table by placing the letters
function setLetter(letter,row,column){
    var element = document.getElementById("divIDRow"+row+"Col"+column);
    element.innerHTML=letter;
    return element;
}

// creates empty 2d square sized array 
function createMatrix(size){
    var matrix = new Array();
    for (i=0;i<size;i++) {
        matrix[i]=new Array();
        for (j=0;j<size;j++) {matrix[i][j]=0;};
        };
    return matrix;
};

// rotates by 90 deg the content of the matrix (a row becomes a column )
function rotateMatrixLeft(array,arrSize){
    var newArray = [];
    for(var i = 0; i < arrSize; i++){
        newArray.push([]);
    };
    for(var i = 0; i < arrSize; i++){
        for(var j = 0; j < arrSize; j++){
            newArray[i][j]=array[j][arrSize-i-1];
        };
    };
    return newArray;
};

//  tests if the content of 2 same sizzed matrices are the same
function testMatrices(m1,m2,arrSize){
    var condition=true;
    for(var i = 0; i < arrSize; i++){
        for(var j = 0; j < arrSize; j++){
            if (m1[i][j]==m2[i][j]) {condition=true;
                                     console.log(condition);
                }
                else{ condition=false;
                     console.log(condition);
                     return false}
        };
    };
    return condition;
};

// checks if the content of all 4 color arrays is the same 
function letterSimetry(){
    redArray.sort();
    blueArray.sort();
    yellowArray.sort();
    greenArray.sort();
    var myLength=redArray.length;
    if (blueArray.length>myLength) myLength=blueArray.length;
     if (greenArray.length>myLength) myLength=greenArray.length;
      if (yellowArray.length>myLength) myLength=yellowArray.length;
    
    var condition=false;
    for (i = 0; i < myLength; i++) {
        if (redArray[i]==blueArray[i] && blueArray[i]==yellowArray[i] && yellowArray[i]==greenArray[i] && greenArray[i]==redArray[i]){
            condition=true;
            console.log('letter simetry Pass number ' + i)} 
            else {  console.log('letter simetry Pass number ' + i);
                    console.log( 'letter simetry is false ');
                    return false;
                 };
            
    };
    console.log( 'letter simetry is true ');
    return condition;
};

// check if letterSimetry is ok and if the shape of the color matrices is the same ;)
function megaTest(){
    localStorage.setItem('redMatrix', redMatrix);
    localStorage.setItem('yellowMatrix', yellowMatrix);
    localStorage.setItem('blueMatrix', blueMatrix);
    localStorage.setItem('greenMatrix', greenMatrix);
    switch (document.getElementById('divIDRow0Col0').style.backgroundColor) {
        case 'red': var firstMatrix =redMatrix    ;    
             break;
        case 'blue':var firstMatrix  = blueMatrix;
              break;
        case 'green':var firstMatrix = greenMatrix ;
          break;
        case 'yellow':var firstMatrix =yellowMatrix ;
          break;
    };
      switch (document.getElementById('divIDRow0Col7').style.backgroundColor) {
        case 'red': var secondMatrix=redMatrix ;          
             break;
        case 'blue':var secondMatrix=blueMatrix;
              break;
        case 'green':var secondMatrix=greenMatrix;
          break;
        case 'yellow':var secondMatrix=yellowMatrix;
          break;
    };
      switch (document.getElementById('divIDRow7Col7').style.backgroundColor) {
        case 'red': var thirdMatrix= redMatrix ;          
             break;
        case 'blue':var thirdMatrix=blueMatrix;
              break;
        case 'green':var thirdMatrix=greenMatrix;
          break;
        case 'yellow':var thirdMatrix=yellowMatrix;
          break;
    };
      switch (document.getElementById('divIDRow7Col0').style.backgroundColor) {
        case 'red':   var fourthMatrix=redMatrix;         
             break;
        case 'blue':    var fourthMatrix=blueMatrix;
              break;
        case 'green':   var fourthMatrix=greenMatrix;
          break;
        case 'yellow':  var fourthMatrix=yellowMatrix;
          break;
    };
    
    
    
    
    if (!testMatrices(firstMatrix,rotateMatrixLeft(secondMatrix,8),8)) {alert('Not Good');
                                                                    return;
                                                                    };
    if (!testMatrices(secondMatrix,rotateMatrixLeft(thirdMatrix,8),8)) {alert('Not Good');
                                                                    return;
                                                                    };
    if (!testMatrices(thirdMatrix,rotateMatrixLeft(fourthMatrix,8),8)) {alert('Not Good');
                                                                    return;
                                                                    };                                                                 
    if (!testMatrices(fourthMatrix,rotateMatrixLeft(firstMatrix,8),8)) {alert('Not Good');
                                                                    return;
                                                                    }; 
    if (!letterSimetry())  {alert('Not Good');
                            return;
        
    };   
                                                                                                                                                                                                                         
    alert('Uber Good');
           return;
};





