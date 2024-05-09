import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/User";
import UserCommentsList from "./UserCommentsList";
import { useNavigate } from "react-router-dom";
import StyledButton from "../styling-components/StyledButton";
import StyledProfile from "../styling-components/StyledProfile";


export default function Profile() {
  const { user,setUser } = useContext(UserContext);
    const navigate = useNavigate();

  useEffect(() => {
    if (user===undefined || user === '') {
      navigate("/login");
    }
  }, []);
    
  const handleClick = () => {
    setUser('')
    navigate("/login");

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
      <UserCommentsList />
    </StyledProfile>
  );
}
