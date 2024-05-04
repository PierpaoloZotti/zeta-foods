'use client'

import { Prisma } from '@prisma/client'
import { createContext, useMemo, useState } from 'react'

export interface CartProduct
    extends Prisma.ProductGetPayload<{
        include: {
            restaurant: {
                select: {
                    deliveryFee: true
                }
            }
        }
    }> {
    quantity: number
}

interface ICartContext {
    products: CartProduct[]
    addProduct: (
        product: Prisma.ProductGetPayload<{
            include: {
                restaurant: {
                    select: {
                        deliveryFee: true
                    }
                }
            }
        }>,
        quantiy: number
    ) => void
    removeProduct: (productId: string) => void
    updateProductQuantity: (productId: string, quantity: number) => void
    subtotalPrice: number
    totalDiscount: number
    totalDeliveryFee: number
}

export const CartContext = createContext<ICartContext>({
    products: [],
    addProduct: () => {},
    removeProduct: () => {},
    updateProductQuantity: () => {},
    subtotalPrice: 0,
    totalDiscount: 0,
    totalDeliveryFee: 0,
})

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [products, setProducts] = useState<CartProduct[]>([])
    const addProduct = (
        product: Prisma.ProductGetPayload<{
            include: {
                restaurant: {
                    select: {
                        deliveryFee: true
                    }
                }
            }
        }>,
        quantity: number
    ) => {
        const existingProduct = products.some((p) => p.id === product.id)
        if (existingProduct) {
            setProducts((prev) =>
                prev.map((p) => {
                    if (p.id === product.id) {
                        return { ...p, quantity: p.quantity + quantity }
                    }
                    return p
                })
            )
            return
        }
        setProducts((prev) => [...prev, { ...product, quantity: quantity }])
    }
    const updateProductQuantity = (productId: string, quantity: number) => {
        setProducts((prev) =>
            prev.map((p) => {
                if (p.id === productId) {
                    return { ...p, quantity }
                }
                return p
            })
        )
    }
    const removeProduct = (productId: string) => {
        setProducts((prev) => prev.filter((p) => p.id !== productId))
    }

    const subtotalPrice = useMemo(() => {
        return products.reduce((acc, product) => {
            return Number(acc) + Number(product.price) * product.quantity
        }, 0)
    }, [products])

    const totalDiscount = useMemo(() => {
        return products.reduce((acc, product) => {
            return (
                Number(acc) +
                ((Number(product.price) * Number(product.discountPercentage)) /
                    100) *
                    product.quantity
            )
        }, 0)
    }, [products])

    const totalDeliveryFee = useMemo(() => {
        return products.reduce((acc, product) => {
            return Number(acc) + Number(product.restaurant.deliveryFee)
        }, 0)
    }, [products])

    return (
        <CartContext.Provider
            value={{
                products,
                addProduct,
                removeProduct,
                subtotalPrice,
                totalDiscount,
                updateProductQuantity,
                totalDeliveryFee,
            }}
        >
            {children}
        </CartContext.Provider>
    )
}
