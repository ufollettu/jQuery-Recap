// Twitter API Templating with Handlebars (very old...)
(function() {

    const Twitter = {
        init: function( config ) {
            this.url = 'http://search.twitter.com/search.json?q=' + config.query + '&callback=?'; // twitter json API
            this.template = config.template;
            this.container = config.container;

            this.fetch();
        },

        attachTemplate: function() {
            const template = Handlebars.compile( this.template ); // Handlebars.compile() refers to provided html template id

            this.container.append( template( this.tweets ) );

        },

        fetch: function() {
            // need to cache this --> this in this case refers to AJAX request, we want to refers to Twitter object
            let self = this;
            // Async json request!
            $.getJSON( this.url, function( data ) {
                self.tweets = $.map( data.results, function( tweet ) { // map array to single object items
                    return {
                        author: tweet.from_user,
                        tweet: tweet.text,
                        thumb: tweet.profile_image_url,
                        url: 'http://twitter.com/' + tweet.from_user + '/status/' + tweet.id_str
                    };
                });

                // For future lessons, research $.deferred, viewers. :)
                self.attachTemplate(); // to handle Async request
            });
        }
    };

    Twitter.init({
        // separate js from the DOM, providing more flexibility
        template: $('#tweets-template').html(), // you can change the template id
        container: $('#biebster-tweets'), // you can change the container too
        query: 'Justin Bieber' // and the query sent to twitter cross-domain request
    });

})();

$(function () {
    $("div.slider .slide:first")
        .addClass("active")
        .delay(2000)
        .queue(function () {
            $(this).next()
                .addClass("active")
                .on("transitionend", function () {
                    $("div.slider .slide:first").css("visibility", "hidden");
                    $(this).css("visibility", "hidden");
                });
        });

    setInterval(function () {

        $("div.slider .slide:first")
            .css("visibility", "visible")
            .queue(function() {
                $(this).removeClass("active")
                    .on("transitionend", function () {
                        $(this).css("visibility", "visible");
                    });
            })
            .addClass("active")
            .delay(2000)
            .queue(function () {
                $(this).next()
                    .addClass("active")
                    .on("transitionend", function () {
                        $("div.slider .slide:first").css("visibility", "hidden");
                        $(this).css("visibility", "hidden");
                    });
            })
    }, 10000)
});