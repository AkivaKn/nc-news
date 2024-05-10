import { useContext } from "react"
import { ThemeContext } from "../contexts/Theme"


export default function StyledComment({ children }) {
  const { theme } = useContext(ThemeContext)
    
    return (
        <div id="styled-comment" className={`${theme}-card`}>
            {children}
        </div>
    )
}