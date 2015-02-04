<?php

snippet('head');

snippet('svg-symbols');

snippet('header');

/**
*   Sliders
*/

echo '<section
    class="section--main "
    lw-posts-slides
    cg-fill-view-port
    ng-controller="MainCtrl as main"
    >';


    /**
    *   Text Slider
    */
    echo '<section

        class="js-swiper swiper-container swiper"
        ng-class="main.posts[activePostIndex].parent"
        >';

        echo '<div class="swiper-wrapper swiper__wrapper">';

            echo '<div class="swiper-slide swiper__slide" ng-repeat="post in main.posts" data-hash="{{post.uid}}">';

                echo '<div ng-if="post.type===\'title\'" class="centered--vertical slide__intro">';

                    echo '<h1 ng-if="post.type===\'title\'" class="slide__title "><span ng-bind="post.title"></span></h1>';

                echo '</div>';

                echo '<div ng-if="post.type===\'image\'" class="fill slide__image" cg-background-image="{{post.url}}"></div>';

            echo '</div>';

        echo '</div>';

    echo '</section>';

    echo '<div class="swiper-scrollbar"></div>';

echo '</section>';

snippet('footer');

snippet('foot');


?>
