'use strict';

module.exports = (app, callback) => {

    let roles = ["admin", "manager", "member"];
    const Role = app.models.Role;

    let promises = [];
    roles.forEach(role => {
        promises.push(Role.create({
            name: role
        }));
    });

    Promise.all(promises)
        .then(() => {
            console.log("Roles successfully created");
            callback(null);
        }).catch(err => {
            callback(err);
        });
}
