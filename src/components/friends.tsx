"use client";

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '../components/button'

export function Friends({
  currentUserId,
  friends
}: {
  currentUserId: number,
  friends: { id: number, name: string}[]
}) {
  const [friendIds, setFriendIds] = useState<number[]>(friends.map(({ id }) => id));
  
  const removeFriend = async (userId: number, friendId: number) => {
    await fetch('/api/friends/removeFriend', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, friendId }),
    });
    setFriendIds(friendIds.filter(id => id !== friendId));
  };
  if (friendIds.length === 0) {
    return <p>You are not connected to any booklover yet</p>
  }

  return <ul>
  {friendIds.map(friendId => {
    const friend = friends.find(({ id }) => id === friendId)
    if (!friend) return null
    const name = friend.name
    return <li key={friendId}>
      <Link href={`users/{friend.id}`}>{name ?? 'No name'}</Link>
      <Button bg='gray' onClick={() => removeFriend(currentUserId, friendId)}>Unfriend</Button>
    </li>
  })}
</ul>
}
