"use client"

import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { SelectValue } from '@radix-ui/react-select'
import { Search } from 'lucide-react'
import React, { useState } from 'react'

const Dashboard = () => {
    const months = ['január', 'február', 'március', 'április', 'május', 'június', 'julius', 'augusztus', 'szeptember', 'október', 'november', 'december']
    const [selectMonth, setSelectMonth] = useState<string>("")
    const [selectDay, setSelectDay] = useState<string>("")

    const handleSearch = () => {
        console.log(months.indexOf(selectMonth), parseInt(selectDay));
    }


    return (
        <div className='flex flex-col justify-center items-center gap-3 m-auto p-3 md:w-1/2 w-full'>
            <div className=" max-sm:flex-row flex gap-3 w-full">
                <Select value={selectMonth} onValueChange={setSelectMonth}>
                    <SelectTrigger className="">
                        <SelectValue placeholder="Hónap" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {months.map(month => (
                                <SelectItem key={month} value={month}>{month}</SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <Select value={selectDay} onValueChange={setSelectDay}>
                    <SelectTrigger className="">
                        <SelectValue placeholder="Nap" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {Array.from({ length: 31 }, (_, i) => (
                                <SelectItem key={i + 1} value={(i + 1).toString()}>
                                    {i + 1}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <Button onClick={handleSearch}>
                    <Search className=" opacity-60" size={16} strokeWidth={2} aria-hidden="true" />
                    Keresés
                </Button>
            </div>
            <div className="w-full">
                <h1>Ige</h1>
                <Textarea className='h-32 resize-none' placeholder='Írja ide az igét' />
            </div>
            <div className="w-full">
                <h1>Gondolatébresztő</h1>
                <Textarea className='h-32 resize-none' placeholder='Írja ide a gondolatébresztőt' />
            </div>
        </div>
    )
}

export default Dashboard