// UI constructor
function UI() {
    
    // Cache DOM elements
    this.elements = {
        ul: document.getElementById('todo'),
        addItem: document.getElementById('addItem'),
        form: document.forms.todo
    };
}

// Bind all event listeners
UI.prototype.bindClickListeners = function () {
    var self = this, // Reference self
        addItem = this.elements.addItem;
    
    // Event listener for adding new item to list
    addItem.addEventListener('click', function () {
        var form = self.elements.form,
            name = form.name ? form.name.value : '',
            type = form.type && form.type.selectedIndex !== 0 ? form.type.value : '';
        
        // Check if user entered all fields
        if (!name || !type) {
            alert('Enter all fields!');
            return;
        }
        
        // Add item
        todo.addItem(name, type);
        
        // Reset form fields
        form.name.value = '';
        form.type.selectedIndex = 0;
    });
};

// Render new item
UI.prototype.renderListItem = function (item) {
    var li, p, span;

    // Create element; name: string, (value: string)
    function createElement(name, value) {
        var el = document.createElement(name);
        if (value) {
            el.innerHTML = value;
        }

        return el;
    }
    
    // Create list element
    li = createElement('LI');
    p = createElement('P', item.name);
    span = createElement('SPAN', item.type + ' task ' + item.id);

    // Append list element in DOM
    p.appendChild(span);
    li.appendChild(p);
    this.elements.ul.appendChild(li);
};