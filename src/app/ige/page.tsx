import { redirect } from "next/navigation";
import { format } from "date-fns";

export default function IgeSubpage() {

    const currentDate = format(new Date(), "MM-dd");
    redirect(`/ige/${currentDate}`);

    return null;
}
