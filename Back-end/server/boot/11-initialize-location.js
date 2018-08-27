'use strict';

module.exports = function(app, callback) {
  const locations = [
    {
      'name': 'Chambre',
      'value': 1,
    },
    {
      'name': 'Couloir',
      'value': 2,
    },
    {
      'name': 'Ascenseur',
      'value': 3,
    },
    {
      'name': 'Cage d\'escalier',
      'value': 4,
    },
    {
      'name': 'Hall d\'accueil',
      'value': 5,
    },
    {
      'name': 'Salle d\'entretien',
      'value': 6,
    },
    {
      'name': 'Cuisine',
      'value': 7,
    },
    {
      'name': 'Chambre froide',
      'value': 8,
    },
    {
      'name': 'Restaurant',
      'value': 9,
    },
    {
      'name': 'Bar',
      'value': 10,
    },
    {
      'name': 'Chambre privée',
      'value': 11,
    },
    {
      'name': 'Jardin',
      'value': 12,
    },
    {
      'name': 'Piscine',
      'value': 13,
    },
  ];

  const Location = app.models.Location;
  let promises = [];

  locations.forEach(location => {
    promises.push(new Promise((res, rej) => {
      Location.findOrCreate({
        where: {
          name: location.name,
        },
      }, location, err => {
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
