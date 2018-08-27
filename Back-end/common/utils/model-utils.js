'use strict';

module.exports = {

  getMaxValue: (Model, next) => {
	Model.find({
	  order: "value DESC"
	}).then(models => {
	  if (models.length > 0) {
	    return next(null, models[0].value);
	  }

	  return next(null, 0);
	}).catch(err => next(err));
  }
};