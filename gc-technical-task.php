<?php
/*
* Plugin Name:       GC - Technical Task
* Description:       Giuseppe Castiglione - Technical Task for DMG. Adds a read more block and WP CLI command
* Version:           1.0
* Requires PHP:      8.3
* Author:            Giuseppe Castiglione
* Author URI:        https://zepcast.uk
* License:           GPL v2 or later
* License URI:       https://www.gnu.org/licenses/gpl-2.0.html
* Update URI:        https://example.com/my-plugin/
* Text Domain:       gctechnical
*/

if (file_exists(__DIR__ . '/vendor/autoload.php')) {
    require __DIR__ . '/vendor/autoload.php';
}

use GC\Technical\Plugin;

$plugin = new Plugin();
$plugin->run();
