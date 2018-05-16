// OOP way ES5
// function Slider(container, nav) {
// 	this.container = container;
// 	this.nav = nav.show(); // to show navigation buttons
//
// 	this.imgs = this.container.find('img');
// 	this.imgWidth = this.imgs[0].width; // 600
// 	this.imgsLen = this.imgs.length;
//
// 	this.current = 0;
// }
//
// Slider.prototype.transition = function (coordinates) { // you can use custom pixel coordinates
//     this.container.animate({
//         'margin-left' : coordinates || -(this.current * this.imgWidth) // 2 * 600 = -1200
//     })
// };
//
// Slider.prototype.setCurrent = function (direction) { // direction = $(this).data('dir')
//     let position = this.current;
//     position += (~~(direction === 'next') || -1); // ~~ translate true=1, false=0 (1 is truly, we stop; 0 is falsy, we pass the || and get '-1')
//     this.current = (position < 0 ) ? this.imgsLen -1 : position % this.imgsLen; // when negative, then 4 % 4 = 0, reset position value
//     return position;
// };
//
// const slider = new Slider($('div.slider'), $('#slider-nav'));

//ES6 Classes version
class ES6Slider {
    constructor(container, nav) {
        this.container = container;
        this.nav = nav.show();

        this.imgs = this.container.find('img');
        this.imgWidth = this.imgs[0].width; // 600
        this.imgsLen = this.imgs.length;

        this.current = 0;
    }
    transition(coordinates) { // you can use custom pixel coordinates
        this.container.animate({
            'margin-left' : coordinates || -(this.current * this.imgWidth) // 2 * 600 = -1200
        })
    }
    setCurrent(direction) { // direction = $(this).data('dir')
        let position = this.current;
        position += (~~(direction === 'next') || -1); // ~~ translate true=1, false=0 (1 is truly, we stop; 0 is falsy, we pass the || and get '-1')
        this.current = (position < 0 ) ? this.imgsLen -1 : position % this.imgsLen; // when negative, then 4 % 4 = 0, reset position value
        return position;
    }
}

// const slider = new ES6Slider($('div.slider'), $('#slider-nav'));

