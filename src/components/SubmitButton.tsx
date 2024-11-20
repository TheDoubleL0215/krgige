import React from 'react'
import { Button } from './ui/button'
import { ArrowRight } from 'lucide-react'

const SubmitButton = () => {
    return (
        <Button className="group w-full">
            Bejelentkezés
            <ArrowRight
                className="-me-1 ms-2 opacity-60 transition-transform group-hover:translate-x-0.5"
                size={16}
                strokeWidth={2}
                aria-hidden="true"
            />
        </Button>
    )
}

export default SubmitButton