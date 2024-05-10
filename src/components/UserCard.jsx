import { useContext } from "react"
import { ThemeContext } from "../contexts/Theme"

export default function UserCard({ user }) {
    const { theme } = useContext(ThemeContext)

    return (
        <li className={`${theme}-card`}>
            <h2>{user.username}</h2>
            <img src={user.avatar_url} alt="user avatar" />
            <p>{user.comment_count} comments</p>
        </li>
    )
}