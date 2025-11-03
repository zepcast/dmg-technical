import React from "react";
import { __ } from "@wordpress/i18n";
import { PanelBody } from "@wordpress/components";
import type { WPPost } from "../../../types/wp-post";
import { PostEditLink } from "../../../Components/PostEditLink";
import { PostViewLink } from "../../../Components/PostViewLink";

export interface SelectedPostProps {
  selectedPost: WPPost | null;
}

export function SelectedPost({ selectedPost }: SelectedPostProps) {
  return (
    <PanelBody title={__('Selected Post', 'gc-read-more')}>
      {selectedPost ? (
        <div className='dmg-selected-post'>
          <p className="dmg-selected-post__title">{selectedPost.title.rendered}</p>

          <div className="dmg-selected-post__actions">
            <PostEditLink id={selectedPost.id} />
            <PostViewLink link={selectedPost.link} />
          </div>
        </div>
      ) : (
        <p>{__('No post selected, please pick a post to display.', 'gc-read-more')}</p>
      )}
    </PanelBody>
  )
}
