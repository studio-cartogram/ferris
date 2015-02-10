<?php

echo '<footer class="index  " role="banner">';

        echo '<span class="meta">index</span>';

        echo '<ul class="milli nav--index ">';

            echo '<li class="" ng-repeat="post in main.posts">';

                echo '<a class="link--secondary" ng-click="skipToSlide(post.index)" ng-if="post.type===\'title\'">';

                    echo '<span ng-bind="post.title"></span>';

                echo '</a>';

            echo '</li>';

        echo '</ul>';

echo '</footer>';

?>
