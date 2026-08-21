//status code for network 200:succes,404: pagenot found
//Practice routing using http module in nodejs

import http from "http";
const server = http.createServer((req,res)=> {

res.writeHead(200,()=>{
    console.log("connection established successfully");
})
if(req.url==="/"){
    res.end("<h1>This is Home Page</h1>")
}
else if(req.url==="/about"){
    res.end("<h1>This is about page</h1>");
}else if (req.url==="/contact"){
    res.end("<h1>This is Contact page</h1>");
}
// res.end("<h1>This is Home Page</h1>")

})
server.listen(3001,()=>{
    console.log("server is running on http://localhost:3001")
})

//create a student information(name,age,branch,email in table) form using html and send the datat server using http 