import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import Dashboard from "@/components/Dashboard"; // Import the Dashboard component

/**
 * PrivatePage checks if the user is authenticated
 * with Supabase. If the user is not authenticated, it redirects to the
 * "/admin" page. Otherwise, it renders the Dashboard page with the
 * corresponding component.
 * @returns The Dashboard component with the user's information.
 */
export default async function PrivatePage() {
    const supabase = createClient();
    const { data, error } = await (await supabase).auth.getUser();

    if (error || !data?.user) {
        redirect("/admin");
    }

    return <Dashboard user={data.user as { id: string; email: string | undefined }} />;
}
