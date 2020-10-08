const supertest = require('supertest');
var sizeOf = require('image-size');

var testLocal = 'http://localhost:8000';

describe("testing",()=>{
    // it("hello",async()=>{
    //     const response = await supertest(testLocal).get('/resizeImage').query({
    //         width: 200,
    //         height: 500
    //     })
    //     //console.log(response.body);
    //     //console.log(typeof response.body)
    // })

    it("testing image api",async()=>{
        const response = await supertest(testLocal).post('/upload/photo').attach(
            'myImage', '../image-api/myimage.jpg'
        ).field({
            width:234
        }).field({
            height:243
        })

        var dimensions = sizeOf(response.body.path);
        // console.log(dimensions);
        // console.log(response.body);

        expect(dimensions.height).toBe(243);
        expect(dimensions.width).toBe(234);
    })
})