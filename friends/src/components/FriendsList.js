import React, { useEffect, useState } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import axios from 'axios';


export default function FriendsList(props) {
    const [ friends, setFriends ] = useState([])

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
    console.log(friends)

    return(
        <div>
            <p>Friends List comp</p>
            {friends.map(friend => (<div key={friend.id}>{friend.name}</div>))}
        </div>
    )
}