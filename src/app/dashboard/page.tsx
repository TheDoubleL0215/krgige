import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import Dashboard from "@/components/Dashboard"; // Import the Dashboard component

export default async function PrivatePage() {
    const supabase = createClient();

    // Fetch the authenticated user
    const { data, error } = await (await supabase).auth.getUser();

    // Redirect to login if not authenticated
    if (error || !data?.user) {
        redirect("/admin");
    }

    // Pass user data to the dashboard if needed
    return <Dashboard user={data.user as { id: string; email: string | undefined }} />;
}
