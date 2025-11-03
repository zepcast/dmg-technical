import React from 'react';

export function PostEditLink({id}: {id: number}) {
  return <a href={`/wp-admin/post.php?post=${id}&action=edit`} target="_blank"><span className="dashicons dashicons-edit"></span></a>;
}
