
export const dynamic = 'force-dynamic'
import React from 'react'
import { CharacterApiServiceSlice, ICharacterGender, ICharacterStatus, useCharactersQuery } from '../services/character.service'

import Link from 'next/link'

import { Pagination } from '@/components/Pagination'
import { TopFilter } from '@/components/TopFilter';
import { makeStore, store } from '@/redux/store';
import { FavoriteButton } from '@/components/FavoriteButton';
import { useCreateQueryString } from '@/hooks/route.hook';
import ClearParamsButton from '@/components/ClearFilterButton'
// create a function component that can be reused 



interface IProps { searchParams: { page?: string, status?: ICharacterStatus, gender?: ICharacterGender } }
export default async function CharactersPage({ searchParams }: IProps) {
  console.log('searchParams: ', searchParams);
  const store = makeStore();

  const { data: characterListResponse, isLoading } = await store.dispatch(CharacterApiServiceSlice.endpoints.characters.initiate(
    {
      page: parseInt(searchParams?.page ?? '1'),
      status: searchParams?.status ?? searchParams.status,
      gender: searchParams?.gender ?? searchParams.gender
    }
  ));


  if (isLoading) return <>...loading...</>
  if (!characterListResponse) return <>
    cannot find characters for this criteria
    <ClearParamsButton />

  </>


  return (
    <>
      <ul>
        <li className='flex w-full text-start justify-between border-b-2 p-3 bg-slate-400'>
          <p className='w-1/4'> name</p>
          <TopFilter />


          <p className='w-1/4'> actions</p>

        </li>
        {
          characterListResponse.results.map(character => {
            return (
              <li key={character.id} className='flex w-full text-start justify-between border-b-2 p-3 hover:bg-slate-300 li-item'>
                <p className='w-1/4'  >
                  {character.name}
                </p>
                <p className='w-1/4'  >
                  {character.status}
                </p>
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

      <Pagination
        nextUrl={characterListResponse.info.next}
        prevUrl={characterListResponse.info.prev}
        pages={characterListResponse.info.pages}
        page={searchParams.page}
      />
    </>
  )
}
