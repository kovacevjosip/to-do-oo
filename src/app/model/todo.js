// Constructor
function ToDo() {
    this.reset();
    this.elements();
}

// Reset list
ToDo.prototype.reset = function() {
    this.list = [];
    this.listCount = 0;
};

// Save DOM elements
ToDo.prototype.elements = function() {
    this.ul = document.getElementById('todo');
};

// Add new item
ToDo.prototype.addItem = function(name, type) {
    var item = new Item(this.listCount++, name, type); // Create new object
    
    // Add object to array and render
    this.list.push(item);
    this.renderListItem(item);
};

// Render new item
ToDo.prototype.renderListItem = function(item) {
    var li, p, span;
    console.log(item);
    
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