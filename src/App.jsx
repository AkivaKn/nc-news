import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Header from './components/Header';
import { useEffect, useState } from 'react';
import { getTopics } from './api';
import Article from './components/Article';
import Topic from './components/Topic';
import NotFound from './components/NotFound';
import { UserProvider } from './contexts/User';
import Login from './components/Login';
import Profile from './components/Profile';


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
    <UserProvider>
    <Header/>
    <Routes>
        <Route path='/' element={<Home topicsList={topicsList} isLoadingTopics={isLoadingTopics} isGetTopicsError={isGetTopicsError} />} />
        <Route path='/topics/:current_topic' element={<Topic topicsList={topicsList} isLoadingTopics={isLoadingTopics} isGetTopicsError={isGetTopicsError} />} />
        <Route path='/articles/:article_id' element={<Article />} />
        <Route path='/not-found' element={<NotFound />} />
        <Route path='*' element={<NotFound />} />
        <Route path='/login' element={<Login />} />
        <Route path='/profile' element={<Profile/>}/>
      </Routes>
      </UserProvider>
  )
    
}

export default App
