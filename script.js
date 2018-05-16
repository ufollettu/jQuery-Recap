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

// Effects and Structure

// Animated contact Form


(function() {

    $('html').addClass('js');

    const contactForm = {
        container: $('#contact'), // get cached contact form div
        config: {
            effect: 'slideToggle', // default animation effect
            speed: 500 // default speed is the default effect delay time
        },
        init: function () {
            $.extend(this.config, config); // override the config defaults
            $('<button></button>', { // create the button
                text: 'Contact Me'
            })
                .insertAfter('article:first')
                .on('click', this.show) // this is contactForm. show is without () because we don't wanna to execute before click event
        },
        show: function () {
            const cf = contactForm;
            const container = cf.container;
            const config = cf.config;

            if (container.is(':hidden')) { // to prevent click on button when contact form is showed
                cf.close.call(container); // immediately call close() method on #contact div to create close button
                container[config.effect](config.speed); // cannot use this because this is the button we created in this case
            }
        },
        close: function () {
            const $this = $(this); // this == contactForm
            if ($this.find('span.close').length) return; // check if the X button exist in the DOM;
            // .length because we need to say to jQuery "hey, the returned object has a length, so it exists in the DOM"
            $('<span class="close">X</span>') // create the closing button
                .prependTo(this)
                .on('click', function () {
                    $this[contactForm.config.effect](contactForm.config.speed); // this here is span, we must use $this variable
                })
        }
    };

    // override contactForm.config (only the passed keys)
    contactForm.init({
        effect: 'fadeToggle',
        speed: 2000

    });

})();

// this keyword
const obj = {
    doIt: function (e) {
        console.log(this); // this == obj
        e.preventDefault();
    }
};

// this with call() or apply()
$('a').on('click', function () {
    // this == anchor that was clicked
    obj.doIt.call(this) // without '.call(this)' we have that 'this' == obj
});

// this with jQuery proxy (check ES6 proxy...)
$('a').on('click', $.proxy(obj.doIt, obj)); // pass a method (obj.doIt) to a referred object (obj)


function soSomething(e) {
    e.preventDefault(); // prevent default behaviour of a tag
    console.log(this);
}

// effect speeds

$('div.content').hide();

// $.fx.speeds._default = 2000; // retrieve the speed settings in jQuery
$.fx.speeds.tortoise = 5000; // you can change the speed adding a new value (ex.: tortoise)

$('h1').on('click', function() {
    $(this).next().slideDown('fast'); // you can use slow, fast, _default, tortoise
});

$.fn.flashFlash = function() {
    $(this).slideDown(500, function() {
        $(this).delay(1000).slideUp(500);
    })
};

$('div').flashFlash();

// Custom effects

(function() {
    const content = $('div.content').hide(); // you can attach a method to the element

    // from jQuery.fn (equals to jQuery.prototype.fn)
    jQuery.fn.flash = function( speed, easing, callback ) {
        const $this = $(this);

        return $this.slideDown(500, function() {
            $this.delay(2000).slideUp(500); // execute after slideDown effect
        });
    };

    $('h1').on('click', function() {
        content.flash();
    });
})();

// The Animate Method

// <div class="box">
//     <h2>Some Content Here</h2>
// <p>
// Lorem ipsum dolor sit amet, consectetur adipisicing elit.
//     Animi consequatur consequuntur corporis dolores,
//     ducimus explicabo ipsam nulla, omnis reprehenderit sint,
//     voluptas voluptate! Aspernatur at enim esse fugiat nemo,
//     odit repellendus!
// </p>
// </div>
//
// <p>
// <button id="increase">Increase</button>
// <button id="center">Center</button>
// </p>

(function () {
    const box = $('div.box');
    fontSize = parseInt(box.css('font-size'), 10); // convert string to number JS way

    $('button#increase').on('click', function () {
        // increase font-size JS way
        box.css('font-size', fontSize += 5); // increase font-size JS way

        // increase font-size JQuery way 1
        box.animate({ //pass an object of css properties and animate them
            'font-size': '+=5',  // increase font-size JQuery way
            'width': '+=300' // change width
        }, 500, 'linear', function () { // {obj}, speed, easing, callback fn
            console.log('completed');
        });

        // increase font-size JQuery way 2
        box.animate({ //pass an object of css properties and animate them
            'font-size': '+=5'  // increase font-size JQuery way
        }, {
           duration: 500,
           complete: function () { // you can pass an object as second parameter
               console.log('complete');
           },
            step: function () { // get step by step moment of the animation
                console.log('The current font-size is ' + $(this).css('font-size'));
            }
        });

        // increase font-size JQuery way 3
        box
            .animate({'font-size': '+=5'}, {duration: 500})
            // .animate({'top': 500}, 3000) // stacked animation starts after the prev animation ends
            .animate({'top': 500}, {duration: 3000}, {queue: false}); // queue: false the animations starts together


    });


    const w = $(window).width() / 2 - box.outerWidth / 2; // outerWidth include width, margin and padding
    const h = $(window).height / 2 - box.outerHeight() / 2; // outerHeight include width, margin and padding

    $('button#center').on('click', function () {
        // center div
        box.animate({
            'left': w,
            'top': h,
            'position': 'absolute'
        });
    });

    $('button#center').on('click', function () {
        // change border radius with css
        box.addClass('rounded'); // use of css animation for better performance
    });

})();

// jQuery Slider (see folders)

// Each and Templating

//TEMPLATE:
//
// <script id="blogTemplate" type="my/template">
//     <h2> {{title}}</h2>
//     <img src={{thumbnail}} alt={{title}}>
// </script>

(function () {
    const content = [{ // array of objects simulate json file passed from backend
        title: 'My post',
        thumbnail: 'http://qnimate.com/wp-content/uploads/2014/03/images2.jpg'
    }, {
        title: 'My second post',
        thumbnail: 'http://qnimate.com/wp-content/uploads/2014/03/images2.jpg'
    }];

    const template = $.trim(('#blogTemplate').html());
    let frag = ''; // cache content array before passing to the DOM for better performance

    $.each(content, function (index, value) { // .each() syntax: (Array, cb(index, Object))
        frag += template.replace(/{{title}}/ig, obj.title)
                             .replace(/{{thumbnail}}/ig, obj.thumbnail);
    });
    $('body').append(frag); // each loop

})();

// jQuery grep() - helper

// HTML
// <title>$.grep</title>
//
(function() {

    let arr = [
        {
            first: 'Jeffrey',
            last: 'Way'
        },
        {
            first: 'Allison',
            last: 'Way'
        },
        {
            first: 'Jeffrey',
            last: 'Smith'
        },
        {
            first: 'John',
            last: 'Doe'
        },
        {
            first: 'Thomas',
            last: 'Way'
        }
    ];

    // like filter, but you can invert criteria easily
    arr = $.grep( arr, function( obj, index) { // third paras is inv : it inverts the logic of pushing in the array
        return obj.last === 'Way'; // get only the matching last name objects in the array, than update the array
    });

    console.log(arr); // return arr
})();

// Custom Events

$('body').on('app.customEvent', function () {
    console.log('clic');
});

$('body').trigger('app.customEvent'); // with trigger you can create custom events

// Publish and Subscribe
(function( $ ) { // $ represent jQuery inside IIF
    let o = $( {} ); // create a new object 'o'

    // Observer pattern model
    $.each({
        trigger: 'publish',
        on: 'subscribe',
        off: 'unsubscribe'
    }, function( key, val ) {
        jQuery[val] = function() { // es.: jQuery[val] = $.publish(), $.subscribe(), $.unsubscribe()
            o[key].apply( o, arguments ); // apply to object created and pass all the fn args
            // es.: o[key] = $.trigger(), $.on(), $.off()
        };
    });
})( jQuery );

// publish
$.getJSON('http://search.twitter.com/search.json?q=dogs&callback=?', function( results) {
    // processing using custom event
    $.publish( 'twitter/results', results ); // trigger custom 'twitter/results' event
});

// ... later you can use the same API
$.subscribe( 'twitter/results', function( e, results ) { // need to pass 'e' the event
            // use triggered 'twitter/results' custom event with .on()
    $('body').html(
        $.map( results.results, function( obj, index) {
            return '<li>' + obj.text + '</li>';
        }).join('')
    );
});

// complex case

// <h2>What Are You Interested In?</h2>
//
// <form action="#">
//     <p><input type="text" name="q" id="q"></p>
// </form>
//
// <ul class="tweets"></ul>

(function( $ ) { // $ represent jQuery inside IIF
    let o = $( {} ); // create a new object 'o'

    // Observer pattern model
    $.each({
        trigger: 'publish',
        on: 'subscribe',
        off: 'unsubscribe'
    }, function( key, val ) {
        jQuery[val] = function() { // es.: jQuery[val] = $.publish(), $.subscribe(), $.unsubscribe()
            o[key].apply( o, arguments ); // apply to object created and pass all the fn args
            // es.: o[key] = $.trigger(), $.on(), $.off()
        };
    });
})( jQuery );


(function($) {

    const Twitter = {
        init: function() {
            this.template = '<li>{{tweet}}</li>';
            this.query = '@tutspremium';
            this.tweets = [];
            this.timer;

            this.cache();
            this.bindEvents();
            this.subscriptions();


            $.publish( 'twitter/query' );
            this.searchInput.val( this.query );


            return this; // make twitter object available outside the function
        },

        cache: function() {
            this.container = $('ul.tweets');
            this.searchInput = $('#q');
        },

        bindEvents: function() {
            this.searchInput.on( 'keyup', this.search );
        },

        subscriptions: function() {
            $.subscribe( 'twitter/query', this.fetchJSON );
            $.subscribe( 'twitter/results', this.renderResults );
        },

        search: function() {
            let self = Twitter,
                input = this;

            clearTimeout( self.timer );

            self.timer = ( input.value.length >= 3 ) && setTimeout(function() {
                self.query = input.value;
                $.publish( 'twitter/query' );
            }, 400);
        },

        fetchJSON: function() {
            const url = 'http://search.twitter.com/search.json?callback=?&q=';

            return $.getJSON( url + Twitter.query, function( data ) {
                Twitter.tweets = data.results;
                $.publish( 'twitter/results' );
            });
        },

        renderResults: function() {
            let self = Twitter,
                frag = [],
                tweet;

            self.container.html(
                $.map( self.tweets, function( obj, index ) {
                    let t =
                        obj.text.replace(/(http:[^\s]+)/, '<a href="$1">$1</a>')
                            .replace(/@([^\s:]+)/, '<a href="http://twitter.com/$1">@$1</a>');

                    return self.template.replace(/{{tweet}}/, t);
                }).join('')
            );
        }
    };

    window.Twitter = Twitter.init(); // make twitter object available to global window object

})(jQuery);

// jQuery AJAX

// .load()
$('a').on('click', function (e) {
    const href = $(this).attr('href');
    $('div.wrap').load(href + ' .container'); // load overwrite the content of the element called
    e.preventDefault();
});

// communicate with BackEnd

// .get() and .post()

// html
// <h1>Something to Save</h1>
// <form action="#">
//     <textarea name="content" id="content" cols="30" rows="10"></textarea>
//     <p><button type="submit">Save</button></p>
// </form>

// save.php
// <?php
//
//     $f = fopen('data.txt', 'w');
// fwrite( $f, $_POST['content']);
// fclose($f);
//
// echo 'Comment has been saved';

// listen for click
$('form').on('sumbit', function (e) {
    // post content to script, and save // grab textarea content
    $.post('save.php', $(this).serialize(), function (response) { // serialize give name and value (content=value). response is the value
        console.log(response);
    });
    // disable default action
    e.preventDefault()
});

// load.php
// <?php
//
//     $data = file( 'data.txt');
// echo stripslashes( $data[0] );


// get data from load.php
$.get('load.php', function (data) {
    if (data) {
        $('#content').val(data);
    }
});

// see GitHub for complex project with PHP Backend

// Deferred (jQuery Async and Promise)

let myVar;
const setVal = function () {
    let deferred = $.Deferred(); // use to handle Async requests

    setTimeout(function () {
        myVar = 'my value';
        deferred.resolve(); // or reject()
    }, 2000);
    return deferred.promise(); // I promise the deferred value when is available
};

// we can use done() when resolve, fail() when reject, always() regardless of the state
setVal().done(function () {
    console.log('all done: ' + myVar);
}).fail(function () { // chain fail()
    console.log('failed');
});

// alternate way using then
setVal()
    .then(
        () => console.log('all done: ' + myVar), // done
        () => console.log('failed') // fail
    );

// deferred with ajax
$.searchTwitter = function (search) {
    return $.ajax({
        url: 'http://search.twitter.com/search.json',
        data: {q: search},
        dataType: 'jsonp'
        // success: $.Deferred().resolve(),
        // error: $.Deferred().reject()
    }).promise(); // $.ajax by default return a promise
};

let outer = $.searchTwitter('cats');

outer.then(function (results) {
    console.log(results);
});

// ...

outer.then(function (results) {
    console.log(results);
});


// promise with animation
$('div.box').each(function (index) {
    $(this).delay(1000 * i++).fadeOut(1000);
}).promise().done(function () { // Promise means: 'I promise that let you know when completed'
    console.log('completed animations');
});


// jQuery when()
function getTweets(search) {
    return $.ajax({
        url: 'http://search.twitter.com/search.json',
        data: {q: search},
        dataType: 'jsonp'
    });
}

// when() let you execute the code after multiple promises are done or failed
$.when(getTweets('dogs'), getTweets('cats')).done(function (results1, results2) { // done or fail setup a Promise
    console.log(results1);
    console.log(results2);
});





