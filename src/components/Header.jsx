import { Link } from "react-router-dom";
import StyledHeader from '../styling-components/StyledHeader';
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/User";


export default function Header() {
    const { user } = useContext(UserContext);
    return (
        <header>
            <StyledHeader>
            <Link to={'/'} >
                < h1 > NC News</h1 >
            </Link>
                <Link to={'/profile'}>
                  {user &&  user.username ? <img src={user.avatar_url} alt="user avatar" height={'30px'} width={'30px'} id="profile-picture"/>:
            <i className="fa-regular fa-user"></i>}
            </Link>
            </StyledHeader>
            </header>
    )
        
}