import { __ } from '@wordpress/i18n';
import { __experimentalNumberControl as NumberControl, RadioControl, TextControl, PanelBody } from '@wordpress/components';
import { SEARCH_TYPE } from '../consts';
import React from 'react';

export interface PostSelectionProps {
  searchType: string;
  setSearchType: (type: string) => void;
  searchQuery: string | number | null;
  setSearchQuery: (query: string | number | null) => void;
}

export function PostSelection({ searchType, setSearchType, searchQuery, setSearchQuery }: PostSelectionProps) {

  return (
    <PanelBody title={__('Select or search for a different post', 'gc-read-more')}>
      <RadioControl
        label="Search by"
        onChange={(value) => {
          setSearchType(value)
          setSearchQuery(null)
        }}
        options={[
          {
            label: 'Title',
            value: SEARCH_TYPE.TITLE,
          },
          {
            label: 'ID',
            value: SEARCH_TYPE.ID,
          }
        ]}
        selected={searchType}
      />
      {searchType === SEARCH_TYPE.TITLE ? (
        <TextControl
          __next40pxDefaultSize
          __nextHasNoMarginBottom
          value={searchQuery ? searchQuery : ''}
          placeholder={__('Search by title...', 'gc-read-more')}
          onChange={(value: string) => setSearchQuery(value)}
        />
      ) : (
        <NumberControl
          __next40pxDefaultSize
          value={typeof searchQuery === 'number' ? searchQuery : undefined}
          placeholder={__('Search by ID...', 'gc-read-more')}
          onChange={(value: string | undefined) => {
            const numValue = value ? parseInt(value, 10) : null;
            setSearchQuery((numValue && numValue > 0) ? numValue : null);
          }}
        />
      )}
    </PanelBody>
  )
}
