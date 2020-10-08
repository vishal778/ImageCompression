const fs = require('fs');
const sharp = require('sharp');

module.exports = function resizes(path, format , width, height) {
    const readStream = fs.createReadStream(path);
    let transform = sharp();

    if (format) {
        transform = transform.toFormat(format)
    }
    
    if (height) {
        transform = transform.resize(width, height).on('info',(info)=>{
            console.log(info.height,"---",info.width);
        })
    }else{
        transform = transform.resize(width).on('info',(info)=>{
            console.log(info.height,"----",info.width);
        })
    }

    // transform.resize(width).on('info',function(info){
    //     console.log('Image height is ',+info.height);
    // })

    return readStream.pipe(transform);
}