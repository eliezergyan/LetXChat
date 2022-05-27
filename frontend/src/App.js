import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Chat from './pages/Chat';
import Profile from './pages/Profile'
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { AppContext, socket } from './context/appContext'

function App() {
  const [rooms, setRooms] = useState([]);
  const [currentRoom, setCurrentRoom] = useState([]);
  const [members, setMembers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [privateMemberMsg, setPrivateMemberMsg] = useState({});
  const [newMessages, setNewMessages] = useState({});


  const user = useSelector((state) => state.user);
  return (
    <AppContext.Provider value={{socket, currentRoom, setCurrentRoom, members, 
      setMembers, messages, setMessages, privateMemberMsg, setPrivateMemberMsg, 
      newMessages, setNewMessages, rooms, setRooms}}>
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path='/' element={<Home/>}/>
          {!user && (
          <>
            <Route path='/login' element={<Login />}/>
            <Route path='/signup' element={<Signup />}/>
          </>
          )}
          <Route path={`/profile/:id`} element={<Profile />}/>
          <Route path='/chat' element={<Chat />}/>
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
