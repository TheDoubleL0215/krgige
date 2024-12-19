'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from "zod";
import { createClient } from '@/utils/supabase/server'


const loginSchema = z.object({
    username: z.string().min(1, { message: "Írja be a felhasználónevet!" }).trim(),
    password: z.string().min(1, { message: "Írja be a jelszót!" }).trim(),
});


/**
 * Handles the login form submission.
 * @param prevState the previous state of the form
 * @param formData the form data
 * @returns an object with a message property if there's an error
 */

export async function login(prevState: any, formData: FormData) {
    const supabase = await createClient()
    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    }

    const { error } = await supabase.auth.signInWithPassword(data)

    if (error) {
        return { message: 'Email vagy jelszó nem egyezik' }
    }

    redirect('/dashboard')
}

/**
 * Handles the signup form submission.
 * @param formData the form data
 */

export async function signup(formData: FormData) {
    const supabase = await createClient()

    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    }

    const { error } = await supabase.auth.signUp(data)

    if (error) {
        console.log(error)
    }

    revalidatePath('/', 'layout')
    redirect('/')
}