import { useEffect, useState } from "react";
import { getUsers } from "../api";
import UserCard from "./UserCard";
import StyledUserCard from "../styling-components/StyledUserCard";

export default function Users() {
    const [users, setUsers] = useState([])
    useEffect(() => {
        getUsers().then(({ data: { users } }) => {
            setUsers(users)
        })
    }, [])
    
    return (
        <ul id="users-list">
            {users.map((user) => {
                return <StyledUserCard key={user.username}> <UserCard user={user} /></StyledUserCard>
            })}
        </ul>
    )
}