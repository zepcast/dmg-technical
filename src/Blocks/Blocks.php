<?php

namespace GC\Technical\Blocks;

class Blocks
{
    public function register(): void
    {
        add_action('init', [$this, 'registerBlocks']);
    }

    public function registerBlocks(): void
    {
        // Point to build directory where compiled assets are located
        $blocksDir = dirname(dirname(dirname(__FILE__))) . '/build/Blocks/';

        foreach (glob($blocksDir . '*/block.json') as $blockJson) {
            $blockPath = dirname($blockJson);

            register_block_type($blockPath);
        }
    }
}
