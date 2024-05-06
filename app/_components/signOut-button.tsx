'use client'
import { LogOutIcon } from 'lucide-react'
import { signOut } from 'next-auth/react'
import { cn } from '../_lib/utils'
import { Button } from './ui/button'
type SignOutProps = {
    title: string
    className?: string
}

export function SignOut({ title, className }: SignOutProps) {
    return (
        <Button
            type="submit"
            size={'lg'}
            variant={'ghost'}
            className="flex w-full items-center justify-start gap-2 rounded-full"
            onClick={() => signOut()}
        >
            <LogOutIcon className={cn('size-4', className)} />
            {title}
        </Button>
    )
}
