import axios from "axios";

export default function getArticles(currentTopic,sort_by,order) {
  return axios.get("https://news-now.onrender.com/api/articles", {
    params: {
      topic: currentTopic,
      sort_by: sort_by,
      order:order
    }
  });
}

export function getMoreArticles(pageIndex,currentTopic,sort_by,order) {
  return axios.get("https://news-now.onrender.com/api/articles", {
    params: {
      p: pageIndex,
      limit: 10,
      topic: currentTopic,
      sort_by: sort_by,
      order:order
    },
  });
}

export function getArticleById(article_id) {
  return axios.get(`https://news-now.onrender.com/api/articles/${article_id}`);
    
}

export function getCommentsByArticleId(article_id) {
  return axios.get(`https://news-now.onrender.com/api/articles/${article_id}/comments`); 
}

export function getMoreCommentsByArticleId(article_id,pageIndex) {
  return axios.get(`https://news-now.onrender.com/api/articles/${article_id}/comments`, {
    params: {
      p: pageIndex,
      limit: 10,
    },
  });
}

export function postComment(article_id,comment) {
  return axios.post(`https://news-now.onrender.com/api/articles/${article_id}/comments`,comment)
}

export function patchArticle(article_id,vote) {
  return axios.patch(`https://news-now.onrender.com/api/articles/${article_id}`,{inc_votes:vote})
}

export function patchComment(comment_id,vote) {
  return axios.patch(`https://news-now.onrender.com/api/comments/${comment_id}`,{inc_votes:vote})
}

export function deleteComment(comment_id) {
  return axios.delete(`https://news-now.onrender.com/api/comments/${comment_id}`)
}

export function getTopics() {
  return axios.get("https://news-now.onrender.com/api/topics");
}

export function getUserByUsername(username) {
  return axios.get(`https://news-now.onrender.com/api/users/${username}`);

}

export function getCommentsByUsername(username) {

  return axios.get(`https://news-now.onrender.com/api/users/${username}/comments`);
  
}

export function getMoreCommentsByUsername(username,pageIndex) {
  return axios.get(`https://news-now.onrender.com/api/users/${username}/comments`, {
    params: {
      p: pageIndex,
      limit: 10,
    },
  });
}