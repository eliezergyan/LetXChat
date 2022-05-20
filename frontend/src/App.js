import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Chat from './pages/Chat';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import {} from './context/appContext'

function App() {
  const [rooms, setRooms] = useState([]);
  const [currentRoom, setCurrentRoom] = useState([]);
  const [members, setMembers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [privateMemberMsg, setPrivateMemberMsg] = useState({});
  const [newMessages, setNewMessages] = useState({});

  const user = useSelector((state) => state.user);
  return (
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
        <Route path='/chat' element={<Chat />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
