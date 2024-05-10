import ArticlesList from "./ArticlesList";

export default function Home({
  topicsList,
  isLoadingTopics,
  isGetTopicsError,
}) {
  return (
    <div id="home-page">
      <h2 id="articles-header">Articles</h2>
     
      <ArticlesList  />
    </div>
  );
}
