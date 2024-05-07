import axios from 'axios';

export default function getArticles() {
    return axios.get('https://news-now.onrender.com/api/articles')
}

export function getMoreArticles(pageIndex) {
    return axios.get('https://news-now.onrender.com/api/articles', {
        params: {
            p: pageIndex,
            limit:10
        }
    })
    
}

export function getTopics() {
    return axios.get('https://news-now.onrender.com/api/topics')
    
}