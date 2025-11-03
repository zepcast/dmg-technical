<?php

namespace GC\Technical\Commands;

use GC\Technical\Commands\DmgReadMore\DmgReadMore;

class Commands
{
    public function register(): void
    {
        if (!defined('WP_CLI') || !constant('WP_CLI')) {
            return;
        }
        $this->registerCommands();
    }

    private function registerCommands(): void
    {
        if (class_exists('\WP_CLI')) {
            \WP_CLI::add_command('dmg-read-more', DmgReadMore::class);
        }
    }
}
