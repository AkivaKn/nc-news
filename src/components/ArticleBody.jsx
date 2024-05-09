import { useState } from "react";
import { patchArticle } from "../api";
import StyledVotes from "../styling-components/StyledVotes";
import StyledButton from "../styling-components/StyledButton";
import { useContext } from "react";
import { UserContext } from "../contexts/User";
import { useNavigate } from "react-router-dom";

export default function ArticleBody({
  currentArticle,
  setShowComments,
  showComments,
}) {
  const [articleVoteChange, setArticleVoteChange] = useState(0);
  const [isArticlePatchError, setIsArticlePatchError] = useState(false);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const handleClick = () => {
    setShowComments(!showComments);
  };

  const handleVote = (vote) => {
    if (!user || !user.username) {
      navigate("/login");
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

      <StyledButton>
        <button onClick={handleClick}>
          {showComments ? "Hide" : "Show"} {currentArticle.comment_count}{" "}
          comments
        </button>
      </StyledButton>
    </div>
  );
}
