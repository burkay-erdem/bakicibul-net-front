"use client"
import { IChildren } from '@/interface/global'
import { ReduxProvider } from '@/providers/redux.provider'
import React from 'react'


interface IClientLayout extends IChildren {

}
export const ClientLayout: React.FC<IClientLayout> = ({ children }) => {
  return (
    <ReduxProvider>
      {children}
    </ReduxProvider>
  )
}
