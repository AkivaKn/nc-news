import { useEffect, useState } from "react";
import ArticleCard from "./ArticleCard";
import getArticles, { getMoreArticles } from "../api";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { ThemeContext } from "../contexts/Theme";
import { useContext } from "react";


export default function ArticlesList({topicsList}) {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [nextPageIndex, setNextPageIndex] = useState(2);
  const [isGetArticlesError, setIsGetArticlesError] = useState(false);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const sortByQuery = searchParams.get("sort_by");
  const orderQuery = searchParams.get("order");
  const topicQuery = searchParams.get("topic");
  const { theme } = useContext(ThemeContext);


  const setSortOrder = (direction) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("order", direction);
    setSearchParams(newParams);
  };

  const setSortBy = (sortBy) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("sort_by", sortBy);
    setSearchParams(newParams);
  };

  const setTopic = (topic) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("topic", topic);
    setSearchParams(newParams);
  };




  useEffect(() => {
    setIsGetArticlesError(false);
    getArticles(topicQuery, sortByQuery, orderQuery)
      .then(({ data }) => {
        setArticles(data.articles);
        setIsLoading(false);
        setHasMore(true);
        setNextPageIndex(2);
      })
      .catch((err) => {
        setIsGetArticlesError(true);
        setIsLoading(false);
        if (err.response.data.msg === "Topic not found") {
          navigate("/not-found");
        }
      });
  }, [topicQuery, sortByQuery, orderQuery]);

  const fetchMoreArticles = () => {
    setIsLoading(true);
    getMoreArticles(nextPageIndex, topicQuery, sortByQuery, orderQuery)
      .then((res) => {
        setArticles((currArticles) => {
          return [...currArticles, ...res.data.articles];
        });
        setIsLoading(false);
        res.data.articles.length === 10 ? setHasMore(true) : setHasMore(false);
      })
      .catch((err) => {
        setHasMore(false);
        setIsLoading(false);
      });

    setNextPageIndex((currIndex) => {
      return currIndex + 1;
    });
  };

  const handleChange = (e) => {
    if (e.target.value === "") {
      return;
    }
    const params = e.target.value.split(" ");
    setSortBy(params[0]);
    setSortOrder(params[1]);
  };

  const handleTopicChange = (e) => {
    setTopic(e.target.value)
  }

  return (
    <>
      <div id="articles-section">
        <div id="sort-filter">
        <div id="sort-by-select">
          <label htmlFor="sort-by">Sort</label>
          <select name="sort-by" id="sort-by" className={`${theme}-card`} onChange={handleChange}>
            <option value="">- - - sort</option>
            <option value="created_at desc">Date descending</option>
            <option value="created_at asc">Date ascending</option>
            <option value="votes desc">Votes descending</option>
            <option value="votes asc">Votes ascending</option>
            <option value="comment_count desc">Comments descending</option>
            <option value="comment_count asc">Comments ascending</option>
          </select>
        </div>
        <div id="topics-checkbox">
          <label htmlFor="topic-select">Topic</label>
          <select name="topic-select" id="topic-select" className={`${theme}-card`} onChange={handleTopicChange}>
            <option value="">All topics</option>
            {topicsList.map((topic) => {
              return <option value={topic.slug} key={topic.slug}>{topic.slug}</option>
})}

          </select>
          </div>
          </div>
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreArticles}
          hasMore={hasMore}
          endMessage={<p>No more articles to load.</p>}
        >
          <ul id="articles-list">
            {articles.map((article) => {
              return (
                <Link
                  to={`/articles/${article.article_id}`}
                  key={article.article_id}
                >
                  <ArticleCard article={article} />
                </Link>
              );
            })}
          </ul>
        </InfiniteScroll>
        {isLoading ? (
          <div className="loading-message">
            <i className="fa-solid fa-spinner fa-spin"></i>
            <p>Loading</p>
          </div>
        ) : null}
      </div>
      {isGetArticlesError ? <p>That didn't work. Please try again.</p> : null}
    </>
  );
}
