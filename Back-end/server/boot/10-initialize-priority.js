'use strict';

module.exports = function (app, callback) {
  const priorities = [
    {
      "name": "Basse",
      "value": 1
    },
    {
      "name": "Moyenne",
      "value": 2
    },
    {
      "name": "Haute",
      "value": 3
    }
  ];

  const Priority = app.models.Priority;
  let promises = [];

  priorities.forEach(priority => {
    promises.push(new Promise((res, rej) => {
      Priority.findOrCreate({
        where: {
          name: priority.name,
        },
      }, priority, err => {
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
