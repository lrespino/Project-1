/* $('.toggleFavBut').click(function () {
    console.log("favorited")
    $(this).toggleClass('favoriteButton far');
    $(this).toggleClass('favoritedButton fas fa-2x');
});
 */
var userID;
var favorites = "";
$(document).on("click", ".toggleFavBut", function () {
    console.log("favorited")
    $(this).toggleClass('favoriteButton far');
    $(this).toggleClass('favoritedButton fas fa-2x');
    
        var ingredients = [];

        //build an array of the ingredients for the recipe that was clicked
    $(this).parent().parent().find(".list-group-item").each(function () {
        ingredients.push($(this).parent().parent().text())
        })
        var recipe = {
            image: $(this).parent().parent().find(".card-img-top").attr("src"),
            label: $(this).parent().parent().find(".card-title").text(),
            ingredientLines: ingredients,
            url: $(this).parent().parent().find("a").attr("href")
        };
    console.log($(this).parent().parent().find(".card-img-top").attr("src"));
        pushFavorites(recipe);
});
var userID;

var favorites= "";
//Save the recipe that the user has selected to the database 
function pushFavorites(recipe) {
    //Save the recipe to Firebase
    database.ref(userID + "/favorites").push({
        recipe: recipe
    });
}

/* 

var meals = ['breakfast', 'lunch', 'dinner'];
//retrieve the current user's recipes from the database for the given day
function getFavorites(day) {

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

function removeFavoritesFromDB(meal) {
    console.log("removing favorite recipe from database...");
    firebase.database().ref(userID + '/' + currentDay).child(meal).remove();
}   */