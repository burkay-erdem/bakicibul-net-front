"use client"
import { ICharacterGender, ICharacterStatus } from '@/services/character.service'
import React from 'react'

import { useRouter } from "next/navigation"
import { useCreateQueryString } from '@/hooks/route.hook'

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

export const TopFilter = () => {
    const router = useRouter();

    const { createQueryString } = useCreateQueryString();
    return (
        <>
            <div className='flex w-1/4'>
                <p className='pr-2'> status</p>
                <select defaultValue={"all"} onChange={(e) => {
                    const status = e.target.value as ICharacterStatus
                    console.log('status: ', status);
                    if (status == "all") {
                        router.push("/" + "?" + createQueryString("","", ["page", "status"]))
                        return
                    }
                    router.push("/" + "?" + createQueryString("status", status, ["page"]))
                }
                }>
                    {
                        statusOptions.map((option) =>
                            <option key={option.value} value={option.value}>{option.label}</option>
                        )
                    }
                </select>

            </div>
            <div className='flex w-1/4'>
                <p className='pr-2'> gender</p>
                <select defaultValue={"all"} onChange={(e) => {
                    const gender = e.target.value as ICharacterGender
                    console.log('gender: ', gender);
                    if (gender == "all") {
                        router.push("/" + "?" + createQueryString("gender",gender, ["page", "gender"]))
                        return

                    }
                    router.push("/" + "?" + createQueryString("gender", gender, ["page"]))
                }}>
                    {
                        genderOptions.map((option) =>
                            <option key={option.value} value={option.value}>{option.label}</option>
                        )
                    }
                </select>
            </div>
        </>

    )
}
