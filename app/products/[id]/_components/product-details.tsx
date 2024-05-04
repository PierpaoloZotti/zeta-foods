'use client'

import DiscountBadge from '@/app/_components/badge-discount'
import Cart from '@/app/_components/cart'
import DeliveryDetails from '@/app/_components/delivery-details'
import ProductList from '@/app/_components/product-list'
import { Button } from '@/app/_components/ui/button'
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from '@/app/_components/ui/sheet'
import { CartContext } from '@/app/_context/cart'
import { calculateProductTotalPrice, formatPrice } from '@/app/_helpers/price'
import { Prisma } from '@prisma/client'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { useContext, useState } from 'react'

type ProductDetailsProps = {
    product: Prisma.ProductGetPayload<{
        include: {
            restaurant: true
        }
    }>
    complementaryProducts: Prisma.ProductGetPayload<{
        include: {
            restaurant: true
        }
    }>[]
}

const ProductDetails = ({
    product,
    complementaryProducts,
}: ProductDetailsProps) => {
    const [quantity, setQuantity] = useState(1)
    const [totalPrice, setTotalPrice] = useState(
        calculateProductTotalPrice(product)
    )
    const { addProduct, products } = useContext(CartContext)
    const [isCartOpen, setIsCartOpen] = useState(false)

    const handleIncrement = () => {
        setQuantity((prev) => prev + 1)
        setTotalPrice(calculateProductTotalPrice(product) * (quantity + 1))
    }

    const handleDecrement = () => {
        setQuantity((prev) => prev - 1)
        setTotalPrice(calculateProductTotalPrice(product) * (quantity - 1))
    }
    const handleAddToCart = () => {
        addProduct(product, quantity)
        setIsCartOpen(true)
    }

    return (
        <>
            <div>
                <div className="flex justify-between px-5">
                    <div className="flex flex-col">
                        <div className="flex items-center gap-x-2">
                            <h2 className="font-semibold">
                                {formatPrice(totalPrice)}
                            </h2>
                            {product.discountPercentage > 0 && (
                                <DiscountBadge
                                    discountPercentage={
                                        product.discountPercentage
                                    }
                                />
                            )}
                        </div>
                        {product.discountPercentage > 0 && (
                            <span className="text-xs  text-neutral-400">
                                De{' '}
                                {formatPrice(Number(product.price) * quantity)}
                            </span>
                        )}
                    </div>
                    <div>
                        <div className="flex items-center gap-x-2">
                            <Button
                                onClick={handleDecrement}
                                disabled={quantity === 1}
                                className="size-7"
                                size="icon"
                            >
                                <ChevronDown size={14} />
                            </Button>
                            <span className="w-4 text-center text-sm">
                                {quantity}
                            </span>
                            <Button
                                onClick={handleIncrement}
                                className="size-7"
                                size="icon"
                            >
                                <ChevronUp size={14} />
                            </Button>
                        </div>
                    </div>
                </div>
                <DeliveryDetails
                    deliveryFee={Number(product.restaurant.deliveryFee)}
                    deliveryTimeMinutes={product.restaurant.deliveryTimeMinutes}
                />
                <h2 className="mb-3 px-5 text-lg  font-semibold">Sobre</h2>
                <p className="px-5 text-muted-foreground">
                    {product.description}
                </p>
                <h2 className="my-3 px-5 text-lg  font-semibold">Sucos</h2>
                <ProductList products={complementaryProducts} />
                <div className="mx-5 my-6">
                    <Button
                        className="w-full font-semibold"
                        size="lg"
                        onClick={handleAddToCart}
                    >
                        Adicionar ao carrinho
                    </Button>
                </div>
            </div>
            <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Sacola</SheetTitle>
                    </SheetHeader>
                    <Cart />
                </SheetContent>
            </Sheet>
        </>
    )
}

export default ProductDetails
