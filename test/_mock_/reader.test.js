
const Reader = require('../../controller/Reader')
const fs = require('fs')
const csv = require('csv-parser');
const City = require('../../model/city')
var path = require('path');
var appDir = path.dirname('index.js');
let result = null
const mockReader = jest.fn();
const mockAppender = jest.fn();

jest.mock('../../controller/Reader',()=>{
    return  jest.fn().mockImplementation(()=> {
        return {read:mockReader}
    })
})

beforeEach(async () => {
    // Clear all instances and calls to constructor and all methods:
    Reader.mockClear();
});

it('We can check if reader class is called the class constructor', () => {
    let cr = new Reader(appDir +"/data/worldcities.csv");
    expect(Reader).toHaveBeenCalledTimes(1);
    expect.assertions(1)
});

it('check Reader is initialized from file path ', () => {
    let cr = new Reader(appDir +"/data/worldcities.csv");
    expect(Reader.mock.calls[0][0]).toEqual(appDir +"/data/worldcities.csv")
});

it('check read method is called', () => {
    let cr = new Reader(appDir +"/data/worldcities.csv");
    cr.read();
    expect(mockReader).toHaveBeenCalledTimes(1);
});


