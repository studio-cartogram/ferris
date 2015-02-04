<?php

echo '<header class="text-center header  " role="banner">';

    echo '<a class=" header__logo  " href="#/">';

        echo '<span class="    make-block">'  . $site->title()->html() . '</span>';

    echo '</a>';

    echo '<div class="loader">';

        echo '<span class="meta">Loading...</span>';

    echo '</div>';

echo '</header>';

?>
