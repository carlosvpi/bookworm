'use client';

import React, { ChangeEventHandler, useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { User } from '@prisma/client';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import PersonAddAlt1 from '@mui/icons-material/PersonAddAlt1';
import PersonRemoveAlt1 from '@mui/icons-material/PersonRemoveAlt1';
import Person from '@mui/icons-material/Person';
import Link from 'next/link';

function FriendRow({
  user,
  currentUserId,
  befriend,
  unfriend
}: {
  user: User,
  currentUserId: number,
  befriend: (_0: number, _1: number) => void,
  unfriend: (_0: number, _1: number) => void,
}) {
  const isFriend = ((user as unknown) as {friends:User[]}).friends.some(friend => friend.id === currentUserId)
  return <>
    <TableCell>
      <Box>
        <Typography variant='h5'><Link href={`users/${user.id}`}>{user.name}</Link></Typography>
        <Typography variant='body2'>{`${user.createdAt}`}</Typography>
      </Box>
    </TableCell>
    <TableCell>
      {
        user.id === currentUserId ? <Button disabled><Person></Person></Button>
          : isFriend ? <Button color="error" onClick={() => unfriend(currentUserId, user.id)}><PersonRemoveAlt1></PersonRemoveAlt1></Button>
          : <Button onClick={() => befriend(currentUserId, user.id)}><PersonAddAlt1></PersonAddAlt1></Button>
      }
    </TableCell>
  </>
}

export function FindUser({ currentUserId }: { currentUserId: number }) {
  const [searchValue, setSearchValue] = useState<string>('')
  const [users, setUsers] = useState<User[]>([])
  const [friends, setFriends] = useState<User[]>([])
  const findUserBoxChange: ChangeEventHandler<HTMLInputElement> = (evt: React.FormEvent<HTMLInputElement>) => {
    const value = (evt.target as HTMLInputElement).value
    setSearchValue(value)
    updateSearchTable(value)
  }
  const updateSearchTable = async (value: string): Promise<User[]> => {
    if (value === '') {
      setUsers([])
      return []
    }
    const response = await fetch(`/api/users/findUsers?value=${value}`);
    const foundUsers = await response.json()
    setUsers(foundUsers)
    return foundUsers
  }
  const befriend = async (userId: number, friendId: number) => {
    await fetch('/api/friends/addFriend', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, friendId })
    })
    
    const users = await updateSearchTable(searchValue)
    const friend = users.find(({ id }) => friendId === id)
    if (!friend || friends.some(({ id }) => friend.id === id)) return
    setFriends([...friends, friend])
  }
  const unfriend = async (userId: number, friendId: number) => {
    await fetch('/api/friends/removeFriend', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, friendId })
    })
    setFriends(friends.filter(({ id }) => id !== friendId))
    updateSearchTable(searchValue)
  }
  useEffect(() => {
    fetch(`/api/users/getFriends?userId=${currentUserId}`)
      .then(response => response.json())
      .then(foundUsers => {
        setFriends(foundUsers)
      })
  }, [currentUserId])
  const friendsToShow = ([...friends]).sort((a, b) => a.name.localeCompare(b.name))
  const usersToShow = ([...users]).filter(({ id }) => !friends.some(friend => friend.id === id)).sort((a, b) => a.name.localeCompare(b.name))
  return <Box>
    <TableContainer>
      <Table size="small" aria-label="Users">
        <TableBody>
          {
            friendsToShow.map(user => {
              return <TableRow key={user.id}>
                <FriendRow
                  user={user}
                  currentUserId={currentUserId}
                  unfriend={unfriend}
                  befriend={befriend}
                ></FriendRow>
              </TableRow>
            })
          }
          <TableRow>
            <TableCell colSpan={2}>
              <TextField sx={{ width: 1 }} id='userSearchBox' label='User name' variant='outlined' onChange={findUserBoxChange}/>
            </TableCell>
          </TableRow>
          {
            usersToShow.map(user => {
              return <TableRow key={user.id}>
                <FriendRow
                  user={user}
                  currentUserId={currentUserId}
                  unfriend={unfriend}
                  befriend={befriend}
                ></FriendRow>
              </TableRow>
            })
          }
        </TableBody>
      </Table>
    </TableContainer>
  </Box>
}
