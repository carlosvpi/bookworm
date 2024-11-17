'use client';

import '@fontsource/roboto/300.css';
import Grid from '@mui/material/Grid2'
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { User } from '@prisma/client';
import { getUserToUserMessages } from '@/actions/user';
import TextField from '@mui/material/TextField';
import React, { ChangeEventHandler, useState } from 'react';

export function UserToUserMessageInput({
  currentUserId,
  user
}: {
  currentUserId: number,
  user: User
}) {
  const [content, setContent] = useState<string>('')
  const inputChange: ChangeEventHandler<HTMLInputElement> = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const value = (evt.target as HTMLInputElement).value
    setContent(value)
  }
  const onKeyDown = async (evt: React.KeyboardEvent) => {
    if (evt.code === 'Enter') {
      await fetch('/api/messages/sendMessageToUser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          authorId: currentUserId,
          content,
          userTargetId: user.id
        }),
      })
      setContent('')
    }
  }

  return <TextField
    sx={{ width: 1 }}
    id='userToUserMessageInput'
    label='Message'
    variant='outlined'
    onChange={inputChange}
    onKeyDown={onKeyDown}
    value={content}
  />
}
