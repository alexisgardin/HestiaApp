'use strict';

module.exports = function (app, callback) {
  const types = [
    {
      "value": 1,
      "name": "Entretien",
    },
    {
      "value": 2,
      "name": "Room service",
    },
    {
      "value": 3,
      "name": "Restauration",
    },
    {
      "value": 4,
      "name": "Autres",
    },
  ];

  const Type = app.models.Type;
  let promises = [];

  types.forEach(type => {
    promises.push(new Promise((res, rej) => {
      Type.findOrCreate({
        where: {
          name: type.name,
          value: type.value,
        },
      }, type, (err, newType) => {
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
