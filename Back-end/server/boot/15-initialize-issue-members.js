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

      const issuesMembers = [
        {
          'issueId': issues.find(issue => issue.title === 'Manque d\'ampoule LED').id,
          'memberId': members.find(member => member.firstname === 'Denis').id,
        },
        {
          'issueId': issues.find(issue => issue.title === 'Chlorer la piscine').id,
          'memberId': members.find(member => member.firstname === 'Stéphane').id,
        },
        {
          'issueId': issues.find(issue => issue.title === 'Détecteur de fumée obsolète').id,
          'memberId': members.find(member => member.firstname === 'Laëtitia').id,
        },
        {
          'issueId': issues.find(issue => issue.title === 'Lustre à nettoyer').id,
          'memberId': members.find(member => member.firstname === 'Nicholas').id,
        },
        {
          'issueId': issues.find(issue => issue.title === 'Sac aspirateurs pleins !').id,
          'memberId': members.find(member => member.firstname === 'Michèle').id,
        },
        {
          'issueId': issues.find(issue => issue.title === 'Nid de frelon').id,
          'memberId': members.find(member => member.firstname === 'Denis').id,
        },
        {
          'issueId': issues.find(issue => issue.title === 'Roses à tailler').id,
          'memberId': members.find(member => member.firstname === 'Laurent').id,
        },
        {
          'issueId': issues.find(issue => issue.title === 'LED ascenseur').id,
          'memberId': members.find(member => member.firstname === 'Nicholas').id,
        },
        {
          'issueId': issues.find(issue => issue.title === 'Miroir fissuré').id,
          'memberId': members.find(member => member.firstname === 'Stéphane').id,
        },
        {
          'issueId': issues.find(issue => issue.title === 'Miroir fissuré').id,
          'memberId': members.find(member => member.firstname === 'Michèle').id,
        },
        {
          'issueId': issues.find(issue => issue.title === 'Porte de chambre forcée').id,
          'memberId': members.find(member => member.firstname === 'Denis').id,
        },
        {
          'issueId': issues.find(issue => issue.title === 'Literie à changer').id,
          'memberId': members.find(member => member.firstname === 'Michèle').id,
        },
        {
          'issueId': issues.find(issue => issue.title === 'Badge d\'accès détérioré').id,
          'memberId': members.find(member => member.firstname === 'Valérie').id,
        },
        {
          'issueId': issues.find(issue => issue.title === 'Fenêtre fissurée').id,
          'memberId': members.find(member => member.firstname === 'Laëtitia').id,
        },
        {
          'issueId': issues.find(issue => issue.title === 'Chambre à nettoyer d\'urgence').id,
          'memberId': members.find(member => member.firstname === 'Stéphane').id,
        },
        {
          'issueId': issues.find(issue => issue.title === 'Chambre à nettoyer d\'urgence').id,
          'memberId': members.find(member => member.firstname === 'Michèle').id,
        },
        {
          'issueId': issues.find(issue => issue.title === 'Chambre à nettoyer d\'urgence').id,
          'memberId': members.find(member => member.firstname === 'Laurent').id,
        },
        {
          'issueId': issues.find(issue => issue.title === 'Etagère cassée dans la chambre froide').id,
          'memberId': members.find(member => member.firstname === 'Philippe').id,
        },
        {
          'issueId': issues.find(issue => issue.title === 'Manque de matériel pour cuisiner').id,
          'memberId': members.find(member => member.firstname === 'Mercotte').id,
        },
        {
          'issueId': issues.find(issue => issue.title === 'Frigo qui fuit').id,
          'memberId': members.find(member => member.firstname === 'Cyril').id,
        },
        {
          'issueId': issues.find(issue => issue.title === 'Morceaux de verre au comptoir').id,
          'memberId': members.find(member => member.firstname === 'Denis').id,
        },
        {
          'issueId': issues.find(issue => issue.title === 'Machine à café défectueuse').id,
          'memberId': members.find(member => member.firstname === 'Valérie').id,
        },
      ];

      const IssueMember = app.models.IssueMember;
      let promises = [];

      issuesMembers.forEach(issueMember => {
        promises.push(new Promise((res, rej) => {
          IssueMember.findOrCreate({
            where: {
              issueId: issueMember.issueId,
              memberId: issueMember.memberId,
            },
          }, issueMember, err => {
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
