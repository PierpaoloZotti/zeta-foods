'use client'

import { ChevronDown, ChevronUp, Trash2Icon } from 'lucide-react'
import Image from 'next/image'
import { useContext } from 'react'
import { CartContext, CartProduct } from '../_context/cart'
import { calculateProductTotalPrice, formatPrice } from '../_helpers/price'
import { Button } from './ui/button'

type CartItemProps = {
    cartProduct: CartProduct
}

const CartItem = ({ cartProduct }: CartItemProps) => {
    const { removeProduct, updateProductQuantity } = useContext(CartContext)

    const handleRemoveProduct = () => {
        removeProduct(cartProduct.id)
    }
    const handleIncreaseQuantity = () => {
        updateProductQuantity(cartProduct.id, cartProduct.quantity + 1)
    }
    const handleDecreaseQuantity = () => {
        if (cartProduct.quantity === 1) {
            return
        }
        updateProductQuantity(cartProduct.id, cartProduct.quantity - 1)
    }

    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
                <div className="relative size-24">
                    <Image
                        src={cartProduct.imageUrl}
                        alt={cartProduct.name}
                        fill
                        className="rounded-md object-cover"
                    />
                </div>
                <div className="flex flex-col justify-between gap-4">
                    <div>
                        <h3 className="font-semibold ">{cartProduct.name}</h3>
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold">
                                {formatPrice(
                                    calculateProductTotalPrice(cartProduct) *
                                        cartProduct.quantity
                                )}
                            </span>
                            <span className="text-xs text-muted-foreground line-through">
                                {formatPrice(
                                    Number(cartProduct.price) *
                                        cartProduct.quantity
                                )}
                            </span>
                        </div>
                    </div>
                    <div className="flex items-center justify-start gap-2">
                        <Button
                            className="size-6 rounded-sm p-0"
                            onClick={handleDecreaseQuantity}
                            variant={'outline'}
                        >
                            <ChevronDown size={12} />
                        </Button>
                        <span className="w-4 text-center">
                            {cartProduct.quantity}
                        </span>
                        <Button
                            className="size-6 rounded-sm p-0"
                            onClick={handleIncreaseQuantity}
                        >
                            <ChevronUp size={12} />
                        </Button>
                    </div>
                </div>
            </div>
            <Button
                variant={'ghost'}
                size={'icon'}
                onClick={handleRemoveProduct}
            >
                <Trash2Icon size={16} className="text-primary" />
            </Button>
        </div>
    )
}

export default CartItem
