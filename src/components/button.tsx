import { ReactElement, ReactNode } from "react";

export function Button ({
  children,
  bg = 'white',
  onClick,
  tw = '',
  disabled = false,
  type
}: {
  children: ReactNode,
  bg?: 'white' | 'gray-500',
  onClick?: React.MouseEventHandler,
  tw?: string,
  disabled?: boolean
  type?: "submit" | "reset" | "button" | undefined
}) {
  return <button
    className={`mx-1 bg-${bg}/25 hover:bg-${bg}/75 p-2 rounded shadow-md ${tw}`}
    disabled={disabled}
    onClick={onClick}
    type={type}
  >
    {children}
  </button>
}