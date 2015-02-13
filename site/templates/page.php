<?php

snippet('head');

snippet('svg-symbols');

//snippet('header');

/**
*   Sliders
*/

snippet('header');

echo '<section class="section--page js-push-section">';

    echo '<article class="formatted">';

        echo $page->text()->kirbytext();

    echo '</article>';

echo '</section>';

snippet('footer');

snippet('foot');

?>
