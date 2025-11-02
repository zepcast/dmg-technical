<?php

namespace GC\Technical;

use GC\Technical\Blocks\Blocks;

class Plugin
{
    public function run(): void
    {
        $this->registerHooks();
    }

    private function registerHooks(): void
    {
        $this->registerBlocks();
    }

    private function registerBlocks(): void
    {
        $blocks = new Blocks();
        $blocks->register();
    }
}
