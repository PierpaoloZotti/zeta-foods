'use client'

import { useContext } from 'react'
import { CartContext } from '../_context/cart'
import { formatPrice } from '../_helpers/price'
import CartItem from './cart-item'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'
import { Separator } from './ui/separator'

const Cart = () => {
    const { products, subtotalPrice, totalDiscount, totalDeliveryFee } =
        useContext(CartContext)

    return (
        <>
            <div className="flex h-full flex-col justify-between py-10">
                <div className="space-y-3">
                    {products.map((product) => (
                        <CartItem cartProduct={product} key={product.id} />
                    ))}
                </div>
                <div>
                    <Card>
                        <CardContent className="bg-neutral-100">
                            <div className="flex justify-between p-2 text-sm text-muted-foreground">
                                <span>Subtotal:</span>
                                <span className="text-base text-foreground">
                                    {formatPrice(subtotalPrice)}
                                </span>
                            </div>
                            <Separator orientation="horizontal" />
                            <div>
                                <div className="flex justify-between p-2 text-sm text-muted-foreground">
                                    <span>Frete:</span>
                                    <span className="text-base text-foreground">
                                        {totalDeliveryFee > 0 ? (
                                            formatPrice(totalDeliveryFee)
                                        ) : (
                                            <span className="fonnt-semibold text-primary">
                                                Grátis
                                            </span>
                                        )}
                                    </span>
                                </div>
                                <Separator orientation="horizontal" />
                            </div>
                            <div className="flex justify-between p-2 text-sm text-muted-foreground">
                                <span>Desconto:</span>
                                <span className="text-base text-foreground">
                                    -{formatPrice(totalDiscount)}
                                </span>
                            </div>
                            <Separator orientation="horizontal" />
                            <div className="flex justify-between p-2 font-bold">
                                <span>Total:</span>
                                {formatPrice(subtotalPrice - totalDiscount)}
                            </div>
                        </CardContent>
                    </Card>
                    <Button className="mt-6 w-full font-semibold" size={'lg'}>
                        Finalizar Pedido
                    </Button>
                </div>
            </div>
        </>
    )
}

export default Cart
