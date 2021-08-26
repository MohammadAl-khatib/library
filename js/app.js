`use strict`;

let form = document.getElementById('form');
let table = document.getElementById('table');
let objArray = [];

function CreateBook (bookName,numberOfPages,category){

this.bookName = bookName;
this.numberOfPages=numberOfPages;
this.category=category;
this.price=getRandom();
objArray.push(this);
}

function getRandom (){
    return Math.floor(Math.random() * (8 - 3 + 1) + 3);
}

form.addEventListener('submit',submitHandler);
function submitHandler(event){

    event.preventDefault();
    let bookName = event.target.bookName.value;
    let numberOfPages = event.target.pagesNumber.value;
    let category = event.target.category.value;

    new CreateBook (bookName,numberOfPages,category);
    localStorage.data = JSON.stringify(objArray);

    clearTable();
    render();
}

getData();
render();

function render (){

    for(let i=0;i<objArray.length;i++){

        let trElement = document.createElement('tr');
        table.appendChild(trElement);

        let td1Element = document.createElement('td');
        trElement.appendChild(td1Element);
        td1Element.textContent= objArray[i].bookName;

        let td2Element = document.createElement('td');
        trElement.appendChild(td2Element);
        td2Element.textContent= objArray[i].numberOfPages;

        let td3Element = document.createElement('td');
        trElement.appendChild(td3Element);
        td3Element.textContent= objArray[i].price;

        let td4Element = document.createElement('td');
        trElement.appendChild(td4Element);
        td4Element.textContent= objArray[i].category;

        let td5Element = document.createElement('td');
        trElement.appendChild(td5Element);
        let spanElement = document.createElement('span');
        td5Element.appendChild(spanElement);
        spanElement.id = i;
        spanElement.textContent= 'x';
    }
}


function clearTable(){

    let tableLength = table.rows.length;
    for(let i=1;i<tableLength;i++){

        table.deleteRow(1);
    }
}

function getData (){
    if(localStorage.data){
        let data = JSON.parse(localStorage.data);
        for(let i=0;i<data.length;i++){
            new CreateBook(data[i].bookName,data[i].numberOfPages,data[i].category);
        }
    }
}

table.addEventListener('click',removeItem);
function removeItem (event){
    if(event.target.id){
        objArray.splice(event.target.id,1);
        localStorage.data = JSON.stringify(objArray);
        clearTable();
        render();
    }
}