$(function() {

    describe('RSS Feeds', function() {

        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        it('have a URL', function(){
            allFeeds.forEach(function(feed){
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toBe('');
            });
        });

        it('have a name', function(){
            allFeeds.forEach(function(feed){
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBe('');
            });
        });
    });

    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function(){
        // Only fetch once (no need for beforeEach) as the queried DOM nodes will stay the same
        var $body = $('body');
        var $menuIcon = $('.menu-icon-link');

        it('should be hidden by default', function(){
            expect($body.attr('class')).toContain('menu-hidden');
        });

        it('should toggle visibility when clicked', function(){
            $menuIcon.click();
            expect($body.attr('class')).not.toContain('menu-hidden');

            $menuIcon.click();
            expect($body.attr('class')).toContain('menu-hidden');
        });
    });

    describe('Initial Entries', function(){

        beforeEach(function(done){
            loadFeed(0, done);
        });

        it('contain at least single .entry after loadFeed()', function(done){
            expect($('.feed .entry').length).toBeGreaterThan(0);
            done();
        });

    });

    describe('New Feed Selection', function(){

        var prevFeedTitles = [];
        var prevFeedUrls = [];

        // Load the first feed, store values, and then load second feed before triggering the tests
        beforeEach(function(done){
            loadFeed(1, function(){

                // Store the titles and links as fetched from this feed so we can verify that *every* feed entry was changed
                var links = $('.feed a');
                var titles = links.find('h2');

                // Simply use the length of the links because they are always the same length
                for (var i = 0; i < links.length; i++) {
                    prevFeedTitles.push(titles.eq(i).text()); // Push the text of each title into the array
                    prevFeedUrls.push(links.eq(i).attr('href')); // Push the url of each link into the array
                }

                loadFeed(0, done);
            });
        });

        it('changes the content of the feed list', function(done){
            var links = $('.feed a');
            var titles = links.find('h2');

            // Use the length of the prevFeedTitles array in case the number of new entries is any longer
            for (var i = 0; i < prevFeedTitles.length; i++) {
                // Expect new title and urls to be different
                expect(titles.eq(i).text()).not.toBe(prevFeedTitles[i]);
                expect(links.eq(i).attr('href')).not.toBe(prevFeedUrls[i]);
            }
            done();
        });
    });


}());
