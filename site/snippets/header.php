<?php

echo '<header class="text-center ends header" role="banner">';

    echo '<div class="ends__offcanvas header__offcanvans">';

        echo '<nav class="ends__nav ends__nav--header">';

            echo '<ul class="ends__nav__inner ends__nav__inner--header list--inline milli locase nav--global ">';

                foreach($pages->visible() as $item):

                echo '<li class="text-right" >';

                    echo '<a class="link--primary meta" href="' . $item->url() . '">' . html($item->title()) . '</a></li>';

                echo '</li>';

                endforeach;

            echo '</ul>';

        echo '</nav>';

        echo '<a class="ends__right ends__right--header header__toggle  milli" href="mailto:'. $site->email() .'">';

            echo '<i class="icon icon--milli"><svg viewBox="0 0 64 64"><use xlink:href="#air"></svg></i>';

        echo '</a>';

    echo '</div>';

    echo '<a class=" ends__left ends__left--header " href="#/">';

        echo '<span class="link--secondary logo ">'  . $site->title()->html() . '</span>';

    echo '</a>';

    echo '<div class="loader">';

        echo '<span class="meta">Loading...</span>';

    echo '</div>';

echo '</header>';

?>
