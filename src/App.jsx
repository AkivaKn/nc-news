import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Header from './components/Header';
import { useEffect, useState } from 'react';
import { getTopics } from './api';


function App() {
  const [topicsList, setTopicsList] = useState([])
  const [isLoadingTopics,setIsLoadingTopics] = useState(true)

  useEffect(() => {
    getTopics().then(({data:{topics}}) => {
      setTopicsList(topics)
      setIsLoadingTopics(false)
    })
},[])

  return (
    <>
    <Header/>
    <Routes>
        <Route path='/' element={<Home topicsList={topicsList} isLoadingTopics={isLoadingTopics} />} />
      </Routes>
      </>
  )
    
}

export default App
