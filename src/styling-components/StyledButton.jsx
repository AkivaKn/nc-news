import { useContext } from "react";
import { ThemeContext } from "../contexts/Theme";

export default function StyledButton({ children }) {
  const { theme } = useContext(ThemeContext)

    return (
        <div id="styled-button" className={`${theme}-button`}>
            {children}
        </div>
    )
}