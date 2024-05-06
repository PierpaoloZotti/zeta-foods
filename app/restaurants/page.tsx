'use client'

import { Restaurant } from '@prisma/client'
import { notFound, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import Header from '../_components/header'
import RestaurantItem from '../_components/restaurant-item'
import { searchRestaurants } from './_actions/restaurants-actions'

const Restaurants = () => {
    const searchParams = useSearchParams()
    const [restaurants, setRestaurants] = useState<Restaurant[]>([])
    const searched = searchParams.get('search')

    useEffect(() => {
        const fetchRestaurants = async () => {
            if (!searched) return
            const restaurants = await searchRestaurants(searched)
            setRestaurants(restaurants)
        }

        fetchRestaurants()
    }, [searchParams, searched])

    if (!searched) {
        return notFound()
    }
    console.log(restaurants)
    return (
        <>
            <Header />
            <div className="px-5">
                <h1 className="my-6 text-2xl font-semibold">
                    Restaurantes Encontrados
                </h1>
                <div className="flex flex-col gap-y-8">
                    {restaurants.map((restaurant) => (
                        <RestaurantItem
                            key={restaurant.id}
                            restaurant={restaurant}
                            className="mx-auto min-w-full max-w-full"
                        />
                    ))}
                </div>
            </div>
        </>
    )
}

export default Restaurants
