<?php

if (empty($attributes['postId'])) {
    return null;
}

$postId = (int)$attributes['postId'];

// Validate post exists
if (!get_post($postId)) {
    return null;
}

$postLink = get_permalink($postId);
$postTitle = get_the_title($postId);

?>

<p <?php echo get_block_wrapper_attributes(); ?>>
    <a class="dmg-read-more" href="<?php echo esc_url($postLink); ?>">
        <?php echo esc_html(__('Read More', 'gctechnical')); ?>: <?php echo esc_html($postTitle); ?>
    </a>
</p>
