import StyledTopicsList from "../styling-components/StyledTopicsList";

export default function TopicsList({ topicsList,isLoadingTopics }) {
  return (
    <StyledTopicsList>
      <h2>Topics</h2>
      {isLoadingTopics ? <i className="fa-solid fa-spinner fa-spin"></i> : null}

      <ul>
        {topicsList.map((topic) => {
          return <li key={topic.slug}>{topic.slug}</li>;
        })}
      </ul>
    </StyledTopicsList>
  );
}
