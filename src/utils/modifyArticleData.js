import { format, parseISO } from 'date-fns';

function transformArticle(article) {
  return {
    title: article.title,
    countLikes: article.favorites ? article.favoritesCount : 0,
    tagList: article.tagList,
    description: article.description,
    authorUsername: article.author.username,
    createdAt: article.createdAt ? format(parseISO(article.createdAt), 'MMMM dd, yyyy') : null,
    avatar: article.author.image,
    body: article.body,
  };
}

export default transformArticle;
