local ui = false
local rewards = {}
local QBCore = exports['qb-core']:GetCoreObject()

local presetMoney = {
    [1] = {
        title= "1,000$",
        value= 1000
    },
    [2] = {
        title= "20,000$",
        value= 20000
    },
    [3] = {
        title= "100,000$",
        value= 100000
    },
}

function procureRewards()
	local foundRewards = {
		vehicles = {},
		items = {},
		money = {}
	}

	for k,v in pairs(QBCore.Shared.Vehicles) do
		foundRewards.vehicles[v["model"]] = {
			name = v["name"],
			model = v["model"],
		}
	end
	for k,v in pairs(QBCore.Shared.Items) do
		foundRewards.items[v["name"]] = {
			label = v["label"],
			name = v["name"],
		}
	end

	for k, v in pairs(presetMoney) do
		table.insert(foundRewards.money, {
			title = v["title"],
			value = v["value"],
		})
	end

	return foundRewards
end

function loadAvailableRewards()
	local foundRewards = procureRewards()
	SendNUIMessage({
		type = "loadAvailableRewards",
		vehicles = foundRewards.vehicles,
		items = foundRewards.items,
		money = foundRewards.money,
	})
end

function OpenUI()
    if not ui then
        SendNUIMessage({
            type = "ShowUI",
        })
        SetNuiFocus(true,true)
        ui = true   
    end
end
    
RegisterNetEvent("qb-rewards:client:CreatePlayerVeh")
AddEventHandler("qb-rewards:client:CreatePlayerVeh", function(vehicle_model, plate)
	local x,y,z,h = 0,0,0,0
	SpawnVehicle(vehicle_model, { x = x, y = y, z = z }, h, function(vehicle)		
		local vehicleProps = GetVehicleProperties(vehicle)
		vehicleProps.plate = plate
		SetVehicleNumberPlateText(vehicle, plate)
        print("Se trimite")
		TriggerServerEvent('qb-rewards:server:InsertVehIntoGarage', vehicleProps, vehicle_model)
	end)
end)


RegisterNUICallback('action', function(data, cb)
    if data.action == 'CloseUI' then
        rewards = {}    
        SetNuiFocus(false,false)
        ui = false
    end


    if data.action == 'AddReward' then
        if data.rewardType == 'vehicle' then
			if rewards[data.model] == nil then
				rewards[data.model] = {
				id = data.id,
				 rewardType = data.rewardType,
				 name = data.name,
				 model = data.model
			 }
			else
				print("Vehicle already added")
			end
        elseif data.rewardType == 'money' then
			if rewards["Money"] == nil then
				rewards["Money"] = {
					id = data.id,
					rewardType = data.rewardType,
					amount = data.amount
				}
			else
				rewards["Money"].amount = data.amount
			end
        elseif data.rewardType == 'item' then
			if rewards[data.name] == nil then
				rewards[data.name] = {
					id = data.id,
					rewardType = data.rewardType,
					label = data.label,
					amount = data.amount,
					name = data.name
				}
			else
				rewards[data.name].amount = rewards[data.name].amount + data.amount
			end
        end
		UpdateRewards()
    end

    if data.action == "SearchVehicles" then
        print("Searched")

        local vehicles = findVehicles(data.text)
        SendNUIMessage({
            type = "displayVehicles",
            vehicleList = vehicles
        })
    end

    if data.action == "SearchItems" then
        print("Searched")

        local itemList = findItems(data.text)
        print("Sending items")
        SendNUIMessage({
            type = "displayItems",
            itemList = itemList
        })
        print("sent")
    end
    if data.action == "GenerateCode" then
        TriggerServerEvent("qb-rewards:server:AddCodeToDB", rewards)
    end
end)

RegisterNetEvent("qb-rewards:client:CopyCode")
AddEventHandler("qb-rewards:client:CopyCode", function(code)
	print("Copying to clipboard")
	SendNUIMessage({
		type = "CopyToClipboard",
		string = string.format(""..code.."")
	})
end)

RegisterNetEvent("qb-rewards:client:requestCode")
AddEventHandler("qb-rewards:client:requestCode", function(code)
    SendNUIMessage({
        type = "GetCode",
    })
end)

RegisterNetEvent("qb-rewards:client:OpenUI")
AddEventHandler("qb-rewards:client:OpenUI", function()
	loadAvailableRewards()
    OpenUI()
end)