import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { axiosWithAuth } from '../utils/axiosWithAuth';


const initialCredentialData = {
    username: '',
    password: '',
}

const initialError = {
    error: '',
}

export default function Login(props) {
    const [ credentials, setCredentials ] = useState(initialCredentialData);
    const [ error, setError ] = useState(initialError);
    const history = useHistory();

const handleChange = evt => {
        setCredentials({
              ...credentials,
              [evt.target.name]: evt.target.value  
        });
    };

const login = evt => {
        evt.preventDefault();
        axiosWithAuth()
            .post('/api/login', credentials)
            .then(res => {
                // console.log(res)
                localStorage.setItem('token', res.data.payload);
                history.push('/protected');
            })
            .catch(err => {
                setError({
                    error: err.response.data.error
                });
            });
    };

    return (
        <div className="loginForm">
                <form onSubmit={login}>
                    <label>Username:&nbsp;
                        <input
                            type='text'
                            name='username'
                            value={credentials.username}
                            onChange={handleChange}
                        />
                    </label>
                    <label>Password:&nbsp;
                        <input
                            type='password'
                            name='password'
                            value={credentials.password}
                            onChange={handleChange}
                        />
                    </label>
                    <button>Log in</button>
                </form>
                    {/* <p>Error message here</p> */}
        </div>
    );
}

