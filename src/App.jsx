import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Header from './components/Header';
import Article from './components/Article';
import NotFound from './components/NotFound';
import { UserProvider } from './contexts/User';
import Login from './components/Login';
import Profile from './components/Profile';


function App() {
 

  
  return (
    <UserProvider>
    <Header/>
    <Routes>
        <Route path='/' element={<Home  />} />
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
