$(document).ready(function () {
    console.log("ready!");

    /*     var box = document.getElementsByClassName('box')[0]
        var containers = document.getElementsByClassName('holder')
        for (var container of containers) {
            container.addEventListener("dragover", dragover)
            container.addEventListener("dragenter", dragenter)
            container.addEventListener("drop", drop)
        }
    
        function dragover(e) {
            e.preventDefault()
        }
        function dragenter(e) {
            e.preventDefault()
        }   
        function drop() {
            this.append(box)
        } 
     */

});

/* dragula([left, right]); */



/*  dragula([left, right]);
dragula([containers], { removeOnSpill: true });
dragula([containers, searchResults], { copy: true }); */


/* var containers = $('.drag-container').toArray();
containers.concat($('#searchResults').toArray());
dragula(containers, {
    isContainer: function (el) {
        return el.classList.contains('drag-container');
    }
}); */

/* var elementWrapper = $("#elementWrapper");

$(elementWrapper).find(".drag-container").each(function (e) {
    var left = $(this)[0];
    var searchResults = document.getElementById("searchResults");
    var containers = [left, searchResults];
    dragula(containers, {
        copy: function (el, source) {
            return source === document.getElementById(left)
        },
        accepts: function (el, target) {
            return target !== document.getElementById(left)
        },
        copy: true
    });
}); */

/* dragula(containers, {
    copy: function (el, containers) {
        return $(containers) //elements are copied only if they are not already copied ones. That enables the 'removeOnSpill' to work
    },
    removeOnSpill: true
}) */

/* dragula(containers, {
    accepts: function (el, target, source, sibling) {
        return $(target).attr('id') == "gadget_drop"; // elements can be dropped only in 'to_drop_to' container
    },
    copy: function (el, source) {
        return $(source).attr('id').match('drag'); //elements are copied only if they are not already copied ones. That enables the 'removeOnSpill' to work
    },
    removeOnSpill: true
} */



// var img = $("<img>").addClass("card-img-top").attr("src", recipe.image);
//         var cardBody = $("<div>").addClass("card-body");
//         var truncatedTitle = truncate(recipe.label);
//         var title = $("<h5>").addClass("card-title").text(truncatedTitle);
//         var heartButton = $("<button>").addClass("far fa-heart favoriteButton toggleFavBut mb-2");
//         var newLine = $("<br>");
//         var recipeButton = $("<a>").addClass("ks-button-recipe").attr("href", recipe.url).attr("target", "_blank").text("Recipe");
//         var externalSite = $("<i>").addClass("fas fa-external-link-alt fa-xs");


        
//         var ingredientsButton = $("<button>").addClass("ks-button-recipe").attr("data-toggle", "modal").attr("data-target", "#"+ index).attr("aria-controls", index).text("Ingredients");


//         var ingredientsModal = $("<div>").addClass("modal fade").addId("#" + index).attr("id", index).attr("tabindex", "-1").attr("aria-hidden", "true").attr("role", "dialog");

//         var modalDialog = $("<div>").addClass("modal-dialog").attr("role", "document");
//         var modalContentDiv = $("<div>").addClass("modal-content");
//         var modalDialogComplete = modalDialog.modalContentComplete;

//         var modalContent = modalContentDiv.modalHeader.modalBody.modalFooter;


//         var modalHeaderDiv = $("<div>").addClass("modal-header");
//         var modalH5 = $("<h5>").adClass("modal-title").addId("exampleModalLongTitle").text("Ingredients");
//         var modalHeader = modalHeaderDiv.modalH5.modalHeaderClose;
        
//         var modalCloseX = $("<button>").attr("type", "button").addClass("close").attr("data-dismiss", "modal").attr("aria-label", "Close");
//         var closeSymbol = $("<span>").attr("aria-hidden", "true").text("&times;");
//         var modalHeaderClose = modalCloseX.closeSymbol;

//         var modalBody = $("<div>").addClass("modal-body").append(ingredients[index]);

//         var modalFooterDiv = $("<div>").addClass("modal-footer");
//         var footerCloseBtn = $("<button>").addClass("ks-button").attr("data-dismiss", "modal").text("Close");
//         var modalFooter = modalFooterDiv.footerCloseBtn;

//         var ingredientsModalcomplete = ingredientsModal.modalDialogComplete;

        

//         var ingredients = $("<ul>").addClass("list-group", "list-group-flush");

//         recipeButton.append(externalSite);
//         ingredientsModalcomplete.append(index);

//         recipe.ingredientLines.forEach(function (ingredient) {
//             var li = $("<li>").addClass("list-group-item").text(ingredient);
//             ingredients.append(li);
//         });

        
//         $(".modalDump").append(ingredientsModal);

//         cardBody.append(title, heartButton, newLine, ingredientsButton, recipeButton);

//         recipeCard.append(img, cardBody);