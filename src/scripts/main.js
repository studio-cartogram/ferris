'use strict';

(function() {
    'use strict';

    angular.module('kt', [
    'ngSanitize',
    'cartogram.background',
    'cartogram.fill',
    'cartogram.dimensions',
    'cartogram.scroll',
    'cartogram.events',
    'cartogram.toggle'
    ])

    .run(function($log, $rootScope) {
        $rootScope.isReady = true;
        $rootScope.isLoaded = true;
        FastClick.attach(document.body);
    })

    .controller('NavCtrl', function ($log, $scope, $rootScope, apiService) {

        var vm = this;

        // I contain the list of projects to be rendered.
        vm.items = [];

        apiService.getPosts().then(function(response) {

            vm.items = response.data;
        })

        $scope.skipToSlide = function(index) {
            $rootScope.$broadcast('loadSlide', index);
        }


    })
    .controller('MainCtrl', function ($log, $rootScope, $scope, apiService) {

        var vm = this;

        // I contain the list of projects to be rendered.
        vm.posts = [];

        $rootScope.isLoading = true;
        $rootScope.isLoaded = false;

        loadInitialData();

        $log.warn('step 4');
        // I load the remote data from the server.
        function loadInitialData() {

            apiService.getPosts().then(function(response) {

                $rootScope.$broadcast('dataIsLoaded', response.data);

                prepData(response.data, function() {
                    $rootScope.isLoading = false;
                    $rootScope.isLoaded = true;
                })

            });

        };

        //I prep the data for the slideshow struction.
        function prepData(data, callback) {
            var count=0;
            angular.forEach(data, function(item) {
                count++;

                var _title = {},
                _text = {},
                imageCount = 0;

                _title.type = 'title';
                _title.title = item.title;
                _title.uid = item.uid;
                _title.color = item.color;
                _title.index = count;

                vm.posts.push(_title);


                _text.type = 'text';
                _text.text = item.text;
                _text.uid = item.uid+'-intro';
                _text.color = item.color;
                _text.index = count;
                vm.posts.push(_text);

                angular.forEach(item.images, function(image) {
                    count++;

                    var _image = {};
                    imageCount++;
                    _image.color = item.color;
                    _image.type = 'image';
                    _image.url = image.url;
                    _image.caption = image.name;
                    _image.uid = item.uid+'-image-'+imageCount;
                    _image.index = count;
                    vm.posts.push(_image);
                });
            });

            callback();
        }

        // ---
        // HELPER METHODS.
        // ---


    })

    .service("apiService", function( $http, $q, $log ) {

        // Return public API.
        return({
            getPosts: getPosts
        });


        // ---
        // PUBLIC METHODS.
        // ---


        // I get all of the interviews in the remote collection.
        function getPosts() {

            var request = $http({
                method: 'get',
                url: 'api'
            });

            return( request.then( handleSuccess, handleError ) );

        }


        // ---
        // PRIVATE METHODS.
        // ---


        // I transform the error response, unwrapping the application dta from
        // the API response payload.
        function handleError( response ) {

            // The API response from the server should be returned in a
            // nomralized format. However, if the request was not handled by the
            // server (or what not handles properly - ex. server error), then we
            // may have to normalize it on our end, as best we can.
            if (
                ! angular.isObject( response.data ) ||
                ! response.data.message
            ) {

                return( $q.reject( "An unknown error occurred." ) );

            }

            // Otherwise, use expected error message.
            return( $q.reject( response.data.message ) );

        }


        // I transform the successful response, unwrapping the application data
        // from the API response payload.
        function handleSuccess( response ) {

            return( response.data );

        }

    }
)

.directive('ktPostsSlides', function($log, $timeout, $rootScope){

    return function(scope, $elm, attrs){

        var swiper;

        function init(index) {

            swiper = new Swiper('.swiper-container', {
                mode:'horizontal',
                loop: true,
                mousewheelControl : true,
                keyboardControl : true,
                hashnav: true,
                autoplay: 5000,
                autoplayDisableOnInteraction: true,
                // Navigation arrows
               nextButton: '.swiper-button-next',
               prevButton: '.swiper-button-prev',

               // And if we need scrollbar
               scrollbar: '.swiper-scrollbar',
                // scrollbar: {
                //     container : '.swiper-scrollbar',
                //     draggable : true,
                //     hide: false,
                //     snapOnRelease: true
                // },
                onSlideChangeEnd : function(swiper) {

                },
                onSlideChangeStart : function(swiper) {

                    scope.safeApply(function() {
                        scope.color = $(swiper.slides[swiper.activeIndex]).data('color') || 'white';
                    });

                }
            });

        }


        //Navigation
        // $elm.find('.js-swiper__prev').on('click', function(e){
        //     e.preventDefault()
        //     swiper.swipePrev()
        // })
        //
        // $elm.find('.js-swiper__next').on('click', function(e){
        //     e.preventDefault()
        //     swiper.swipeNext()
        // });


        // ---
        // Public METHODS.
        // ---

        scope.$on('dataIsLoaded', function() {
            $timeout(function() {
                init();
            }, 0);
        });

        scope.$on('loadSlide', function(event, data) {
            console.log('from loadSlide:' + data)
            window.location.hash = data;

        });

        scope.safeApply = function(fn) {
            var phase = this.$root.$$phase;
            if(phase == '$apply' || phase == '$digest') {
                if(fn && (typeof(fn) === 'function')) {
                    fn();
                }
            } else {
                this.$apply(fn);
            }
        };

        scope.$watch(function(){
            return window.location.hash;
        }, function(oldVal, newVal){
            if(oldVal !== newVal) {
                //swiper.slideTo();
                console.log(newVal);
                console.log(swiper);
                swiper.hashnav.init();
            }

        });
    };
})



;


})();
