var breakfast = '#breakfast';
var lunch = '#lunch';
var dinner = '#dinner';
var searchResults = "#searchResults"

var containers = [
    document.querySelector(breakfast),
    document.querySelector(lunch),
    document.querySelector(dinner),
    document.querySelector(searchResults)
];

dragula({
    containers: containers,
    //  revertOnSpill: true,
    //   copy: true
    copy: function (el, containers) {
        return $(containers).attr('id').match('searchResults');
    },
    removeOnSpill: true,
});
