import { useEffect, useState } from "react";
import CommentCard from "./CommentCard";
import { getCommentsByArticleId, getMoreCommentsByArticleId, postComment } from "../api";
import InfiniteScroll from "react-infinite-scroll-component";


export default function CommentsList({ article_id, user }) {
  const [comments, setComments] = useState([]);
  const [showPostComment, setShowPostComment] = useState(false);
  const [commentInput, setCommentInput] = useState("");
  const [isGetError, setIsGetError] = useState(false);
  const [isPostError, setIsPostError] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [nextPageIndex, setNextPageIndex] = useState(2);

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
        setIsLoading(false)
      })
      .catch(() => {
        setIsGetError(true);
      });
  }, [isPostError]);

  const fetchMoreComments = () => {
    setIsLoading(true)
    getMoreCommentsByArticleId(article_id,nextPageIndex)
        .then((res) => {
            setComments((currComments) => {
                return [...currComments,...res.data.comments]
            })
            setIsLoading(false)
            res.data.comments.length === 10 ? setHasMore(true) : setHasMore(false);
        })
        
    setNextPageIndex((currIndex) => {
        return currIndex + 1
    })
}  

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
      {showSuccessMessage ? <p>Your comment has been posted!</p> : null}
      <InfiniteScroll
      dataLength={comments.length}
      next={fetchMoreComments}
      hasMore={hasMore} 
      endMessage={<p>No more comments to load.</p>}
    >
      <ul id="comments-list">
        {comments.map((comment) => {
          return <CommentCard comment={comment} key={comment.comment_id} user={user} />;
        })}
        {isGetError ? <p>That didn't work. Please try again.</p> : null}
        </ul>
        </InfiniteScroll>
        
      {isLoading?<div className="loading-message"><i className="fa-solid fa-spinner fa-spin"></i><p>Loading</p></div>:null}

    </>
  );
}
