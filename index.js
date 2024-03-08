import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://grocerylistapp-4e6af-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "items")
const obtainedListInDB = ref(database, "obtained")
const obtainedList = []


const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-list")
const obtainedListEl = document.getElementById("obtained-list")

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

function addToObtainedList(item){ 
    obtainedList.push(item)
    console.log(obtainedList)
}


function appendItemToShoppingListEl(item) {
    let itemID = item[0]
    let itemValue = item[1]

    let newEl = document.createElement("li")
    let listHeader = document.createElement("p")
    listHeader.innerText = "In cart:"
    
    newEl.textContent = itemValue
    
    newEl.addEventListener("click", function() {
        if (obtainedList.length === 0){ 
            addToObtainedList(newEl.innerText)
            push(obtainedListInDB, newEl.innerText)
            obtainedListEl.append(listHeader)
            obtainedListEl.append(newEl)
            let exactLocationOfItemInDB = ref(database, `items/${itemID}`)
            remove(exactLocationOfItemInDB)
        } else {
            addToObtainedList(newEl.innerText)
            push(obtainedListInDB, newEl.innerText)
            obtainedListEl.append(newEl)
            let exactLocationOfItemInDB = ref(database, `items/${itemID}`)
            remove(exactLocationOfItemInDB)


        }
    }, { once : true })

    shoppingListEl.append(newEl)
}



console.log(obtainedList)

//TO-DO 
// - make it so that you can't add a blank entry 
// - add pop up message if same message is added twice 
// - have obtained items added to separate list 
//      - add delete button to this section in case of user errors 
// make it so that items in list can be delete by holding buttons down
// fix bug that delays the rerender after last item is deleted from list

