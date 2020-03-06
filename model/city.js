class City {
    constructor(cityObj = {}) {
        if(cityObj){
            const {city,city_ascii,lat,lng,country,iso2,iso3,admin_name,capital,population,id} = cityObj;
            this.id = id != undefined? id :null;
            this.city = city != undefined? city :null;
            this.city_ascii = city_ascii != undefined? city_ascii :null;
            this.lat = lat != undefined? lat:null;
            this.lng = lng != undefined? lng:null;
            this.iso2 = iso2 != undefined? iso2:null;
            this.iso3 = iso3!= undefined? iso3:null;
            this.population = population != undefined? population:null;
            this.capital = capital != undefined? capital:null;
            this.admin_name = admin_name != undefined? admin_name :null;
        }
        else{
            this.id = null;
            this.city = null;
            this.city_ascii = null;
            this.lat = null;
            this.lng = null;
            this.iso2 = null;
            this.iso3 = null;
            this.capital = null;
            this.admin_name = null;
        }
    }
    toString(){
        let string ="{"
        for (let [key, value] of Object.entries(object1)) {
            string + `${key}: ${value},`
        }
        string += "}"
        return string;
    }
}
module.exports = City;