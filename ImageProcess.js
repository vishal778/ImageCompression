const fs = require('fs');
const sharp = require('sharp');
var sizeOf = require('image-size');

const createId = () => {
    return new Date().getTime().toString();
}

module.exports = function ImageProcess(req) {
    //const readStream = fs.createReadStream(path);
    //let transform = sharp();

    const name = req.file.originalname;
    const path = req.file.path;
    var path1;

    const width_String = req.body.width;
    const height_String = req.body.height;

    var width, height;
    if (width_String) {
        width = parseInt(width_String)
    }
    if (height_String) {
        height = parseInt(height_String)
    }

    const id = createId();
    const formatName = name.split(' ').join('-');
    const fileName = `${id}-${formatName}`
    
    // if (height) {
    //     transform = transform.resize(width, height).on('info',(info)=>{
    //         console.log(info.height,"---",info.width);
    //     })
    // }else{
    //     transform = transform.resize(width).on('info',(info)=>{
    //         console.log(info.height,"----",info.width);
    //     })
    // }

    // transform.toFile(`./data/uploads/${fileName}`)

    //transform = transform.resize(width,height).toFile(`./data/uploads/${fileName}`);

    //readStream.pipe(transform);

    if(height){
        return sharp(path).resize(width,height).toFile(`./data/uploads/${fileName}`).then((data)=>{
            console.log(data);
            path1 = __dirname + '/' + `data/uploads/${fileName}`;
            console.log(path1);
            var dimensions = sizeOf(path1);
            console.log(dimensions);
            return path1;
        })
    }else{
        sharp(path).resize(width).toFile(`./data/uploads/${fileName}`).then((data)=>{
            console.log(data);
            path1 = __dirname + '/' + `data/uploads/${fileName}`;
            console.log(path1);
            var dimensions = sizeOf(path1);
            console.log(dimensions);
            return path1;
        })
    }

}