const Reader  = require("./Reader")
const fs = require('fs')
const csv = require('csv-parser');
const City = require('../model/city')

class CsvReader extends  Reader{
    constructor(file){
        super(file)
        this.output =[];
    }
   read(formatClass){
       if(!this.file){
           throw(new Error("file does not exist"))
       }
       return new Promise((resolve, reject) => {
                    let reader = this;
                    fs.createReadStream(this.file)
                    .pipe(csv({
                        columns: true,
                        delimiter: ',',
                        trim: true,
                        skip_empty_lines: true
                    }))
                        .on('readable', function(){
                            let record
                            while (record = this.read()) {
                                if(formatClass != null){
                                    let instance = new formatClass(record)
                                    reader.output.push(instance)
                                }
                                else {
                                    reader.output.push(record)
                                }
                            }
                    })
                    .on('end', () => {
                    console.log('CSV file successfully processed');
                    if(this.output != null && this.output.length > 0){
                        resolve(this.output)
                    }
                    else{
                        reject(new Error("No data"))
                    }
                });
       })
   }

}

module.exports = CsvReader;