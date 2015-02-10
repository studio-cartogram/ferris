<?php

snippet('head');

snippet('svg-symbols');

//snippet('header');

/**
*   Sliders
*/

snippet('header');

echo '<section
    class="section--main "
    kt-posts-slides
    cg-fill-view-port
    ng-controller="MainCtrl as main"
    style="background-color:{{color}}"
    >';

    echo '<section class="section--timeline">';
        echo '<div class="timeline__item" ng-repeat="post in main.posts">';
            echo '<span ng-if="post.type===\'title\'" class="timeline__title make-block" >{{post.title}}</span>';
            echo '<span ng-if="post.type===\'image\'" class="timeline__image make-block"></span>';
        echo '</div>';
    echo '</section>';

    /**
    *   Text Slider
    */
    echo '<section

        class="js-swiper swiper-container swiper"
        ng-class="main.posts[activePostIndex].parent"
        >';

        echo '<div class="swiper-wrapper swiper__wrapper">';

            echo '<div class="swiper-slide swiper__slide" data-hash="start" >';

                echo '<div  class="centered--vertical slide__intro"  >';

                    echo '<h1 class="slide__title ">';

                        echo '<span class="giga">'  . $site->title()->html() . '</span>';

                    echo '</h1>';

                echo '</div>';

            echo '</div>';

            echo '<div class="swiper-slide swiper__slide" data-hash="about"  >';

                echo '<div  class="centered--vertical slide__intro">';

                    echo '<div class="slide__text formatted">';

                        echo '<span class="">'  . $site->about()->kirbytext() . '</span>';

                    echo '</div>';

                echo '</div>';

            echo '</div>';

            echo '<div class="swiper-slide swiper__slide" ng-repeat="post in main.posts" data-color="{{post.color}}" data-hash="{{post.uid}}"  >';

                echo '<div ng-if="post.type===\'text\'" class="centered--vertical slide__intro">';

                    echo '<div ng-if="post.type===\'text\'" class="slide__text soft formatted "><span ng-bind-html="post.text"></span></div>';

                echo '</div>';

                echo '<div ng-if="post.type===\'title\'" class="centered--vertical slide__intro">';

                    echo '<h3 ng-if="post.type===\'title\'" class="slide__title soft "><span class="heading" ng-bind="post.title"></span></h3>';

                echo '</div>';

                echo '<figure ng-if="post.type===\'image\'" class="fill slide__image" cg-background-image="{{post.url}}">';

                    echo '<figcaption ng-bind="post.caption"></figcaption>';

                echo '</figure>';

            echo '</div>';

        echo '</div>';

    echo '</section>';

    echo '<div class="swiper-scrollbar"></div>';

    echo '<div class="swiper__nav fill">';

        echo '<a class="swiper__nav--left js-swiper__prev">';

            echo '<i class="icon icon--beta"><svg viewBox="0 0 64 64"><use xlink:href="#arrow-left"></svg></i>';

        echo '</a>';

        echo '<a class="swiper__nav--right js-swiper__next">';

            echo '<i class="icon icon--beta"><svg viewBox="0 0 64 64"><use xlink:href="#arrow-right"></svg></i>';

        echo '</a>';

    echo '</div>';


    snippet('footer');

echo '</section>';

snippet('foot');

?>
