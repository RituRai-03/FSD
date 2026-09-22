import React from 'react'
import { useState, useEffect} from "react"

const App = () => {
  const[product,setproduct]=useState([]);
  const[name,setName]=useState("");
  const[price,setPrice]=useState("")

  //get product
  const getProduct=async()=>{
    await fetch("http://localhost:5173/")
  }

  return (
    <div>
      
    </div>
  )
}

export default App

