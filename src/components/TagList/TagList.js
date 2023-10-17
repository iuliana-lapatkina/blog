import React from 'react';
import { useSelector } from 'react-redux';
import { Tag } from 'antd';
import { v4 as uuidv4 } from 'uuid';

import styles from './TagList.module.scss';

function TagList(props) {
  const { tags, single } = props;

  const isSinglePage = useSelector((state) => state.blog.isSinglePage);

  const elements = tags.map((tag) => {
    if (!tag || tag.trim() === '') {
      return null;
    }
    return (
      <li key={uuidv4()}>
        <Tag>{tag}</Tag>
      </li>
    );
  });

  return tags ? <ul className={`${styles.tagList} ${styles[single ? 'isSingle' : null]}`}>{elements}</ul> : null;
}

export default TagList;
