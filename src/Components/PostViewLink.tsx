import React from 'react';

export function PostViewLink({link}: {link : string}) {
  return <a href={link} target="_blank"><span className="dashicons dashicons-external"></span></a>
}
