"use client"
import { useAppDispatch, useAppSelector } from '@/hooks/redux.hook'
import React from 'react'
import { Button } from './Button'
import { addToFavorite, removeToFavorite } from '@/redux/favorite.slice'

interface IFavoriteButton {
    id: number
}
export const FavoriteButton: React.FC<IFavoriteButton> = ({ id }) => {
    const favorites = useAppSelector(state => state.favorite.favorites)
    const dispatch = useAppDispatch()
    return (
        favorites.includes(id) ? (
            <Button onClick={() => dispatch(removeToFavorite(id))}>Remove favorite</Button>
        ) : (
            <Button onClick={() => dispatch(addToFavorite(id))}>Add to favorite</Button>
        )
    )
}
