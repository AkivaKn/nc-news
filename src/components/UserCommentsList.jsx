import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/User";
import { getCommentsByUsername, getMoreCommentsByUsername } from "../api";
import StyledComment from "../styling-components/StyledComment";
import CommentCard from "./CommentCard";
import InfiniteScroll from "react-infinite-scroll-component";

export default function UserCommentsList() {
  const { user } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [nextPageIndex, setNextPageIndex] = useState(2);
    const [isGetError, setIsGetError] = useState(false);
    const [userComments, setUserComments] = useState([]);
    

  useEffect(() => {
    getCommentsByUsername(user.username)
      .then(({ data: { comments } }) => {
        setUserComments(comments);
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
    getMoreCommentsByUsername(user.username,nextPageIndex)
        .then((res) => {
            setUserComments((currComments) => {
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
            <InfiniteScroll
            dataLength={userComments.length}
            next={fetchMoreComments}
            hasMore={hasMore} 
            endMessage={<p>No more comments to load.</p>}
            >
         <ul id="user-comments-list">
        {userComments.map((comment) => {
          return <StyledComment key={comment.comment_id}><CommentCard  comment={comment} /></StyledComment>;
        })}
        {isGetError ? <p>That didn't work. Please try again.</p> : null}
        </ul>
        </InfiniteScroll>
        
      {isLoading?<div className="loading-message"><i className="fa-solid fa-spinner fa-spin"></i><p>Loading</p></div>:null}
        </>
    )
}
