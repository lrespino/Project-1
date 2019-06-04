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
dragula([left], { removeOnSpill: true });
dragula([left, right], { copy: true });

