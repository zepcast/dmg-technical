import React from "react";
import { useEffect, useState } from '@wordpress/element';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import { store as coreStore, useEntityRecord } from '@wordpress/core-data';
import { BlockEditProps } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { ReadMoreAttributes } from './index';
import { PostList } from '../../Components/PostList';
import { POST_PER_PAGE, POST_TYPE, SEARCH_TYPE } from './consts';
import type { WPPost } from '../../types/wp-post';
import './editor.css';
import { PostSelection } from './Components/PostSelection';
import { SelectedPost } from "./Components/SelectedPost";

export default function Edit({attributes, setAttributes} : BlockEditProps<ReadMoreAttributes>) {
  const [selectedPost, setSelectedPost] = useState<WPPost | null>(null);
  const [page, setPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string | number | null>(null);
  const [searchType, setSearchType] = useState<string>(SEARCH_TYPE.TITLE);
  const { postId } = attributes;
  const blockProps = useBlockProps();

  // If the postId is set, get the post record
  const { record } = useEntityRecord('postType', POST_TYPE.POST, (postId ?? 0) as number);

  // Handle the selection of a post - Update state and block attributes
  const handleSelectPost = (post: WPPost) => {
    setSelectedPost(post);
    setAttributes({ postId: post.id });
  }

  // If the postId is set and the record is found, set the selected post
  useEffect(() => {
    if (postId && record && !selectedPost) {
      handleSelectPost(record as WPPost);
    }
  }, [record, postId]);

  // Get the most recent posts and the total number of posts for pagination
  const { posts, totalPosts } = useSelect((select) => {
    const store = select(coreStore);

    let query: Record<string, any> = {
      per_page: POST_PER_PAGE as number,
      page,
    };

    // When searching by ID, include only posts with matching id, reset page back to 1 in case user has use pagination
    // Sanitize ID search: only allow positive integers
    if (searchType === SEARCH_TYPE.ID && typeof searchQuery === 'number' && searchQuery > 0 && searchQuery <= Number.MAX_SAFE_INTEGER) {
      query.include = [searchQuery];
      query.page = 1;
    } else if (searchType === SEARCH_TYPE.TITLE && searchQuery && typeof searchQuery === 'string') {
      // Title search is already sanitized by TextControl, but validate it's a string
      query.search = searchQuery;
    }

    return {
      posts: store.getEntityRecords('postType', POST_TYPE.POST, query),
      totalPosts: store.getEntityRecordsTotalItems('postType', POST_TYPE.POST, query),
    };
  }, [page, searchQuery, searchType]);

  return (
    <>
      <InspectorControls>
        <div className='dmg'>
          <SelectedPost selectedPost={selectedPost} />

          <PostSelection
            searchType={searchType}
            setSearchType={setSearchType}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />

          <PostList posts={posts as WPPost[]} handleClick={handleSelectPost} setPage={setPage} selectedPost={selectedPost} totalPosts={totalPosts} currentPage={page} />
        </div>
      </InspectorControls>

      {selectedPost ? (
        <p { ...blockProps }>
          <a className='dmg-read-more' href={selectedPost.link}>{__('Read More:', 'gc-read-more')} {selectedPost.title.rendered}</a>
        </p>
      ) : (
        <p { ...blockProps }>{__('No post selected, please pick a post to display.', 'gc-read-more')}</p>
      )
      }
    </>
  )
}
