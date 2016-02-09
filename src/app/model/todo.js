/* global UI, Item */

// Constructor
function ToDo() {
    this.reset();

    this.ui = new UI(); // Create UI object
}

// Reset list
ToDo.prototype.reset = function () {
    this.list = [];
    this.listCount = 0;
};

// Add new item
ToDo.prototype.addItem = function (name, type) {
    var item = new Item(this.listCount++, name, type); // Create new object
    
    // Add object to array and render
    this.list.push(item);
    this.ui.renderListItem(item);
};

// Initialize application
ToDo.prototype.init = function () {
    this.ui.bindClickListeners();
};