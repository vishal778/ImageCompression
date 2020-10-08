const sharp = require('sharp');
const fs = require('fs');

const createId = () => {
    return new Date().getTime().toString();
}

const ImageProcessing = async(req) => {

    const width_String = req.body.width;
    const height_String = req.body.height;

    var width, height;
    if (width_String) {
        width = parseInt(width_String)
    }
    if (height_String) {
        height = parseInt(height_String)
    }

    // let transform = sharp();
    // transform = transform.resize(width).on('info',(info)=>{
    //     console.log("----");
    //     console.log(info);
    // })

    const id = createId();
    const formatName = req.file.originalname.split(' ').join('-');
    const fileName = `${id}-${formatName}`

    try{
        fs.access('./data/uploads',(err)=> {
            if(err){
                fs.mkdirSync('./data/uploads')
            }
        })
        await sharp(req.file.buffer)
        .resize({width,height})
        .toFile(`./data/uploads/${fileName}`)
        .then((data)=>{
            console.log(data);
        });

        

        //console.log(transform);

        // if(height){
        //     await sharp(req.file.buffer).resize(height)
        //     .toFile(`./data/uploads/${fileName}`)
        //     .then((data)=>{
        //         console.log(data);
        //     });
        // }else{
        //     await sharp(req.file.buffer).resize(width).on('info',(info)=>{
        //         console.log(info);
        //     })
        //     .toFile(`./data/uploads/${fileName}`)
        //     .then((data)=>{
        //         console.log("--------");
        //         console.log(data);
        //     })
        // }

    }catch(err){
        console.log("Error in Image Processing");
    }
    
}

module.exports = {ImageProcessing};