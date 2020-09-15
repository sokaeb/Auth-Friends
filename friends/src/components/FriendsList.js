import React, { useEffect, useState } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';

const initialFriendsList = [];

export default function FriendsList(props) {
    const [ friends, setFriends ] = useState(initialFriendsList)

    const getData = () => {
        axiosWithAuth()
            .get('/api/friends')
            .then(res => {
                // console.log(res.data)
                setFriends({
                    friends: res.data
                })
                console.log(friends)
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        getData()
    }, [])

    return(
        <div>
            <p>Friends List comp</p>
            {/* {friends.map(friend => (<div>{friend.name}</div>))} */}
        </div>
    )
}