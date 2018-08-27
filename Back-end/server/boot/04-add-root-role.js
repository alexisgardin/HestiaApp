'use strict';

module.exports = (app, callback) => {

  const Member = app.models.Member;
  const RoleMapping = app.models.RoleMapping;
  const Role = app.models.Role;

  Member.findOne({
	where: {
	  username: "root"
	}
  }).then(rootUser => {

	Role.findOne({
	  where: {
		name: "admin"
	  }
	}).then(adminRole => {

	  const data = {
		principalType: RoleMapping.USER,
		principalId: rootUser.id,
		roleId: adminRole.id
	  };

	  RoleMapping.findOrCreate({
		where: data
	  }, data, err => {
		if (err) {
		  callback(err);
		}
		callback();
	  });
	}).catch(err => {
	  callback(err);
	});
  }).catch(err => {
	callback(err);
  });
};
