import express from 'express'
import cors from 'cors'
const app =express();

app.use(cors());

app.use("/files", express.static("Files"));

app.listen(3000, () =>{
    console.log("Server running on http://localhost:3000");
});