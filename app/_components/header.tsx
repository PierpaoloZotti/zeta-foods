'use client'

import { HeartIcon, HomeIcon, MenuIcon, ScrollTextIcon } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { SignIn } from './signIn-button'
import { SignOut } from './signOut-button'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Separator } from './ui/separator'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetTitle,
    SheetTrigger,
} from './ui/sheet'

const Header = () => {
    const session = useSession()
    return (
        <div className="flex items-center justify-between px-5 pt-6">
            <Link href="/">
                <Image
                    src="/logo.png"
                    alt="Zetafoods"
                    width={100}
                    height={30}
                />
            </Link>

            <Sheet>
                <SheetTrigger asChild>
                    <Button
                        className="border-none bg-transparent"
                        variant="outline"
                        size="icon"
                    >
                        <MenuIcon />
                    </Button>
                </SheetTrigger>
                <SheetContent>
                    <SheetTitle>Menu</SheetTitle>
                    <div className="my-6">
                        {session?.data?.user ? (
                            <div className="flex items-center gap-x-2">
                                <Avatar>
                                    <AvatarImage
                                        src={session.data.user.image}
                                        alt="avatar"
                                    />
                                    <AvatarFallback>
                                        {
                                            session.data.user.name!.split(
                                                ' '
                                            )[0][0]
                                        }
                                        {
                                            session.data.user.name!.split(
                                                ' '
                                            )[1][0]
                                        }
                                    </AvatarFallback>
                                </Avatar>

                                <div className="flex flex-col gap-y-0">
                                    <span className="font-semibold">
                                        {session.data.user.name}
                                    </span>
                                    <span className="-mt-1 text-sm text-muted-foreground">
                                        {session.data.user.email}
                                    </span>
                                </div>
                            </div>
                        ) : (
                            <SignIn />
                        )}
                    </div>
                    <Separator className="my-6" />
                    <div className="flex h-full flex-col justify-between pb-32">
                        {session?.data?.user && (
                            <div className="flex flex-col gap-y-4">
                                <SheetClose asChild>
                                    <Button
                                        asChild
                                        size={'lg'}
                                        className=" flex w-full justify-start rounded-full"
                                    >
                                        <Link href={'/'}>
                                            <HomeIcon size={16} />
                                            <span className="ml-2">Inicio</span>
                                        </Link>
                                    </Button>
                                </SheetClose>
                                <Button
                                    asChild
                                    size={'lg'}
                                    className="w-full items-center justify-start rounded-full"
                                    variant={'ghost'}
                                >
                                    <Link href={'/'}>
                                        <ScrollTextIcon size={16} />
                                        <span className="ml-2">
                                            Meus Pedidos
                                        </span>
                                    </Link>
                                </Button>
                                <Button
                                    asChild
                                    size={'lg'}
                                    className="w-full items-center justify-start rounded-full"
                                    variant={'ghost'}
                                >
                                    <Link href={'/'}>
                                        <HeartIcon size={16} />
                                        <span className="ml-2">
                                            Restaurantes Favoritos
                                        </span>
                                    </Link>
                                </Button>
                                <Separator className="my-6" />
                            </div>
                        )}

                        {session?.data?.user && (
                            <div>
                                <Separator className="my-6" />
                                <SignOut title="Sair da conta" />
                            </div>
                        )}
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    )
}

export default Header
