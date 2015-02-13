<?php

echo '<footer class="index  " ng-controller="NavCtrl as nav" role="navigation">';
    echo '<nav class="show-for-small-only">';
        echo '<ul class="nav--index">';

            foreach($pages->visible() as $item):

            echo '<li>';

                echo '<a href="' . $item->url() . '"><span class=" ">' . html($item->title()) . '</span></a>';

            echo '</li>';

            endforeach;

        echo '</ul>';
    echo '</nav>';
    echo '<nav>';
        echo '<ul class="nav--index ">';

            echo '<li class="" ng-repeat="item in nav.items">';

                echo '<a cg-toggle ng-click="skipToSlide(item.uid)" ng-href="/ferris/#{{item.uid}}"  >';

                    echo '<span ng-bind="item.title"></span>';

                echo '</a>';

            echo '</li>';

        echo '</ul>';

        echo '</nav>';

echo '</footer>';

?>
