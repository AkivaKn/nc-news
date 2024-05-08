import { useParams } from "react-router-dom";
import TopicsList from "./TopicsList";
import ArticlesList from "./ArticlesList";


export default function Topic({ topicsList, isLoadingTopics, isGetTopicsError }) {
    let { current_topic } = useParams()
    return (
        <div id="topic-page">
            <h2 id="articles-header">Articles about {current_topic}</h2>

            <TopicsList    topicsList={topicsList} isLoadingTopics={isLoadingTopics} isGetTopicsError={isGetTopicsError} />
            <ArticlesList current_topic={current_topic} />
            </div>
    )
}