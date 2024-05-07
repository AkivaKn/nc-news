import { useState } from "react";
import { patchArticle } from "../api";

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
      <div className="votes">
        <button disabled={articleVoteChange === 1} onClick={() => handleVote(1)}>
          +
        </button>
        <p>{currentArticle.votes + articleVoteChange}</p>
        <button disabled={articleVoteChange === -1} onClick={() => handleVote(-1)}>
          -
        </button>
        {isArticlePatchError ? <p>That didn't work. Please try again.</p> : null}
      </div>
      <button onClick={handleClick}>
        {showComments ? "Hide" : "Show"} {currentArticle.comment_count} comments
      </button>
    </div>
  );
}
