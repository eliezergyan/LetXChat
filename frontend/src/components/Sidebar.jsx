import React, { useContext, useEffect } from 'react'
import { ListGroup, Col, Row } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { AppContext } from '../context/appContext'
import { addNotifications, resetNotifications } from '../features/userSlice'
import "./Sidebar.css";

function Sidebar() {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch()
  const { socket, setMembers, members, setCurrentRoom, setRooms, privateMemberMsg, rooms, setPrivateMemberMsg, currentRoom } = useContext(AppContext);

  function joinRoom(room, isPublic = true){
    if(!user){
      return alert('Please login');
    }
    socket.emit('join-room', room, currentRoom);
    setCurrentRoom(room);

    if(isPublic){
      setPrivateMemberMsg(null);
    }

    // dispatch for notifications
    dispatch(resetNotifications(room));
  }

  socket.off('notifications').on('notifications', (room) => {
    if(currentRoom !== room)  dispatch(addNotifications(room))
  });

  useEffect(()=>{
    if(user){
      setCurrentRoom('General');
      getRooms();
      socket.emit('join-room', 'General');
      socket.emit('new-user');
    }
  }, [])
  
  socket.off('new-user').on('new-user', (payload)=>{
    setMembers(payload);
  })

  function getRooms(){
    fetch('http://localhost:5000/rooms').then(res => res.json()).then(data => setRooms(data))
  }

  function orderIds(id1, id2){
    if(id1 > id2){
      return id1 + '-' + id2
    } else {
      return id2 + '-' + id1
    }
  }

  function handlePrivateMemberMsg(member){
    setPrivateMemberMsg(member);
    const roomId = orderIds(user._id, member._id);
    joinRoom(roomId, false)
  }

  if(!user){
    return(<></>)
  }

  return (
    <>
      <h2>Chatrooms</h2>
      <ListGroup>
        {rooms.map((room, idx) => (
            <ListGroup.Item key={idx} onClick={()=> joinRoom(room.name)} active={room.name === currentRoom} style={{cursor: 'pointer', display:'flex', justifyContent: 'space-between'}}>
                {room.name}{currentRoom !== room.name && <span className="badge rounded-pill bg-primary">{user.newMessages[room.name]}</span>}
            </ListGroup.Item>
      ))}
      <br></br>

      {/*Display Current chatroom info*/}
      <h2>Chatroom Info</h2>
      <ListGroup>
          <ListGroup.Item><span>Current Chatroom:  </span>{  }
          {
            rooms.filter((room) => room.name === currentRoom).map(room => room.name)
          }
          </ListGroup.Item>
          <ListGroup.Item><span>Created By:</span> {  }
          {
            rooms.filter((room) => room.name === currentRoom).map(room => room.createdBy)
          }
          </ListGroup.Item>
          <ListGroup.Item><span>Date Created:</span> {  }
          {
            rooms.filter((room) => room.name === currentRoom).map(room => room.createdAt).toString().slice(0, 10)
          }
          </ListGroup.Item>
      </ListGroup>
          
      </ListGroup>
      <br></br>
      <h2>Members</h2>
      <ListGroup>
        {members.map((member) => (
          <ListGroup.Item key={member.id} style={{cursor: 'pointer'}} active={privateMemberMsg?._id === member._id} onClick={()=> handlePrivateMemberMsg(member)} disabled={member._id === user._id}> 
            <Row>
              <Col xs={2} className="member-status">
                <img src={member.picture} className="member-status-img" alt="member-status"/>
                {member.status === "online" ? <i className="fas fa-circle sidebar-online-status"></i> : <i className="fas fa-circle sidebar-offline-status"></i>}
              </Col>
              <Col xs={9}>
                {member.name}
                {member._id === user?._id && (" (You)")}
                {member.status === "offline" && (" (Offline)")}
              </Col>
              <Col xs={1}>
                <span className="badge rounded-pill bg-primary">{user.newMessages[orderIds(member._id, user._id)]}</span>
              </Col>
            </Row>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  )
}

export default Sidebar