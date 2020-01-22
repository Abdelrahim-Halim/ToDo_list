let todoItems = [];

window.addEventListener("load", e =>{
    for (let index = 0; index < localStorage.length; index++) {
        var i = JSON.parse(localStorage.getItem(localStorage.key(index)))
        print(i)
    }
})

function addTodo(text) {
    const todo = {
        text,
        checked: false,
        id: Date.now(),
    };

    todoItems.push(todo);
    localStorage.setItem(todo.id, JSON.stringify(todo));
    print(todo);

}

function print(todo) {
    const list = document.querySelector('.js-todo-list');
    list.insertAdjacentHTML('beforeend', `
    <li class="todo-item" data-key="${todo.id}">
      <input id="${todo.id}" type="checkbox"/>
      <label for="${todo.id}" class="tick js-tick"></label>
      <span>${todo.text}</span>
      <button class="delete-todo js-delete-todo">
        <svg><use href="#delete-icon"></use></svg>
      </button>
    </li>
  `);
}

function toggleDone(key) {
    // loop to get the index number of an item in the list
    const index = todoItems.findIndex(item => item.id === Number(key));

    //toggle checkbox
    todoItems[index].checked = !todoItems[index].checked;

    var jitem = JSON.parse(localStorage.getItem(todoItems[index].id));

    //get element by key
    const item = document.querySelector(`[data-key='${key}']`);
    if (todoItems[index].checked) {
        item.classList.add('done');
        jitem.checked = true;
    } else {
        item.classList.remove('done');
        jitem.checked = false;
    }
    //updata the item in localStorage
    localStorage.setItem(todoItems[index].id, JSON.stringify(jitem));
}

function deleteTodo(key) {
    // create new array without the removed item
    todoItems = todoItems.filter(item => item.id !== Number(key));
    const item = document.querySelector(`[data-key='${key}']`);
    item.remove();
    localStorage.removeItem(key)
}

const form = document.querySelector('.js-form');
form.addEventListener('submit', event => {
    event.preventDefault();
    const input = document.querySelector('.js-todo-input');

    //trim to remove spaces from the start and the end
    const text = input.value.trim();
    if (text !== '') {
        addTodo(text);
        input.value = '';
        input.focus();
    }
});

const list = document.querySelector('.js-todo-list');
list.addEventListener('click', event => {
    if (event.target.classList.contains('js-tick')) {
        const itemKey = event.target.parentElement.dataset.key;
        toggleDone(itemKey);
    }

    if (event.target.classList.contains('js-delete-todo')) {
        const itemKey = event.target.parentElement.dataset.key;
        deleteTodo(itemKey);
    }

});