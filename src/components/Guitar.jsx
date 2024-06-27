import { useState } from "react"
import { db } from "../data/db"

export default function Guitar({ guitar, addToCart }) {

    const { id, name, image, description, price } = guitar

    return (

        <div className="col-md-6 col-lg-4 my-4 row align-items-center">
            <div className="col-4">
                <img className="img-fluid" src={`/img/${image}.jpg`} alt="imagen guitarra" />
            </div>
            <div className="col-8">
                <h3 className="text-black fs-4 fw-bold text-uppercase">{name}</h3>
                <p>{description}</p>
                <p className="fw-black text-primary fs-3">${price}</p>
                <button
                    //Se agrega un callback para que no se ejecute al renderizar el componente
                    // El callback evita la ejecución inmediata y asegura que handleCart 
                    //se ejecute solo cuando el botón se haga click.
                    onClick={() => addToCart(guitar)}
                    //Tomo una copia del state, luego sigue funcionando el onclick
                    type="button"
                    className="btn btn-dark w-100"
                >Agregar al Carrito</button>
            </div>
        </div>

    )
}