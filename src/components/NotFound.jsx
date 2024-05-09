import StyledNotFound from "../styling-components/StyledNotFound";

export default function NotFound() {
    return (
        <StyledNotFound>
            <h2>404</h2>
            <i className="fa-regular fa-face-sad-tear"></i>
            <h3>Page not found</h3>
        </StyledNotFound>
    )
}