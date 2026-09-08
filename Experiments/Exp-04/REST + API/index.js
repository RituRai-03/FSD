import express from "express";

const app = express();

app.use(express.json());

let users = [
    {
        id: 1,
        name: "Ritu Rai",
        email: "ritu.rai@example.com"
    }
];

// GET - Get all users
app.get("/users", (req, res) => {
    res.json(users);
});

// POST - Add a new user
app.post("/users", (req, res) => {
    const User = {
        id: users.length + 1,
        name: req.body.name,
        email: req.body.email
    };

    users.push(User);

    res.json(User);
});

// PUT - Update user by ID
app.put("/users/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const user = users.find(u => u.id === id);

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    user.name = req.body.name;
    user.email = req.body.email;

    res.json(user);
});

// DELETE - Delete user by ID
app.delete("/users/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const user = users.find(u => u.id === id);

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    users = users.filter(u => u.id !== id);

    res.json({
        message: "User deleted successfully"
    });
});

// Start server
app.listen(8000, () => {
    console.log("Server is running on http://localhost:8000");
});