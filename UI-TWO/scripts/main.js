var vehicles;
var items;
var rewards = {
    "vehicles": {

    },
    money: 0,
    "items": {

    }
}



//Change between Vehicles, Money and Items pages

$(document).on('click', '#vehiclesButton', function() { //Vehicles
    $('.moneyScreen').hide();
    $('.itemsScreen').hide();

    $('.vehiclesScreen').show();
});

$(document).on('click', '#moneyButton', function() { //Money
    $('.itemsScreen').hide();
    $('.vehiclesScreen').hide();

    $('.moneyScreen').show();
});

$(document).on('click', '#itemsButton', function() { //Items
    $('.moneyScreen').hide();
    $('.vehiclesScreen').hide();

    $('.itemsScreen').show();
});

//Item Card increment/Decrement count

$(document).on('click', '.itemAddButton', function() { //Items
    var itemCard = $(this).parent();
    var itemQuantityElement = itemCard.find(".itemQuantity");
    var itemCount = parseInt(itemQuantityElement.text() || 0);

    itemQuantityElement.text(itemCount + 1);
});

$(document).on('click', '.itemRemoveButton', function() { //Items
    var itemCard = $(this).parent();
    var itemQuantityElement = itemCard.find(".itemQuantity");
    var itemCount = parseInt(itemQuantityElement.text());

    if (itemCount > 0) {
        itemQuantityElement.text(itemCount - 1);
    }
});