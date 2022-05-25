import React, { useState } from 'react'
import { Form, Container, Col, Row, Button } from 'react-bootstrap'
import { useSignupUserMutation } from '../services/appApi';
import { Link, useNavigate } from "react-router-dom"
import "./Signup.css"
import botImg from "../assets/profile-pic-bot.jpg"


function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [staffID, setStaffID] = useState('');
  const navigate = useNavigate()
  const [ signupUser, { isLoading, error }] = useSignupUserMutation();

  // Image upload state
  const [image, setImage] = useState(null);
  const [uploadingImg, setUploadingImg] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  // Validate the size of the Image
  function validateImg (e) {
  const file = e.target.files[0];
  if(file.size >= 1048576) {
    return alert("Max file size is 1mb")
  } else {
    setImage(file);
    setImagePreview(URL.createObjectURL(file))
  }
  }
  
  async function uploadImage () {
    const data = new FormData();
    data.append('file', image);
    data.append('upload_preset', 'ouoscmx2')

    try{
      setUploadingImg(true);
      let res = await fetch('https://api.cloudinary.com/v1_1/dcychwrpc/image/upload', {
        method: "POST",
        body: data
      })
      const urlData = await res.json();
      setUploadingImg(false);
      return urlData.url
    } catch(error) {
      setUploadingImg(false);
      console.log(error);
    }
  }


  async function handleSignup (e) {
    e.preventDefault()
    // if(!image) return alert("Please upload your profile picture")
    const url = await uploadImage(image)

    // Register user
    signupUser({name, email, username, staffID, password, picture: url}).then(({data}) => {
      if(data) {
        navigate('/chat');
      }
    })
  }

  return (
      <Container>
          <Row>
          <Col md={15} className="d-flex align-items-center justify-content-center flex-direction-column"> 
              <Form style={{width: '80%', maxWidth: 500}} onSubmit={handleSignup}>
              <h1 className='text-center'>Create Account</h1>
              <div className='signup-profile-pic__container'>
                <img src={imagePreview || botImg} className='signup-profile-pic' alt="profile"/>
                <label htmlFor='image-upload' className='image-upload-label' >
                  <i className='fas fa-plus-circle add-picture-icon'></i>
                </label>
                <input type="file" id="image-upload" hidden accept="image/png, img/jpeg img/jpg" onChange={validateImg}/>
              </div>
              {error && <p className='alert alert-danger'>{error.data}</p>}
              <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter your name" onChange={(e) => setName(e.target.value)} value={name}/>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formUserName">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Enter a username" onChange={(e) => setUsername(e.target.value)} value={username}/>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formStaffId">
              <Form.Label>Staff ID</Form.Label>
              <Form.Control type="text" placeholder="Enter your staff ID" onChange={(e) => setStaffID(e.target.value)} value={staffID}/>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} value={email}/>
              </Form.Group>
          
              <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password}/>
              </Form.Group>
              <Button variant="primary" type="submit">
                {uploadingImg || isLoading ? 'Signing you up...' : 'Signup'}
              </Button>
              <div className="py-4">
                  <p className="text-center">
                      Already have an account ? <Link to="/login">login</Link>
                  </p>
              </div>
              </Form>
          </Col>
          <Col md={5} className="signup__bg"></Col>
          </Row>
      </Container>
)
}

export default Signup