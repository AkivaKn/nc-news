import StyledArticleCard from "../styling-components/StyledArticleCard";
import { useContext } from "react";
import { ThemeContext } from "../contexts/Theme";

export default function ArticleCard({ article }) {
  const { theme } = useContext(ThemeContext)

  const currentTime = Date.now();
  const createdDate = new Date(article.created_at);
  const createdUnix = createdDate.getTime();
  const numOfMinutesSincePosted = Math.floor(
    (currentTime - createdUnix) / 60000
  );
  const numOfHoursSincePosted = Math.floor(
    (currentTime - createdUnix) / 3600000
  );
  let posted;
  if (numOfMinutesSincePosted < 60) {
    posted = `${numOfMinutesSincePosted} minutes ago`;
  } else if (numOfHoursSincePosted <= 24) {
    posted = `${numOfHoursSincePosted} hours ago`;
  } else {
    posted = new Date(article.created_at).toDateString();
  }

  return (
    <StyledArticleCard>
      <li className={`${theme}-card`}>
        <h2>
          {article.author}/ {posted}
        </h2>
        <h3>{article.title}</h3>
        <img src={article.article_img_url} alt="article image" height="200px" />
        <h4>{article.topic}</h4>
        <p>Votes: {article.votes}</p>
        <p>Comments: {article.comment_count}</p>
      </li>
    </StyledArticleCard>
  );
}
