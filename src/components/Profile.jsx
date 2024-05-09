import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/User";
import UserCommentsList from "./UserCommentsList";
import { useNavigate } from "react-router-dom";
import StyledButton from "../styling-components/StyledButton";
import StyledProfile from "../styling-components/StyledProfile";
import UserArticleList from "./UserArticlesList";

export default function Profile() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [showArticles, setShowArticles] = useState(false);
  const [showComments,setShowComments] = useState(false)

  useEffect(() => {
    if (user === undefined || user === "") {
      navigate("/login");
    }
  }, []);

  const handleClick = () => {
    setUser("");
    navigate("/login");
  };

  const handleArticlesClick = () => {
    setShowArticles(!showArticles)
  }

  const handleCommentsClick = () => {
    setShowComments(!showComments)
  }

  return (
    <StyledProfile>
      <h3>{user.username}</h3>
      <img src={user.avatar_url} alt="users avatar" />
      <h2>Hi {user.name}</h2>
      <p>You have posted {user.comment_count} comments</p>
      <StyledButton>
        <button onClick={handleClick}>Log out</button>
      </StyledButton>
      <StyledButton>
        <button onClick={handleArticlesClick}>Your articles</button>
      </StyledButton>
      {showArticles? <UserArticleList /> :null}
      <StyledButton>
        <button onClick={handleCommentsClick}>Your comments</button>
      </StyledButton>
      {showComments? <UserCommentsList /> :null}
      
    </StyledProfile>
  );
}
