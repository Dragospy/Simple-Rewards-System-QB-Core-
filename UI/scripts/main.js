import { rotateAnim } from './animations.js';

let vehicles = {};
let items = {};
let money = {};

let rewards = {
    "vehicles": {

    },
    money: 0,
    "items": {
        
    }
}

//communitcation to LUA
window.addEventListener('message', function(event) {
    let item = event.data;

    console.log("loading");

    if (item.type === "ShowUI") {
        $('#main_screen').show();
    }

    if (item.type === "loadAvailableRewards") {

        vehicles = item.vehicles;
        items = item.items;
        money = item.money;

        displayMoneyCards(); //Display money cards
        displayVehicleCards(); //Display vehicle cards

        console.log(vehicles);
        console.log(items);
    }
});



//Edit existing code
function existingCodeInterval() {
    let code;

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
function displayMoneyCards() {
    console.log(money);
    let moneyPresetList = $('#moneyPresets')

    for (let preset of Object.values(money)) {

        moneyPresetList.append(`
            <div class = "rewardCard moneyPreset" value = "${preset.value}">
                <p class = "cardTitle"> ${preset.title}</p>
                <img class = "cardImage" src = "./images/porsche.png">

                <div class = "cardButton moneyButton">
                    <img class = "cardButtonIcon" src = "./images/plus.png">
                </div>
            </div>    
        `)
    }
}
//Displays preset vehicle cards
function displayVehicleCards() {
    let vehicleRewardsList = $('#vehicleRewardsList')

    for (let vehicleCard of Object.values(vehicles)) {

        vehicleRewardsList.append(`
            <div class = "rewardCard vehicleCard" hex = "${vehicleCard.model}">
                <p class = "cardTitle"> ${vehicleCard.name} </p>
                <img class = "cardImage" src = "./images/vehicleImage/${vehicleCard.name}.png">

                <div class = "cardButton vehButton">
                    <img class = "cardButtonIcon" src = "./images/plus.png">
                </div>
            </div>    
        `)
    }
}
//Displays preset item cards
function displayItemCards() {

    let moneyPresetList = $('#moneyPresets')

    for (let preset of Object.values(money)) {

        moneyPresetList.append(`
            <div class = "rewardCard itemCard" itemName = "lockpick">
                <p class = "cardTitle"> Lockpick</p>
                <img class = "cardImage" src = "./images/porsche.png">

                <div class = "cardButton itemAddButton">
                    <img class = "cardButtonIcon" src = "./images/plus.png">
                </div>

                <div class = "itemQuantity"> 0 </div>

                <div class = "cardButton itemRemoveButton">
                    <img class = "cardButtonIcon" src = "./images/minus.png">
                </div>
                
            </div>   
        `)
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

//Vehicle card add/remove

$(document).on('click', '.vehButton', function() { //Add item to rewards list
    let vehicleCard = $(this).parent();
    let hex = vehicleCard.attr("hex");
    let buttonIcon = $(this).find(".cardButtonIcon");
    let active;

    if (vehicleCard.css("--active") == "true"){
        delete rewards.vehicles[hex];

        active = false;
        rotateAnim(buttonIcon, 45);
    }
    else {
        rewards.vehicles[hex] = vehicles[hex];

        active = true;
        rotateAnim(buttonIcon, 45);
    }

    vehicleCard.css({
        '--active': `${active}`,
    }) 
});

//Add/Remove Money

$(document).on('click', '.moneyButton', function() { //Add item to rewards list
    let moneyCard = $(this).parent();
    let value = moneyCard.attr("value");
    let buttonIcon = $(this).find(".cardButtonIcon");
    let active;

    if (moneyCard.css("--active") == "true"){
        rewards.money -= value;
        
        active = false;
        rotateAnim(buttonIcon, 45);
    }
    else {
        rewards.money = value;

        active = true;
        rotateAnim(buttonIcon, 45);
    }

    moneyCard.css({
        '--active': `${active}`,
    }) 
});


//Confirm Rewards

$(document).on('click', '#confirmRewardsButton', function() { //Vehicles
    $('.selectRewardsScreen').hide();

    $('.confirmRewardsScreen').show();

    displayRewards();
});

function displayRewards(){

    for (let i = 0; i < rewards.vehicles.length; i++) {
        let vehicle = rewards.vehicles[i];

        
    }

}