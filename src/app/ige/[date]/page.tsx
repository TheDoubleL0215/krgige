"use client";

import { redirect, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { parse, format, isValid } from "date-fns";
import AccordionData from "@/components/AccordionData";
import DatePickerForm from "@/components/DatePicker";
import { createClient } from "@/utils/supabase/client"; // Use a client-side Supabase client
import { Ige } from "@/utils/types";

const DatePage = () => {
    const supabase = createClient(); // Client-side Supabase instance
    const params = useParams();
    const { date } = params;

    const parsedDate = parse(date as string, "MM-dd", new Date());

    if (!isValid(parsedDate)) {
        const currentDate = format(new Date(), "MM-dd");
        redirect(`/ige/${currentDate}`);
    }

    const [igek, setIgek] = useState<Ige[]>([]); // State to store the fetched data

    useEffect(() => {
        const fetchData = async () => {
            const { data, error } = await supabase.from("igek").select().eq("date", date);
            if (error) {
                console.error("Error fetching data:", error);
            } else {
                setIgek(data);
            }
        };

        fetchData();
    }, []); // Empty dependency array ensures this runs only once

    return (
        <div className="flex flex-col m-4">
            <DatePickerForm date={parsedDate} />
            <AccordionData author={igek[0]?.author} verse={igek[0]?.verse} thought={igek[0]?.thought} />
        </div>
    );
};

export default DatePage;
