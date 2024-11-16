"use client";

import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { DatePickerForm } from "@/components/DatePicker";

function Page() {
  const defaultOpenItems = ["ige", "gondolat", "item-3"];

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
    <div className="m-4 flex gap-3 flex-col">
      <DatePickerForm />
      <Accordion type="multiple" defaultValue={defaultOpenItems} className="w-full h-full">
        <AccordionItem value="ige">
          <AccordionTrigger>
            <h1 className="text-3xl font-bold font-alegreyaMedium">Mai ige</h1>
          </AccordionTrigger>
          <AccordionContent>
            <p className="text-xl justify-start pb-3">(2Kor 12,10)</p>
            <p className="text-xl text-justify italic font-sourceSerif4Regular">
              „Íme, az Úré, a te Istenedé az ég és az egeknek egei, a föld és minden, ami rajta van.” (5Móz 10,14)
              „Dicsőség a magasságban Istennek, és a földön békesség, és az emberekhez jóakarat.” (Lk 2,14)
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="gondolat">
          <AccordionTrigger>
            <h1 className="text-3xl font-bold font-alegreyaMedium">Gondolatébresztő</h1>
          </AccordionTrigger>
          <AccordionContent>
            <p className="text-xl font-sourceSerif4Regular">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempora ratione sunt doloribus quia aspernatur optio adipisci quaerat debitis aperiam inventore odit itaque autem architecto expedita reiciendis, laboriosam vel? In, sequi?
              Numquam nesciunt veniam laboriosam non aliquam distinctio eius ea consequatur, error sint autem tenetur perferendis provident ipsam earum natus placeat. Mollitia dolores sed dicta! Doloribus facere officiis iste nostrum porro?
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
  );
}

export default Page;
