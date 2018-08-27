'use strict';

module.exports = function(app, callback) {
  const managers = [
    {
      'username': '',
      'email': 'laurent@gmail.com',
      'firstname': 'Laurent',
      'lastname': 'Delahousse',
      'password': '12345678',
      'emailVerified': true,
    },
    {
      'username': '',
      'email': 'valerie@gmail.com',
      'firstname': 'Valérie',
      'lastname': 'Damidot',
      'password': '12345678',
      'emailVerified': true,
    },
    {
      'username': '',
      'email': 'philippe@gmail.com',
      'firstname': 'Philippe',
      'lastname': 'Etchebest',
      'password': '12345678',
      'emailVerified': true,
    },
  ];

  const users = [
    {
      'username': '',
      'email': 'laetita@gmail.com',
      'firstname': 'Laëtitia',
      'lastname': 'Casta',
      'password': '12345678',
      'emailVerified': true,
    },
    {
      'username': '',
      'email': 'michele@gmail.com',
      'firstname': 'Michèle',
      'lastname': 'Oklahoma',
      'password': '12345678',
      'emailVerified': true,
    },
    {
      'username': '',
      'email': 'stephane@gmail.com',
      'firstname': 'Stéphane',
      'lastname': 'Plaza',
      'password': '12345678',
      'emailVerified': true,
    },
    {
      'username': '',
      'email': 'denis@gmail.com',
      'firstname': 'Denis',
      'lastname': 'Brogniart',
      'password': '12345678',
      'emailVerified': true,
    },
    {
      'username': '',
      'email': 'nicholas@gmail.com',
      'firstname': 'Nicholas',
      'lastname': 'Hoult',
      'password': '12345678',
      'emailVerified': true,
    },
    {
      'username': '',
      'email': 'cyril@gmail.com',
      'firstname': 'Cyril',
      'lastname': 'Lignac',
      'password': '12345678',
      'emailVerified': true,
    },
    {
      'username': '',
      'email': 'mercotte@gmail.com',
      'firstname': 'Mercotte',
      'lastname': 'Dazur',
      'password': '12345678',
      'emailVerified': true,
    },
  ];

  const Member = app.models.Member;
  let promises = [];

  managers.forEach(member => {
    promises.push(new Promise((res, rej) => {
      Member.findOrCreate({
        where: {
          email: member.email,
        },
      }, member, (err, newUser) => {
        if (err) {
          rej(err);
        }

        newUser.setRole('manager', err => {
          if (err) rej(err);
          res();
        });
      });
    }));
  });
  users.forEach(member => {
    promises.push(new Promise((res, rej) => {
      Member.findOrCreate({
        where: {
          email: member.email,
        },
      }, member, (err, newUser) => {
        if (err) {
          rej(err);
        }

        newUser.setRole('member', err => {
          if (err) rej(err);
          res();
        });
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
