import React, { useEffect, useState } from 'react';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from './ui/popover';
import { Button } from './ui/button';
import { CalendarIcon } from 'lucide-react';
import { hu } from 'date-fns/locale/hu';
import { format } from 'date-fns';
import { Calendar } from './ui/calendar';
import { redirect } from 'next/dist/server/api-utils';
import { useRouter } from 'next/navigation';

const DatePickerForm = ({ date }: { date: Date }) => {
    const router = useRouter();

    const handleDateSelect = (selectedDate: Date | undefined) => {
        if (selectedDate) {
            router.push(`/${format(selectedDate, 'MM-dd')}`);
        }
    };

    return (
        <div className="flex items-center gap-2 ">
            <Popover>
                <PopoverTrigger asChild>
                    <Button variant="outline" className='py-6 select-none flex-1 hover:bg-background'>
                        <CalendarIcon />
                        {date ? format(date, "PPP", { locale: hu }) : <span>Válassz dátumot!</span>}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                    <Calendar
                        className="rounded-md w-full h-full"
                        locale={hu}
                        mode="single"
                        selected={date}
                        onSelect={handleDateSelect}
                        initialFocus
                    />
                </PopoverContent>
            </Popover>
            <Button className='p-6' onClick={() => handleDateSelect(new Date())}>
                Ma
            </Button>
        </div>
    );
};

export default DatePickerForm;
