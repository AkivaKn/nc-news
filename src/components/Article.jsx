import { useEffect, useState } from "react";
import ArticleBody from "./ArticleBody";
import CommentsList from "./CommentsList";
import { Link, NavLink, useParams } from "react-router-dom";
import { getArticleById } from "../api";
import { useNavigate } from "react-router-dom";


export default function Article({ user }) {
  const [currentArticle, setCurrentArticle] = useState({});
  const [showComments, setShowComments] = useState(false);
  const [isArticleGetError, setIsArticleGetError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  let { article_id } = useParams();
  useEffect(() => {
    setIsArticleGetError(false);
    getArticleById(article_id)
      .then(({ data: { article } }) => {
        setCurrentArticle(article);
        setIsLoading(false);
      })
      .catch((err) => {
        if (err.response.status === 404) {
         navigate('/not-found')
       }
        setIsArticleGetError(true);
        setIsLoading(false)
      });
  }, []);
  return (
    <>
      {isLoading ? (
        <div className="loading-message">
          <i className="fa-solid fa-spinner fa-spin"></i>
          <p>Loading</p>
        </div>
      ) : null}

      {isArticleGetError ? (
        <p>That didn't work. Please refresh the page.</p>
      ) : null}
      <h2>{currentArticle.title}</h2>
      <h3>{currentArticle.topic}</h3>
      <img
        src={currentArticle.article_img_url}
        alt="article image"
        height="200px"
      />
      <p>
        {currentArticle.author}/
        {new Date(currentArticle.created_at).toDateString()}
      </p>
      <ArticleBody
        currentArticle={currentArticle}
        setShowComments={setShowComments}
        showComments={showComments}
      />

      {showComments ? (
        <CommentsList article_id={article_id} user={user} />
      ) : null}
    </>
  );
}
