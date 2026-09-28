import express from "express";
import fs from "fs";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

// GET Products
app.get("/api/products", (req, res) => {
  const data = fs.readFileSync("./product.json", "utf-8");

  const products = JSON.parse(data);

  res.json(products);
});

// POST Product
app.post("/api/products", (req, res) => {
  const data = fs.readFileSync("./product.json", "utf-8");

  const products = JSON.parse(data);

  const newProduct = {
    id: products.length > 0
      ? products[products.length - 1].id + 1
      : 1,
    name: req.body.name,
    price: req.body.price,
    category: req.body.category
  };

  products.push(newProduct);

  fs.writeFileSync(
    "./product.json",
    JSON.stringify(products, null, 2)
  );

  res.json(newProduct);
});

// DELETE Product
app.delete("/api/products/:id", (req, res) => {
  const data = fs.readFileSync("./product.json", "utf-8");

  let products = JSON.parse(data);

  const id = parseInt(req.params.id);

  const productExists = products.some(
    (product) => product.id === id
  );

  if (!productExists) {
    return res.status(404).json({
      message: "Product not found"
    });
  }

  products = products.filter(
    (product) => product.id !== id
  );

  fs.writeFileSync(
    "./product.json",
    JSON.stringify(products, null, 2)
  );

  res.json({
    message: "Product deleted successfully"
  });
});

// Start Server
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});