<?php

namespace GC\Technical;

use GC\Technical\Admin\AdminMenu;
class Plugin
{
    public function run(): void
    {
        $this->registerHooks();
    }

    private function registerHooks(): void
    {
        $this->registerAdminMenu();
    }

    public function registerAdminMenu(): void
    {
        $adminMenu = new AdminMenu();
        $adminMenu->register();
    }
}
