import express from "express";
import cors from "cors";
import fs from "fs";

const app = express();

const PORT = 5000;


app.use(cors());
app.use(express.json());




app.get("/products", (req, res) => {

    const data = fs.readFileSync("product.json", "utf-8");

    const products = JSON.parse(data);

    res.json(products);

});



app.post("/api/products", (req, res) => {

    const data = fs.readFileSync("product.json", "utf-8");

    const products = JSON.parse(data);

    const newProduct = {
        id: products.length + 1,
        name: req.body.name,
        price: req.body.price,
        category: req.body.category
    };

    products.push(newProduct);

    fs.writeFileSync(
        "product.json",
        JSON.stringify(products, null, 2)
    );

    res.status(201).json(newProduct);

});




app.delete("/api/products/:id", (req, res) => {

    const id = Number(req.params.id);

    const data = fs.readFileSync("product.json", "utf-8");

    const products = JSON.parse(data);

    const updatedProducts = products.filter(
        product => product.id !== id
    );

    if (products.length === updatedProducts.length) {

        return res.status(404).json({
            message: "Product not found"
        });

    }

    fs.writeFileSync(
        "product.json",
        JSON.stringify(updatedProducts, null, 2) 
    );

    res.json({
        message: "Product deleted successfully"
    });

});


app.listen(PORT, () => {

    console.log(`Server is running on port ${PORT}`);

});
