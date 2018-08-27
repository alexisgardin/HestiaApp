'use strict';

module.exports = function(app, callback) {

  const fs = require("fs");
  const stats = fs.statSync("uploads/images/default/placeholder.png");
  const fileSizeInBytes = stats.size;

  const imageFiles = [
    {
      "name": "placeholder.png",
      "container": "default",
      "type": "image/jpeg",
      "size": fileSizeInBytes
    }
  ];

  const ImageFile = app.models.ImageFile;
  let promises = [];

  imageFiles.forEach(image => {
    promises.push(new Promise((res, rej) => {
      ImageFile.findOrCreate({
        where: {
          name: image.name,
        },
      }, image, err => {
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
