<?php

namespace GC\Technical\Admin;

class AdminMenu
{
    public function register(): void
    {
        add_action('admin_menu', [$this, 'addMenuPage']);
    }

    public function addMenuPage(): void
    {
        add_menu_page(
            'GC - Technical Task',
            'GC - Technical Task',
            'manage_options',
            'gc-technical-task',
            [$this, 'renderOptionsPage']
        );
    }

    public function renderOptionsPage(): void
    {
        ?>
        <div class="wrap">
            <div id="convertwp-admin-app"></div>
        </div>
        <?php
    }
}
