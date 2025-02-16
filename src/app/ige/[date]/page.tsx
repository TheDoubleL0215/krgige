"use client";

import { redirect, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { parse, format, isValid } from "date-fns";
import AccordionData from "@/components/AccordionData";
import DatePickerForm from "@/components/DatePicker";
import { createClient } from "@/utils/supabase/client";
import { Ige } from "@/utils/types";

/**
 * Page for a choosen date, which displays the daily verse, thought and prayer.
 * If the date is invalid, it redirects to the current date.
 */

const DatePage = () => {
	const supabase = createClient();

	const params = useParams();
	const { date } = params;

	const [igek, setIgek] = useState<Ige[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	//Converts the date yyyy-mm-dd to mm-dd
	const parsedDate = parse(date as string, "MM-dd", new Date());

	if (!isValid(parsedDate)) {
		const currentDate = format(new Date(), "MM-dd");
		redirect(`/ige/${currentDate}`);
	}


	//Requests the data from the database on page load
	useEffect(() => {
		const fetchData = async () => {
			const { data, error } = await supabase.from("igek").select().eq("date", date);
			if (error) {
				console.error("Error fetching data:", error);
			} else {
				setIgek(data);
				setIsLoading(false);
			}
		};

		fetchData();
	}, []);

	return (
		<div className="flex flex-col m-4">
			<DatePickerForm date={parsedDate} />
			<AccordionData
				author={igek[0]?.author}
				verse={igek[0]?.verse}
				thought={igek[0]?.thought}
				pray={igek[0]?.pray}
				teacher={igek[0]?.teacher}
				loading={isLoading} />
		</div>
	);
};

export default DatePage;
