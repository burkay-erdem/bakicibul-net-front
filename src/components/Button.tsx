import React from 'react'
import { IChildren } from '../interface/global'

interface IButton extends IChildren, React.ButtonHTMLAttributes<HTMLButtonElement> {
}
export const Button: React.FC<IButton> = ({
    children,
    ...props
}) => {
    return (
        <button
            className='border-2 p-2 rounded-md bg-yellow-200 disabled:bg-slate-300'
            {...props}
        >
            {children}
        </button>
    )
}
