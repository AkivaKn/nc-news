import { useEffect, useState } from "react";
import CommentCard from "./CommentCard";
import { getCommentsByArticleId, getMoreCommentsByArticleId, postComment } from "../api";
import InfiniteScroll from "react-infinite-scroll-component";
import StyledButton from "../styling-components/StyledButton";
import StyledComment from "../styling-components/StyledComment";
import { useContext } from "react";
import { UserContext } from "../contexts/User";
import { useNavigate } from "react-router-dom";



export default function CommentsList({article_id}) {
  const [comments, setComments] = useState([]);
  const [showPostComment, setShowPostComment] = useState(false);
  const [commentInput, setCommentInput] = useState("");
  const [isGetError, setIsGetError] = useState(false);
  const [isPostError, setIsPostError] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [nextPageIndex, setNextPageIndex] = useState(2);
  const [isPosting, setIsPosting] = useState(false);
  const { user} = useContext(UserContext);
  const navigate = useNavigate();


  const handleClick = () => {
    if (user) {
      setShowPostComment(!showPostComment);
    } else {
      navigate('/login')
    }
  };
  const handleSubmit = (e) => {
    setIsPostError(false);
    e.preventDefault();
    e.target.disabled = true;
    setIsPosting(true);

    if (!commentInput) {
      setIsPosting(false);
      return;
    }
    let comment = {
      username: user.username,
      body: commentInput
    };
    postComment(article_id, comment)
      .then((res) => {
        setIsPosting(false);
        setIsPostError(false);
        setCommentInput("");
        setShowSuccessMessage(true);
        setComments((currentComments) => {
          return [res.data.comment,...currentComments];
        });
        e.target.disabled = false;
        setTimeout(() => {
          setShowSuccessMessage(false)
        }, 5000);
      })
      .catch(() => {
        setIsPosting(false)
        setIsPostError(true);
        setShowSuccessMessage(false);
        e.target.disabled = false;
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
        setIsLoading(false);
        comments.length === 10 ? setHasMore(true) : setHasMore(false);
      })
      .catch(() => {
        setIsGetError(true);
      });
  }, []);

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
      <StyledButton>
        <button onClick={handleClick}>Add comment</button>
        </StyledButton>
      {showPostComment ? (
        <form onSubmit={handleSubmit} id="comment-form">
          <label htmlFor="comment-body">Comment:</label>
          <textarea id="comment-body" rows="4" cols="50" onChange={handleChange} value={commentInput} ></textarea>
      <StyledButton>
          
            <button type="submit">Post comment</button>
      </StyledButton>
            {isPosting?<div className="posting-message"><i className="fa-solid fa-spinner fa-spin"></i><p>Posting</p></div>:null}
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
          return <StyledComment key={comment.comment_id}><CommentCard comment={comment} /></StyledComment>;
        })}
        {isGetError ? <p>That didn't work. Please try again.</p> : null}
        </ul>
        </InfiniteScroll>
        
      {isLoading?<div className="loading-message"><i className="fa-solid fa-spinner fa-spin"></i><p>Loading</p></div>:null}

    </>
  );
}
