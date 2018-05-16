// the procedural method
(function () {
    const sliderUL = $('div.slider').css('overflow', 'hidden').children('ul'); // overflow:hidden to overflow:scroll
    const imgs = sliderUL.find('img');
    const imgWidth = imgs[0].width; // 600
    const imgsLen = imgs.length; // 4
    let current = 1; // the current displayed image
    const totalImgsWidth = imgsLen * imgWidth; // 2400

    $('#slider-nav').show().find('button').on('click', function () { // hidden by default, now showed
        let direction = $(this).data('dir'); // 'prev' or 'next'
        let location = imgWidth;
        // update current value
        (direction === 'next') ? ++current : --current;

        // show correct current image
        if (current === 0) { // if first image and I press prev
            current = imgsLen; // set to the last image
            location = totalImgsWidth - imgWidth; // set location of pixel width to the end (1800)
            direction = 'next'; // invert the direction
        } else if(current -1 === imgsLen) { // if last image and I press next
            current = 1; // set to the first image
            location = 0; // set the pixel position width
        }
        
        transition(sliderUL, location, direction)

    }); 

    function transition(container, location, direction) {
        let unit; // -= or +=

        if (direction && location !== 0) {
            unit = (direction === 'next') ? '-=' : '+='
        }
        container.animate({
            // reduce margin to simulate slider
            'margin-left' : unit ? (unit + location) : location
            // if unit is not undefined, add location value, otherwise set it to zero
        });
    }
    
})(jQuery); // import jQuery in the function to avoid conflict with $ use












// (function($) {
// 	var sliderUL = $('div.slider').css('overflow', 'hidden').children('ul'),
// 		imgs = sliderUL.find('img'),
// 		imgWidth = imgs[0].width, // 600
// 		imgsLen = imgs.length, // 4
// 		current = 1,
// 		totalImgsWidth = imgsLen * imgWidth; // 2400
//
// 	$('#slider-nav').show().find('button').on('click', function() {
// 		var direction = $(this).data('dir'),
// 			loc = imgWidth; // 600
//
// 		// update current value
// 		( direction === 'next' ) ? ++current : --current;
//
// 		// if first image
// 		if ( current === 0 ) {
// 			current = imgsLen;
// 			loc = totalImgsWidth - imgWidth; // 2400 - 600 = 1800
// 			direction = 'next';
// 		} else if ( current - 1 === imgsLen ) { // Are we at end? Should we reset?
// 			current = 1;
// 			loc = 0;
// 		}
//
// 		transition(sliderUL, loc, direction);
// 	});
//
// 	function transition( container, loc, direction ) {
// 		var unit; // -= +=
//
// 		if ( direction && loc !== 0 ) {
// 			unit = ( direction === 'next' ) ? '-=' : '+=';
// 		}
//
// 		container.animate({
// 			'margin-left': unit ? (unit + loc) : loc
// 		});
// 	}
//
// })(jQuery);