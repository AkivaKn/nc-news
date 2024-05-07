import { useEffect, useState } from "react";
import ArticleCard from "./ArticleCard";
import getArticles, { getMoreArticles } from "../api";
import InfiniteScroll from "react-infinite-scroll-component";

export default function ArticlesList() {
    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [hasMore, setHasMore] = useState(true);
    const [nextPageIndex,setNextPageIndex] = useState(2)

  useEffect(() => {
    getArticles().then(({ data}) => {
        setArticles(data.articles);
        setIsLoading(false)
    });
  }, []);
    
    const fetchMoreArticles = () => {
        setIsLoading(true)
        getMoreArticles(nextPageIndex)
            .then((res) => {
                setArticles((currArticles) => {
                    return [...currArticles,...res.data.articles]
                })
                setIsLoading(false)
                res.data.articles.length === 10 ? setHasMore(true) : setHasMore(false);
            })
            
        setNextPageIndex((currIndex) => {
            return currIndex + 1
        })
  }  

    return (
        <div id="articles-section">
            <h2 id="articles-header">Articles</h2>
        <div >
            
    <InfiniteScroll
      dataLength={articles.length}
      next={fetchMoreArticles}
      hasMore={hasMore} 
      endMessage={<p>No more articles to load.</p>}
    >
            <ul id="articles-list">
       { articles.map((article) => {
            return   <ArticleCard key={article.article_id} article={article} />
            
        })}
            </ul>
            </InfiniteScroll>
            {isLoading?<div className="loading-message"><i className="fa-solid fa-spinner fa-spin"></i><p>Loading</p></div>:null}
            </div>
            </div>
    )
}
