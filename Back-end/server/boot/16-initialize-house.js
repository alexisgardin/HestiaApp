'use strict';

module.exports = function (app, callback) {
  const houses = [
    {
      "street": "37 Prom. des Anglais",
      "country": "France",
      "departement": "06300",
      "city": "Nice",
    }
  ];

  const House = app.models.House;
  let promises = [];

  houses.forEach(house => {
    promises.push(new Promise((res, rej) => {
      House.findOrCreate({
        where: {
          street: house.street,
          country: house.country,
          departement: house.departement,
          city: house.city,
        },
      }, house, err => {
        if (err) {
          rej(err);
        }
        res();
      });
    }));
  });

  Promise.all(promises)
    .then(() => {
      callback();
    }).catch(err => {
    callback(err);
  });
};
