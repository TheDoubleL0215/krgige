"use client";

import { redirect, useParams, useRouter } from "next/navigation";
import { parse, format, isValid } from "date-fns";
import AccordionData from "@/components/AccordionData";
import DatePickerForm from "@/components/DatePicker";

const DatePage = () => {
    const params = useParams();

    const { date } = params;

    const parsedDate = parse(date as string, "MM-dd", new Date())


    if (!isValid(parsedDate)) {
        const currentDate = format(new Date(), "MM-dd");
        redirect(`/ige/${currentDate}`);
    }

    return (
        <div className="flex flex-col m-4">
            <DatePickerForm date={parsedDate} />
            <AccordionData author={""} verse={""} thought={"Itt a gondolatébresztő"} />
        </div>
    )
}

export default DatePage;
