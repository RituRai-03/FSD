import express from "express";
const  app = express();
app.use(express.json());
let users=[{
    id:1,
    name:"Ritu Rai",
    email:"ritu.rai@example.com"
    
},
{
    id:2,
    name:"Jhalak",
    email:"jhalak@example.com"
}
];

app.get("/users",(req,res)=>{
    res.json(users);
});

app.post("/users",(req,res)=>{
    const User={
        id:users.length+1,
        name:req.body.name,
        email:req.body.email
    }
    users.push(User);
    res.json(User);
});

app.listen(8000,()=>{
    console.log("Server is running on port 8000");
});

