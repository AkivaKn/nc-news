import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Header from './components/Header';
import { useEffect, useState } from 'react';
import { getTopics } from './api';
import Article from './components/Article';


function App() {
  const [topicsList, setTopicsList] = useState([]);
  const [isLoadingTopics, setIsLoadingTopics] = useState(true);
  const [user, setUser] = useState('grumpy19');
  const [isGetTopicsError, setIsGetTopicsError] = useState(false)

  useEffect(() => {
    setIsGetTopicsError(false)
    getTopics().then(({data:{topics}}) => {
      setTopicsList(topics)
      setIsLoadingTopics(false)
    })
      .catch(() => {
      setIsGetTopicsError(true)
    })
},[])

  return (
    <>
    <Header/>
    <Routes>
        <Route path='/' element={<Home topicsList={topicsList} isLoadingTopics={isLoadingTopics} isGetTopicsError={isGetTopicsError} />} />
        <Route path='/articles/:article_id' element={<Article user={user} />}/>
      </Routes>
      </>
  )
    
}

export default App
