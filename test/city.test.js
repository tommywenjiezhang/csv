const City = require('../model/city');



test('Can create a city object', () => {
    let city = new City();
    expect(city).toBeInstanceOf(City);
});

test("null object" , () =>{
    let city = new City(null)
    Object.keys(city).forEach(
        (val) => {  expect(city).toHaveProperty(val)
            expect(city[val]).toBe(null)}

    )
})
test("pass value return city object", ()=>{
    let cityObj ={city:'Tokyo',	city_ascii:"Tokyo", lat:"35.6850",	lng:"35.6850",	country:"Japan",iso2:"JP",iso3:"JPN",admin_name:"Tōkyō",
        capital:"primary", population:"35676000",id:"1392685764"}
    let city =  new City(cityObj)
    expect(city).toBeInstanceOf(City);
    expect(city).toEqual(cityObj);
    Object.keys(city).forEach( (val) =>{
            expect(city[val]).toBe(cityObj[val]);
        }
    )
})

