document.addEventListener("DOMContentLoaded", function() {
    let todoItemsContainer = document.getElementById("todoItemsContainer");
    let addTodoButton = document.getElementById("addTodoButton");

    function getTodoListFromLocalStorage() {
        let stringifiedTodoList = localStorage.getItem("todoList");
        let parsedTodoList = JSON.parse(stringifiedTodoList);
        if (parsedTodoList === null) {
            return [];
        } else {
            return parsedTodoList;
        }
    }

    let todoList = getTodoListFromLocalStorage();
    let todosCount = todoList.length;

    addTodoButton.onclick = function() {
        onAddTodo();
    };

    function onAddTodo() {
        let userInputElement = document.getElementById("taskDescription");
        let userInputValue = userInputElement.value;

        if (userInputValue === "") {
            alert("Enter Valid Text");
            return;
        }

        todosCount = todosCount + 1;

        let newTodo = {
            text: userInputValue,
            uniqueNo: todosCount,
            savestatus: false
        };
        todoList.push(newTodo);
        createAndAppendTodo(newTodo);
        userInputElement.value = "";
        saveTodoListToLocalStorage();
    }

    function onDeleteTodo(todoId) {
        let todoElement = document.getElementById(todoId);
        todoItemsContainer.removeChild(todoElement);

        let deleteElementIndex = todoList.findIndex(function(eachTodo) {
            let eachTodoId = "todo" + eachTodo.uniqueNo;
            if (eachTodoId === todoId) {
                return true;
            } else {
                return false;
            }
        });

        todoList.splice(deleteElementIndex, 1);
        saveTodoListToLocalStorage();
    }

    function onTodoStatusChange(checkboxId, labelId, todoId) {
        let checkboxElement = document.getElementById(checkboxId);
        let labelElement = document.getElementById(labelId);

        labelElement.classList.toggle("checked");

        let updatedTodoIndex = todoList.findIndex(function(eachTodo) {
            let eachTodoId = "todo" + eachTodo.uniqueNo;
            if (eachTodoId === todoId) {
                return true;
            } else {
                return false;
            }
        });

        todoList[updatedTodoIndex].savestatus = checkboxElement.checked;
        saveTodoListToLocalStorage();
    }

    function createAndAppendTodo(todo) {
        let todoId = "todo" + todo.uniqueNo;
        let checkboxId = "checkbox" + todo.uniqueNo;
        let labelId = "label" + todo.uniqueNo;

        let todoElement = document.createElement("li");
        todoElement.classList.add("todo-item-container");
        todoElement.id = todoId;
        todoItemsContainer.appendChild(todoElement);

        let labelContainer = document.createElement("div");
        labelContainer.classList.add("label-container");
        todoElement.appendChild(labelContainer);

        let inputElement = document.createElement("input");
        inputElement.type = "checkbox";
        inputElement.id = checkboxId;

        inputElement.onclick = function() {
            onTodoStatusChange(checkboxId, labelId, todoId);
        };

        inputElement.classList.add("checkbox-input");
        inputElement.checked = todo.savestatus;
        labelContainer.appendChild(inputElement);

        let labelElement = document.createElement("label");
        labelElement.setAttribute("for", checkboxId);
        labelElement.id = labelId;
        labelElement.classList.add("checkbox-label");
        labelElement.textContent = todo.text;
        labelContainer.appendChild(labelElement);

        if (todo.savestatus === true) {
            labelElement.classList.add('checked');
        }

        let deleteIcon = document.createElement("button");
        deleteIcon.classList.add("delete-icon");
        deleteIcon.textContent = "Delete";
        deleteIcon.onclick = function() {
            onDeleteTodo(todoId);
        };

        todoElement.appendChild(deleteIcon);
    }

    function saveTodoListToLocalStorage() {
        localStorage.setItem("todoList", JSON.stringify(todoList));
    }

    for (let todo of todoList) {
        createAndAppendTodo(todo);
    }
});
