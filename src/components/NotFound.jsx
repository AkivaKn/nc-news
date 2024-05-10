import StyledNotFound from "../styling-components/StyledNotFound";
import { Link } from "react-router-dom";


export default function NotFound() {
    return (
        <StyledNotFound>
            <h2>404</h2>
            <i className="fa-regular fa-face-sad-tear"></i>
            <h3>Page not found</h3>
            <Link to={'/'}><i className="fa-solid fa-house"></i></Link>
        </StyledNotFound>
    )
}