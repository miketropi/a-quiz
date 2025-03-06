<?php 
/**
 * Plugin Name: A Quiz
 * Plugin URI: #
 * Description: A simple quiz plugin for WordPress
 * Version: 1.0.0
 * Author: Mike
 * Author URI: #
 * License: GPL v2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: a-quiz
 * Domain Path: /languages
 *
 * @package A_Quiz
 */

/**
 * Define
 */
define('AQUIZ_PLUGIN_VERSION', '1.0.0');
define('AQUIZ_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('AQUIZ_PLUGIN_URL', plugin_dir_url(__FILE__));

/**
 * Include
 */
require_once(AQUIZ_PLUGIN_DIR . 'inc/static.php');
require_once(AQUIZ_PLUGIN_DIR . 'inc/ajax.php');
require_once(AQUIZ_PLUGIN_DIR . 'inc/helpers.php');
require_once(AQUIZ_PLUGIN_DIR . 'inc/hooks.php');
require_once(AQUIZ_PLUGIN_DIR . 'inc/shortcode.php');
