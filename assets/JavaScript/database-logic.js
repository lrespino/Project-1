// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCb8riZvb8Jlnep5_bSG3_BvseXedeH7HE",
    authDomain: "recipe-app-74786.firebaseapp.com",
    databaseURL: "https://recipe-app-74786.firebaseio.com",
    projectId: "recipe-app-74786",
    storageBucket: "recipe-app-74786.appspot.com",
    messagingSenderId: "588767138515",
    appId: "1:588767138515:web:00bcab0cd40afe4c"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// VARIABLES
// --------------------------------------------------------------------------------

var database = firebase.database();// Initialize Firebase (YOUR OWN APP)

var currentDay = "Monday";

console.log("database set up")

$(".ks-weekButtons").on("click", function () {
    console.log($(this).attr("id"));
    currentDay = $(this).attr("id");

    $("#breakfast").empty();
    $("#lunch").empty();
    $("#dinner").empty();

    getSavedRecipes(currentDay);

})



$("#save").on("click", function () {
    console.log("saving recipes...");

    $("#dailyMealsContainer").find(".card").each(function () {
        var ingredients = [];

        //build an array of the ingredients for the recipe that was clicked
        $(this).find(".list-group-item").each(function () {
            ingredients.push($(this).text())
        })

        var recipe = {
            image: $(this).find(".card-img-top").attr("src"),
            label: $(this).find(".card-title").text(),
            ingredientLines: ingredients,
            url: $(this).find("a").attr("href")
        };

        console.log(recipe);
        //Save the recipe to Firebase
        database.ref("weeklyPlan/" + currentDay).push({
            recipe: recipe
        });
    });
})


// database.ref().on("child_added", function (snapshot, prevChildKey) {
//     var recipe = snapshot.val().recipe;
//     console.log(recipe);
//     buildRecipeCard(recipe);
//     index++;
// });

function getSavedRecipes(day) {
    var index = 0;
    firebase.database().ref('/weeklyPlan/' + day).once('value').then(function (snapshot) {
        snapshot.forEach(function (child) {
            //This is the recipe object that we use through out the application
            var recipe = child.val().recipe
            buildSavedRecipeCard(recipe, index);
            index += 1;
            console.log(child.val().recipe);
        });
    });

}

function buildSavedRecipeCard(recipe, index) {
    console.log("building cards");
    console.log(index);
    var recipeCard = $("<div>").addClass("card d-flex justify-content-center");

    var img = $("<img>").addClass("card-img-top").attr("src", recipe.image);
    var cardBody = $("<div>").addClass("card-body");
    var title = $("<h5>").addClass("card-title").text(recipe.label);
    var heartButton = $("<button>").addClass("far fa-heart favoriteButton fa-lg toggleFavBut mb-2");
    var recipeButton = $("<a>").addClass("ks-button-recipe").attr("href", recipe.url).text("Recipe Details")

    var ingredientsButton = $("<button>").addClass("ks-button-recipe").attr("data-toggle", "collapse")
        .attr("data-target", "#" + index).attr("aria-controls", index).text("Ingredients");

    var ingredientsCollapse = $("<div>").addClass("collapse").attr("id", index);

    var ingredients = $("<ul>").addClass("list-group", "list-group-flush");

    ingredientsCollapse.append(ingredients);

    recipe.ingredientLines.forEach(function (ingredient) {
        var li = $("<li>").addClass("list-group-item").text(ingredient);
        ingredients.append(li);
    });

    cardBody.append(title, heartButton, ingredientsButton, ingredientsCollapse, recipeButton);

    recipeCard.append(img, cardBody);

    if (index === 0) {
        $("#breakfast").append(recipeCard);
    }
    else if (index === 1) {
        $("#lunch").append(recipeCard);
    }
    else if (index === 2) {
        $("#dinner").append(recipeCard);
    }

}

