import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, useFieldArray } from 'react-hook-form';
import { Button, message } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

import { createArticle, editArticle, getSingleArticle } from '../../services/blogService';

import styles from './NewEditArticle.module.scss';

function NewEditArticle() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();

  const [dirty, setDirty] = useState(true);

  const token = useSelector((state) => state.blog.token);
  const article = useSelector((state) => state.blog.currentArticle);

  useEffect(() => {
    if (id) {
      dispatch(getSingleArticle([id, token]));
    }
  }, [id, token]);

  const goBack = () => navigate(-1);

  const articleTitle = article.title;
  const articleDescription = article.description;
  const articleBody = article.body;
  let tag = 0;
  if (article.tagList) {
    tag = article.tagList.map((item) => {
      return { name: item };
    });
  }

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      title: id ? articleTitle : '',
      description: id ? articleDescription : '',
      text: id ? articleBody : '',
      tags: id && tag.length > 0 ? tag : [{ name: '' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tags',
  });

  const successEdit = () => {
    message.info('Article has been successfully edited');
  };

  const successCreate = () => {
    message.info('Article has been successfully created');
  };

  const onSubmit = (data) => {
    if (!isDirty) {
      setDirty(false);
      return;
    }
    const tagsList = data.tags.map((item) => {
      return item.name.replace(/  +/g, ' ');
    });
    const tags = tagsList.filter((item, index) => {
      return tagsList.indexOf(item) === index;
    });
    const title = data.title.replace(/  +/g, ' ');
    const description = data.description.replace(/  +/g, ' ');
    const text = data.text.replace(/  +/g, ' ');

    if (id) {
      dispatch(editArticle([title, description, text, tags, token, id]));
      successEdit();
    } else {
      dispatch(createArticle([title, description, text, tags, token]));
      successCreate();
    }
    goBack();
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{!id ? 'Create new article' : 'Edit article'}</h2>
      <Button onClick={goBack} className={styles['close-button']}>
        <CloseOutlined style={{ fontSize: '25px' }} />
      </Button>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="title" className={styles.label}>
          Title
          <input
            {...register('title', {
              required: 'This field is required.',
              maxLength: {
                value: 5000,
                message: 'Title needs to be less than 5000 characters.',
              },
            })}
            className={`${styles.input} ${errors?.title && styles['warning-border']}`}
            placeholder="Title"
          />
          <div>{errors?.title && <p className={styles.warning}>{errors?.title?.message || 'Error!'}</p>}</div>
        </label>

        <label htmlFor="description" className={styles.label}>
          Short description
          <input
            {...register('description', {
              required: 'This field is required.',
              maxLength: {
                value: 5000,
                message: 'Title needs to be less than 5000 characters.',
              },
            })}
            className={`${styles.input} ${errors?.title && styles['warning-border']}`}
            placeholder="Short description"
          />
          <div>
            {errors?.description && <p className={styles.warning}>{errors?.description?.message || 'Error!'}</p>}
          </div>
        </label>

        <label htmlFor="text" className={styles.label}>
          Text
          <textarea
            {...register('text', {
              required: 'This field is required.',
            })}
            className={`${styles.textarea} ${styles.input} ${errors?.text && styles['warning-border']}`}
            placeholder="Text"
          />
          <div>{errors?.text && <p className={styles.warning}>{errors?.text?.message || 'Error!'}</p>}</div>
        </label>

        <div className={styles.tags}>
          <h3>Tags</h3>
          <ul className={styles['tag-list']}>
            {fields.map((field, index) => (
              <li key={field.id}>
                <input
                  {...register(`tags.${index}.name`, {
                    required: 'The tag name should not be empty.',
                    maxLength: {
                      value: 60,
                      message: 'Your tag needs to be no more than 60 characters.',
                    },
                  })}
                  placeholder="Tag"
                  className={`${styles['tag-input']} ${styles.input} ${
                    errors?.[`tags.${index}.name`] && styles['warning-border']
                  }`}
                />
                <button className={styles['delete-button']} type="button" onClick={() => remove(index)}>
                  Delete
                </button>
                <button className={styles['add-button']} type="button" onClick={() => append({ name: '' })}>
                  Add Tag
                </button>
                {errors.tags?.[index]?.name && (
                  <p className={styles.warning}>{errors.tags?.[index]?.name?.message || 'Error!'}</p>
                )}
              </li>
            ))}
          </ul>
        </div>
        {fields.length === 0 && (
          <button
            className={`${styles['add-button']} ${styles['single-add-button']}`}
            type="button"
            onClick={() => append({ name: '' })}
          >
            Add Tag
          </button>
        )}
        <div>
          {!dirty && <p className={styles.warning}>The data has not changed.</p>}
          <button type="submit" className={styles.submit} name="submit">
            Send
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewEditArticle;
