'use strict';

const app = require('../../server/server');
const g = require('strong-globalize')();
const publicContainer = "public";

module.exports = function (ImageFile) {

  ImageFile.getPlaceholder = (next) => {
	ImageFile.findOne({
	  where: {
		name: "placeholder.png"
	  }
	}, (err, image) => {
	  if (err) {
		next(err);
	  }

	  next(null, image);
	});
  };

  ImageFile.upload = function (modelName, relationId, ctx, res, options, next) {

	if (!options) options = {
	  maxImageFileSize: app.datasources.images.connector.maxImageFileSize,
	};
	ctx.req.params.container = publicContainer;

	const ImageService = app.models.ImageService;

	ImageService.upload(publicContainer, ctx.req, res, options, (error, fileObj) => {

	  if (error) {
		return next(error);
	  }

	  if (!(fileObj.files.ImageFile) && !(fileObj.files.image)) {
		let err = new Error(g.f('Upload error. Param of ImageFile should have name is: ImageFile'));
		return next(err);
	  }

	  let fileInfo = fileObj.files.ImageFile ? fileObj.files.ImageFile[0] : fileObj.files.image[0];
	  let newFileJson = {
		name: fileInfo.name,
		type: fileInfo.type,
		container: fileInfo.container,
		size: fileInfo.size,
		imageableId: relationId,
		imageableType: modelName
	  };

	  ImageFile.create(newFileJson, (err, obj) => {
		if (err) {
		  return next(err);
		}

		return next(null, obj);
	  });
	});
  };

  ImageFile.prototype.uploadAndReplace = function (ctx, res, options, reqOptions, next) {
	if (!options) options = {
	  maxImageFileSize: app.datasources.images.connector.maxImageFileSize,
	};
	ctx.req.params.container = publicContainer;

	const ImageService = app.models.ImageService;
	let relationId = this.imageableId;
	let relationName = this.imageableType;

	if (!this.imageableId || isNaN(this.imageableId)) {

	  // Récupération des informations de connexion
	  const token = reqOptions && reqOptions.accessToken;
	  const userId = token && token.userId;

	  relationName = "Member";
	  relationId = userId;

	  ImageFile.upload(relationName, relationId, ctx, res, options, err => {
		if (err) {
		  return next(err);
		}

		return next();
	  });
	} else {

	  ImageService.removeFile(this.container, this.name, err => {
		if (err) {
		  console.log(err);
		}
	  });

	  ImageService.upload(this.container, ctx.req, res, options, (error, fileObj) => {

		if (error) {
		  return next(error);
		}

		if (!(fileObj.files.ImageFile) && !(fileObj.files.image)) {
		  let err = new Error(g.f('Upload error. Param of ImageFile should have name is: ImageFile'));
		  return next(err);
		}

		let fileInfo = fileObj.files.ImageFile ? fileObj.files.ImageFile[0] : fileObj.files.image[0];
		let newFileJson = {
		  id: this.id,
		  name: fileInfo.name,
		  type: fileInfo.type,
		  container: fileInfo.container,
		  size: fileInfo.size,
		  imageableId: relationId,
		  imageableType: relationName
		};

		ImageFile.replaceOrCreate(newFileJson, (err, obj) => {
		  if (err) {
			return next(err);
		  }

		  return next(null, obj);
		});
	  });
	}
  };

  ImageFile.prototype.download = function (req, res, next) {

	const ImageService = app.models.ImageService;

	ImageService.download(this.container, this.name, req, res, (err, file) => {
	  if (err) {
		next(err);
	  } else {
		next(null, file);
	  }
	});
  };

  ImageFile.observe('before delete', function (ctx, next) {

	const ImageService = app.models.ImageService;
	const fileId = ctx.where.id;

	ImageFile.findById(fileId, (err, file) => {
	  if (file) {
		ImageService.removeFile(file.container, file.name, err => {
		  if (err) {
			console.log(err);
		  }
		});
	  }
	});

	next();
  });
};
