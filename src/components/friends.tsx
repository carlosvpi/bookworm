"use client";

import { useState } from 'react'
import Link from 'next/link'

export function Friends({ users, currentUser }: { users: { id: number, name: string }[], currentUser: { id: number, friends: number[]}}) {
  const [friends, setFriends] = useState<number[]>(currentUser.friends);
  
  const addFriend = async (userId: number, friendId: number) => {
    await fetch('/api/friends/addFriend', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, friendId }),
    });
    setFriends([friendId, ...friends]);
  };

  const removeFriend = async (userId: number, friendId: number) => {
    await fetch('/api/friends/removeFriend', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, friendId }),
    });
    setFriends(friends.filter(id => id !== friendId));
  };

  return <ul>
  {users.map(user => {
    const isFriend = friends.includes(user.id)
    return <li key={user.id}>
      <Link href={`users/{friend.id}`}>{user.name ?? 'No name'}</Link>
      {
        isFriend
          ? <button onClick={() => removeFriend(currentUser.id, user.id)}>Unfriend</button>
          : <button onClick={() => addFriend(currentUser.id, user.id)}>Befriend</button>
      }
    </li>
  })}
</ul>
}