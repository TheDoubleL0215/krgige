import React, { useEffect, useState } from "react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

type Props = {
    "author": string,
    "verse": string,
    "thought": string,
}

const AccordionData = (props: Props) => {
    const defaultOpenItems = [
        'napkezdo',
        ...props.verse ? ['ige'] : [],
        ...props.thought ? ['gondolat'] : [],
    ]

    const fohasz =
        `Jöjj el Szentlélek Úristen
igazság és szeretet lelke!
Adj nekünk jó lelket, kedvet, 
szorgalmat és kitartást
ahhoz a munkához 
amelyre meghívtál!
Világosítsd meg értelmünket 
hogy a természetben
és az emberi életben 
felfedezzük a teremtő atya 
nagy szándékait!
Nevelj és alakíts bennünket 
hogy egész életünkben
alkalmasak legyünk 
az igazság szolgálatára
Krisztus a mi Urunk által
Ámen`

    return (
        <div className="">
            <Accordion type="multiple" defaultValue={defaultOpenItems} className="w-full h-full">
                <AccordionItem value="ige">
                    <AccordionTrigger>
                        <h1 className="text-3xl font-bold font-alegreyaMedium">Mai ige</h1>
                    </AccordionTrigger>
                    <AccordionContent>
                        {props.author ? <p className="text-xl justify-start pb-3">{props.author}</p> : null}
                        <p className="text-xl text-justify italic font-sourceSerif4Regular">
                            {props.verse ? props.verse : "(Nincs)"}
                        </p>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="gondolat">
                    <AccordionTrigger>
                        <h1 className="text-3xl font-bold font-alegreyaMedium">Gondolatébresztő</h1>
                    </AccordionTrigger>
                    <AccordionContent>
                        <p className="text-xl font-sourceSerif4Regular">
                            {props.thought ? props.thought : "(Nincs)"}
                        </p>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="napkezdo">
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