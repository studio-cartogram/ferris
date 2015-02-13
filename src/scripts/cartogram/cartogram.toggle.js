'use strict';

/**
* @ngdoc module
* @name cartogram_toggle
* @description
* This module houses all reusible Cartogram Directives. Prefixed with cg
*/


angular.module('cartogram.toggle', [
'cartogram.events'
])

/**
* @ngdoc directive
* @name cg_nav_toggle
* @description
*
* Directive to add funtionality to the navigation toggle links.
* adds and removes click event to the site container (everything outside
* of the navigation) to close the navigation when it is shown.
*
* Use CSS to actually show and hide the navigation using the states applied
* here.
*
*/


.directive('cgToggle', function (cgEvents, $timeout) {
    return {
        restrict: 'A',
        link: function(scope, $elm, attrs) {

            var $html = $('html, body'),
            $offSelector = $(attrs.off) || false,
            state = attrs.state || 'state-index-is-shown';

            var toggleNav = function() {


                if(!$html.hasClass(state)) {
                    $timeout(function() {
                        $html.addClass(state)
                    if($offSelector) {
                        $offSelector.on(cgEvents.buttonPressedEvent(), function() {
                            toggleNav();
                        });
                    }
                }, 0);


                } else {
                    $html.removeClass(state);
                    if($offSelector) {
                        $offSelector.off(cgEvents.buttonPressedEvent());
                    }
                }
            };

            $elm.on(cgEvents.buttonPressedEvent(), function(e) {
                toggleNav();

            });
        }
    };
});
