import { useEffect, useState } from "react";
import CommentCard from "./CommentCard";
import { getCommentsByArticleId, postComment } from "../api";

export default function CommentsList({ article_id, user }) {
  const [comments, setComments] = useState([]);
  const [showPostComment, setShowPostComment] = useState(false);
  const [commentInput, setCommentInput] = useState("");
  const [isGetError, setIsGetError] = useState(false);
  const [isPostError, setIsPostError] = useState(false);
  const [showSuccessMessage,setShowSuccessMessage] = useState(false)

  const handleClick = () => {
    setShowPostComment(!showPostComment);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!commentInput) {
      return
    }
    setCommentInput("")
    setShowSuccessMessage(true)
    let comment = {
      username: user,
      body: commentInput
    };
    setComments((currentComments) => {
      return [{...comment,created_at: Date.now(),votes:0,comment_id:'a',author:user}, ...currentComments];
    });
    postComment(article_id, comment)
      .then((res) => {
        setIsPostError(false);
      })
      .catch(() => {
        setIsPostError(true);
        setShowSuccessMessage(false)
      });
  };

  const handleChange = (e) => {
    setCommentInput(e.target.value);
  };

  useEffect(() => {
    getCommentsByArticleId(article_id)
      .then(({ data: { comments } }) => {
        setComments(comments);
        setIsGetError(false);
      })
      .catch(() => {
        setIsGetError(true);
      });
  }, [isPostError]);
  return (
    <>
      <button onClick={handleClick}>Add comment</button>
      {showPostComment ? (
        <form onSubmit={handleSubmit}>
          <label htmlFor="comment-body">Comment:</label>
          <input type="text" id="comment-body" onChange={handleChange} value={commentInput}/>
          <button type="submit">Post comment</button>
          {isPostError ? <p>That didn't work. Please try again.</p> : null}
        </form>
      ) : null}
      {showSuccessMessage?<p>Your comment has been posted!</p>:null}
      <ul id="comments-list">
        {comments.map((comment) => {
          return <CommentCard comment={comment} key={comment.comment_id} />;
        })}
        {isGetError ? <p>That didn't work. Please try again.</p> : null}
      </ul>
    </>
  );
}
