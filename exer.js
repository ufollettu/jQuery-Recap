// create a fadeSlideToggle() method that combine fadeToggle() and slideToggle()
// use animate() to do that
// Hint: jQuery allows to pass the string "toggle" as a value for height and opacity
// When finished the method should be called like so: $('#box').fadeSlideToggle()

// const box = {
//     id: $('div.box'),
//     fadeSlideToggle: function () {
//         this.id.animate({
//             'height': 'toggle',
//             'opacity': 'toggle'
//         }, 2000)
//     }
// };


$.fn.fadeSlideToggle = function (speed, cb) { // set a new method to prototype (set speed and callback fn too
    return $(this).animate({ // best practice is to return jQuery object to eventually continue chaining
        'height': 'toggle',
        'opacity': 'toggle'
    }, speed || 2000, cb)
};

// to call with box id
// $('#box').fadeSlideToggle()