// UI constructor
function UI() {
    
    // Cache DOM elements
    this.elements = {
        ul: document.getElementById('todo'),
        addItem: document.getElementById('addItem'),
        form: document.forms.todo
    };
}

// Bind all available event listeners from DOM
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

// Create element; name: string, (value: string)
UI.prototype.createElement = function (name, value) {
    var el = document.createElement(name);
    if (value) {
        el.innerHTML = value;
    }

    return el;
};

// Render new item
UI.prototype.renderListItem = function (item) {
    var self = this,
        li, p, span;
    
    // Create list element
    li = this.createElement('LI');
    p = this.createElement('P', item.name);
    span = this.createElement('SPAN', item.type + ' task ' + item.id);
    
    // Bind click listener on list item
    li.addEventListener('click', function (e) {
        self.settingsBuilder(this, item);
    });

    // Append list element in DOM
    p.appendChild(span);
    li.appendChild(p);
    this.elements.ul.appendChild(li);
};

// Edit, delete or move to done
UI.prototype.updateListItem = function (type, topElement, liElement, item) {
    switch (type) {
        case 'EDIT':
            break;
        case 'DONE':
            break;
        case 'DELETE':
            // TODO: make method in todo.js that will delete element from array
            // pass only one parameter, item ID
            liElement.parentNode.removeChild(liElement);
            break;
        default:
            break;
    }

    topElement.style.display = 'none';
    console.log(type);
    console.log(todo.itemList);
};

// Build HTML element on top list item
UI.prototype.settingsBuilder = function (liElement, item) {
    var self = this,
        rootDiv = this.createElement('DIV'),
        span1 = this.createElement('SPAN', 'EDIT'),
        span2 = this.createElement('SPAN', 'DONE'),
        span3 = this.createElement('SPAN', 'DELETE');
    
    // Append spans to div
    rootDiv.appendChild(span1);
    rootDiv.appendChild(span2);
    rootDiv.appendChild(span3);

    rootDiv.addEventListener('click', function (e) {
        // Stop event propagation
        e.stopPropagation();

        var type = e.target.tagName === 'SPAN' ? e.target.textContent : '';

        if (type) self.updateListItem(type, rootDiv, liElement, item);
    });

    // Append div to list element
    liElement.appendChild(rootDiv);
};