import { useContext } from "react";
import { ThemeContext } from "../contexts/Theme";

export default function StyledLoginDialog({ children }) {
  const { theme } = useContext(ThemeContext)
  const dialogTheme = theme === 'light' ? 'dark' : 'light';
    return <div id="styled-login-dialog" className={dialogTheme}>{children}</div>;
  }
  