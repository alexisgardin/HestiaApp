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

      const commentaries = [
        {
          'content': 'Je ne trouve pas la boîte à outils',
          'datetime_declaration': 'December 24, 2017 13:26:30',
          'memberId': members.find(member => member.firstname === 'Denis').id,
          'issueId': issues.find(issue => issue.title === 'Prise électrique cassée').id,
        },
      ];

      const Commentary = app.models.Commentary;
      let promises = [];

      commentaries.forEach(commentary => {
        promises.push(new Promise((res, rej) => {
          Commentary.findOrCreate({
            where: {
              content: commentary.content,
              datetime_declaration: commentary.datetime_declaration,
              memberId: commentary.memberId,
              issueId: commentary.issueId,
            },
          }, commentary, err => {
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
      callback(err);
    });
};
