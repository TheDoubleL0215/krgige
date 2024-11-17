import { redirect } from "next/navigation";
import { format } from "date-fns";

export default function Home() {

    const currentDate = format(new Date(), "MM-dd");
    redirect(`/${currentDate}`);

    return null;
}
