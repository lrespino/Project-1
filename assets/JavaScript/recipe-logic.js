
$("#submit").on("click", function (e) {

    e.preventDefault();

    var query = $("#searchTerm").val();

    console.log(query);
    var appKey = "ab75022db9057519bafaa14829512295";
    var appId = "cc950c0c";

    var queryURL = "https://api.edamam.com/search?q=" + query + "&app_id=" + appId + "&app_key=" + appKey + "&to=5";

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

//Given an array of recipes, dynamically generate cards to append to the page
function buildRecipeCards(recipes) {

    $("#searchResults").empty();
    recipes.forEach(function (recipe, index) {
        var recipeCard = $("<div>").addClass("card");

        var img = $("<img>").addClass("card-img-top").attr("src", recipe.image);
        var cardBody = $("<div>").addClass("card-body");
        var title = $("<h5>").addClass("card-title").text(recipe.label);
        var heartButton = $("<button>").addClass("far fa-heart favoriteButton toggleFavBut mb-2");
        var newLine = $("<br>");
        var recipeButton = $("<a>").addClass("ks-button-recipe").attr("href", recipe.url).text("Recipe")
        var externalSite= $("<i>").addClass("fas fa-external-link-alt fa-xs")
        var ingredientsButton = $("<button>").addClass("ks-button-recipe").attr("data-toggle", "collapse")

            .attr("data-target", "#" + index).attr("aria-controls", index).text("Ingredients");

        var ingredientsCollapse = $("<div>").addClass("collapse").attr("id", index);

        var ingredients = $("<ul>").addClass("list-group", "list-group-flush");
        recipeButton.append(externalSite)
        ingredientsCollapse.append(ingredients);

        recipe.ingredientLines.forEach(function (ingredient) {
            var li = $("<li>").addClass("list-group-item").text(ingredient);
            ingredients.append(li);
        });

        cardBody.append(title, heartButton, newLine, ingredientsButton, ingredientsCollapse, recipeButton);

        recipeCard.append(img, cardBody);

        $("#searchResults").append(recipeCard);


    });
}


/* Remove Button */
$("#removeButton").on("click", function(){
    $(".card").remove();
})


/* Gradient Logic */
var colors = new Array(
    [118,173,55],
    [144,238,144],
    [144,238,144],
    [46,139,87],
    [192,192,192],
    [107,142,35]);
  
  var step = 0;
  //color table indices for: 
  // current color left
  // next color left
  // current color right
  // next color right
  var colorIndices = [0,1,2,3];
  
  //transition speed
  var gradientSpeed = 0.002;
  
  function updateGradient()
  {
    
    if ( $===undefined ) return;
    
  var c0_0 = colors[colorIndices[0]];
  var c0_1 = colors[colorIndices[1]];
  var c1_0 = colors[colorIndices[2]];
  var c1_1 = colors[colorIndices[3]];
  
  var istep = 1 - step;
  var r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
  var g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
  var b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
  var color1 = "rgb("+r1+","+g1+","+b1+")";
  
  var r2 = Math.round(istep * c1_0[0] + step * c1_1[0]);
  var g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
  var b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);
  var color2 = "rgb("+r2+","+g2+","+b2+")";
  
   $(".gradient").css({
     background: "-webkit-gradient(linear, left top, right top, from("+color1+"), to("+color2+"))"}).css({
      background: "-moz-linear-gradient(left, "+color1+" 0%, "+color2+" 100%)"});
    
    step += gradientSpeed;
    if ( step >= 1 )
    {
      step %= 1;
      colorIndices[0] = colorIndices[1];
      colorIndices[2] = colorIndices[3];
      
      //pick two new target color indices
      //do not pick the same as the current one
      colorIndices[1] = ( colorIndices[1] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;
      colorIndices[3] = ( colorIndices[3] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;
      
    }
  }
  
  setInterval(updateGradient,8);