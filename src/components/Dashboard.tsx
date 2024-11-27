"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { createClient } from "@/utils/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Search } from "lucide-react";
import convertDate from "@/utils/convertDate";
import { Ige } from "@/utils/types";
import { revalidatePath } from "next/cache";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";

type DashboardProps = {
    user?: {
        email: string | undefined;
        id: string;
    };
};

const Dashboard = ({ user }: DashboardProps) => {
    const { toast } = useToast();
    const router = useRouter()

    const months = ["január", "február", "március", "április", "május", "június", "julius", "augusztus", "szeptember", "október", "november", "december"];
    const [selectMonth, setSelectMonth] = useState<string>("");
    const [selectDay, setSelectDay] = useState<string>("");
    const [igehelyInput, setIgehelyInput] = useState<string>("");
    const [igeInput, setIgeInput] = useState<string>("");
    const [thoughtInput, setThoughtInput] = useState<string>("");
    const [ige, setIgek] = useState<Ige[]>([]); // State to store the fetched data

    const supabase = createClient(); // Client-side Supabase instance

    useEffect(() => {
        if (ige.length > 0) {
            setIgehelyInput(ige[0]?.author);
            setIgeInput(ige[0]?.verse);
            setThoughtInput(ige[0]?.thought);
        } else {
            setIgehelyInput("");
            setIgeInput("");
            setThoughtInput("");
        }
    }, [ige]);

    const resetInputs = () => {
        setSelectMonth("");
        setSelectDay("");
        setIgehelyInput("");
        setIgeInput("");
        setThoughtInput("");
    };

    const handleSave = async () => {
        const formattedDate = convertDate(months.indexOf(selectMonth), selectDay);

        const { data, error } = await supabase
            .from("igek")
            .upsert(
                {
                    date: formattedDate,
                    author: igehelyInput,
                    verse: igeInput,
                    thought: thoughtInput,
                },
                { onConflict: "date" }
            )
            .select();

        if (error) {
            console.error(data);
            toast({
                title: "Hiba történt",
                description: error.message,
                variant: "destructive",
            });
        } else {
            toast({
                title: "Sikeresen mentve!",
                description: "Sikeresen mentve",
                variant: "default",
            });
            resetInputs();
        }
    };

    const searchForEntry = async () => {
        const formatedDate = convertDate(months.indexOf(selectMonth), selectDay);
        const { data, error } = await supabase.from("igek").select().eq("date", formatedDate);
        if (error) {
            console.error("Error fetching data:", error);
        } else {
            setIgek(data);
        }
    };

    const handleSingOut = async () => {
        await supabase.auth.signOut();
        router.push("/admin")

    }

    return <>
        <div className="flex w-full justify-end p-3">
            <Button onClick={() => handleSingOut()}>Kijelentkezés</Button>
        </div>
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
                <Button onClick={searchForEntry}>
                    <Search className=" opacity-60" size={16} strokeWidth={2} aria-hidden="true" />
                    Keresés
                </Button>
            </div>
            <div className="w-full">
                <h1>Igehely</h1>
                <Input placeholder='Írja ide az igehelyet' value={igehelyInput || ""} onChange={(e) => setIgehelyInput(e.target.value)} />
            </div>
            <div className="w-full">
                <h1>Ige</h1>
                <Textarea className='h-32 resize-none' placeholder='Írja ide az igét' value={igeInput || ""} onChange={(e) => setIgeInput(e.target.value)} />
            </div>
            <div className="w-full">
                <h1>Gondolatébresztő</h1>
                <Textarea className='h-32 resize-none' placeholder='Írja ide a gondolatébresztőt' value={thoughtInput || ""} onChange={(e) => setThoughtInput(e.target.value)} />
            </div>
            <div className="w-full flex justify-end">
                <Button className='w-5/12' onClick={handleSave}>Mentés</Button>
            </div>
        </div>
    </>

};

export default Dashboard;