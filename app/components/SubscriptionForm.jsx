'use client'
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const SubscriptionForm = () => {
    const [userInfo, setUserInfo] = useState({
        name: "",
        email: ""
    });
    const [message, setMessage] = useState('');

        const handleSubmit = async (e) => {
            setMessage('');
            try {

                const response = await fetch('/api/subscribe', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: userInfo.name,
                        email: userInfo.email
                    })
                });
                
                const result = await response.json();
                console.log(result);
                

                if(response.ok) {
                    setMessage('Subscription Success');
                    setUserInfo('');
                }else {
                    setMessage(result.message || 'Something went wrong.');
                  }
            } catch (error) {
                setMessage('An error occurred. Please try again.');
            }
            
        }
        function handleChange(event) {
            const {name, value}= event.target;
           
            setUserInfo(prevValue => {
                return {
                    ...prevValue,
                    [name]: value
                };
            });
        }

  return (
    <div>
       <Form onSubmit={handleSubmit}>
            <TextField
                required
                id="outlined-required"
                label="Required"
                name='name'
                value={userInfo.name}
                onChange={handleChange}
                />
            <TextField
                required
                id="outlined-required"
                type='email'
                name='email'
                label="Required"
                value={userInfo.email}
                onChange={handleChange}
            />
            <Button variant="outlined" type='submit'>Subscribe</Button>
        </Form>
    </div>
  )
}

export default SubscriptionForm
