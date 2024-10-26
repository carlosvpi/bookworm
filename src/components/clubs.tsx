"use client";

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '../components/button'

export function Clubs({
  currentUserId,
  creatorClubs,
  adminClubs,
  memberClubs,
}: {
  currentUserId: number,
  creatorClubs: { id: number, name: string}[],
  adminClubs: { id: number, name: string}[],
  memberClubs: { id: number, name: string}[]
}) {
  const [clubIds, setClubIds] = useState<number[]>([
    ...creatorClubs.map(({ id }) => id),
    ...adminClubs.map(({ id }) => id),
    ...memberClubs.map(({ id }) => id)
  ]);
  
  const removeClub = async (userId: number, clubId: number) => {
    await fetch('/api/clubs/removeClub', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, clubId }),
    });
    setClubIds(clubIds.filter(id => id !== clubId));
  };
  if (clubIds.length === 0) {
    return <p>You are not member of any book club yet</p>
  }

  return <ul>
    {creatorClubs.length > 0 && <li>
      <h5>Clubs you created</h5>
      <ul>
        {creatorClubs.map(({ id, name }) => {
          if (!clubIds.includes(id)) return null
          return <li key={`creator-${id}`}>
            <Link href={`/clubs/${id}`}>{name ?? 'No name'}</Link>
          </li>
        })}
      </ul>
    </li>}
    {adminClubs.length > 0 && <li>
      <h5>Clubs you admin</h5>
      <ul>
        {adminClubs.map(({ id, name }) => {
          if (!clubIds.includes(id)) return null
          return <li key={`creator-${id}`}>
            <Link href={`/clubs/${id}`}>{name ?? 'No name'}</Link>
            <Button bg='gray' onClick={() => removeClub(currentUserId, id)}>Leave</Button>
          </li>
        })}
      </ul>
    </li>}
    {adminClubs.length > 0 && <li>
      <h5>Your other clubs</h5>
      <ul>
        {memberClubs.map(({ id, name }) => {
          if (!clubIds.includes(id)) return null
          return <li key={`creator-${id}`}>
            <Link href={`/clubs/${id}`}>{name ?? 'No name'}</Link>
            <Button bg='gray' onClick={() => removeClub(currentUserId, id)}>Leave</Button>
          </li>
        })}
      </ul>
    </li>}
  </ul>
}