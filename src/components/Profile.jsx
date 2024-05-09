import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/User";
import UserCommentsList from "./UserCommentsList";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { user } = useContext(UserContext);
    const navigate = useNavigate();

  useEffect(() => {
    if (!user.username) {
      navigate("/login");
    }
  }, []);
    

    
  return (
    <>
      <h3>{user.username}</h3>
      <img src={user.avatar_url} alt="users avatar" />
      <h2>Hi {user.name}</h2>
      <p>You have posted {user.comment_count} comments</p>
      <button>Log out</button>
      <UserCommentsList />
    </>
  );
}
