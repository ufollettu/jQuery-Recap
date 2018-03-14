// $(document).ready(function () {
//     $("button").click(function () {
//         $("#test").hide();
//     });
// });

$(function () {
    $("button").click(function () {
        $("#test").hide();
    });
});

// querying the DOM
// selectors:
$('ul.emphasis').children('li').css('color', 'green'); // get the children element of a tag
$('ul.emphasis').find('li').css('color', 'green'); // get the children element of a tag

// get the child of an element
$('ul.emphasis').children('li:first').css('color', 'green'); // 'li:first' custom jquery selector
$('ul.emphasis').children('li').first().css('color', 'green'); // 'first()' custom jquery method
$('ul.emphasis').children('li').eq(0).css('color', 'green'); // 'eq(0)' find the child item '0' (the first item)
$('ul.emphasis').children('li').eq(0).next().css('color', 'green'); // 'next()' return the element after item '0'
$('ul.emphasis').children('li').eq(0).prev().css('color', 'green'); // 'prev()' return the element before item '0'

// parent and parents
$('li').parent().addClass('greenColor'); // get the direct parent of the list item
$('li').parent('ul').addClass('greenColor'); // get the ul direct parent of the list item
$('li').parents('div').removeClass('greenColor'); // get all the div parents of the list item
$('li').closest('div').removeClass('greenColor'); // get the first element that matches 'div' of the list item


// Events

(function () { // use IIF
    const link = $('link');
    // $('button').click(function () {
    $('button').on('click', function () {
        const $this = $(this); // convention to grab jQuery this

        const uls = $('ul'); // local variable. Caching all uls in a const to improve performance
        uls.click();
        uls.find('li');
        // ...

        // <button>Day</button>
        // <button>Night</button>
        const stylesheet = $this.text().toLowerCase(); // 'day' or 'night'
        link.attr('href', stylesheet + '.css'); // set a stylesheet basing on element text content

        // <button data-file="day">Day</button>
        // <button data-file="night">Night</button>
        const stylesheet_1 = $this.data('file'); // 'day' or 'night' using data attribute
        link.attr('href', stylesheet_1 + '.css'); // set a stylesheet basing on element text content

        $this
            .siblings('button') // refers to all the element at the same level of this
            .removeAttr('disabled') // remove an attribute to the siblings buttons
            .end() // de-select siblings() stops jQuery chain execution
            .attr('disabled', 'disabled'); // now you can set a new attribute to 'this' button
    })
})();

// More Events
// toggling animation effect on mouseenter
(function() {
    // <dl>
    //     <dt>What are your hours?</dt>
    //     <dd>We are open 24/7.</dd>
    //     <dt>What are your hours?</dt>
    //     <dd>We are open 24/7.</dd>
    //     <dt>What are your hours?</dt>
    //     <dd>We are open 24/7.</dd>
    //     <dt>What are your hours?</dt>
    //     <dd>We are open 24/7.</dd>
    //     <dt>What are your hours?</dt>
    //     <dd>We are open 24/7.</dd>
    // </dl>
    const dd = $('dd');
    //useful animation methods:
    dd.hide();
    dd.show();
    dd.fadeIn();
    dd.slideDown();
    dd.slideUp();
    dd.toggle();

    dd.filter(':nth-child(n+4)').addClass('hide'); // ':nth-child(n+4)' select from the fourth dd element to the end of the list

    $('dl').on('mouseenter', 'dt', function() { // 'dt' is a selector string to use into the cb fn:
        // cb fn runs only on dt elements for better performance!

        //without animation
        $(this) // this is a dl
            .next() // next is dd
            .show()
            .siblings('dd') // get all the other dd elements
            .hide();

        //with animation
        $(this) // this is a dl
            .next() // next is dd
            .slideDown(200)
            .siblings('dd') // get all the other dd elements
            .slideUp(200);
    });
})();

//Bind Live Delegate (deprecated methods)
(function () {
    //bind() --> deprecated: use on();
    $('h2').bind('click', function () { // bind append an event to all the h2 elements
        console.log('clicked');
        $(this).clone(true).appendTo('body'); // the newly created h2 element doesn't have the event set
            // setting clone(true) allow to bind the event to the newly created h2 element too
    });

    //live() --> deprecated use on();
    $('h2').live('click', function () { // live detect when the element that have the handler is an h2
        console.log('clicked');
        $(this).clone().appendTo('body'); // the newly created h2 element have the event set yet!
    });

    //delegate() --> deprecated use on();
    $('div.container').delegate('h2', 'click', function () { // delegate use the parent element to set the contest
        console.log('clicked');
        $(this).clone().appendTo('.container'); // the newly created h2 element have the event set yet!
    });
})();

// Creating and Appending Content to the DOM

(function() {

// <article>
//     <h1>My Awesome Post</h1>
//     <p>
//     Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
//         tempor incididunt ut labore et dolore magna aliqua.
//     </p>
//     <p>
//     <span class=co>Lorem ipsum dolor sit amet</span>, consectetur adipisicing elit, sed do eiusmod
//     tempor incididunt ut labore et dolore magna aliqua. sed do eiusmod
//         tempor incididunt ut labore et dolore magna aliqua. sed do eiusmod
//         tempor incididunt ut labore et dolore magna aliqua. sed do eiusmod
//         tempor incididunt ut labore et dolore magna aliqua. sed do eiusmod
//         tempor incididunt ut labore et dolore magna aliqua.
//     </p>
//     <p>
//     Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
//         tempor incididunt ut labore et dolore magna aliqua.
//     </p>
//     <p>
//     Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
//         tempor incididunt ut labore et dolore magna aliqua.
//     </p>
//     <p>
//     Consectetur adipisicing elit, sed do eiusmod
//         tempor incididunt ut labore et dolore magna aliqua. sed do eiusmod
//         tempor incididunt ut labore et dolore magna aliqua. sed do eiusmod
//         tempor incididunt ut labore et dolore magna aliqua. <span class=co>Hello from JavaScript.</span> sed do eiusmod
//     tempor incididunt ut labore et dolore magna aliqua. sed do eiusmod
//         tempor incididunt ut labore et dolore magna aliqua.
//     </p>
// </article>

    $('article').append('ciaone'); // append ciaone to the bottom of the article
    $('article').prepend('ciaone'); // append ciaone to the top of the article
    $('h1').after('ciaone'); // append ciaone after 'h1' tag
    $('p').first().before('ciaone'); // append ciaone before  the first 'p' tag

    //appendTo() e prependTo()
    $('<h2></h2>', { // create the tag, then pass an object with parameters
        text: 'ciaone',
        class: 'myClass'
    }).appendTo('article'); // prependTo('article') has the same syntax

    // insertAfter() e insertBefore();
    $('<h2></h2>', { // create the tag, then pass an object with parameters
        text: 'ciaone',
        class: 'myClass'
    }).insertAfter('h1'); // similar to .after(); but with newly created element

    $('h1').appendTo('article'); // when you call appendTo with an existing element,
    // then jQuery move the selected element
    $('p').eq(0).after($('h1')); // move the h1 after the first p

    // real case studio --> insert a blockquote with the content of a span
    //
    const co = $('article').find('span.co').each(function() { // each() let us to work with all the founded 'span.co' element
        const $this = $(this); // this is the span (cached)

        $('<blockquote></blockquote>', { // we want to create a blockquote into a span
            class: 'co', // give a class name to blockquote
            text: $this.text() // this is the span
        }).prependTo( $this.closest('p') ); // prepend only in the closest 'p' element parent to span
    });

})();