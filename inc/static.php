<?php 
/**
 * Static
 */

add_action( 'wp_enqueue_scripts', 'aquiz_enqueue_scripts' );

function aquiz_enqueue_scripts() {
  wp_enqueue_style( 'quiz-css', AQUIZ_PLUGIN_URL . '/dist/css/a-quiz.bundle.css', false, AQUIZ_PLUGIN_VERSION );
  wp_enqueue_script( 'quiz-js', AQUIZ_PLUGIN_URL . '/dist/a-quiz.bundle.js', ['jquery'], AQUIZ_PLUGIN_VERSION, true );

  wp_localize_script( 'quiz-js', 'QUIZ_PHP_DATA', [
    'ajax_url' => admin_url('admin-ajax.php'),
    'nonce' => wp_create_nonce('quiz_nonce'),
    'settings' => [],
  ] );
}