class Reader
{
    constructor(file){
        this.file = file
        this.output = [];
    }

    read(){}
    append(data){
        this.output.push(data)
    }
}


module.exports = Reader;