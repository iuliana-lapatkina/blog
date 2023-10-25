import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Flex, Popconfirm, Button, Rate, notification } from 'antd';
import { HeartOutlined } from '@ant-design/icons';
import { format, parseISO } from 'date-fns';
import classNames from 'classnames/bind';
import Markdown from 'markdown-to-jsx';

import { getSingleArticle, deleteArticle, getArticles, putLike, deleteLike } from '../../services/blogService';
import TagList from '../TagList';

import avatar from './user.jpg';
import styles from './Article.module.scss';

function Article(props) {
  const { articleInList } = props;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = useSelector((state) => state.blog.token);
  const page = useSelector((state) => state.blog.currentPage);
  const article = useSelector((state) => state.blog.currentArticle);
  const username = useSelector((state) => state.blog.username);
  const isLogged = useSelector((state) => state.blog.isLogged);

  const { id } = useParams();
  const editLink = `/articles/${id}/edit`;

  const className = classNames({ [styles.isSingle]: !articleInList });

  useEffect(() => {
    if (!articleInList && isLogged) {
      dispatch(getSingleArticle([id, token]));
    }
    if (!articleInList && !isLogged) {
      dispatch(getSingleArticle([id]));
    }
  }, [isLogged, dispatch, id, token, articleInList]);

  const item = !articleInList ? article : articleInList;

  const { slug } = item;

  const goBack = () => navigate(-1);

  const openNotification = () => {
    notification.open({
      message: 'You are not registered',
      description: 'Please sign up for the opportunity to like the article.',
    });
  };

  const like = () => {
    if (isLogged && articleInList) {
      dispatch(putLike([slug, token]));
      setTimeout(() => {
        dispatch(getArticles([page, token]));
      }, 300);
    }
    if (isLogged && !articleInList) {
      dispatch(putLike([slug, token]));
      setTimeout(() => {
        dispatch(getSingleArticle([id, token]));
      }, 300);
    }
    if (!isLogged) {
      openNotification();
    }
    return false;
  };

  const dislike = () => {
    if (isLogged && articleInList) {
      dispatch(deleteLike([slug, token]));
      setTimeout(() => {
        dispatch(getArticles([page, token]));
      }, 300);
    }
    if (isLogged && !articleInList) {
      dispatch(deleteLike([slug, token]));
      setTimeout(() => {
        dispatch(getSingleArticle([id, token]));
      }, 300);
    }
    return false;
  };

  const estimate = (e) => {
    e.preventDefault();
    return !item.favorited ? like() : dislike();
  };

  const deleteArt = () => {
    dispatch(deleteArticle([token, id]));
    goBack();
  };

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
              <Rate
                character={<HeartOutlined />}
                count={1}
                onClick={(e) => estimate(e)}
                value={item.favorited ? 1 : 0}
                className={styles['like-icon']}
              />
              <span>{item.favoritesCount ? item.favoritesCount : 0}</span>
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
                alt="User's avatar"
              />
            ) : null}
          </Flex>
          {isLogged && !articleInList && item.author && item.author.username && username === item.author.username ? (
            <Flex className={styles.buttons} gap="small">
              <Popconfirm
                className={styles.delete}
                title="Delete the task"
                description="Are you sure to delete this task?"
                onConfirm={deleteArt}
                okText="Yes"
                cancelText="No"
                placement="bottom"
              >
                <Button danger>Delete</Button>
              </Popconfirm>
              <Link to={editLink}>
                <button className={styles.edit} type="button">
                  Edit
                </button>
              </Link>
            </Flex>
          ) : null}
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
