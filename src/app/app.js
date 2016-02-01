var todo = new ToDo(); // Create ToDo list

// Add new item
var addItem = document.getElementById('addItem');
addItem.addEventListener('click', function () {
    var inputs = document.forms.todo,
        name, type, i;

    for (i = 0; i < inputs.children.length; i++) {
        if (inputs.children[i].tagName === 'INPUT') {
            name = inputs.name ? inputs.name.value : '';
            type = inputs.type ? inputs.type.value : '';
        }
    }

    if (name && type) {
        todo.addItem(name, type);
    } else {
        alert('Enter all fields!');
    }
});