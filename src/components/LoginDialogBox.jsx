import { useContext, useState } from "react";
import { UserContext } from "../contexts/User";
import { getUserByUsername } from "../api";
import StyledLoginDialog from "../styling-components/StyledLoginDialog";
import StyledButton from "../styling-components/StyledButton";
import { ThemeContext } from "../contexts/Theme";

export default function LoginDialog({setIsDialogOpen}) {
  const { user, setUser } = useContext(UserContext);
  const [usernameInput, setUsernameInput] = useState("");
  const [isError, setIsError] = useState(false);
  const { theme } = useContext(ThemeContext)
  const dialogTheme = theme === 'light' ? 'dark' : 'light';
 

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsError(false);
    getUserByUsername(usernameInput)
      .then((res) => {
        setUser(res.data.user);
        setUsernameInput("");
      })
        .then(() => {
            setTimeout(() => {
                setIsDialogOpen(false)
            }, 3000);
        })
      .catch((err) => {
        setIsError(true);
      });
  };

  const handleChange = (e) => {
    setUsernameInput(e.target.value);
  };

  const handleClick = () => {
    setUser("");
  };
    
    const handleCloseClick = () => {
        setIsDialogOpen(false)
    }

  return (
    <StyledLoginDialog>
      {user ? (
        <div>
          <h2>Thank you. You are now logged in.</h2>
          <StyledButton>
            <button onClick={handleClick}>Log out</button>
          </StyledButton>
        </div>
          ) : (
                  <>
                      <button onClick={handleCloseClick} className={`close-button ${dialogTheme}`}><i className="fa-solid fa-xmark"></i></button>
                  <div>
          <form onSubmit={handleSubmit} className="login-form">
            <label htmlFor="username-input">Username</label>
            <input type="text" value={usernameInput} onChange={handleChange} />
            {isError ? <p>That didn't work</p> : null}
            <StyledButton>
              <button type="submit">Login</button>
            </StyledButton>
          </form>
                      </div>
                      </>
      )}
    </StyledLoginDialog>
  );
}
