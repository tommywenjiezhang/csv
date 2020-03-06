const City = require('../model/city');


test('Can create a city object', () => {
    let city = new City();
    expect(city).toBeInstanceOf(City);
});

