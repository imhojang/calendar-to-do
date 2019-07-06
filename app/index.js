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

var allTodoList = {
  "list20190923": [
    { text: "a", checked: false, id: 0 },
    { text: "a", checked: true, id: 1 },
    { text: "a", checked: false, id: 2 },
  ]
};

var listId = `${currentYear}${currentMonth}${currentDate}`;

var daysInWords = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var monthsInWords = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

var table = document.createElement('table');
var calendar = document.getElementById('calendar');
var cellId = 0;

calendar.appendChild(table);

prevbtn.addEventListener('click', prevMonth);
nextbtn.addEventListener('click', nextMonth);

// create a table 7 x 7
for (var i = 0; i < 7; i++) {
  var row = document.createElement('tr');
  for (var j = 0; j < 7; j++) {
    var cell = document.createElement('td');
    var text = document.createTextNode('');
    cell.id = `${cellId}`;
    cellId++;
    if (i > 0) {
      cell.addEventListener('click', clickCellAndDoThese);
    }

    cell.appendChild(text);
    row.appendChild(cell);
  }
  table.appendChild(row);
}

// call function showCalendar
showCalendar(currentYear, currentMonth);

function showCalendar(currentYear, currentMonth) {
  // change the table cells to appropriate values
  for (var k = 0; k < 49; k++) {
    document.querySelectorAll('td')[k].innerText = calendarArray(currentYear, currentMonth)[k];
  }
  day.innerText = daysInWords[currentDay];
  date.innerText = currentDate;
  month.innerText = monthsInWords[currentMonth];
  year.innerText = currentYear;
}

function ding() {
  currentDate = event.target.firstChild.nodeValue;
  date.innerText = currentDate;
  currentDay = (+currentDate + firstDay(currentYear, currentMonth) - 1) % 7;
  day.innerText = daysInWords[currentDay];

  clearDateColor();

  event.target.style.backgroundColor = 'red';
  event.target.style.color = 'white';
}

function clearDateColor() {
  document.querySelectorAll('td').forEach((i) => {
    i.style.color = 'black';
    i.style.backgroundColor = 'white';
  });
}

function prevMonth() {
  currentMonth -= 1;
  if (currentMonth === -1) {
    currentYear -= 1;
    currentMonth = 11;
  }
  showCalendar(currentYear, currentMonth);

  clearDateColor();
}

function nextMonth() {
  currentMonth += 1;
  if (currentMonth === 12) {
    currentYear += 1;
    currentMonth = 0;
  }
  showCalendar(currentYear, currentMonth);

  document.querySelectorAll('td').forEach((i) => {
    i.style.color = 'black';
    i.style.backgroundColor = 'white';
  });
}

function firstDay(year, month) {
  var day = new Date(year, month).getDay();
  return day;
}

function numDaysInMonth(year, month) {
  var date = new Date(year, month, 32).getDate();
  return 32 - date;
}

function calendarArray(year, month) {
  var date = 1;
  var arr = [];
  var daysInAlphabet = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  for (var i = 0; i < 49; i++) {
    if (i < 7) {
      arr.push(daysInAlphabet[i]);
    } else if (i >= firstDay(year, month) + 7
           && i < 7 + firstDay(year, month) + numDaysInMonth(year, month)) {
      arr.push(date);
      date++;
    } else arr.push('');
  }
  return arr;
}

function clickCellAndDoThese() {
  ding();
  renewListId();
  getList();
  displayAllBtns();
  dispCheckItemNum();
  displayClearBtn();
  resetCheckAll();
  all.click();
  currentItemDisplay = 'block';
}

/* ------------- To-do-List ----------------- */

var toDoList = document.getElementById('todolist');
var checkUncheckAll = document.createElement('input');
checkUncheckAll.setAttribute('type', 'checkbox');
checkUncheckAll.setAttribute('id', 'checkAll');
checkUncheckAll.addEventListener('click', checkAll);

var typeHere = document.createElement('input');
typeHere.setAttribute('id', 'textInput');
typeHere.setAttribute('type', 'text');
typeHere.setAttribute('placeholder', 'What needs to be done?');
typeHere.setAttribute('minlength', '1');
typeHere.addEventListener('keyup', enterKey);

toDoList.appendChild(checkUncheckAll);
toDoList.appendChild(typeHere);


// creates a new to-do-list

var currentList;
function createList() {
  listId = `${currentYear}${currentMonth}${currentDate}`;
  var list = document.createElement('ul');
  list.setAttribute('id', listId);
  list.setAttribute('class', 'allList');
  window[`list${listId}`] = list;
  return window[`list${listId}`];
}

// retrives a to-do-list if it exists

function getList() {
  if (toDoList.lastChild.tagName === 'UL') {
    toDoList.removeChild(toDoList.lastChild);
  }
  if (window[`list${listId}`]) {
    currentList = window[`list${listId}`];
    toDoList.appendChild(currentList);
  }
}

// enter key adds item to the to-do list

function enterKey() {
  if (event.keyCode === 13) {
    event.preventDefault();
    if (typeHere.value.length > 0) {
      addItemToList(typeHere.value);
    }
  }
}


// add create a item with its value and a checkbox
// and append it to current list

var currentItemDisplay = 'block';

function addItemToList(inputValue) {
  var bullet = document.createElement('li');
  var box = document.createElement('input');
  var item = document.createElement('input');
  var xButton = document.createElement('button');

  box.setAttribute('type', 'checkbox');
  box.setAttribute('class', 'boxes');
  box.addEventListener('click', dispCheckItemNum);
  box.addEventListener('click', crossOut);
  box.addEventListener('click', displayClearBtn);

  bullet.setAttribute('class', 'bullet');
  bullet.addEventListener('mouseenter', displayXBtn);
  bullet.addEventListener('mouseleave', hideXBtn);
  bullet.style.display = currentItemDisplay;

  item.defaultValue = inputValue;
  item.setAttribute('class', 'eachItems');
  item.setAttribute('type', 'text');
  item.setAttribute('readonly', true);
  item.addEventListener('dblclick', changeItemText);

  xButton.appendChild(document.createTextNode('X'));
  xButton.addEventListener('click', deleteItem);
  xButton.setAttribute('class', 'xBtn');
  xButton.style.display = 'none';

  bullet.appendChild(box);
  bullet.appendChild(item);
  bullet.appendChild(xButton);

  // if list does not exist create a new list
  if (!document.getElementById(listId)) {
    currentList = createList();
    currentList.appendChild(bullet);
    toDoList.appendChild(currentList);
  } else {
    // else append the bullet to the existing list
    currentList.appendChild(bullet);
    toDoList.appendChild(currentList);
  }
  typeHere.value = '';

  dispCheckItemNum();
  displayAllBtns();
  displayClearBtn();
}

// display and keep track of number of "unchecked" items in the list

var uncheckedTextNode = document.createTextNode('');
var listBtnDiv = document.getElementById('listBtns');

function dispCheckItemNum() {
  var boxArr = document.getElementsByClassName('boxes');
  var checkedCount = 0;
  for (var each of boxArr) {
    if (each.checked) checkedCount++;
  }
  if (currentList.childElementCount - checkedCount > 1 || currentList.childElementCount - checkedCount === 0) {
    uncheckedTextNode.nodeValue = `${currentList.childElementCount - checkedCount} items left`;
  } else if (currentList.childElementCount - checkedCount === 1) {
    uncheckedTextNode.nodeValue = `${currentList.childElementCount - checkedCount} item left`;
  }
  if (!toDoList.contains(uncheckedTextNode)) {
    listBtnDiv.insertBefore(uncheckedTextNode, listBtnDiv.firstChild);
  }
}

// when a checkbox is ticked, its label should have a strike-thorugh

function crossOut() {
  for (var i of document.getElementsByClassName('boxes')) {
    if (i.checked) {
      i.nextElementSibling.style.textDecoration = 'line-through';
      i.nextElementSibling.style.color = 'gray';
    } else {
      i.nextElementSibling.style.textDecoration = 'initial';
      i.nextElementSibling.style.color = 'black';
    }
  }
}

// list ID is generated to create a dynamic variable name

function renewListId() {
  listId = `${currentYear}${currentMonth}${currentDate}`;
}

/* 'All', 'Active', 'Completed', and 'Clear' button configuration */

// display working buttons: 'all', 'active', 'completed', 'clear
document.getElementById('all').addEventListener('click', allBtnClick);
document.getElementById('active').addEventListener('click', activeBtnClick);
document.getElementById('completed').addEventListener('click', compBtnClick);
document.getElementById('clear').addEventListener('click', clearBtnClick);

function displayClearBtn() {
  if (document.querySelectorAll('input[type="checkbox"]:checked').length > 0) {
    document.getElementById('clear').style.display = 'initial';
  } else {
    document.getElementById('clear').style.display = 'none';
  }
}

function allBtnClick() {
  btnColor();
  for (var i of document.querySelectorAll('.boxes')) {
    i.parentNode.style.display = 'block';
  }
}

function compBtnClick() {
  btnColor();
  currentItemDisplay = 'none';
  for (var i of document.querySelectorAll('.boxes')) {
    i.parentNode.style.display = 'none';
  }
  for (var j of document.querySelectorAll('.boxes:checked')) {
    j.parentNode.style.display = 'block';
  }
}

function activeBtnClick() {
  btnColor();
  currentItemDisplay = 'block';
  for (var i of document.querySelectorAll('.boxes')) {
    i.parentNode.style.display = 'block';
  }
  for (var j of document.querySelectorAll('.boxes:checked')) {
    j.parentNode.style.display = 'none';
  }
}

function clearBtnClick() {
  while (document.querySelectorAll('.boxes:checked').length > 0) {
    document.querySelectorAll('.boxes:checked')[0].parentNode.remove();
  }
  dispCheckItemNum();
  displayClearBtn();
  displayAllBtns();
  document.getElementById('checkAll').checked = false;
}

function deleteItem() {
  event.target.parentNode.firstChild.checked = true;
  event.target.parentNode.remove();
  dispCheckItemNum();
  displayAllBtns();
}

function displayXBtn() {
  event.target.lastChild.style.display = 'inline-block';
}

function hideXBtn() {
  event.target.lastChild.style.display = 'none';
}

function displayAllBtns() {
  if (document.querySelectorAll('.boxes').length > 0) {
    document.getElementById('listBtns').style.display = 'block';
    document.getElementById('checkAll').style.display = 'block';
  } else {
    document.getElementById('listBtns').style.display = 'none';
    document.getElementById('checkAll').style.display = 'none';
  }
}

function btnColor() {
  for (var i of document.getElementsByClassName('todoBtn')) {
    i.style.backgroundColor = 'white';
    i.style.color = 'grey';
  }
  event.target.style.backgroundColor = 'pink';
  event.target.style.color = 'white';
}

function checkAll() {
  var checkNum = 0;
  for (var box of document.querySelectorAll('.boxes')) {
    if (box.checked === true) {
      checkNum++;
    }
    if (box.checked === false) {
      box.checked = true;
    }
  }
  if (checkNum === 0) {
    event.target.checked = false;
  }

  event.target.checked = true;
  if (checkNum === document.querySelectorAll('.boxes').length) {
    for (var box of document.querySelectorAll('.boxes')) {
      box.checked = false;
    }
    event.target.checked = false;
  }
  displayClearBtn();
  dispCheckItemNum();
  crossOut();
}

function resetCheckAll() {
  document.querySelector('input[type="checkbox"]').checked = false;
}

function changeItemText() {
  event.target.removeAttribute('readonly');
}
