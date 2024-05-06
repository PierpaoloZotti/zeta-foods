'use client'

import { LogInIcon } from 'lucide-react'
import { signIn } from 'next-auth/react'
import { cn } from '../_lib/utils'
import { Button } from './ui/button'

type SignInProps = {
    className?: string
}
export function SignIn({ className }: SignInProps) {
    return (
        <Button type="submit" variant={'link'} onClick={() => signIn()}>
            <div className="flex items-center gap-2">
                <span className="text-muted-foreground">Faça seu Log in</span>
                <LogInIcon className={cn('size-4', className)} />
            </div>
        </Button>
    )
}
