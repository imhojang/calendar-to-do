// Load application styles
import 'styles/index.css';

var todayYear = new Date().getFullYear();
var todayMonth = new Date().getMonth();
var todayDate = new Date().getDate();
var todayDay = new Date().getDay();

var prevbtn = document.getElementById('prev');
var nextbtn = document.getElementById('next');

var currentYear = todayYear;
var currentMonth = todayMonth;
var currentDate = todayDate;
var currentDay = todayDay;

var daysInWords = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
var monthsInWords = ['January','February','March','April','May','June','July','August','September','October','November','December'];


prevbtn.addEventListener('click', prevMonth);
nextbtn.addEventListener('click', nextMonth);

//create table element and append it to calendar div
var table = document.createElement('table');
var calendar = document.getElementById('calendar');

var listId = '' + currentYear + currentMonth + currentDate;


calendar.appendChild(table);

// create empty table with 7 x 7
var cellid = 0;

for (var i = 0; i < 7; i++){
    var row = document.createElement('tr');
    for (var j = 0; j < 7; j++){

        var cell = document.createElement('td');
        var text = document.createTextNode('');
        cell.id = cellid + '';
        cellid++;
        if(i>0) {cell.addEventListener('click', ding)}
        cell.appendChild(text);
        row.appendChild(cell);
    }
    table.appendChild(row);
}

// call function showCalendar 
showCalendar (currentYear,currentMonth);


function ding(){
    currentDate = event.target.firstChild.nodeValue;
    date.innerText = currentDate;
    currentDay = (+currentDate + firstDay(currentYear,currentMonth) - 1) % 7;
    day.innerText = daysInWords[currentDay];
    
    clearDateColor();

    event.target.style.backgroundColor = 'red';
    event.target.style.color = 'white';

}

function showCalendar (currentYear,currentMonth){
    //change the table cells to appropriate values
    for (var k = 0; k < 49; k++){
        document.querySelectorAll('td')[k].innerText = calendarArray(currentYear,currentMonth)[k];
    }
    day.innerText = daysInWords[currentDay];
    date.innerText = currentDate;
    month.innerText = monthsInWords[currentMonth];
    year.innerText = currentYear;
}

function clearDateColor(){
    document.querySelectorAll('td').forEach( (i) => {
        i.style.color = 'black';
        i.style.backgroundColor = 'white';
    });
}

function prevMonth(){
    currentMonth = currentMonth-1;
    if (currentMonth === -1) {
        currentYear = currentYear-1;
        currentMonth = 11;
    }
    showCalendar(currentYear,currentMonth);

    clearDateColor();
}

function nextMonth(){
    currentMonth = currentMonth+1;
    if (currentMonth === 12) {
        currentYear = currentYear+1;
        currentMonth = 0;
    }
    showCalendar(currentYear,currentMonth);

    document.querySelectorAll('td').forEach( (i) => {
        i.style.color = 'black';
        i.style.backgroundColor = 'white';
    });
}

function firstDay(year,month) {
    var day = new Date(year,month).getDay();
    return day;
}

function numDaysInMonth (year,month){
    var date = new Date(year,month,32).getDate();
    return 32 - date;
}

function calendarArray (year,month){
    var date = 1;
    var arr = [];
    var daysInAlphabet = ['S','M','T','W','T','F','S'];
    for(var i = 0; i < 49; i++){
        if (i < 7) {
            arr.push(daysInAlphabet[i]);
        }
        else if (i >= firstDay(year,month) + 7 
           && i < 7 + firstDay(year,month) + numDaysInMonth(year,month)){
            arr.push(date);
            date++;
        }
        else arr.push('');
    }
    return arr;
}

var currentList = createList();
// ------------ create To-do-List -----------

function createList () {
    listId = '' + currentYear + currentMonth + currentDate;
    var list = document.createElement('ul');
    list.setAttribute('id', listId);
    return list;
}

// ----------- get To-do-List --------------

function getList (){
    if (toDoList.lastChild.tagName === 'UL'){
    toDoList.removeChild(toDoList.lastChild);
    }
    if (document.getElementById(listId)){
        currentList = document.getElementById(listId);
    }
    else alert('currentList does not exist here');
}


// ------------- To-do-List -----------------


var toDoList = document.getElementById('todolist');
//create a text input object with type ='text
// and append it to the div id = 'todolist'
var checkUncheckAll = document.createElement('input')
checkUncheckAll.setAttribute('type','checkbox');
checkUncheckAll.setAttribute('id','checkAll');
checkUncheckAll.addEventListener('click', checkAll);

var typeHere = document.createElement('input'); 
typeHere.setAttribute('id','textInput');
typeHere.setAttribute('type','text');
typeHere.setAttribute('placeholder','What needs to be done?');
typeHere.setAttribute('minlength','1')

toDoList.appendChild(checkUncheckAll);
toDoList.appendChild(typeHere);
// toDoList.appendChild(checkUncheckAll);



//add a eventlistener that upon pressing the enter key, the input value
//becomes submitted
typeHere.addEventListener('keyup',enterKey);

function enterKey () {
    if (event.keyCode === 13){
        event.preventDefault();
        if (typeHere.value.length > 0){
            addItemToList(typeHere.value);
        }
    }
}

//writing a sample list variable here and appending it to todolist div
var sampleList = document.createElement('ul');
sampleList.setAttribute('class','allList');
toDoList.appendChild(sampleList);

//write a function that adds the bullet to the existing list
// or to a new list if the list does not exist

var currentItemDisplay = 'block';
function addItemToList (inputValue) {
    
    // create a li element with a checkbox and label with the input text inside
    // and a x button that deletes the item
    var bullet = document.createElement('li');
    var box = document.createElement('input');
    var item = document.createElement('input');
    var xButton = document.createElement('button');
    
    box.setAttribute('type','checkbox');
    box.setAttribute('class','boxes');
    box.addEventListener('click', dispCheckItemNum);
    box.addEventListener('click', crossOut);
    box.addEventListener('click',displayClearBtn);
    
    bullet.setAttribute('class','bullet');
    bullet.addEventListener('mouseenter', displayXBtn);
    bullet.addEventListener('mouseleave', hideXBtn);
    bullet.style.display = currentItemDisplay;

    item.setAttribute('class','eachItems')
    item.setAttribute('type','text');
     item.setAttribute('readonly',true);
    // item.style.pointerEvents = none;
    item.addEventListener('dblclick',changeItemText);
    

    xButton.addEventListener('click',deleteItem)
    xButton.setAttribute('class','xBtn');
    xButton.style.display = 'none';
    
    item.defaultValue = inputValue;

    bullet.appendChild(box);
    bullet.appendChild(item);
    bullet.appendChild(xButton);
    xButton.appendChild(document.createTextNode('X'));

    
    //if list does not exist create a new list
    if(!sampleList){
        document.createElement('ul').appendChild(bullet);
    }
    else{
        //else append the bullet to the existing list
        sampleList.appendChild(bullet);
    }
    typeHere.value = '';

 //   dispTotalItemNum();
    dispCheckItemNum();
    displayAll();
    displayClearBtn();
}


//var totalTextNode = document.createTextNode('');
//total number of items in the list
// function dispTotalItemNum (){
//     totalTextNode.nodeValue = ' total :' + sampleList.childElementCount + '\n';
//         if (!toDoList.contains(totalTextNode)){
//             toDoList.appendChild(totalTextNode);
//         }
        
//     }

var uncheckedTextNode = document.createTextNode('');
var listBtnDiv = document.getElementById('listBtns');
//number of "checked" items in the list
function dispCheckItemNum (){
    var boxArr = document.getElementsByClassName('boxes');
    var checkedCount = 0;
    for (var each of boxArr){
        each.checked ? checkedCount++ : false;
    
    }  
    if (sampleList.childElementCount - checkedCount > 1 || sampleList.childElementCount - checkedCount === 0 ) {
        uncheckedTextNode.nodeValue = sampleList.childElementCount - checkedCount + ' items left';
    }
    else if (sampleList.childElementCount - checkedCount === 1) {
        uncheckedTextNode.nodeValue = sampleList.childElementCount - checkedCount + ' item left';
    }
    if (!toDoList.contains(uncheckedTextNode)){
        listBtnDiv.insertBefore(uncheckedTextNode,listBtnDiv.firstChild);
    }
    
    // checkedTextNode.nodeValue = ' completed :' + checkedCount;
    // if (!toDoList.contains(checkedTextNode)){
        //     toDoList.appendChild(checkedTextNode);
        // }
    }


// when a checkbox is ticked, the label should have a cross-over line 

function crossOut (){
    for (var i of document.getElementsByClassName('boxes')){
        if (i.checked){
            i.nextElementSibling.style.textDecoration = 'line-through';
            i.nextElementSibling.style.color = 'gray';
        }
        else {
            i.nextElementSibling.style.textDecoration = 'initial';
            i.nextElementSibling.style.color = 'black';
        }
    }
}

function displayClearBtn () {
    if (document.querySelectorAll('input[type="checkbox"]:checked').length > 0) {
        document.getElementById('clear').style.display = 'initial';
    }
    else {
        document.getElementById('clear').style.display = 'none';
    }
}

// display working buttons: 'all', 'active', 'completed', 'clear 

document.getElementById('all').addEventListener('click',allBtnClick);
document.getElementById('active').addEventListener('click',activeBtnClick);
document.getElementById('completed').addEventListener('click',compBtnClick);
document.getElementById('clear').addEventListener('click',clearBtnClick);

function allBtnClick (){
    btnColor();
    for (var i of document.querySelectorAll('.boxes')){
        i.parentNode.style.display = 'block';
    }
}

function compBtnClick (){
    btnColor()
    // event.target.style.border = '1px solid pink';
    currentItemDisplay = 'none';
    for (var i of document.querySelectorAll('.boxes')){
        i.parentNode.style.display = 'none';
    }
    for (var j of document.querySelectorAll('.boxes:checked')){
        j.parentNode.style.display = 'block';
    }
}

function activeBtnClick (){
    btnColor();
    // event.target.style.border = '1px solid pink';
    currentItemDisplay = 'block';
    for (var i of document.querySelectorAll('.boxes')){
        i.parentNode.style.display = 'block';
    }
    for (var j of document.querySelectorAll('.boxes:checked')){
        j.parentNode.style.display = 'none';
    }
}

function clearBtnClick(){
    //   while (document.querySelectorAll('.boxes:checked') > 0)) {
    while (document.querySelectorAll('.boxes:checked').length > 0){
        document.querySelectorAll('.boxes:checked')[0].parentNode.remove();
    }    
    dispCheckItemNum();
    displayClearBtn();
    displayAll();
    document.getElementById('checkAll').checked = false;
}

function deleteItem(){
    event.target.parentNode.firstChild.checked = true;
    event.target.parentNode.remove();
    dispCheckItemNum();
    displayAll();
}

function displayXBtn(){
    // event.target.parentNode.lastChild.style.display = 'inline-block';
    event.target.lastChild.style.display = 'inline-block';

}

function hideXBtn(){
    event.target.lastChild.style.display = 'none';
}

function displayAll (){
    
    if (document.querySelectorAll('.boxes').length > 0 ){
        document.getElementById('listBtns').style.display = 'block';
        document.getElementById('checkAll').style.display = 'block';
    }
    else {
        document.getElementById('listBtns').style.display = 'none';
        document.getElementById('checkAll').style.display = 'none';
    }  
}

function changeItemText(){
    event.target.removeAttribute('readonly');
}

function btnColor(){
    for (i of document.getElementsByClassName('todoBtn')){
        i.style.border = 'none';
    }
    event.target.style.border = '1.5px solid pink';
}

// REMEMBER TO MAKE A CHECK ALL CHECKBOX! 
function checkAll () {
    var checkNum = 0
    for (var box of document.querySelectorAll('.boxes')){
        if (box.checked === true){
            checkNum++;
        }
        if (box.checked === false){
            box.checked = true;
        }

    }
    if (checkNum === 0) {
        event.target.checked = false;
    }

    event.target.checked = true;
    if (checkNum === document.querySelectorAll('.boxes').length){
        for (var box of document.querySelectorAll('.boxes')){
            box.checked = false;
        }
        event.target.checked = false;
    }
    displayClearBtn();
    crossOut();
}