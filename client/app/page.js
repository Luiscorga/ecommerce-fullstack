"use client"

import React, {use, useEffect, useState} from 'react'
import { fetcher } from "@/utils/fetcher";

function index() {

  const [message, setMessage] = useState("Loading");
  const [products, setProducts] = useState([]);


  useEffect(() => {
    fetch("http://localhost:8080/api/home").then(
      response => response.json()
    ).then(
      data => {
        console.log(data)
        setMessage(data.message)
        setProducts(data.products)
      }
    )
  }, [])


  return (
    <div>
      <div>{message}</div>
      {
        products.map((product, index) =>(
          <div key = {index}>
            {product}
            </div>
        ))
      }

    </div>
    
  )
}



export default index