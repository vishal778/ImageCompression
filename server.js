const express = require('express');
const resize = require('./resize');

const server = express();

server.listen(8000, ()=>{
    console.log("Server Started");
})

server.get('/',(req,res)=>{

    const width_String = req.query.width
    const height_String = req.query.height
    const format = req.query.format

    let width, height;
    if (width_String) {
        width = parseInt(width_String)
    }
    if (height_String) {
        height = parseInt(height_String)
    }
    res.type(`image/${format || 'jpg'}`);
    resize('myimage.jpg', format, width, height).pipe(res);
})
