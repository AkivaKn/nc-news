import { useContext, useState } from "react";
import { UserContext } from "../contexts/User";
import { getUserByUsername } from "../api";

export default function Login() {
    const { user, setUser } = useContext(UserContext);
    const [usernameInput, setUsernameInput] = useState('');
    const [isError,setIsError] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsError(false)
        getUserByUsername(usernameInput)
            .then((res) => {
                setUser(res.data.user)
                setUsernameInput('')
            })
            .catch((err) => {
            setIsError(true)
        })
    }

    const handleChange = (e) => {
        setUsernameInput(e.target.value)
    }

    const handleClick = () => {
        setUser('')
    }

    return (
        user ?
            <div>
            <h2>Thank you. You are now logged in</h2>
            <button onClick={handleClick}>Log out</button>
            </div >
            :
           <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username-input">Username</label>
                <input type="text" value={usernameInput} onChange={handleChange} />
                {isError?<p>That didn't work</p>:null}
                <button type="submit">Login</button>
            </form>
    </div>

   )
}