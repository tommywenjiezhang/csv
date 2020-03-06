
const CsvReader = require('../controller/CsvReader')

const fs = require('fs')
const csv = require('csv-parser');
const City = require('../model/city')
var path = require('path');
var appDir = path.dirname('/Users/wenjiezhang/Documents/Software/School/csv/index.js');
let result = null

test('return value is created from city', () => {
    let cr = new CsvReader(appDir +"/data/worldcities.csv")
    return cr.read(City).then((data)=> {
        expect(data[0] instanceof City).toBeTruthy();
    })
});

test('109 record is retrun', () => {
    let cr = new CsvReader(appDir +"/data/worldcities.csv")
    return cr.read(City).then((data)=> {
        expect(data.length).toBe(109);
    })
});

test("The return object should have the property of the following", ()=>{
    let cr = new CsvReader(appDir +"/data/worldcities.csv")
    return  cr.read(City).then((data) => {
        data.forEach((result) => {
            expect(result).toHaveProperty.apply(null, ['city','city_ascii','lat','lng','country','iso2','iso3','admin_name','capital','population','id'])
        })
    })
})

test("The return passed no file should throw", ()=>{
    let cr = new  CsvReader();
    expect(() => {cr.read()}).toThrowError("file does not exist")
})









function  returnDatafromCsv(filepath, Construtor){
    let promise = new Promise((resolve, reject) => {
        let newArr =[];
        fs.createReadStream(filepath)
            .pipe(csv())
            .on('data', function(data){
                let constructor = new Construtor(data)
                newArr.push(data);
            }).on('end', function(){
            console.log('no more data')
            if(newArr != null && newArr.length > 0){
                resolve(newArr)
            }
            else{
                reject(new Error('Parsing error '))
            }
        });
    })
    return promise;
}