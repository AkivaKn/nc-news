import { useState } from "react";
import { deleteArticle, patchArticle } from "../api";
import StyledVotes from "../styling-components/StyledVotes";
import StyledButton from "../styling-components/StyledButton";
import { useContext } from "react";
import { UserContext } from "../contexts/User";
import { useNavigate } from "react-router-dom";


export default function ArticleBody({
  currentArticle,
  setShowComments,
  showComments,
  setIsDialogOpen
}) {
  const [articleVoteChange, setArticleVoteChange] = useState(0);
  const [isArticlePatchError, setIsArticlePatchError] = useState(false);
  const { user } = useContext(UserContext);
  const [showDeleteSuccessMessage, setShowDeleteSuccessMessage] = useState(false)
  const [isDeleteError,setIsDeleteError] = useState(false)
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);



  const handleDeleteClick = (e) => {
    e.target.disabled = true;
    setIsDeleting(true);
setIsDeleteError(false)
    deleteArticle(currentArticle.article_id)
      .then(() => {
        setShowDeleteSuccessMessage(true)
        setIsDeleting(false)
        setTimeout(() => {
          navigate('/')
        }, 2500);
      })
      .catch(() => {
        setIsDeleteError(true)
        setIsDeleting(false)
        e.target.disabled = false;
    })
}

  const handleClick = () => {
    setShowComments(!showComments);
  };

  const handleVote = (vote) => {
    if (!user || !user.username) {
      setIsDialogOpen(true)
    } else {
      setArticleVoteChange((currentVote) => {
        return currentVote + vote;
      });
      patchArticle(currentArticle.article_id, vote)
        .then(() => {
          setIsArticlePatchError(false);
        })
        .catch(() => {
          setIsArticlePatchError(true);
          setArticleVoteChange((currentVote) => {
            return currentVote - vote;
          });
        });
    }
  };

  return (
    <div id="article-body">
      <p>{currentArticle.body}</p>
      {user && user.username === currentArticle.author ? null : (
        <StyledVotes>
          <StyledButton>
            <button
              disabled={articleVoteChange === 1}
              onClick={() => handleVote(1)}
            >
              +
            </button>
          </StyledButton>
          <p>{currentArticle.votes + articleVoteChange}</p>
          <StyledButton>
            <button
              disabled={articleVoteChange === -1}
              onClick={() => handleVote(-1)}
            >
              -
            </button>
          </StyledButton>
          {isArticlePatchError ? (
            <p>That didn't work. Please try again.</p>
          ) : null}
        </StyledVotes>
      )}
      {user && user.username === currentArticle.author ?
        <StyledButton>
          <button onClick={handleDeleteClick}>Delete article</button>  
          </StyledButton>          
        : null}
       {isDeleting ? (
            <div className="deleting-message">
              <i className="fa-solid fa-spinner fa-spin"></i>
              <p>Deleting</p>
            </div>
          ) : null}
      {isDeleteError ? <p>That didn't work. Please try again.</p> : null}
      {showDeleteSuccessMessage ?
      <p>Your article has been deleted</p>:null
    }
      <StyledButton>
        <button onClick={handleClick}>
          {showComments ? "Hide" : "Show"} {currentArticle.comment_count}{" "}
          comments
        </button>
      </StyledButton>
    </div>
  );
}
