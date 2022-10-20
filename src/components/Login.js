import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'


export default function Loin() {

    const emailRef = useRef()
    const passwordRef = useRef()
    const {login} = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setError('')
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            navigate('/')
        } catch(e) {
            console.log(e)
            setError("Failed to sign in")
        }
        setLoading(false)
    }
    return (
        <>
        <Card>
            <Card.Body>
                <h2 className='text-center mb-4'>Log In</h2>
                {/* {currentUser.email} */}
                {error && <Alert variant='danger'>{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group id='email'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type='email' ref={emailRef} required/>
                    </Form.Group>
                    <Form.Group id='password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type='password' ref={passwordRef} required/>
                    </Form.Group>
                    <Button disabled={loading} className='w-100 mt-2' type='submit'>Log In</Button>
                </Form>
            </Card.Body>
        </Card>
        <div className='w-100 text-center mt-2'>
            Dont Have An Accout Yet? <Link to='/signup'>Sign Up</Link>
        </div>
        </>
    )
    }

