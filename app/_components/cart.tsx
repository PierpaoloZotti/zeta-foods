'use client'

import { useContext } from 'react'
import { CartContext } from '../_context/cart'
import { formatPrice } from '../_helpers/price'
import CartItem from './cart-item'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'
import { Separator } from './ui/separator'

const Cart = () => {
    const {
        products,
        subtotalPrice,
        totalDiscount,
        totalDeliveryFee,
        totalPrice,
    } = useContext(CartContext)

    return (
        <>
            {products.length > 0 ? (
                <>
                    <div className="flex h-full flex-col justify-between py-10">
                        <div className="space-y-3">
                            {products.map((product) => (
                                <CartItem
                                    cartProduct={product}
                                    key={product.id}
                                />
                            ))}
                        </div>
                        <div className="flex flex-col">
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
                                                    formatPrice(
                                                        totalDeliveryFee
                                                    )
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
                                    <Separator orientation="horizontal" />
                                    <div className="flex justify-between p-2 font-bold">
                                        <span>Total:</span>
                                        {formatPrice(totalPrice)}
                                    </div>
                                </CardContent>
                            </Card>

                            <Button
                                className="mt-6 w-full font-semibold"
                                size={'lg'}
                            >
                                Finalizar Pedido
                            </Button>
                        </div>
                    </div>
                </>
            ) : (
                <div className="flex h-full  items-center justify-center text-muted-foreground">
                    <p>Seu carrinho está vazio</p>
                </div>
            )}
        </>
    )
}

export default Cart
