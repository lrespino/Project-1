$(".favoriteButton").on("click", function () {
    console.log("adding to favorites...");

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

        pushFavorites(recipe, meal);

    });
})

//Save the recipe that the user has selected to the database 
function pushFavorites(recipe, meal) {
    //Save the recipe to Firebase
    database.ref(userID + '/' + favorites + "/" + meal).set({
        recipe: recipe
    });

}






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
}