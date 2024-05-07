import StyledArticleCard from "../styling-components/StyledArticleCard";

export default function ArticleCard({ article }) {
  return (
    <StyledArticleCard>
      <li>
        <h2>
          {article.author}/{new Date(article.created_at).toDateString()}
        </h2>
        <h3>{article.title}</h3>
        <img src={article.article_img_url} alt="article image" height="200px" />
        <h4>{article.topic}</h4>
      </li>
    </StyledArticleCard>
  );
}
