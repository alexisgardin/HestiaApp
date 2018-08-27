'use strict';

const app = require('../../server/server');

module.exports = function (Issue) {

  Issue.afterRemote("prototype.__get__images", (ctx, instance, next) => {
    const ImageFile = app.models.ImageFile;

	if (ctx && ctx.result && ctx.result.length <= 0) {
	  ImageFile.getPlaceholder((err, image) => {
		ctx.result.push(image);
		next();
	  });
	} else {
	  next();
	}
  });

  Issue.observe('before save', (ctx, next) => {

	const State = app.models.State;

	if (!ctx || !ctx.instance) {
	  return next();
	}

	// If the state is defined and set to Resolved, attribute a resolution date
	if (ctx.instance.stateId && !isNaN(ctx.instance.stateId) && !ctx.instance.datetime_resolution) {
	  State.findById(ctx.instance.stateId)
	  .then(state => {
		if (state.value === 1) {
		  ctx.instance.datetime_resolution = Date.now();
		  return next();
		}
	  }).catch(err => {
		return next(err);
	  });
	}

	if (ctx.instance.stateId && !isNaN(ctx.instance.stateId)) {
	  return next();
	}

	// If the stateId is not defined, add the default state "non resolved"
	State.findOne({
	  where: {
		value: -1
	  }
	}).then(state => {
	  ctx.instance.stateId = state.id;
	  return next();
	}).catch(err => {
	  return next(err);
	});
  });
};
