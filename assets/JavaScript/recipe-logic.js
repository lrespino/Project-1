
$("#submit").on("click", function (e) {

    e.preventDefault();

    var query = $("#searchTerm").val();

    console.log(query);
    var appKey = "ab75022db9057519bafaa14829512295";
    var appId = "cc950c0c";

    var queryURL = "https://api.edamam.com/search?q=" + query + "&app_id=" + appId + "&app_key=" + appKey + "&to=12";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var responseArr = response.hits;

        var recipes = [];

        //Strip out the unnecesarry parts of the JSON response so we are left with an array of recipe objects
        responseArr.forEach(function (element) {
            recipes.push(element.recipe);
        });

        buildRecipeCards(recipes);
        console.log(recipes);
        //Added the toggle fav function here so it can work with the loaded items
        $('.toggleFavBut').click(function () {
            console.log("favorited")
            $(this).toggleClass('favoriteButton far');
            $(this).toggleClass('favoritedButton fas fa-lg');
        });

    });
});

function truncate(word) {
    if (word.length > 23)
        return word.substring(0, 23) + '...';
    else
        return word;
};

//Given an array of recipes, dynamically generate cards to append to the page
function buildRecipeCards(recipes) {
    $("#firstSlide").empty();
    recipes.forEach(function (recipe, index) {
        console.log(index);
        var recipeCard = $("<div>").addClass("card ks-card");

        var img = $("<img>").addClass("card-img-top").attr("src", recipe.image);
        var cardBody = $("<div>").addClass("card-body");
        var truncatedTitle = truncate(recipe.label);
        var title = $("<h5>").addClass("card-title").text(truncatedTitle);
        var heartButton = $("<button>").addClass("far fa-heart favoriteButton toggleFavBut mb-2");
        var newLine = $("<br>");
        var recipeButton = $("<a>").addClass("ks-button-recipe").attr("href", recipe.url).text("Recipe")
        var externalSite = $("<i>").addClass("fas fa-external-link-alt fa-xs")
        var ingredientsButton = $("<button>").addClass("ks-button-recipe modalButton").attr("data-toggle", "collapse").attr("data-target", "#" + index).attr("aria-controls", index).text("Ingredients");
        recipeButton.append(externalSite);


        var ingredientsCollapse = $("<div>").addClass("collapse").attr("id", index);

        var ingredients = $("<ul>").addClass("list-group list-group-flush hiddenIngredientList");
        ingredientsCollapse.append(ingredients);

        recipe.ingredientLines.forEach(function (ingredient) {
            var li = $("<li>").addClass("list-group-item").text(ingredient);
            ingredients.append(li);
        });

        cardBody.append(title, recipeButton);

        recipeCard.append(img, cardBody);


        if (index < 4) {
            $("#firstSlide").append(recipeCard);
        }
        else if (index < 8) {
            $("#secondSlide").append(recipeCard);
        }
        else {
            $("#thirdSlide").append(recipeCard);
        }



        $('.carousel').carousel()




    });
}






/* Remove Button */
$("#removeButton").on("click", function () {
    $(".card").remove();
})
