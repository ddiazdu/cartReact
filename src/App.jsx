import { useState, useEffect } from "react"
import Header from "./components/Header"
import Guitar from "./components/Guitar"
import { db } from "./data/db"

function App() {


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


  return (
    <>
      <Header

        cart={cart}
        removeFromCart={removeFromCart}
        incrementItem={incrementItem}
        decreaseItem={decreaseItem}
        clearCart={clearCart}
        MIN_ITEMS={MIN_ITEMS}
        MAX_ITEMS={MAX_ITEMS}
      />
      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">


          {data.map((guitar) => (
            //Iterando la DB

            <Guitar
              //Un prop siempre tiene que tener un ID
              key={guitar.id}
              guitar={guitar}
              addToCart={addToCart}

            />

          ))}

        </div>
      </main>
      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
      </footer>

    </>
  )
}

export default App
