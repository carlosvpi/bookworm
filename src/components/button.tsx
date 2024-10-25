import { ReactElement, ReactNode } from "react";

export function Button ({
  children,
  bg = 'gray',
  onClick,
  tw = ''
}: {
  children: ReactNode,
  bg?: 'white' | 'gray',
  onClick?: React.MouseEventHandler,
  tw?: string
}) {
  return <button onClick={onClick} className={`mx-1 bg-${bg}/25 hover:bg-${bg}/75 p-2 rounded shadow-md ${tw}`}>
    {children}
  </button>
}