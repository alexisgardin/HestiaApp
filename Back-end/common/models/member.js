'use strict';

const path = require('path');
const app = require('../../server/server');

module.exports = function (Member) {

  /**
   * Sets this member's role.
   * /!\ Usage of a arrow style function doesn't allow access to the pointer this.
   *
   * @param roleName
   * @param next
   */
  Member.prototype.setRole = function (roleName, next) {

    const Role = app.models.Role;
    const RoleMapping = app.models.RoleMapping;

    Role.findOne({
      where: {
        name: roleName
      }
    }).then(foundRole => {

      const data = {
		principalType: RoleMapping.USER,
		principalId: this.id,
		roleId: foundRole.id
	  };

      RoleMapping.findOrCreate({
        where: data
      }, data, err => {
        if (err) {
          next(err);
        }
        next();
      });

    }).catch(err => {
      next(err);
    });
  };

  Member.getAuthenticated = (options, filter, next) => {

    // Récupération des informations de connexion
    const token = options && options.accessToken;
    const userId = token && token.userId;

    if (!userId) {
      const err = new Error("The user is not connected");
      err.code = 401;
      next(err);
    }

    const Member = app.models.Member;

    Member.findById(userId, filter)
      .then(user => {
        let member = JSON.parse(JSON.stringify(user));
        if (filter && filter.include && filter.include === "profileImage" && !member.profileImage) {
          const ImageFile = app.models.ImageFile;

          ImageFile.getPlaceholder((err, image) => {
            if (err) {
              next(err);
            }

            member.profileImage = image;
            next(null, member);
          });
        } else {
          next(null, user);
        }
      }).catch(err => {
      next(err);
    });
  };

  Member.getRoles = (options, next) => {

    // Récupération des informations de connexion
    const token = options && options.accessToken;
    const userId = token && token.userId;

    if (!userId) {
      const err = new Error("The user is not connected");
      err.code = 401;
      next(err);
    }

    const Role = app.models.Role;
    const RoleMapping = app.models.RoleMapping;

    Role.getRoles({principalType: RoleMapping.USER, principalId: userId}, (err, roles) => {
      if (err) {
        next(err);
      }

      let promises = [];
      roles.forEach(role => {
        if (!isNaN(role)) {
          promises.push(Role.findById(role));
        }
      });

      Promise.all(promises)
        .then(rolesFound => {
          let roleNames = [];

          rolesFound.forEach(roleFound => {
            roleNames.push(roleFound.name);
          });

          next(null, roleNames);
        }).catch(err => {
        next(err);
      })
    });
  };

  Member.afterRemote('create', (ctx, userInstance, next) => {
    console.log('> Member.afterRemote create triggered');

    // Check if this is the first Member of this app, and set him the admin role
    Member.count((err, count) => {
      if (err) {
        next(err);
      }

      if (count === 1) {
        userInstance.setRole("admin", err => {
          if (err) {
            next(err);
          }
        });
      }

      let options = {
        type: 'email',
        to: userInstance.email,
        from: 'hestia.polytech@gmail.com',
        subject: 'Hestia - Activation de votre compte',
        template: path.resolve(__dirname, '../../server/views/verify.ejs'),
        redirect: '/verified',
        user: userInstance,
        host: '127.0.0.1',
        attachments: [{
          filename: 'logo-small.png',
          path: path.resolve(__dirname, '../../client/images/logo-small.png'),
          cid: 'logo-small'
        }]
      };

      userInstance.verify(options, err => {
        if (err) {
          console.log("error verify");
          Member.deleteById(userInstance.id);
          return next(err);
        }

        console.log("verify engaged...");
        next();
      });
    });
  });

  Member.afterRemote("prototype.__get__profileImage", (ctx, instance, next) => {
    const ImageFile = app.models.ImageFile;

    if (ctx && (!ctx.result || ctx.result.length <= 0)) {
      ImageFile.getPlaceholder((err, image) => {
        ctx.result = image;
        next();
      });
    } else {
      next();
    }
  });
};
