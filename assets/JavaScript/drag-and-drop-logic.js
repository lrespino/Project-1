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

var breakfast = '#breakfast';
var lunch = '#lunch';
var dinner = '#dinner';
var searchResults = "#searchResults"

var containers = [
    document.querySelector(breakfast),
    document.querySelector(lunch),
    document.querySelector(dinner),
    document.querySelector(searchResults),
    document.querySelector(".carousel-item"),
    document.querySelector("#firstSlide"),
    document.querySelector("#secondSlide"),
    document.querySelector("#thirdSlide"),
];

dragula({
    containers: containers,
    //  revertOnSpill: true,
    //   copy: true
    copy: function (el, containers) {
        return $(containers).attr('class').match('carousel-item');
    },
    removeOnSpill: true,
});

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
