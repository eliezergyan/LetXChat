import React from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useSelector } from 'react-redux'
import './Home.css'

function Home() {
  const user = useSelector(state => state.user)

  return (
    <div className='home__container'>
    <Row>
        <Col md={7} className="home__bg">
          <div className='homepage__image'>
            <img src='https://www.pngitem.com/pimgs/m/14-144882_people-connected-through-social-media-hd-png-download.png' alt='banner'/>
          </div>
        </Col>
        <Col md={5} className="d-flex flex-direction-column align-items-center justify-content-center">
            <div className='app__description'>
                <h1><span className='desc__connect'>Connect</span> and <span className='desc__share'>Share</span> ideas</h1>
                <p>LetXChat is an instant messaging app that allows you to connect and share ideas with colleagues on projects</p>
                <LinkContainer to={user ? '/chat' : '/signup'}>
                    <Button variant='warning'><span className='btn__text'>Get Started</span><i className="fas fa-comments home-message-icon"></i></Button>   
                </LinkContainer>
            </div>
        </Col>
    </Row>
    </div>
  )
}

export default Home

