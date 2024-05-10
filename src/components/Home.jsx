import ArticlesList from "./ArticlesList";

export default function Home({
  topicsList,
}) {
  return (
    <div id="home-page">
      <h2 id="articles-header">Articles</h2>
     
      <ArticlesList  topicsList={topicsList}/>
    </div>
  );
}
