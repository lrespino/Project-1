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

//Global variable used to hold the current users unique ID
var userID;

//Global variable used to keep track of the day the user is currently viewing
var currentDay = "Monday";

//Get the user id of the current user
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        userID = user.uid;
        console.log("User id: " + userID);
        getSavedRecipes(currentDay);

    } else {
        console.log("no one is signed in")
        self.location.href = ("index.html"), event.preventDefault();
    }
});

// click handler for logout
$("#logout").on("click", function (event) {
    event.preventDefault();
    auth.signOut().then(() => {
        console.log('user signed out');
    })
    self.location.href = ("index.html"), event.preventDefault()
});

//click handler for weekday buttons
$(".ks-weekButtons").on("click", function () {
    console.log($(this).attr("id"));
    currentDay = $(this).attr("id");

    $("#breakfast").empty();
    $("#lunch").empty();
    $("#dinner").empty();

    getSavedRecipes(currentDay);

})

//Click handler to save the recipes the user has chosen
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

        var meal = $(this).parent().attr("id");
        console.log(meal);

        pushSavedRecipe(recipe, meal);

    });
})

//Save the recipe that the user has selected to the database 
function pushSavedRecipe(recipe, meal) {
    //Save the recipe to Firebase
    database.ref(userID + '/' + currentDay + "/" + meal).set({
        recipe: recipe
    });

}
var meals = ['breakfast', 'lunch', 'dinner'];
//retrieve the current user's recipes from the database for the given day
function getSavedRecipes(day) {

    meals.forEach(function (meal) {
        firebase.database().ref(userID + '/' + day + '/' + meal).once('value').then(function (snapshot) {
            snapshot.forEach(function (child) {
                //This is the recipe object that we use through out the application
                var recipe = child.val();
                console.log(recipe);
                console.log(meal);
                buildSavedRecipeCard(recipe, meal);

            });
        });
    })


}

function buildSavedRecipeCard(recipe, meal) {
    console.log("building cards...");


    var recipeCard = $("<div>").addClass("card ks-card");

    var img = $("<img>").addClass("card-img-top").attr("src", recipe.image);

    var cardBody = $("<div>").addClass("card-body");

    var title = $("<h5>").addClass("card-title").text(recipe.label);

    var heartButton = $("<button>").addClass("far fa-heart favoriteButton fa-lg toggleFavBut mb-2");

    var recipeButtonHolder = $("<span>").addClass("recipe-link")
    var recipeButton = $("<a>").addClass("ks-button-close").attr("href", recipe.url).attr("target", "_blank").text("Recipe ");


    var externalSite = $("<i>").addClass("fas fa-external-link-alt fa-xs");

    var ingredientsButton = $("<button>").addClass("ks-button-recipe ingredientsButtonClick").attr("data-toggle", "modal").attr("data-target", "#ingredientsModal").text("Ingredients");

    var ingredients = $("<ul>").addClass("list-group list-group-flush hiddenIngredientList");

    /* Ingredients Modal Logic */
    $(".ingredientsButtonClick").on("click", function () {
        $(".modalDump").empty();
        $(".recipe-dump").empty(); //recipe link
        var clickedRecipeCard = $(this).parent();
        var ingredients = clickedRecipeCard.find(".hiddenIngredientList").html();
        console.log("ingredients are" + ingredients);
        $(".modalDump").html(ingredients);
        var recipeButtonHolder = clickedRecipeCard.find(".recipe-link").html(); //recipe link
        console.log("recipe link " + recipe.url); //recipe link
        $(".recipe-dump").html(recipeButtonHolder); //recipe link
    });

    recipeButtonHolder.append(recipeButton)

    recipe.ingredientLines.forEach(function (ingredient) {
        var li = $("<li>").addClass("list-group-item").text(ingredient);
        ingredients.append(li);
    });
    cardBody.append(title, heartButton, ingredients, ingredientsButton, recipeButtonHolder);
    
    recipeButton.append(externalSite);
    
    recipeCard.append(img, cardBody);

    if (meal === 'breakfast') {
        $("#breakfast").append(recipeCard);
    }
    else if (meal === 'lunch') {
        $("#lunch").append(recipeCard);
    }
    else if (meal === 'dinner') {
        $("#dinner").append(recipeCard);
    }
    //To toggle the favorite button when the card is in the meal plan
    $('.toggleFavBut').click(function () {
        console.log("favorited")
        $(this).toggleClass('favoriteButton far');
        $(this).toggleClass('favoritedButton fas fa-2x');
    });
}

function removeRecipeFromDB(meal) {
    console.log("removing saved recipe from database...");
    firebase.database().ref(userID + '/' + currentDay).child(meal).remove();
}

//Add event listener to our global drake variable to remove recipes from database
drake.on('remove', function (el, container, source) {
    //This is the element (card) that is being removed
    console.log(el);
    //This gives us the id of the container that we removed the card from
    console.log(source.id);

    removeRecipeFromDB(source.id);
    console.log("removed");
})