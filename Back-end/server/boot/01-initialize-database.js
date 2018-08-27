'use strict';

module.exports = (app, callback) => {

    let postgres = app.dataSources.postgres;
    let tables = [];

    // Add all the models created with this datasource
    for (let modelName in app.models) {
        if (app.models.hasOwnProperty(modelName) && app.models[modelName].dataSource.name === postgres.adapter.dataSource.name) {
            tables.push(modelName);
        }
    }

    // Create the tables in the database if they don't exist
    postgres.autoupdate(tables, err => {
        if (err) {
            callback(err);
        }

        console.log('Tables [' + tables + '] created in ', postgres.adapter.name);
        callback();
    });
};
