import React from "react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator"
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

type Props = {
    "author": string,
    "verse": string,
    "thought": string,
    "pray": string,
    "loading": boolean
}

const AccordionData = (props: Props) => {
    const defaultOpenItems = [
        'napkezdo',
        'ige',
        'gondolat'
    ]

    const fohasz =
        `Jöjj el, Szentlélek Úristen,
igazság és szeretet Lelke!
Adj nekünk jó lelket, kedvet,
szorgalmat és kitartást
ahhoz a munkához,
amelyre meghívtál!

Világosítsd meg értelmünket,
hogy a természetben
és az emberi életben
felfedezzük a Teremtő Atya
nagy szándékait!

Nevelj és alakíts bennünket,
hogy egész életünkben
alkalmasak legyünk
az igazság szolgálatára
Krisztus, a mi Urunk által.

Ámen.`

    return (
        <div className="md:m-auto md:w-9/12 h-full">
            <Accordion type="multiple" defaultValue={defaultOpenItems} className="w-full h-full">
                <AccordionItem value="ige">
                    {/* "Verse" accordion */}
                    <AccordionTrigger>
                        <h1 className="text-3xl font-bold font-alegreyaMedium">Mai ige</h1>
                    </AccordionTrigger>
                    <AccordionContent>
                        {props.loading ? <Skeleton count={1} /> : <p className="text-xl justify-start pb-3">{props.author ? props.author : null}</p>}
                        {props.loading ? <Skeleton count={2} /> : <p className="text-xl text-justify italic font-sourceSerif4Regular">
                            {props.verse ? props.verse : "(Nincs)"}
                        </p>}

                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="gondolat">
                    {/* "Thought and prayer" accordion */}
                    <AccordionTrigger>
                        <h1 className="text-3xl font-bold font-alegreyaMedium">Gondolatébresztő</h1>
                    </AccordionTrigger>
                    <AccordionContent>
                        {props.loading
                            ?
                            <Skeleton count={5} />
                            :
                            <div className="flex flex-col gap-3">
                                <p className="text-xl font-sourceSerif4Regular">
                                    {props.thought ? props.thought : "(Nincs)"}
                                </p>
                                {props.pray && <Separator />}
                                <p className="text-xl font-sourceSerif4Regular">
                                    {props.pray ? props.pray : null}
                                </p>
                            </div>

                        }
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="napkezdo">
                    {/* "Prayer at the beginning of the day" accordion */}
                    <AccordionTrigger>
                        <h1 className="text-3xl font-bold font-alegreyaMedium">Napkezdő imádság</h1>
                    </AccordionTrigger>
                    <AccordionContent>
                        <pre className="text-xl text-start font-sourceSerif4Regular">
                            {fohasz}
                        </pre>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    )
}

export default AccordionData