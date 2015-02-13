<?php

echo '<header class="text-center ends header" role="banner">';

    echo '<div class="ends__offcanvas header__offcanvans">';

        echo '<nav class="ends__nav ends__nav--header">';

            echo '<ul class=" js-push-section ends__nav__inner ends__nav__inner--header  nav--global ">';

                foreach($pages->visible() as $item):

                echo '<li>';

                    echo '<a href="' . $item->url() . '"><span class="link--primary meta locase">' . html($item->title()) . '</span></a>';

                echo '</li>';

                endforeach;

                echo '<li>';

                    echo '<a cg-toggle off=".js-push-section" ><span class="link--primary meta">index</span></a>';

                echo '</li>';

            echo '</ul>';

        echo '</nav>';

        echo '<a class="ends__right ends__right--header header__toggle  milli "  cg-toggle off=".js-push-section">';

            echo '<i class="icon icon--milli "><svg viewBox="0 0 64 64"><use xlink:href="#air"></svg></i>';

        echo '</a>';

    echo '</div>';

    echo '<a class=" ends__left ends__left--header " href="/">';

        echo '<span class="link--secondary logo ">'  . $site->title()->html() . '</span>';

    echo '</a>';

    echo '<div class="loader meta">';

        echo 'loading...';

    echo '</div>';

    echo '<a class="header__toggle--close header__toggle "  cg-toggle>';

        echo '<i class="icon icon--milli icon--white"><svg viewBox="0 0 64 64"><use xlink:href="#cross"></svg></i>';

    echo '</a>';

echo '</header>';


?>
