import { useState, useEffect, useMemo } from "react"
import { db } from "../data/db"

export const useCart = () => {


    const initialCart = () => {

        const localStorageCart = localStorage.getItem('cart')

        return localStorageCart ? JSON.parse(localStorageCart) : []

    }

    const [data] = useState(db)
    const [cart, setCart] = useState(initialCart)


    useEffect(() => {


        localStorage.setItem('cart', JSON.stringify(cart))

    }, [cart])


    //Buena practica CONSTANTE GLOBAL

    const MAX_ITEMS = 5;
    const MIN_ITEMS = 1;

    //===================================


    function addToCart(item) {

        //Verificando si ya existe un elemento en el state con un ID
        const itemExists = cart.findIndex((guitar) => guitar.id === item.id)

        if (itemExists >= 0) {

            const updatedCart = [...cart]
            updatedCart[itemExists].quantity++
            setCart(updatedCart)

        } else {

            item.quantity = 1
            setCart([...cart, item])

        }

    }

    function removeFromCart(id) {

        setCart(cart.filter(guitar => guitar.id !== id))

    }

    function incrementItem(id) {

        const updatedCart = cart.map(item => {

            if (item.id === id && item.quantity < MAX_ITEMS) {


                return {
                    ...item,
                    quantity: item.quantity + 1

                }

            }

            return item

        })

        setCart(updatedCart)
    }

    function decreaseItem(id) {

        const updatedCart = cart.map(item => {

            if (item.id === id && item.quantity > MIN_ITEMS) {

                return {
                    ...item,
                    quantity: item.quantity - 1
                }

            }
            return item

        })

        setCart(updatedCart)
    }

    function clearCart() {

        setCart([])

    }

    //State derivado
    //UseMemo, recibe dependencias, está a la escucha de cambios para renderizar
    const isEmpty = useMemo(() => cart.length === 0, [cart])

    const cartTotal = useMemo(() => cart.reduce((total, item) => total + (item.quantity * item.price), 0), [cart])


    return {
        data,
        cart,
        setCart,
        addToCart,
        removeFromCart,
        incrementItem,
        decreaseItem,
        clearCart,
        MAX_ITEMS,
        MIN_ITEMS,
        isEmpty,
        cartTotal


    }

}
