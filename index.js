const CsvReader = require('./controller/CsvReader')
const City = require('./model/city')
var path = require('path');
var appDir = path.dirname('/Users/wenjiezhang/Documents/Software/School/csv/index.js');
const fs = require('fs')
const csv = require('csv-parser')


let newData = new CsvReader('data/worldcities.csv');

newData.read(City).then((data) => {
    console.log(data)
}).catch(e => console.log(e))







function  returnDatafromCsv(filepath){
    let promise = new Promise((resolve, reject) => {
        let newArr =[];
        fs.createReadStream(filepath)
            .pipe(csv())
            .on('data', function(data){
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

// returnDatafromCsv(appDir+'/data/worldcities.csv').then((data) => console.log(data))

