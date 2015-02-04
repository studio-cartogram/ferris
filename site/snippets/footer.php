

<!-- <a href="https://twitter.com/intent/tweet?source=webclient&text=<?php echo rawurlencode($page->title()); ?>%20<?php echo rawurlencode($page->url()); ?>%20<?php echo ('via @your_account')?>" target="blank" title="Tweet this">Tweet</a>
<a href="http://www.facebook.com/sharer.php?u=<?php echo rawurlencode ($page->url()); ?>" target="blank" title="Share on Facebook">Share on Facebook</a>
<a href="https://plusone.google.com/_/+1/confirm?hl=de&url=<?php echo rawurlencode ($page->url()); ?>&title=<?php echo rawurlencode($page->title()); ?>" target="blank" title="Share on Google+">Share on Google+</a> -->

<?php

// main menu items
$items = $pages->visible();


echo '<div class="footer">';

    echo '<div class="footer__left">';

    // only show the menu if items are available
    if($items->count()):

    echo '<nav class="">';

        echo '<ul class="list--inline milli">';

            foreach($items as $item):

            echo '<li><a href="' . $item->url() . '">' . $item->title()->html() . '</a></li>';

            endforeach;

        echo '</ul>';

    echo '</nav>';

    endif;

    echo '</div>';

    echo '<div class="footer__right">';

        echo '<nav class="">';

            echo '<ul class="list--inline milli">';

                foreach($items as $item):

                echo '<li><a href="' . $item->url() . '">' . $item->title()->html() . '</a></li>';

                endforeach;

            echo '</ul>';

        echo '</nav>';

    echo '</div>';

echo '</div>';

?>
