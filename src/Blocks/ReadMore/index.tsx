import { registerBlockType, type BlockConfiguration } from '@wordpress/blocks';
import metadata from './block.json';
import Edit from './Edit';
import './style.css';

export interface ReadMoreAttributes {
  postId: number | null;
}

registerBlockType<ReadMoreAttributes>(
  metadata.name,
  {
    ...metadata,
    edit: Edit,
    save: () => null,
  } as BlockConfiguration<ReadMoreAttributes>
);
