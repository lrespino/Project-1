// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCb8riZvb8Jlnep5_bSG3_BvseXedeH7HE",
    authDomain: "recipe-app-74786.firebaseapp.com",
    databaseURL: "https://recipe-app-74786.firebaseio.com",
    projectId: "recipe-app-74786",
    storageBucket: "",
    messagingSenderId: "588767138515",
    appId: "1:588767138515:web:00bcab0cd40afe4c"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// VARIABLES
// --------------------------------------------------------------------------------

var database = firebase.database();// Initialize Firebase (YOUR OWN APP)

console.log("database set up")



database.ref().on("child_added", function (snapshot, prevChildKey) {
    var usersRecipes = snapshot.val();

});

// When the user clicks the submit button, add the info to the database
$("#searchResults").on("click", ".card", function (e) {
    e.preventDefault();
    console.log("submitted")

    var ingredients = [];

    //build an array of the ingredients for the recipe that was clicked
    $(this).find(".list-group-item").each(function () {
        ingredients.push($(this).text())
    })

    var recipe = {
        image: $(this).find(".card-img-top").attr("src"),
        label: $(this).find(".card-title").text(),
        ingredientLines: ingredients
    };

    console.log(recipe);

    //Save the recipe to Firebase
    database.ref().push({
        recipe: recipe
    });
});
