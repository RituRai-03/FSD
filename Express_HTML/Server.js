import express from 'express';
import fs from 'fs';
const app=express();
const PORT=3000;
app.get('/',(req,res)=>{
fs.readFile('./pages/Index.html','utf-8', (err,data)=>
{
if(err){
    res.status(500).send("Error reading file");
    return;
}
res.send(data);
});
});

app.get('/About', (req,res)=>{})
app.get('/Contact', (req,res)=>{})
app.listen(PORT, () => {})