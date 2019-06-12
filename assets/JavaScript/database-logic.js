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

var database = firebase.database();// Initialize Firebase (YOUR OWN APP)
const auth = firebase.auth();

// listen for auth status changes
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        console.log("User id: " + user.uid);

    } else {
        console.log("no one is signed in")
        self.location.href = ("index.html"), event.preventDefault();
    }
});

// logout
$("#logout").on("click", function (event) {
    event.preventDefault();
    auth.signOut().then(() => {
        console.log('user signed out');
    })
    self.location.href = ("index.html"), event.preventDefault()
});

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

    var recipeCard = $("<div>").addClass("card ks-card");

    var img = $("<img>").addClass("card-img-top").attr("src", recipe.image);

    var cardBody = $("<div>").addClass("card-body");

    var title = $("<h5>").addClass("card-title").text(recipe.label);

    var heartButton = $("<button>").addClass("far fa-heart favoriteButton fa-lg toggleFavBut mb-2");

    var recipeButton = $("<a>").addClass("ks-button-recipe").attr("href", recipe.url).attr("target", "_blank").text("Recipe ");

    var externalSite = $("<i>").addClass("fas fa-external-link-alt fa-xs");

    var ingredientsButton = $("<button>").addClass("ks-button-recipe ingredientsButtonClick").attr("data-toggle", "modal").attr("data-target", "#ingredientsModal").text("Ingredients");

    var ingredients = $("<ul>").addClass("list-group list-group-flush hiddenIngredientList");

    /* Ingredients Modal Logic */
    $(".ingredientsButtonClick").on("click", function () {
        $(".modalDump").empty();
        var clickedRecipeCard = $(this).parent();
        var ingredients = clickedRecipeCard.find
            (".hiddenIngredientList").html();
        console.log(ingredients);
        $(".modalDump").html(ingredients);
    });

    recipe.ingredientLines.forEach(function (ingredient) {
        var li = $("<li>").addClass("list-group-item").text(ingredient);
        ingredients.append(li);
    });

    recipeButton.append(externalSite);

    cardBody.append(title, heartButton, ingredients, ingredientsButton, recipeButton);

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

