
const CsvReader = require('../../controller/CsvReader')
const fs = require('fs')
const csv = require('csv-parser');
const City = require('../../model/city')
var path = require('path');
var appDir = path.dirname('index.js');
let result = null
const mockReader = jest.fn();
const mockAppender = jest.fn();

jest.mock('../../controller/CsvReader',()=>{
    return  jest.fn().mockImplementation(()=> {
        return {read:mockReader}
    })
})

beforeEach(async () => {
    // Clear all instances and calls to constructor and all methods:
    result = await returnDatafromCsv(appDir +"/data/worldcities.csv",City);
    CsvReader.mockClear();
    mockReader.mockClear();
});

it('We can check if csv reader class is called the class constructor', () => {
    let cr = new CsvReader(appDir +"/data/worldcities.csv");
    expect(CsvReader).toHaveBeenCalledTimes(1);
    expect.assertions(1)
});

it('check csvReader is initialized from file path ', () => {
    let cr = new CsvReader(appDir +"/data/worldcities.csv");
    cr.read(City)
    expect(CsvReader.mock.calls[0][0]).toEqual(appDir +"/data/worldcities.csv")
});

it('check read method is called', () => {
    let cr = new CsvReader(appDir +"/data/worldcities.csv");
    cr.read(City)
    expect(mockReader).toHaveBeenCalledTimes(1);
    expect(mockReader.mock.calls).toContainEqual([City]);
});

it('check read method is passed with City format class', () => {
    let cr = new CsvReader(appDir +"/data/worldcities.csv");
    cr.read(City)
    expect(mockReader.mock.calls).toContainEqual([City]);
});




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