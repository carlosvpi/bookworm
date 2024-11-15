import { ReactNode } from 'react';

const bgHash = {
  white: 'bg-white/25 hover:bg-white/75',
  gray: 'bg-gray-500/25 hover:bg-gray-500/75'
}

export function Button ({
  children,
  bg = 'white',
  onClick,
  tw = '',
  disabled = false,
  type = 'button'
}: {
  children: ReactNode,
  bg?: 'white' | 'gray',
  onClick?: React.MouseEventHandler,
  tw?: string,
  disabled?: boolean
  type?: 'submit' | 'reset' | 'button' | undefined
}) {
  
  return <button
    className={`mx-1 ${bgHash[bg]} p-2 rounded shadow-md ${tw}`}
    disabled={disabled}
    onClick={onClick}
    type={type}
  >
    {children}
  </button>
}