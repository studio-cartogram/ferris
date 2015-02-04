'use strict';

(function() {
    'use strict';

    angular.module('lw', [
        'ngAnimate',
        'ngCookies',
        'ngTouch',
        'ngSanitize',
        'ngRoute',
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

        //I contain the active post number in order to set the default
        //slide on route change, default to 0;
        $rootScope.activePostIndex = 0;

        FastClick.attach(document.body);

    })

    .config(function ($routeProvider, $locationProvider) {
        $routeProvider
        .when('/', {
            templateUrl: 'main.html',
            controller: 'MainCtrl',
            controllerAs: 'main',
            pagename : 'main',
            reloadOnSearch:false,
            resolve : {
                loadData: function(apiService, $rootScope, $log) {
                    console.warn('step 2');

                    return apiService.getPosts();
                }
            }
        })

        .otherwise({
            redirectTo: '/'
        })
        ;

    //    $locationProvider.hashPrefix('!');
    })


    .controller('MainCtrl', function ($log, $rootScope, $scope, loadData, $location) {

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

            vm.posts = loadData.data;
            vm.tags = loadData.tags;
            vm.items = loadData.items;

            $rootScope.isLoading = false;
            $rootScope.isLoaded = true;
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


            $timeout(function() {
                init();
            }, 0);

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
