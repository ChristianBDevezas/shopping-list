// 1) Delete items
const groceryListUl = document.querySelector('#grocery-list ul');
console.log(groceryListUl);

groceryListUl.addEventListener('click', remove);
// define our handler function
function remove(e) {
    const target = e.target;
    // if(target.classList.contains("delete"))
    if(target.className == 'delete') {
        // target.parentElement.remove();
        const li = target.parentElement;
        li.remove();
    }
};

// 2) Hide items
const checklabel = document.querySelector('#check label');
const checkbox = document.querySelector('#hide');
const groceryList = document.getElementById('grocery-list');

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

// 3) Check if item already exists on the list
function checkText(inputText) {
    const listItems = document.querySelectorAll('.items-list li');
    const listItemsArray = Array.from(listItems);
    let textExists = false;

    listItemsArray.forEach((item) => {
        const itemName = item.firstElementChild.innerText;
        const itemNameLower = itemName.toLowerCase();
        const inputTextLower = inputText.toLowerCase();

        if(itemNameLower == inputTextLower) {
            alert("Item already exists!");
            textExists = true;
        }
    });

    return textExists;
};

// 4) Add items
const formAdd = document.getElementById('add-item');
// attach event listener
formAdd.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // global variable "groceryListUl" may be used
    const ul = document.querySelector('#grocery-list ul');

    // grab user's input text
    // let inputText = formAdd.querySelector('input[type="text"]').value;
    const inputText = formAdd.querySelector('input[type="text"]');
    const inputTextValue = inputText.value;
    console.log(inputTextValue);

    if(inputTextValue == "" || inputTextValue.length < 2) {
        alert("Type some item to display!");
        inputText.focus();
    }
    else {
        // execute checkText function to check if item already exists, passing inputTextValue as argument
        let checkResult = checkText(inputTextValue);
        console.log(checkResult);

        if(!checkResult) {
           // clear the input box
            inputText.value = null;
            inputText.blur();

            // create the list items dynamically
            const li = document.createElement('li');
            const groceryName  = document.createElement('span');
            const groceryInput = document.createElement('input');
            groceryInput.type = 'text';
            const editBtn = document.createElement("span");
            const deleteButton = document.createElement('span');

            // add text to the created li element
            groceryName.textContent = inputTextValue;
            editBtn.innerText = 'edit';
            groceryInput.placeholder = "Type item and press enter";
            deleteButton.textContent = 'delete';

            // adding classes the the created li item
            groceryName.classList.add('name');
            groceryInput.classList.add("edit-note");
            editBtn.classList.add("edit");
            deleteButton.classList.add('delete');

            // the spans are nested within the li element
            li.appendChild(groceryName);
            li.appendChild(groceryInput);
            li.appendChild(editBtn);
            li.appendChild(deleteButton);

            // attach our created li element to the DOM, in this case the ul element
            ul.appendChild(li); 
        }
    }
});

// 5) Search for items
// const search = document.forms['search-item'].querySelector('input');
const search = document.getElementById('search-item');

// add event listener
search.addEventListener('keyup', (e) => {
    // grab the user's text and convert it to lower case
    const text = e.target.value;
    const textLowerCase = text.toLowerCase();
    // console.log(textLowerCase);

    // grab each li tag
    // const groceries = document.getElementsByTagName('li');
    const groceries = document.querySelectorAll('#grocery-list li');
    // console.log(groceries);

    // convert the groceries to an array, so we can access the forEach method
    const groceriesArray = Array.from(groceries);

    // loop through each grocery item
    groceriesArray.forEach((item) => {
        const groceryName = item.firstElementChild.textContent;
        console.log(groceryName);

        // convert our text to lower case
        const groceryNameLower = groceryName.toLowerCase();
        // console.log(groceryNameLower);

        // If nothing is found, a value of -1 is returned and we can hide the item
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

// 6) Edit items
groceryListUl.addEventListener('click', edit);
function edit(e) {
    const target = e.target;

    if(target.classList.contains('edit')) {
        const li = e.target.parentNode;
        const textItem = li.firstElementChild;
        const inputItem = textItem.nextElementSibling;
        const editBtn = inputItem.nextElementSibling;

        textItem.style.display = 'none';
        inputItem.style.display = 'block';
        editBtn.style.display = 'none';

        const text = textItem.textContent;

        inputItem.focus();

        function displayHideItem() {
            textItem.style.display = 'block';
            inputItem.style.display = 'none';
            editBtn.style.display = 'block';
        }

        inputItem.addEventListener("keydown", (e) => {
            console.log(e, e.keyCode, e.key);

            if(e.key == 'Escape') {
                textItem.textContent = text;
                displayHideItem();
            }

            if(e.keyCode == 13) {
                if(inputItem.value == "" || inputItem.value.length < 2) {
                    alert("Type name of item");
                }
                else {                    
                    textItem.textContent = inputItem.value;
                    displayHideItem();
                }
            }
        });
    }
}