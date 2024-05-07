import ArticlesList from "./ArticlesList";
import TopicsList from "./TopicsList";

export default function Home({topicsList,isLoadingTopics,isGetTopicsError}) {
    return (
        <div id="home-page">
            <TopicsList topicsList={topicsList} isLoadingTopics={isLoadingTopics} isGetTopicsError={isGetTopicsError} />
            <ArticlesList />
            </div>
    )
}