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

weekdays.forEach(function (weekday) {
    getSavedRecipes(weekday);
})

function getSavedRecipes(day) {
    firebase.database().ref('/weeklyPlan/' + day).once('value').then(function (snapshot) {
        snapshot.forEach(function (child) {
            //This is the recipe object that we use through out the application
            var recipe = child.val().recipe
            buildShoppingList(recipe.ingredientLines)
        });
    });
}

function buildShoppingList(ingredients) {
    var list = $("<ul>");

    ingredients.forEach(function (ingredient) {
        list.append("<li><input type='checkbox'>" + ingredient + "</li>");
    });

    $("#listContainer").append(list);
}


