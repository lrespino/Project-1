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
var breakfast = '#breakfast';
var lunch = '#lunch';
var dinner = '#dinner';
var searchResults ="#searchResults"

var containers = [
   document.querySelector(breakfast),
   document.querySelector(lunch),
   document.querySelector(dinner),
   document.querySelector(searchResults)
];

dragula({
   containers: containers,
   revertOnSpill: true,
   copy: true
});

