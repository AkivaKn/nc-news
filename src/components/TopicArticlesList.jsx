import { useEffect, useState } from "react";
import ArticleCard from "./ArticleCard";
import getArticles, { getMoreArticles } from "../api";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";

export default function TopicArticlesList({current_topic}) {
    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [hasMore, setHasMore] = useState(true);
    const [nextPageIndex, setNextPageIndex] = useState(2);
    const [isGetArticlesError,setIsGetArticlesError] = useState(false)

    useEffect(() => {
      setIsGetArticlesError(false)
    getArticles(current_topic).then(({ data}) => {
        setArticles(data.articles);
        setIsLoading(false)
        setHasMore(true)
        setNextPageIndex(2)
    })
        .catch(() => {
          setIsGetArticlesError(true)
      })
  }, [current_topic]);
    
    const fetchMoreArticles = () => {
        setIsLoading(true)
        getMoreArticles(nextPageIndex,current_topic)
            .then((res) => {
                setArticles((currArticles) => {
                    return [...currArticles,...res.data.articles]
                })
                setIsLoading(false)
                res.data.articles.length === 10 ? setHasMore(true) : setHasMore(false);
            })
            .catch(() => {
            setHasMore(false)
        })
            
        setNextPageIndex((currIndex) => {
            return currIndex + 1
        })
  }  

    return (
        <div id="articles-section">
            <h2 id="articles-header">Articles{ current_topic? ` about ${current_topic}`:null}</h2>
        <div >
            
    <InfiniteScroll
      dataLength={articles.length}
      next={fetchMoreArticles}
      hasMore={hasMore} 
      endMessage={<p>No more articles to load.</p>}
    >
            <ul id="articles-list">
       { articles.map((article) => {
           return (
               <Link to={`/articles/${article.article_id}`} key={article.article_id}>
                   <ArticleCard  article={article} />
                   </Link>
           )
        })}
            </ul>
            </InfiniteScroll>
            {isLoading?<div className="loading-message"><i className="fa-solid fa-spinner fa-spin"></i><p>Loading</p></div>:null}
            </div>
            {isGetArticlesError?<p>That didn't work. Please try again.</p>:null}
            </div>
    )
}
