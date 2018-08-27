'use strict';

module.exports = function (Location) {

  Location.observe('before save', (ctx, next) => {

	if (!ctx || !ctx.instance || (ctx.instance.value && !isNaN(ctx.instance.value))) {
	  return next();
	}

	const ModelUtils = require("../utils/model-utils");
	ModelUtils.getMaxValue(Location, (err, maxValue) => {
	  if (err) {
		return next(err);
	  }

	  ctx.instance.value = maxValue + 1;
	  next();
	});
  });
};
