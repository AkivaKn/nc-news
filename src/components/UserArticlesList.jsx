import { useEffect, useState } from "react";
import ArticleCard from "./ArticleCard";
import getArticles, { getMoreArticles } from "../api";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../contexts/User";

export default function UserArticleList() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [nextPageIndex, setNextPageIndex] = useState(2);
    const [isGetArticlesError, setIsGetArticlesError] = useState(false);
  const { user } = useContext(UserContext);
    

  useEffect(() => {
    setIsGetArticlesError(false);
    getArticles()
      .then(({ data }) => {
        setArticles(data.articles);
        setIsLoading(false);
        setHasMore(true);
        setNextPageIndex(2);
      })
      .catch((err) => {
        setIsGetArticlesError(true);
        setIsLoading(false);
      });
  }, []);

  const fetchMoreArticles = () => {
    setIsLoading(true);
    getMoreArticles(nextPageIndex)
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

  return (
    <>
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreArticles}
        hasMore={hasMore}
        endMessage={<p>No more articles to load.</p>}
      >
        <ul id="articles-list">
                  {articles.map((article) => {
                      if (user.username !== article.author) {
                  return
              }
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
      {isGetArticlesError ? <p>That didn't work. Please try again.</p> : null}
    </>
  );
}
