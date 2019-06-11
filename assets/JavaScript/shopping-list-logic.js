// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyD1QZPPXVch374zmfIXCYp5OiSztaWiq_c",
    authDomain: "recipe-test-af18f.firebaseapp.com",
    databaseURL: "https://recipe-test-af18f.firebaseio.com",
    projectId: "recipe-test-af18f",
    storageBucket: "recipe-test-af18f.appspot.com",
    messagingSenderId: "624361802599",
    appId: "1:624361802599:web:6972545a765e6323"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();// Initialize Firebase (YOUR OWN APP)

var weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Satruday', 'Sunday'];
var shoppingList = [];



function initializeShoppingList() {
    weekdays.forEach(function (weekday) {
        getSavedRecipes(weekday);
    });

}

function printShoppingList() {

}

initializeShoppingList().then(function () {
    var list = $("<ul>");

    console.log("Shopping list: " + shoppingList);
    shoppingList.forEach(function (groceryItem) {
        var li = $("<li>").text(groceryItem);
        list.append(li);
    });

    $("#listContainer").append(list);

});




function getSavedRecipes(day) {
    firebase.database().ref('/weeklyPlan/' + day).once('value').then(function (snapshot) {
        snapshot.forEach(function (child) {
            //This is the recipe object that we use through out the application
            var recipe = child.val().recipe
            console.log(recipe);

            buildShoppingList(recipe.ingredientLines);
        });
    });

}

function buildShoppingList(ingredients) {

    ingredients.forEach(function (ingredient) {
        var parsedIngredient = '';
        //Strip out the measurements and additional instructions for each ingredient line
        var ingredientWords = ingredient.split(' ');
        for (var i = 2; i < ingredientWords.length; i++) {
            parsedIngredient += ingredientWords[i] + " ";

        }

        parsedIngredient = parsedIngredient.split(',')[0];

        addToList(parsedIngredient);
    });

}

//check if this item is already on the list
function addToList(item) {
    var duplicate = false;
    shoppingList.forEach(function (listItem) {
        if (item === listItem) {
            duplicate = true;;
        }
    });
    if (!duplicate) {
        shoppingList.push(item);
    }
    console.log(shoppingList);

}


