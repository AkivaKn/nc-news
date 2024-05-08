import { useState } from "react";
import { deleteComment, postComment } from "../api";
import StyledButton from "../styling-components/StyledButton";
import StyledVotes from "../styling-components/StyledVotes";

export default function CommentCard({ comment, user, article_id }) {
  const [commentVoteChange, setCommentVoteChange] = useState(0);
  const [isCommentPatchError, setIsCommentPatchError] = useState(false);
  const [isCommentDeleted, setIsCommentDeleted] = useState(false);
  const [isCommentDeleteError, setIsCommentDeleteError] = useState(false);
  const [isUndoError, setIsUndoError] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [commentToPost,setCommentToPost] = useState(comment)

  const handleVote = (vote) => {
    setCommentVoteChange((currentVote) => {
      return currentVote + vote;
    });
    patchComment(commentToPost.comment_id, vote)
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

  const handleClick = (e) => {
    setIsDeleting(true);
    e.target.disabled = true;
    setIsCommentDeleteError(false);
    deleteComment(commentToPost.comment_id)
      .then(() => {
        setIsCommentDeleted(true);
        setIsDeleting(false)
      })
      .catch(() => {
        e.target.disabled = false;
        setIsCommentDeleted(false);
        setIsCommentDeleteError(false);
        setIsDeleting(false)
      });
  };

  const handleUndoClick = () => {
    e.target.disabled = true;
    setIsUndoError(false)
    let newComment = {
      username: user,
      body: commentToPost.body,
      votes: commentToPost.votes
    };
    postComment(article_id, newComment).then((res) => {
      setIsCommentDeleted(false);
      setCommentToPost(res.data.comment)
    }).catch(() => {
      setIsUndoError(true)
    })
  };

  return !isCommentDeleted ? (
    <li>
      <h3>
        {commentToPost.author}/ {new Date(comment.created_at).toDateString()}
      </h3>
      <p>{commentToPost.body}</p>
      <StyledVotes>
        <StyledButton>
          <button
            disabled={commentVoteChange === 1}
            onClick={() => handleVote(1)}
          >
            +
          </button>
        </StyledButton>
        <p>{commentToPost.votes + commentVoteChange}</p>
        <StyledButton>
          <button
            disabled={commentVoteChange === -1}
            onClick={() => handleVote(-1)}
          >
            -
          </button>
        </StyledButton>
        {isCommentPatchError ? (
          <p>That didn't work. Please try again.</p>
        ) : null}
      </StyledVotes>

      {isCommentDeleteError ? <p>That didn't work. Please try again.</p> : null}
      {user === commentToPost.author ? (
        <>
        <StyledButton>
          <button onClick={handleClick}>Delete</button>
        </StyledButton>
      {isDeleting ?<div className="deleting-message"><i className="fa-solid fa-spinner fa-spin"></i><p>Deleting</p></div>:null}
      </>
      ) : null}
    </li>
  ) : (
    <>
        <p>Your comment has been deleted.</p>
        <StyledButton>
          <button onClick={handleUndoClick}>Undo</button>
          </StyledButton>
        {isUndoError?<p>That didn't work. Please try again.</p>:null}
    </>
  );
}
