const express=require('express');
const app=express();
const PORT=process.env.PORT | 3000;

app.use((req,_res,next)=>{
	console.log(`${req.method} ${req.originalUrl}`);
	next();
})

app.get('*',(req,res)=>{
	res.sendFile(process.cwd()+'/public'+req.url);
});

app.listen(PORT,()=>{
	console.log(`Listening on port ${PORT}`);
});