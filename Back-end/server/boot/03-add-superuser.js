'use strict';

module.exports = (app, callback) => {
  const Member = app.models.Member;
  let superuser = {
    firstname: 'Mercedes',
    lastname: 'Bern',
    username: 'root',
    email: 'mercedes@gmail.com',
    emailVerified: true,
    password: 'rootroot',
  };

  Member.findOrCreate({
    where: {
      username: superuser.username,
    },
  }, superuser)
    .then((newUser, isCreated) => {
      console.log(isCreated ? 'The root user was created' : 'The root user already exists');
      callback(null);
    }).catch(err => {
      callback(err);
    });
};
