const express = require("express");
const app = express();
app.use(express.json());


const products = [
  {
    id: 1,
    name: "Wireless Mouse",
    category: "Electronics",
    price: 799,
    stock: 25,
    rating: 4.3
  },
  {
    id: 2,
    name: "Running Shoes",
    category: "Footwear",
    price: 2499,
    stock: 40,
    rating: 4.5
  },
  {
    id: 3,
    name: "Laptop Stand",
    category: "Accessories",
    price: 999,
    stock: 30,
    rating: 4.2
  },
  {
    id: 4,
    name: "Smart Watch",
    category: "Electronics",
    price: 4999,
    stock: 12,
    rating: 4.4
  },
  {
    id: 5,
    name: "Backpack",
    category: "Fashion",
    price: 1599,
    stock: 50,
    rating: 4.1
  }
];


//Server Running Code:-
app.get("/", (req, res) => {
  res.send("Express server is running");
});


//[Routes-1]Return all Products:-
app.get("/products", (req, res) => {
  res.status(200).json(products);
});


//[Routes-2]Return product by ID:-
app.get("/products/:id", (req, res) => {
  const productsId = Number(req.params.id);
  const product = products.find(u => u.id === productsId);
  if (!product) {
    return res.status(404).json({ message: "Products Are not found"});
  }
  res.status(200).json(product);
});


//[Routes-3]Return products by category:-
app.get("/products/category/:categoryName",(req,res) =>{
    const categoryName = req.params.categoryName;
    const productsInCategory = products.filter(s => s.category.toLowerCase() === categoryName.toLowerCase());
    if (!productsInCategory) {
        return res.status(404).json({ message: "No Products Found in this Category" });
    }
    res.status(200).json(productsInCategory);
});


//[Routes-4]Add a new product:-
app.post("/products", (req, res) => {
  const newproducts = {
    id: products.length + 1,
    name: req.body.name,
    category: req.body.category,
    price: req.body.price,
    stock: req.body.stock,
    rating: req.body.rating
   };
   products.push(newproducts);
 //Add Product Message:-
   res.status(201).json({
     message: "Add NewProducts",
     products: newproducts
   });
});


//[Routes-5]Replace entire product:-
app.put("/products/:id", (req, res) => {
  const productsId = Number(req.params.id);
  const index = products.findIndex(u => u.id === productsId);
 //Send Message:-
   if (index === -1) {
     return res.status(404).json({ message: "Products not found" });
   }
 //Replace Products:-
  products[index] = {
    id: productsId,
    name: req.body.name,
    category: req.body.category,
    price: req.body.price,
    stock: req.body.stock,
    rating: req.body.rating
  };
 //Send Message To Products Replaced:-
  res.status(200).json({
    message: "Products Replaced",
    products: products[index]
  });
});



//[Routes-6]Update only stock value:-
app.put("/products/:id/stock", (req, res) => {
  const productId = Number(req.params.id);
  const index = products.findIndex(p => p.id === productId);
 // Check if product exists:-
   if (index === -1) {
     return res.status(404).json({ message: "Product not found" });
   }
 // Update only stock field:-
  products[index].stock = req.body.stock;
 //Send Message To Products Stock Replaced:-
  res.status(200).json({
    message: "Stock updated successfully",
    product: products[index]
  });
});



//[Routes-7]Update only price:-
app.put("/products/:id/price", (req, res) => {
  const productId = Number(req.params.id);
  const index = products.findIndex(p => p.id === productId);
 // Check if product exists:-
   if (index === -1) {
     return res.status(404).json({ message: "Product not found" });
   }
 // Update only stock field:-
  products[index].price = req.body.price;
 //Send Message To Products Stock Replaced:-
  res.status(200).json({
    message: "price updated successfully",
    product: products[index]
  });
});


app.listen(3000, () => {
  console.log("Server started on port 3000");
});