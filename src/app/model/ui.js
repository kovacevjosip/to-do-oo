// UI constructor
function UI() {
    
    // Cache DOM elements
    this.elements = {
        ul: document.getElementById('todo'),
        ulDone: document.getElementById('done'),
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
        li, p, span,
        options;
    
    // Create list element
    li = this.createElement('LI');
    p = this.createElement('P', item.name);
    span = this.createElement('SPAN', item.type + ' task ' + item.id);
    
    // Create option settings
    options = this.createElement('DIV');
    options.classList.add('options');
    options.appendChild(this.createElement('SPAN', 'EDIT'));
    options.appendChild(this.createElement('SPAN', 'DONE'));
    options.appendChild(this.createElement('SPAN', 'DELETE'));
    
    // Bind click listener on options
    options.addEventListener('click', function (e) {
        // Stop event propagation
        e.stopPropagation();

        var type = e.target.tagName === 'SPAN' ? e.target.textContent : '';

        if (type) self.updateListItem(type, options, li, item);
    });
    
    // Bind click listener on list item
    li.addEventListener('click', function (e) {
        //options.style.display = 'block';
        Velocity(options, 'fadeIn', { duration: 500 });
    });

    // Append list element in DOM
    p.appendChild(span);
    li.appendChild(p);
    li.appendChild(options);
    this.elements.ul.appendChild(li);
};

// Edit, delete or move to done
UI.prototype.updateListItem = function (type, optionsElement, liElement, item) {
    switch (type) {
        case 'EDIT':
            break;
        case 'DONE':
            todo.updateStatus(item.id);
            liElement.parentNode.removeChild(liElement);
            liElement.removeChild(liElement.querySelector('.options'));
            this.elements.ulDone.appendChild(liElement);
            break;
        case 'DELETE':
            todo.removeItem(item.id);
            liElement.parentNode.removeChild(liElement);
            break;
        default:
            break;
    }

    //optionsElement.style.display = 'none';
    Velocity(optionsElement, 'fadeOut', { duration: 500 });
    console.log(todo.itemList);
};