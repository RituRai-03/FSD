import { useEffect, useState } from "react";
import "./App.css";

function App() {

    const [products, setProducts] = useState([]);

    useEffect(() => {

        fetch("http://localhost:5000/api/products")
            .then(response => response.json())
            .then(data => setProducts(data))
            .catch(error => console.log(error));

    }, []);

    return (
        <div>
            <h1>Product Manager</h1>

            {products.map(product => (
                <div key={product.id}>
                    <h3>{product.name}</h3>
                    <p>₹{product.price}</p>
                    <p>{product.category}</p>
                </div>
            ))}
        </div>
    );
}

export default App;