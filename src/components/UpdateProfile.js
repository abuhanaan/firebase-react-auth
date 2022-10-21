import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'


export default function UpdateProfile() {

    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { currentUser, updateEmail, updatePassword } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    function handleSubmit(e) {
        e.preventDefault()

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords do not match")
        }

        const promises = []
        setLoading(true)
        setError("")

        // if user attempts to update email
        if (emailRef.current.value !== currentUser.email) {
            promises.push(updateEmail(emailRef.current.value))
        }

        // if user attempts to update password
        if (passwordRef.current.value) {
            promises.push(updatePassword(passwordRef.current.value))
        }

        // if the two attempts above are successful or anyone of them
        Promise.all(promises).then(() => {
            navigate('/login')
        }).catch((e) => {
            console.log(e)
            setError('Failed to upload account')
        }).finally(() => {
            setLoading(false)
        })
    }

    return (
        <>
        <Card>
            <Card.Body>
                <h2 className='text-center mb-4'>Update Profile</h2>
                {/* {currentUser.email} */}
                {error && <Alert variant='danger'>{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group id='email'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type='email' ref={emailRef} required defaultValue={currentUser.email}/>
                    </Form.Group>
                    <Form.Group id='password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type='password' ref={passwordRef} placeholder='Leave blank to keep the same'/>
                    </Form.Group>
                    <Form.Group id='password-confirm'>
                        <Form.Label>Password Confirmation</Form.Label>
                        <Form.Control type='password' ref={passwordConfirmRef} placeholder='Leave blank to keep the same'/>
                    </Form.Group>
                    <Button disabled={loading} className='w-100 mt-2' type='submit'>Update</Button>
                </Form>
            </Card.Body>
        </Card>
        <div className='w-100 text-center mt-2'>
            <Link to='/'>Cancel</Link>
        </div>
        </>
    )
    }

