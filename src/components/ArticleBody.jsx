import { useState } from "react";
import { patchArticle } from "../api";
import StyledVotes from "../styling-components/StyledVotes";
import StyledButton from "../styling-components/StyledButton";

export default function ArticleBody({
  currentArticle,
  setShowComments,
  showComments,
}) {
  const [articleVoteChange, setArticleVoteChange] = useState(0);
  const [isArticlePatchError, setIsArticlePatchError] = useState(false);
  const handleClick = () => {
    setShowComments(!showComments);
  };

  const handleVote = (vote) => {
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
  };

  return (
    <div id="article-body">
      <p>{currentArticle.body}</p>
      <StyledVotes>
      <StyledButton>
        <button disabled={articleVoteChange === 1} onClick={() => handleVote(1)}>
          +
          </button>
          </StyledButton>
        <p>{currentArticle.votes + articleVoteChange}</p>
        <StyledButton>
        <button disabled={articleVoteChange === -1} onClick={() => handleVote(-1)}>
          -
        </button>
        </StyledButton>
        {isArticlePatchError ? <p>That didn't work. Please try again.</p> : null}
      </StyledVotes>
      <StyledButton>
      <button onClick={handleClick}>
        {showComments ? "Hide" : "Show"} {currentArticle.comment_count} comments
        </button>
        </StyledButton>
    </div>
  );
}
