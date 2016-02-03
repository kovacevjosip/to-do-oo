// UI constructor
function UI() { }

// Save DOM elements
UI.prototype.elements = function () {
    this.ul = document.getElementById('todo');
    this.addItem = document.getElementById('addItem');
    this.todoForm = document.forms.todo;
};

// Bind all event listeners
UI.prototype.bindClickListeners = function () {
    var self = this,
        addItem = this.addItem; // Reference self
    
    // Event listener for adding new item to list
    addItem.addEventListener('click', function () {
        var inputs = self.todoForm,
            name, type, i;

        for (i = 0; i < inputs.children.length; i++) {
            var children = inputs.children[i];
            if (children.tagName === 'INPUT') {
                name = inputs.name ? inputs.name.value : '';
            } else if (children.tagName === 'SELECT' && children.selectedIndex !== 0) {
                type = children.value ? children.value : '';
            }
        }

        if (name && type) {
            todo.addItem(name, type);
        } else {
            alert('Enter all fields!');
        }
    });
};

// Render new item
UI.prototype.renderListItem = function (item) {
    var li, p, span;

    function createElement(name, value) {
        var el = document.createElement(name);
        if (value) {
            el.innerHTML = value;
        }

        return el;
    }

    li = createElement('LI');
    p = createElement('P', item.name);
    span = createElement('SPAN', ' task ' + item.id);

    p.appendChild(span);
    li.appendChild(p);
    this.ul.appendChild(li);
};