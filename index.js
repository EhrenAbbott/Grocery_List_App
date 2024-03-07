import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://grocerylistapp-4e6af-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "items")
const obtainedList = []


const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-list")

addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    
    push(shoppingListInDB, inputValue)

    clearInputFieldEl()

})

onValue(shoppingListInDB, function(snapshot) { 
    if (snapshot.exists()) { 
        let itemsArray = Object.entries(snapshot.val())

        clearShoppingListEl()

        for (let i = 0; i < itemsArray.length; i++) {  
        
        let currentItem = itemsArray[i]
        let currentItemID = currentItem[0]
        let currentItemValue = currentItem[1]

        appendItemToShoppingListEl(itemsArray[i])
    }
    } else { 
        console.log("No items in your list!")
    }
})

function clearShoppingListEl() {
    shoppingListEl.innerHTML = ""
}

function clearInputFieldEl() {
    inputFieldEl.value = ""
}

function addToObtainedList(){ 
    console.log(obtainedList)
}

function appendItemToShoppingListEl(item) {
    let itemID = item[0]
    let itemValue = item[1]

    let newEl = document.createElement("li")
    
    newEl.textContent = itemValue
    
    //Replace this with addToObtsinedList
    //Put code block below on event listener applied to every item in obtained list
    newEl.addEventListener("click", function() {
        let exactLocationOfItemInDB = ref(database, `items/${itemID}`)
        
        remove(exactLocationOfItemInDB)
    })
    
    shoppingListEl.append(newEl)
}

//TO-DO 
// - make it so that you can't add a blank entry 
// - add pop up message if same message is added twice 
// - have obtained items added to separate list 
//      - add delete button to this section in case of user errors 
// make it so that items in list can be delete by holding buttons down
// fix bug that delays the rerender after last item is deleted from list

