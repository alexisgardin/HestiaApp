'use strict';

const app = require('../../server/server');

module.exports = function (IssueMember) {
  IssueMember.remoteMethod('destroyAll', {
    isStatic: true,
    description: 'Delete all matching records',
    accessType: 'WRITE',
    accepts: {arg: 'where', type: 'object', description: 'filter.where object'},
    http: {verb: 'del', path: '/'},
  });

  /**
   * Create a Notification for each assigned member of this issue
   */
  IssueMember.observe('after save', function (ctx, next) {
    if (!ctx || !ctx.instance) next(new Error('no context provided'));

    const Notification = app.models.Notification;
    const Issue = app.models.Issue;
    const State = app.models.State;

    const issueMember = ctx.instance;

    Notification.findOne({
      where: {
        issueId: issueMember.issueId,
        memberId: issueMember.memberId,
      },
    }).then(foundModel => {
      const notifId = foundModel !== null ? foundModel.id : null;

      Notification.replaceOrCreate({
        id: notifId,
        issueId: issueMember.issueId,
        memberId: issueMember.memberId,
      }, (err, newModel) => {
        if (err) next(err);
      });
    }).catch(err => next(err));

    State.findOne({
      where: {
        value: 0
      }
    }).then(state => {
      Issue.findById(issueMember.issueId, (err, issueModel) => {
        if (err) next(err);
        State.findOne({
          where: {
            value: 1
          }
        }).then(state2 => {
          if (issueModel.stateId !== state2.id) {
            issueModel.updateAttribute("stateId", state.id, err => {
              if (err) next(err);
            });
          }
        });
        return next();
      });
    }).catch(err => next(err));
  });
};
