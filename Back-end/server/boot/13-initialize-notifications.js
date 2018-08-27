'use strict';

module.exports = function(app, callback) {
  const Issue = app.models.Issue;
  const Member = app.models.Member;

  let extraPromises = [];
  extraPromises.push(Issue.find());
  extraPromises.push(Member.find());

  Promise.all(extraPromises)
    .then(values => {
      const issues = values[0];
      const members = values[1];

      const notifications = [
        {
          'memberId': members.find(member => member.firstname === 'Michèle').id,
          'issueId': issues.find(issue => issue.id === 1).id,
        },
        {
          'memberId': members.find(member => member.firstname === 'Michèle').id,
          'issueId': issues.find(issue => issue.id === 2).id,
        },
        {
          'memberId': members.find(member => member.firstname === 'Michèle').id,
          'issueId': issues.find(issue => issue.id === 3).id,
        },
      ];

      const Notfification = app.models.Notification;
      let promises = [];

      notifications.forEach(notification => {
        promises.push(new Promise((res, rej) => {
          Notfification.findOrCreate({
            where: {
              memberId: notification.member,
              issueId: notification.issue,
            },
          }, notification, (err, newNotifications) => {
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
    }).catch(err => {
      throw err;
    });
};
