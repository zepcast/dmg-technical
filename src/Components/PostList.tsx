import { POST_PER_PAGE } from '../Blocks/ReadMore/consts';
import { Button, PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import React from 'react';
import type { WPPost } from '../types/wp-post';


interface PostList {
  posts: WPPost[] | null,
  selectedPost: WPPost | null,
  handleClick: (post: WPPost) => void
  setPage: (page: number) => void
  totalPosts?: number | null
  currentPage: number
}

export function PostList({ posts, selectedPost, handleClick, setPage, totalPosts, currentPage }: PostList) {
  const totalPages = totalPosts ? Math.ceil(totalPosts / POST_PER_PAGE) : 0;
  const hasPreviousPage = currentPage > 1;
  const hasNextPage = currentPage < totalPages;
  const hasPosts = posts && posts.length > 0;

  const handlePreviousPage = () => {
    if (hasPreviousPage) {
      setPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (hasNextPage) {
      setPage(currentPage + 1);
    }
  };

  return (
    <PanelBody>
      <ul>
        {hasPosts && posts.map((post: WPPost) => (
          <li
            key={post.id}
            onClick={() => handleClick(post)}
            className="dmg-list-item"
          >
            <Button className={`dmg-post__button ${post.id === selectedPost?.id ? 'dmg-post__button--selected' : ''}`}>
              {post.title.rendered}
            </Button>

          </li>
        ))}

        {!hasPosts && (
          <li>
            {__('No posts found.', 'gc-read-more')}
          </li>
        )}
      </ul>

      {hasPosts && totalPosts && totalPages > 1 && (
        <div className="dmg-pagination">
          <Button
            onClick={handlePreviousPage}
            disabled={!hasPreviousPage}
            variant="secondary"
            className="dmg-pagination__button"
          >
            {__('Previous', 'gc-read-more')}
          </Button>
          <span className="dmg-pagination__info">
            {__('Page', 'gc-read-more')} {currentPage} / {totalPages}
          </span>
          <Button
            onClick={handleNextPage}
            disabled={!hasNextPage}
            variant="secondary"
            className="dmg-pagination__button"
          >
            {__('Next', 'gc-read-more')}
          </Button>
        </div>
      )}
    </PanelBody>
  )
}
