<?php

echo '<nav class="nav text-left">';

    echo '<div id="large-header" class="large-header"><canvas id="demo-canvas"></canvas></div>';

    echo '<ul class="nav--pushed">';

        wp_nav_menu( $navMobile );

        echo '<li ><a wm-scroll-to-top="#bottom"  cg-toggle off=".js-main">';

            echo 'Contact';

        echo'</a></li>';

        echo '<li ><a cg-toggle off=".js-main" class="nav__toggle--close">';

            echo '<i class="icon icon--milli ">';

            

            echo '</i>';

        echo'</a></li>';

    echo '</ul>';

    echo '<div class="nav__footer">';

        echo '<div class="input nav__newsletter-signup nav__input">';

            echo '<form ng-class="{ \'has-error\' : form.EMAIL.$invalid }"  class=" form" action="//cartogram.us1.list-manage.com/subscribe/post?u=d5f1f09507f681778652f9a26&amp;id=9cf675997f" method="post" id="mc-embedded-subscribe-form" name="form" class="validate"  novalidate target="_blank" >';

                echo '<div style="position: absolute; left: -5000px;"><input type="text" name="b_d5f1f09507f681778652f9a26_9cf675997f" tabindex="-1" value=""></div>';

                    echo '<input cg-input class="input__field" required autocomplete="off" type="email" value="" ng-model="email" name="EMAIL" placeholder="Enter your email and press enter..." id="mce-EMAIL">';

                    echo '<label for="mce-EMAIL" class="text-left delta input__label">';

                        echo 'Newsletter';

                    echo'</label>';

                echo '<button ng-hide="form.EMAIL.$error.email || form.EMAIL.$error.required" type="submit" name="subscribe" id="mc-embedded-subscribe" class="input__btn btn--animated delta">Subscribe</button>';

            echo '</form>';

        echo '</div>';
    echo '</div>';

echo '</nav>';

?>
