'use strict';

module.exports = function (app, callback) {
  const importances = [
    {
      "name": "Peu important",
      "value": 1
    },
    {
      "name": "Important",
      "value": 2
    },
    {
      "name": "Très important",
      "value": 3
    }
  ];

  const Importance = app.models.Importance;
  let promises = [];

  importances.forEach(importance => {
    promises.push(new Promise((res, rej) => {
      Importance.findOrCreate({
        where: {
          name: importance.name,
        },
      }, importance, err => {
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
