import { useContext } from "react";
import { ThemeContext } from "../contexts/Theme";

export default function StyledHeader({ children }) {
  const { theme } = useContext(ThemeContext)
  const headerTheme = theme === 'light' ? 'dark' : 'light';
  return <div className={headerTheme} id="styled-header">{children}</div>;
}
