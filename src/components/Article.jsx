import { useEffect, useState } from "react";
import ArticleBody from "./ArticleBody";
import CommentsList from "./CommentsList";
import { useParams } from "react-router-dom";
import { getArticleById } from "../api";
import { useNavigate } from "react-router-dom";
import StyledArticlePage from "../styling-components/StyledArticlePage";
import LoginDialog from "./LoginDialogBox";



export default function Article() {
  const [currentArticle, setCurrentArticle] = useState({});
  const [showComments, setShowComments] = useState(false);
  const [isArticleGetError, setIsArticleGetError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  
  const currentTime = Date.now();
  const createdDate = new Date(currentArticle.created_at);
  const createdUnix = createdDate.getTime();
  const numOfMinutesSincePosted = Math.floor(
    (currentTime - createdUnix) / 60000
  );
  const numOfHoursSincePosted = Math.floor(
    (currentTime - createdUnix) / 3600000
  );
  let posted;
  if (numOfMinutesSincePosted < 60) {
    posted = `${numOfMinutesSincePosted} minutes ago`;
  } else if (numOfHoursSincePosted <= 24) {
    posted = `${numOfHoursSincePosted} hours ago`;
  } else {
    posted = new Date(currentArticle.created_at).toDateString();
  }



  let { article_id } = useParams();
  useEffect(() => {
    setIsArticleGetError(false);
    getArticleById(article_id)
      .then(({ data: { article } }) => {
        setCurrentArticle(article);
        setIsLoading(false);
      })
    
      .catch((err) => {
          navigate('/not-found')
        setIsArticleGetError(true);
        setIsLoading(false)
      });
  }, []);
  return (
    
      isLoading?(
        <div className = "loading-message" >
          <i className="fa-solid fa-spinner fa-spin"></i>
          <p>Loading</p>
        </div>
      ) :

  (
    <StyledArticlePage>
      {isDialogOpen ? <LoginDialog setIsDialogOpen={setIsDialogOpen} />:null}
        {isArticleGetError ? (
        <p>That didn't work. Please refresh the page.</p>
  ) : null
}
      <>
      <h2>{currentArticle.title}</h2>
      <p>
        {currentArticle.author}/ {posted}
      </p>
      <h3>{currentArticle.topic}</h3>
      <img
        src={currentArticle.article_img_url}
        alt="article image"
        height="200px"
      />
      <ArticleBody
        currentArticle={currentArticle}
        setShowComments={setShowComments}
              showComments={showComments}
              setIsDialogOpen={setIsDialogOpen}
      />

      {showComments ? (
        <CommentsList article_id={article_id} setIsDialogOpen={setIsDialogOpen}/>
) : null
        }
      </>
    </StyledArticlePage>

      )

  );
}
