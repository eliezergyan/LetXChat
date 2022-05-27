import React, { useState } from 'react'
import { Form, Container, Col, Row, Button } from 'react-bootstrap'
import { useEditUserMutation } from '../services/appApi';
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useParams } from "react-router";
import './Profile.css'
import botImg from '../assets/profile-pic-bot.jpg'


function EditUser() {
  const user = useSelector(state => state.user)

  const [username, setUsername] = useState(user.username);

  let { id } = useParams();

  const navigate = useNavigate()
  const [ editUser, { isLoading, error }] = useEditUserMutation();

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
        method: "PUT",
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


  async function handleEditUser (e) {
    e.preventDefault()

    const url = await uploadImage(image)

    // Edit user
    editUser({ id, username, picture: url}).then(({data}) => {
      if(data) {
        navigate('/chat')
      }
    })
  }

  function handleCancel (e) {
    navigate('/chat');
  }

  return (
      <Container>
          <Row>
          <Col md={15} className="d-flex align-items-center justify-content-center flex-direction-column"> 
              <Form style={{width: '80%', maxWidth: 500}} onSubmit={handleEditUser}>
              <h1 className='text-center'>Edit Profile</h1>
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
              <Form.Control type="text" defaultValue={user.name} disabled={true}/>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicUserName">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" onChange={(e) => setUsername(e.target.value)} value={username}/>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicStaffId">
              <Form.Label>Staff ID</Form.Label>
              <Form.Control type="text" defaultValue={user.staffID} disabled={true}/>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" defaultValue={user.email} disabled={true}/>
              </Form.Group>
          
              <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" defaultValue={'**********'} disabled={true}/>
              </Form.Group>
              <Button variant="danger" type="submit" onClick={handleCancel}>
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                {uploadingImg || isLoading ? 'Saving changes...' : 'Save Changes'}
              </Button>
              </Form>
          </Col>
          <Col md={5} className="signup__bg"></Col>
          </Row>
      </Container>
)
}

export default EditUser