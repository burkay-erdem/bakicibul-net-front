"use client"
import React, { useMemo, useState } from 'react'
import { Button } from './Button'
import { useRouter } from 'next/navigation';
import { useCreateQueryString } from '@/hooks/route.hook';

interface IPagination {
    nextUrl: null | string;
    prevUrl: null | string;
    pages: number;
    page: string | undefined
}
export const Pagination: React.FC<IPagination> = ({ nextUrl, prevUrl, pages, page }) => {
    const router = useRouter();
    const { createQueryString } = useCreateQueryString();

    const nextPage = useMemo(() => {
        if (!nextUrl) return null;
        const url = new URL(nextUrl)
        return parseInt(url.searchParams.get('page') ?? "0")
    }, [nextUrl])


    const prevPage = useMemo(() => {
        if (!prevUrl) return null;
        const url = new URL(prevUrl)
        return parseInt(url.searchParams.get('page') ?? "0")
    }, [prevUrl])

    return (
        <div className='flex w-full justify-center mt-2 mb-5 '>
            <div className='flex justify-between items-center mt-2 w-44'>
                <Button disabled={!prevPage} onClick={() => prevPage && router.push("/" + "?" + createQueryString("page", prevPage.toString() ))}>prev</Button>
                <p>{page ?? 1}/{pages}</p>
                <Button disabled={!nextPage} onClick={() => nextPage && router.push("/" + "?" + createQueryString("page", nextPage.toString()))}>next</Button>
            </div>
        </div>
    )
}
