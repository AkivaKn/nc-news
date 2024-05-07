import { useState } from "react";
import { deleteComment } from "../api";

export default function CommentCard({ comment, user }) {
  const [commentVoteChange, setCommentVoteChange] = useState(0);
  const [isCommentPatchError, setIsCommentPatchError] = useState(false);
  const [isCommentDeleted, setIsCommentDeleted] = useState(false);
  const [isCommentDeleteError, setIsCommentDeleteError] = useState(false);

  const handleVote = (vote) => {
    setCommentVoteChange((currentVote) => {
      return currentVote + vote;
    });
    patchComment(comment.comment_id, vote)
      .then(() => {
        setIsCommentPatchError(false);
      })
      .catch(() => {
        setIsCommentPatchError(true);
        setCommentVoteChange((currentVote) => {
          return currentVote - vote;
        });
      });
  };

  const handleClick = () => {
    setIsCommentDeleteError(false);
    setIsCommentDeleted(true);
    deleteComment(comment.comment_id).catch(() => {
      setIsCommentDeleted(false);
      setIsCommentDeleteError(false);
    });
  };

  return !isCommentDeleted ? (
    <li>
      <h3>
        {comment.author}/{new Date(comment.created_at).toDateString()}
      </h3>
      <p>{comment.body}</p>
      <div className="votes">
        <button
          disabled={commentVoteChange === 1}
          onClick={() => handleVote(1)}
        >
          +
        </button>
        <p>{comment.votes + commentVoteChange}</p>
        <button
          disabled={commentVoteChange === -1}
          onClick={() => handleVote(-1)}
        >
          -
        </button>
        {isCommentPatchError ? (
          <p>That didn't work. Please try again.</p>
        ) : null}
      </div>
      {isCommentDeleteError ? <p>That didn't work. Please try again.</p> : null}
      {user === comment.author ? (
        <button onClick={handleClick}>Delete</button>
      ) : null}
    </li>
  ) : (
    <p>Your comment has been deleted.</p>
  );
}
