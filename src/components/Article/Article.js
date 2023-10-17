import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Flex } from 'antd';
import { format, parseISO } from 'date-fns';
import classNames from 'classnames/bind';
import Markdown from 'markdown-to-jsx';

import { getSingleArticle } from '../../services/blogService';
import TagList from '../TagList';

import avatar from './user.jpg';
import styles from './Article.module.scss';

function Article(props) {
  const { articleInList } = props;

  const dispatch = useDispatch();

  const article = useSelector((state) => state.blog.currentArticle);

  const { id } = useParams();

  const className = classNames({ [styles.isSingle]: !articleInList });

  useEffect(() => {
    if (!articleInList) {
      dispatch(getSingleArticle(id));
    }
  }, [dispatch, id, articleInList]);

  const item = !articleInList ? article : articleInList;

  let articleTitle;
  let articleDescription;

  if (!articleInList && item.title && item.description) {
    articleTitle = <h2 className={`${styles.title} ${className}`}>{item.title}</h2>;
    articleDescription = <div className={`${styles.description} ${className}`}>{item.description}</div>;
  }

  if (articleInList && item.title && item.description) {
    articleTitle =
      item.title.length > 70 ? (
        <h2 className={styles.title}>{item.title.substring(0, 70)}...</h2>
      ) : (
        <h2 className={styles.title}>{item.title}</h2>
      );
    articleDescription =
      item.description && item.description.length > 140 ? (
        <div className={styles.description}>{item.description.substring(0, 140)}...</div>
      ) : (
        <div className={styles.description}>{item.description}</div>
      );
  }

  return item ? (
    <Card className={`${styles.card} ${className}`} bordered="false" bodyStyle={{ padding: '0' }}>
      <div className={styles['title-block']}>
        <div className={styles.left}>
          <div className={styles['title-likes']}>
            {articleTitle}
            <div className={styles.likes}>
              <span>&#9825;</span>
              <span>{item.favorites ? item.favoritesCount : 0}</span>
            </div>
          </div>
          {item.tagList ? <TagList single={!articleInList} tags={item.tagList} /> : null}
          {articleDescription}
        </div>
        <div className={styles.right}>
          <Flex gap="small">
            <Flex className={styles.author} gap="small">
              {item.author && item.author.username ? <span>{item.author.username}</span> : <span>Unknown</span>}
              {item.createdAt ? format(parseISO(item.createdAt), 'MMMM dd, yyyy') : null}
            </Flex>
            {item.author && item.author.image ? (
              <img
                className={styles.avatar}
                src={item.author.image}
                onError={({ currentTarget }) => {
                  currentTarget.src = avatar;
                  currentTarget.onerror = null;
                }}
                alt="Аватар автора"
              />
            ) : null}
          </Flex>
        </div>
      </div>
      {!articleInList && article.body ? (
        <div className={styles.text}>
          <Markdown>{article.body}</Markdown>
        </div>
      ) : null}
    </Card>
  ) : null;
}

export default Article;