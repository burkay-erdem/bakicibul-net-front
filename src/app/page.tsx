"use client"
import React, { useMemo, useState } from 'react'
import { ICharacterGender, ICharacterStatus, useCharactersQuery } from '../services/character.service'
import { useAppDispatch, useAppSelector } from '../hooks/redux.hook'
import { addToFavorite, removeToFavorite } from '../redux/favorite.slice'
import Link from 'next/link'
import { Button } from '@/components/Button'


import dynamic from "next/dynamic";
// create a function component that can be reused 
const FavoriteButton = dynamic(() => import('@/components/FavoriteButton').then(res => res.FavoriteButton), {
  loading: () => <div>loading...</div>,
  ssr: false,
});


const statusOptions: { value: ICharacterStatus, label: string }[] =
  [
    {
      value: "all",
      label: "All"
    },
    {
      value: "alive",
      label: "Alive"
    },
    {
      value: "unknown",
      label: "Unknown"
    },
    {
      value: "dead",
      label: "Dead"
    },
  ]
const genderOptions: { value: ICharacterGender, label: string }[] =
  [
    {
      value: "all",
      label: "All"
    },
    {
      value: "male",
      label: "Male"
    },
    {
      value: "female",
      label: "Female"
    },
    {
      value: "genderless",
      label: "genderless"
    },
    {
      value: "unknown",
      label: "Unknown"
    },
  ]
export default function CharactersPage() {

  const [page, setPage] = useState(1)
  const [status, setStatus] = useState<ICharacterStatus>("all")
  const [gender, setGender] = useState<ICharacterGender>("all")


  const { data: characterListResponse, isLoading } = useCharactersQuery({
    page: page,
    status: status === 'all' ? undefined : status,
    gender: status === 'all' ? undefined : gender
  })

  const nextPage = useMemo(() => {
    if (!characterListResponse) return null;
    if (!characterListResponse.info.next) return null;
    const url = new URL(characterListResponse.info.next)
    return parseInt(url.searchParams.get('page') ?? "0")
  }, [characterListResponse])


  const prevPage = useMemo(() => {
    if (!characterListResponse) return null;
    if (!characterListResponse.info.prev) return null;
    const url = new URL(characterListResponse.info.prev)
    return parseInt(url.searchParams.get('page') ?? "0")
  }, [characterListResponse])

  if (isLoading) return <>...loading...</>
  if (!characterListResponse) return <>cannot read characters </>


  return (
    <>
      <ul>
        <li className='flex w-full text-start justify-between border-b-2 p-3 bg-slate-400'>
          <p className='w-1/4'> name</p>
          <div className='flex w-1/4'>
            <p className='pr-2'> status</p>
            <select defaultValue={"all"} onChange={(e) => setStatus(e.target.value as ICharacterStatus)}>
              {
                statusOptions.map((option) =>
                  <option key={option.value} value={option.value}>{option.label}</option>
                )
              }
            </select>

          </div>
          <div className='flex w-1/4'>
            <p className='pr-2'> gender</p>
            <select defaultValue={"all"} onChange={(e) => setGender(e.target.value as ICharacterGender)}>
              {
                genderOptions.map((option) =>
                  <option key={option.value} value={option.value}>{option.label}</option>
                )
              }
            </select>
          </div>


          <p className='w-1/4'> actions</p>

        </li>
        {
          characterListResponse.results.map(character => {
            return (
              <li key={character.id} className='flex w-full text-start justify-between border-b-2 p-3 hover:bg-slate-300'>
                <Link className='w-1/4' href={`/character/${character.id}`} >
                  {character.name}
                </Link>
                <Link className='w-1/4' href={`/character/${character.id}`} >
                  {character.status}
                </Link>
                <p className='w-1/4' >
                  {character.gender}
                </p>
                <div className='w-1/4'>
                  <FavoriteButton id={character.id} />
                </div>
              </li>
            )
          })
        }
      </ul >

      <div className='flex w-full justify-center mt-2 mb-5 '>
        <div className='flex justify-between items-center mt-2 w-44'>
          <Button disabled={!prevPage} onClick={() => prevPage && setPage(prevPage)}>prev</Button>
          <p>{page}/{characterListResponse.info.pages}</p>
          <Button disabled={!nextPage} onClick={() => nextPage && setPage(nextPage)}>next</Button>
        </div>
      </div>
    </>
  )
}
