import React, { useEffect, useState } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';

const initialFriendValues = {
    name: '',
    age: '',
    email: '',
};

export default function FriendsList(props) {
    const [ friends, setFriends ] = useState([])
    const [ formValues, setFormValues ] = useState(initialFriendValues)

    // getting the list of friends 
   useEffect(() => {
        axiosWithAuth()
            .get('/api/friends')
            .then(res => {
                // console.log(res.data)
                setFriends(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, []);
    // console.log(friends)

    // Form functions
    const postNewFriend = newFriend => {
        axiosWithAuth()
            .post('/api/friends', newFriend)
            .then(res => {
                setFriends(friends.concat(res.data))
            })
            .catch(err => {
                console.log('Error posting friend', err)
            })
            .finally(() => {
                setFormValues(initialFriendValues)
            })
    }

    const inputChange = (evt)=> {
        // console.log(evt)
        setFormValues({
            ...formValues,
            [evt.target.name]: evt.target.value
        });
    };

    const submit = (evt) => {
        evt.preventDefault();
        const newFriend = {
            id: Date.now(),
            name: formValues.name.trim(),
            age: formValues.age.trim(),
            email: formValues.email.trim(),
        }
        postNewFriend(newFriend)
    };

    return(
        <div>
            <h2>Your Friends</h2>
            <div className='friendsList'>
                {friends.map(friend => (<div key={friend.id}>{friend.name}</div>))}
            </div>
            
            <div className='formDiv'>  
                <form className='formContainer' onSubmit={submit}>
                    <div className='formInputs'>
                        <h4>New Friend Information</h4>

                        <label>Name&nbsp;
                            <input 
                                value={formValues.name}
                                onChange={inputChange}
                                name='name'
                                type='text'
                            />
                        </label>

                        <label>Age&nbsp;
                            <input 
                                value={formValues.age}
                                onChange={inputChange}
                                name='age'
                                type='text'
                            />
                        </label>

                        <label>Email&nbsp;
                            <input 
                                value={formValues.email}
                                onChange={inputChange}
                                name='email'
                                type='text'
                            />
                        </label>
                    </div> 
                    <button id='submitBtn'>Submit Friend</button>
                </form>
            </div>
        </div>
    )
}