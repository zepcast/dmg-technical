<?php

namespace GC\Technical;

use GC\Technical\Blocks\Blocks;
use GC\Technical\Commands\Commands;

class Plugin
{
    public function run(): void
    {
        $this->registerHooks();
    }

    private function registerHooks(): void
    {
        $this->registerBlocks();
        $this->registerCommands();
    }

    private function registerBlocks(): void
    {
        $blocks = new Blocks();
        $blocks->register();
    }

    private function registerCommands(): void
    {
        $command = new Commands();
        $command->register();
    }
}
