const express = require("express");
const app = express();

function md5ToDice(hash){

let num = parseInt(hash.substring(0,8),16);

let d1=(num % 6)+1;
let d2=((num>>3) % 6)+1;
let d3=((num>>6) % 6)+1;

let total=d1+d2+d3;

let result = total>=11 ? "Tai" : "Xiu";

return {
dice:[d1,d2,d3],
total:total,
result:result
}

}

app.get("/",(req,res)=>{
res.send("Tai Xiu API running");
});

app.get("/api/md5",(req,res)=>{

let hash=req.query.hash;

if(!hash){
return res.json({error:"missing hash"})
}

res.json(md5ToDice(hash))

})

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
console.log("API running");
});
