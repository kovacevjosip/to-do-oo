/* global UI, Item */

// Constructor
function ToDo() {
    this.reset();

    this.ui = new UI(); // Create UI object
}

// Reset list
ToDo.prototype.reset = function () {
    this.itemList = [];
    this.itemListCount = 0;
};

// Add new item
ToDo.prototype.addItem = function (name, type) {
    var item = new Item(this.itemListCount++, name, type); // Create new object
    
    // Add object to array and render
    this.itemList.push(item);
    this.ui.renderListItem(item);
};

// Initialize application
ToDo.prototype.init = function () {
    this.ui.bindClickListeners();
};