var vehicles;
var items;
var presetMoney = [ //Max 3 otherwise UI breaks
    {
        title: "1,000$",
        value: 1000
    },
    {
        title: "10,000$",
        value: 10000
    },
    {
        title: "100,000$",
        value: 100000
    }
]
var rewards = {
    "vehicles": {

    },
    money: 0,
    "items": {
        
    }
}


//Confirm Rewards

$(document).on('click', '#confirmRewardsButton', function() { //Vehicles
    $('.selectRewardsScreen').hide();

    $('.confirmRewardsScreen').show();
});

//Edit existing code

function existingCodeInterval() {
    let interval = setInterval(() => {
        code = $('#existingCodeInput').val().trim();

        if (code.length === 0){

            $('#existingCodeInput').val("");
            $('#existingCodeInput').hide();

            $('#editExistingButton').show();

            clearInterval(interval);
        }

    }, 5000);
}

$(document).on("click", "#editExistingButton", function() {
    let code;

    $('#editExistingButton').hide();

    $('#existingCodeInput').show();

    existingCodeInterval();
})



//Displays preset money cards
$(document).ready(function(){
    let moneyPresetList = $('#moneyPresets')

    for (var i = 0; i < presetMoney.length; i++) {
        let preset = presetMoney[i];

        moneyPresetList.append(`
            <div class = "rewardCard moneyPreset" value = "${preset.value}">
                <p class = "cardTitle"> ${preset.title}</p>
                <img class = "cardImage" src = "./images/porsche.png">

                <div class = "cardButton vehButton">
                    <img class = "cardButtonIcon" src = "./images/plus.png">
                </div>
            </div>    
        `)
    }
});


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

$(document).on('click', '.itemAddButton', function() { //Add item to rewards list

    let itemCard = $(this).parent();
    let itemQuantityElement = itemCard.find(".itemQuantity");
    let itemCount = parseInt(itemQuantityElement.text() || 0);
    let itemName = itemCard.attr("itemName");
    let item;

    itemCount++;
    itemQuantityElement.text(itemCount);

    item = { //Creates item struct and adds it to/replaces the one from the items list
        "itemName": itemName,
        "count": itemCount,
    }

    rewards.items[itemName] = item;

});

$(document).on('click', '.itemRemoveButton', function() { //Remove item from rewards list

    let itemCard = $(this).parent();
    let itemQuantityElement = itemCard.find(".itemQuantity");
    let itemCount = parseInt(itemQuantityElement.text());
    let itemName = itemCard.attr("itemName");
    let item;

    if (itemCount > 0) {

        itemCount--;
        itemQuantityElement.text(itemCount);

        item = { //Creates item struct and adds it to/replaces the one from the items list
            "itemName": itemName,
            "count": itemCount,
        }
        rewards.items[itemName] = item;

    }
    else if (rewards.items[itemName] != null){

        //removes item from items list
        delete rewards.items[itemName];

    }

});