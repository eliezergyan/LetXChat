import React, { useState } from 'react'
import { Form, Col, Row, Button } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import './MessageForm.css'

function MessageForm() {
    const [message, setMessage] = useState("");

    function getFormattedDate() {
        const date = new Date();
        const year = date.getFullYear();
        const month = (1+date.getMonth()).toString();

        month = month.length > 1 ? month : '0' + month
        const day = date.getDate().toString();

        day = day.length > 1 ? day : '0' + day;

        return month + "/" + day + "/" + year;
    }

    function handleSubmit(e) {
       e.preventDefault() 
    }

    const user = useSelector(state => state.user)

    return (
        <>
            <div className="messages-output">
                {!user && <div className='alert alert-danger'>Please login</div>}
            </div>
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col md={11}>
                            <Form.Group>
                                <Form.Control type="text" placeholder="Your message" disabled={!user}></Form.Control>
                            </Form.Group>
                        </Col>
                        <Col md={1}>
                            <Button variant="primary" type="submit" style={{width:'100%', backgroundColor:'orange'}} disabled={!user}>
                                <i className='fas fa-paper-plane '></i>
                            </Button>
                        </Col>
                    </Row>
                </Form>
        </>
    )
}

export default MessageForm