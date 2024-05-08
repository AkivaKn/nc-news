import { useParams } from "react-router-dom";
import TopicsList from "./TopicsList";
import TopicArticlesList from "./TopicArticlesList";


export default function Topic({ topicsList, isLoadingTopics, isGetTopicsError }) {
    let { current_topic } = useParams()
    return (
        <div id="topic-page">
            <TopicsList    topicsList={topicsList} isLoadingTopics={isLoadingTopics} isGetTopicsError={isGetTopicsError} />
            <TopicArticlesList current_topic={current_topic} />
            </div>
    )
}