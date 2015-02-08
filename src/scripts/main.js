'use strict';

(function() {
    'use strict';

    angular.module('frrs', [
        'ngSanitize',
        'cartogram.background',
        'cartogram.fill',
        'cartogram.dimensions',
        'cartogram.scroll',

        // 'foundation'
    ])

    .run(function($log, $rootScope) {
        $rootScope.isReady = true;
        $rootScope.isLoaded = true;
        $rootScope.viewIsLoading = false;

        FastClick.attach(document.body);

    })


    .controller('MainCtrl', function ($log, $rootScope, $scope, apiService) {

        var vm = this;

        // I contain the list of projects to be rendered.
        vm.posts = [];

        $rootScope.isLoading = true;
        $rootScope.isLoaded = false;

        loadInitialData();

        // ---
        // PRIVATE METHODS.
        // ---

        //route change methods.
        $rootScope.$on("$routeChangeStart", function (event, current, previous, rejection) {

            $rootScope.viewIsLoading = true;
            $log.warn(previous.pagename, current.pagename, 'step 1');
            $rootScope.isLoaded = false;


            if(!!previous && previous.pagename === "main" && !!current && current.pagename === "single") {
                    $rootScope.state = 'transition-to-single';
                    $log.info('transition to single');
            }

        });

        $rootScope.$on("$routeChangeSuccess", function (event, current, previous, rejection) {
            //$log.log('route change end');
            $rootScope.pagename = current.pagename;
            //debugger;

            $rootScope.viewIsLoading = false;

            if(!!current && current.pagename === "main") {
                $log.log('we are moving toward the main page');
            }

            if(!!previous && previous.pagename === "main" && !!current && current.pagename === "single") {
                $rootScope.state = 'transition-on-single';
                $log.info('transition on single');
            }

            $log.warn(previous.pagename, current.pagename, 'step 5');

        });
        $log.warn('step 4');
        // I load the remote data from the server.
        function loadInitialData(slug) {
            $log.warn('step 3');
            $log.log('loadInitialData() loading data');

            apiService.getPosts().then(function(response) {

                $rootScope.$broadcast('dataIsLoaded');

                angular.forEach(response.data, function(item) {

                    var _title = {},
                        _text = {},
                        imageCount = 0;

                    _title.type = 'title';
                    _title.title = item.title;
                    _title.uid = item.uid;
                    _title.color = item.color;

                    vm.posts.push(_title);


                    _text.type = 'text';
                    _text.text = item.text;
                    _text.uid = item.uid+'-intro';
                    _text.color = item.color;
                    vm.posts.push(_text);

                    angular.forEach(item.images, function(image) {
                        var _image = {};
                            imageCount++;
                        _image.color = item.color;
                        _image.type = 'image';
                        _image.url = image.url;
                        _image.caption = image.name;
                        _image.uid = item.uid+'-i-'+imageCount;
                        vm.posts.push(_image);
                    });
                });

                $rootScope.isLoading = false;
                $rootScope.isLoaded = true;


            });


        };


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

    .directive('lwPostsSlides', function($window, $log, $timeout, $rootScope){

        return function(scope, $elm, attrs){

            var swiper;

            function init(index) {

                swiper = $elm.find('.js-swiper').swiper({
                    mode:'horizontal',
                    loop: true,
                    mousewheelControl : true,
                    keyboardControl : true,
                    hashNav: true,
                    autoplay: 5000,
                    autoplayDisableOnInteraction: true,
                    scrollbar: {
                        container : '.swiper-scrollbar',
                        draggable : true,
                        hide: false,
                        snapOnRelease: true
                    },
                    onSlideChangeStart : function(swiper) {
                        console.log(swiper.activeIndex);
                        console.log($(swiper.activeSlide()).data('color'));

                        scope.$apply(function() {
                            scope.color = $(swiper.activeSlide()).data('color');
                        })
                    }
                });

                //Navigation
                $elm.find('.js-swiper__prev').on('click', function(e){
                    e.preventDefault()
                    swiper.swipePrev()
                })
                $elm.find('.js-swiper__next').on('click', function(e){
                    e.preventDefault()
                    swiper.swipeNext()
                });
            }



            // ---
            // Public METHODS.
            // ---

            // ---
            // PRIVATE METHODS.
            // ---


            scope.$on('dataIsLoaded', function() {
                $timeout(function() {
                    init();
                }, 0);
            });
        };
    })



    .directive('lwInput', function($log){
        return function(scope, $elm, attrs){
            if( $elm[0].value.trim() !== '' ) {
                $elm.addClass('input--filled' );
            }

            // events:
            $elm.on( 'focus', onInputFocus );
            $elm.on( 'blur', onInputBlur );

            function onInputFocus( ev ) {
                $elm.addClass('input--filled' );
                $log.log('focus');
            }

            function onInputBlur( ev ) {
                $log.log('blur');
                if( ev.target.value.trim() === '' ) {
                    $elm.removeClass('input--filled' );
                }
            }


        };
    })



    ;


})();
