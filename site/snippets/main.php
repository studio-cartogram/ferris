<?php
echo '<script type="text/ng-template" id="main.html">';

    // echo '<section class="section section--intro intro"
    // cg-fill-view-port>';
    //
    //     echo '<a class="intro__text make-block" cg-scroll-on-click="#posts">Introduction</a>';
    //
    // echo '</section>';

    /**
    *   Sliders
    */

    echo '<section 
        class="section--main "
        lw-posts-slides
        cg-fill-view-port
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

                    echo '<div class="   ">';

                        echo '<h1><a href="#/{{post.uid}}" class="make-block" ng-bind="post.title"></a></h1>';

                    echo '</div>';

                echo '</div>';

            echo '</div>';

        echo '</section>';

    echo '</section>';

echo '</script>';
?>
