let myLibrary = [];
const tableBody = document.querySelector(".table-body");
const tableHead = document.querySelector(".table-head");
const newBookBtn = document.querySelector(".add-book-btn");
const addBookBtn = document.querySelector("#submit-btn");
const newBookForm = document.querySelector("#newBookForm");
const eliminateBtn = document.querySelector(".eliminateBtn");
const ReadBtn = document.querySelector(".ReadBtn");

function Book(title,author,pages,readed){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readed = readed;
}

/*element.remove() elimina el elemento html y 
element.querySelector("claseDelHijo") para seleccionar el hijo de un elemento*/

newBookBtn.addEventListener("click", function(event) {
    newBookForm.style.display = "block";
});

addBookBtn.addEventListener("click", function(event) {
    event.preventDefault();
    addBookToLibrary();
    newBookForm.style.display = "none";
    tableHead.style.display = "table-header-group";
});

function eliminateBook(event) {
    let node = event.target;
    node = node.parentNode;
    node = node.parentNode;
    //console.log(node);
    titleNode = node.querySelector(".titleCell");
    myLibrary = myLibrary.filter(book => book.title != titleNode.textContent);
    node.remove();
    if(myLibrary.length == 0){
        tableHead.style.display = "none";
    }
    //console.log(myLibrary);
};

function wasReaded(event) {
    let node = event.target;
    node = node.parentNode;
    node = node.parentNode;
    readedNode = node.querySelector(".readedCell");
    titleNode = node.querySelector(".titleCell");
    let bookSelected = myLibrary.find(book => book.title == titleNode.textContent);
    if(bookSelected.readed == true){bookSelected.readed = false}else{bookSelected.readed = true};
    if(bookSelected.readed == true){readedNode.textContent = 'Yes'}else{readedNode.textContent = 'No'};
    //console.log(node);
    //console.log(myLibrary);
};

myLibrary.forEach(book => {
    displayBook(book);
});

function changeReaded(book){
    if(book.readed == true){
        return false;
    }else{
        return true;
    }
}

function addBookToLibrary(){
    let title = document.querySelector("#title").value;
    let author = document.querySelector("#author").value;
    let pages = document.querySelector("#pages").value;
    let readed = document.querySelector("#readed").checked;
    let newBook = new Book(title, author, pages, readed);
    myLibrary.push(newBook);
    displayBook(newBook);
}

function displayBook(book){
        let lastRow = tableBody.lastChild;
        let row = document.createElement("tr");
        let titleCell = document.createElement("td");
        let authorCell = document.createElement("td");
        let pagesCell = document.createElement("td");
        let readedCell = document.createElement("td");
        let btnsCell = document.createElement("td");
        titleCell.textContent = book.title;
        authorCell.textContent = book.author;
        pagesCell.textContent = book.pages;
        readedCell.textContent = ((book.readed)?String("Yes"):String("No"));
        btnsCell.classList.add("table-btns");
        let readBtn = document.createElement("button");
        let eliminateBtn = document.createElement("button");
        readBtn.textContent = "Read";
        eliminateBtn.textContent = "Eliminate";
        titleCell.classList.add("titleCell");
        readedCell.classList.add("readedCell");
        readBtn.classList.add("ReadBtn");
        eliminateBtn.classList.add("eliminateBtn");
        readBtn.addEventListener('click', function(event){wasReaded(event)});
        eliminateBtn.addEventListener('click', function(event){eliminateBook(event)});
        btnsCell.appendChild(readBtn);
        btnsCell.appendChild(eliminateBtn);
        row.appendChild(titleCell);
        row.appendChild(authorCell);
        row.appendChild(pagesCell);
        row.appendChild(readedCell);
        row.appendChild(btnsCell);
        tableBody.insertBefore(row, lastRow ? lastRow.nextSibling : null);
}
