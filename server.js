const express = require('express');
const bodyParser= require('body-parser')
const morgan = require('morgan');
const resizes = require('./resize');
const crypto = require('crypto');
const path = require('path');
const multer = require('multer');
//const storage = multer.memoryStorage();
const storage = multer.diskStorage({
    destination: './files',
    filename: function(req,file,callback){
            callback(null, file.originalname)
          }
    })

const uploads = multer({storage});
const {ImageProcessing} = require('./ImageProcessing');
const ImageProcess = require('./ImageProcess');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');   
});

app.get('/resizeImage',(req,res)=>{

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
    resizes('myimage.jpg', format, width, height).pipe(res);
})

app.post('/upload/photo', uploads.single('myImage'),async(req,res)=>{
    // var filename = __dirname +'/'+ req.file.path;
    // console.log(filename);
    
    // var filename1 = req.protocol + req.file.path;
    // console.log(filename1);

    
    
    // const host = req.hostname;
    // const filepath = req.protocol + "://" + host + '/' + req.file.path;

    // console.log(filepath);
    //console.log(req);
    //res.type(req.file.mimetype);
    
    const path = await ImageProcess(req);
    //console.log("---",path);
    res.send({"path":path});
})

app.listen(8000, ()=>{
    console.log("Server started at port 8000");
})
