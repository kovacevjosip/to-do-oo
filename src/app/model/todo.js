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

// Remove item from list
ToDo.prototype.removeItem = function (id) {
    var list = this.itemList,
        len = list.length,
        item, i;

    // Loop all items
    for (i = 0; i < len; i++) {
        item = list[i];
        if (item.id === id) {
            list.splice(list.indexOf(item), 1);
            return;
        }
    }
};

// Update completed status
ToDo.prototype.updateStatus = function (id) {
    var list = this.itemList,
        len = list.length,
        item, i;

    // Loop all items
    for (i = 0; i < len; i++) {
        item = list[i];
        if (item.id === id) {
            item.completed = true;
            return;
        }
    }
};

// Initialize application
ToDo.prototype.init = function () {
    this.ui.bindClickListeners();
};