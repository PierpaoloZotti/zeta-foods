'use client'

import Cart from '@/app/_components/cart'
import { Button } from '@/app/_components/ui/button'
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/app/_components/ui/sheet'
import { CartContext } from '@/app/_context/cart'
import { Product } from '@prisma/client'
import { ChevronLeft, ShoppingBag } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useContext } from 'react'

type ProductImageProps = {
    product: Pick<Product, 'imageUrl' | 'name'> // Pick the imageUrl and name fields from the Product type
}
const ProductImage = ({ product }: ProductImageProps) => {
    const { products } = useContext(CartContext)
    console.log(products.length)
    const router = useRouter()
    return (
        <div className="relative h-[360px] w-full ">
            <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                objectFit="cover"
            />

            <Button
                onClick={() => router.back()}
                className="absolute left-4 top-4 size-fit rounded-full bg-neutral-100 p-2 text-foreground shadow-md transition-all duration-200 ease-in-out hover:text-white hover:shadow-inner"
                size="icon"
            >
                <ChevronLeft />
            </Button>
            {products.length > 0 && (
                <Sheet>
                    <SheetTrigger asChild>
                        <Button
                            variant={'ghost'}
                            className="absolute right-4 top-4 size-fit rounded-full p-2 shadow-md transition-all duration-200 ease-in-out hover:shadow-inner"
                        >
                            <div className="relative">
                                <ShoppingBag />
                                <span className="absolute -right-2 -top-2 rounded-full bg-primary px-1 text-xs font-semibold text-white">
                                    {products.length}
                                </span>
                            </div>
                        </Button>
                    </SheetTrigger>
                    <SheetContent>
                        <SheetHeader>
                            <SheetTitle>Sacola</SheetTitle>
                        </SheetHeader>
                        <Cart />
                    </SheetContent>
                </Sheet>
            )}
        </div>
    )
}

export default ProductImage
