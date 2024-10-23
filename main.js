// 1) Delete items
let groceryListUl = document.querySelector('#grocery-list ul');
console.log(groceryListUl);
// add event listener
groceryListUl.addEventListener('click', remove);
// define our handler function
function remove(e) {
    let target = e.target;
    // if(target.classList.contains("delete"))
    if(target.className == 'delete') {
        // target.parentElement.remove();
        let li = target.parentElement;
        li.remove();
    }
};

// 2) Add items
let formAdd = document.getElementById('add-item');
// attach event listener
formAdd.addEventListener('submit', (e) => {
    // prevent the page from refreshing
    e.preventDefault();
    
    // let ul = document.getElementsByTagName('ul')[0];
    // global variable "groceryListUl" may be used
    let ul = document.querySelector('#grocery-list ul');

    // grab user's input text
    // let inputText = formAdd.querySelector('input[type="text"]').value;
    let inputText = formAdd.querySelector('input[type="text"]');
    let inputTextValue = inputText.value;
    console.log(inputTextValue);

    if(inputTextValue == "" || inputTextValue.length < 2) {
        alert("Type some item to display!");
    }
    else {
        // clear the input box
        // formAdd.querySelector('input[type="text"]').value = null;
        inputText.value = null;

        // create the list items dynamically
        let li = document.createElement('li');
        let groceryName  = document.createElement('span');
        let deleteButton = document.createElement('span');

        // add text to the created li element
        groceryName.textContent = inputTextValue;
        deleteButton.textContent = 'delete';

        // adding classes the the created li items
        groceryName.classList.add('name');
        deleteButton.classList.add('delete');

        // the spans are nested within the li element
        li.appendChild(groceryName);
        li.appendChild(deleteButton);

        // attach our created li element to the DOM, in this case the ul element
        ul.appendChild(li);
    }
});

// 3) Hide elements
let checklabel = document.querySelector('#check label');
let checkbox = document.querySelector('#hide');
let groceryList = document.getElementById('grocery-list');

checkbox.addEventListener('change', () => {
    if(checkbox.checked) {
        groceryList.style.display = 'none';
        checklabel.textContent = 'Show list';
    }
    else {
        groceryList.style.display = 'block';
        checklabel.textContent = 'Hide list';
    }
});

// 4) Search for items
// const search = document.forms['search-item'].querySelector('input');
const search = document.getElementById('search-item');

// add event listener
search.addEventListener('keyup', (e) => {
    // grab the user's text and convert it to lower case
    let text = e.target.value;
    let textLowerCase = text.toLowerCase();
    // console.log(textLowerCase);

    // let's grab each li tag (3 ways)
    // let groceries = document.getElementsByTagName('li');
    let groceries = document.querySelectorAll('#grocery-list li');
    // let groceries = groceryList.querySelectorAll('li');
    // console.log(groceries);

    // let's convert the groceries to an array, so we can access the forEach method
    let groceriesArray = Array.from(groceries);

    // loop through each grocery item
    groceriesArray.forEach((item) => {
        let groceryName = item.firstElementChild.textContent;
        console.log(groceryName);

        // convert our text to lower case
        let groceryNameLower = groceryName.toLowerCase();
        // console.log(groceryNameLower);

        // now we can use indexOf to see if text can be found within our grocery list.
        // If nothing is found, a value of -1 is returned and we can hide the item.
        // if(groceryNameLower.indexOf(textLowerCase) == -1) {
        //     item.style.display = 'none';
        // }
        // else {
        //     item.style.display = 'block';
        // }
        if(groceryNameLower.includes(textLowerCase)) {
            item.style.display = 'flex';
        }
        else {
            item.style.display = 'none';
        }
    });
});