'use strict';

module.exports = function (app, callback) {
  const Type = app.models.Type;
  const State = app.models.State;
  const Member = app.models.Member;
  const Priority = app.models.Priority;
  const Importance = app.models.Importance;
  const Location = app.models.Location;

  let extraPromises = [];
  extraPromises.push(Type.find());
  extraPromises.push(State.find());
  extraPromises.push(Member.find());
  extraPromises.push(Priority.find());
  extraPromises.push(Importance.find());
  extraPromises.push(Location.find());

  Promise.all(extraPromises)
  .then(values => {
    const types = values[0];
    const states = values[1];
    const members = values[2];
    const priorities = values[3];
    const importances = values[4];
    const locations = values[5];

    const issues = [
      {
        'title': 'Prise électrique cassée',
        'description': 'La prise électrique est inutilisable dans le couloir A2',
        'datetime_declaration': 'December 17, 2017 03:24:00',
        'datetime_deadline': 'December 24, 2017 12:00:00',
        'stateId': states.find(state => state.value === -1).id,
        'typeId': types.find(type => type.value === 1).id,
        'authorId': members.find(member => member.firstname === 'Laëtitia').id,
        'priorityId': priorities.find(priority => priority.value === 1).id,
        'importanceId': importances.find(importance => importance.value === 1).id,
        'locationId': locations.find(location => location.value === 2).id,
      },
      {
        'title': 'Lampe grillée chambre',
        'description': 'J\'ai détecté une lampe grillée dans la chambre 114',
        'datetime_declaration': 'April 14, 2018 15:24:00',
        'datetime_deadline': 'June 01, 2018 18:00:00',
        'stateId': states.find(state => state.value === -1).id,
        'typeId': types.find(type => type.value === 1).id,
        'authorId': members.find(member => member.firstname === 'Michèle').id,
        'priorityId': priorities.find(priority => priority.value === 1).id,
        'importanceId': importances.find(importance => importance.value === 1).id,
        'locationId': locations.find(location => location.value === 1).id,
      },
      {
        'title': "Manque d'ampoule LED",
        'description': "Il n'y a plus d'ampoules LED dans le stock",
        'datetime_declaration': 'June 07, 2018 11:12:56',
        'datetime_deadline': 'July 07, 2018 12:00:00',
        'stateId': states.find(state => state.value === 0).id,
        'typeId': types.find(type => type.value === 1).id,
        'authorId': members.find(member => member.firstname === 'Denis').id,
        'priorityId': priorities.find(priority => priority.value === 1).id,
        'importanceId': importances.find(importance => importance.value === 2).id,
        'locationId': locations.find(location => location.value === 6).id,
      },
      {
        'title': 'Chlorer la piscine',
        'description': 'Il faut ajouter du chlore à la piscine rapidement, suite aux dernières intempéries',
        'datetime_declaration': 'April 12, 2018 12:02:12',
        'datetime_deadline': 'April 14, 2018 10:00:00',
        'datetime_resolution': 'April 14, 2018 09:36:40',
        'stateId': states.find(state => state.value === 1).id,
        'typeId': types.find(type => type.value === 1).id,
        'authorId': members.find(member => member.firstname === 'Nicholas').id,
        'priorityId': priorities.find(priority => priority.value === 3).id,
        'importanceId': importances.find(importance => importance.value === 3).id,
        'locationId': locations.find(location => location.value === 13).id,
      },
      {
        'title': 'Détecteur de fumée obsolète',
        'description': 'Le détecteur de fumée du couloir A1 ne fonctionne plus, la petite led rouge ne clignote plus du tout.',
        'datetime_declaration': 'April 17, 2018 16:23:10',
        'datetime_deadline': 'April 24, 2018 16:00:00',
        'datetime_resolution': 'April 20, 2018 10:12:56',
        'stateId': states.find(state => state.value === 1).id,
        'typeId': types.find(type => type.value === 1).id,
        'authorId': members.find(member => member.firstname === 'Nicholas').id,
        'priorityId': priorities.find(priority => priority.value === 2).id,
        'importanceId': importances.find(importance => importance.value === 3).id,
        'locationId': locations.find(location => location.value === 2).id,
      },
      {
        'title': 'Lustre à nettoyer',
        'description': 'J\'ai remarqué énormément de poussière sur le lustre dans le hall. Il faudrait penser à le nettoyer',
        'datetime_declaration': 'June 03, 2018 13:24:00',
        'datetime_deadline': 'June 05, 2018 17:15:00',
        'stateId': states.find(state => state.value === 0).id,
        'typeId': types.find(type => type.value === 1).id,
        'authorId': members.find(member => member.firstname === 'Mercedes').id,
        'priorityId': priorities.find(priority => priority.value === 2).id,
        'importanceId': importances.find(importance => importance.value === 2).id,
        'locationId': locations.find(location => location.value === 5).id,
      },
      {
        'title': 'Sac aspirateurs pleins !',
        'description': 'En faisant mon inspection du soir, j\'ai remarqué que les sac des apirateurs étaient tous pleins.mément de poussière sur le lustre dans le hall. Il faudrait penser à le nettoyer',
        'datetime_declaration': 'June 10, 2018 18:57:32',
        'datetime_deadline': 'June 15, 2018 10:00:00',
        'stateId': states.find(state => state.value === 0).id,
        'typeId': types.find(type => type.value === 1).id,
        'authorId': members.find(member => member.firstname === 'Laurent').id,
        'priorityId': priorities.find(priority => priority.value === 3).id,
        'importanceId': importances.find(importance => importance.value === 2).id,
        'locationId': locations.find(location => location.value === 6).id,
      },
      {
        'title': 'Nid de frelon',
        'description': 'Des clients de la chambre 423 m\'ont signalé la présence d\'un nid de frelon',
        'datetime_declaration': 'May 26, 2018 13:24:00',
        'datetime_deadline': 'May 28, 2018 18:00:00',
        'datetime_resolution': 'May 27, 2018 15:36:54',
        'stateId': states.find(state => state.value === 1).id,
        'typeId': types.find(type => type.value === 4).id,
        'authorId': members.find(member => member.firstname === 'Stéphane').id,
        'priorityId': priorities.find(priority => priority.value === 3).id,
        'importanceId': importances.find(importance => importance.value === 3).id,
        'locationId': locations.find(location => location.value === 1).id,
      },
      {
        'title': 'Roses à tailler',
        'description': 'Il faut préparer la Saint Valentin pour nos clients, et il faut donc tailler les roses du jardin',
        'datetime_declaration': 'February 10, 2018 13:24:00',
        'datetime_deadline': 'February 14, 2018 08:00:00',
        'datetime_resolution': 'February 13, 2018 20:31:30',
        'stateId': states.find(state => state.value === 1).id,
        'typeId': types.find(type => type.value === 1).id,
        'authorId': members.find(member => member.firstname === 'Laëtitia').id,
        'priorityId': priorities.find(priority => priority.value === 3).id,
        'importanceId': importances.find(importance => importance.value === 2).id,
        'locationId': locations.find(location => location.value === 12).id,
      },
      {
        'title': 'LED ascenseur',
        'description': 'La LED du bouton pour aller au RDC est éteinte dans l\'ascenseur principal',
        'datetime_declaration': 'April 10, 2018 13:24:00',
        'datetime_deadline': 'April 30, 2018 08:00:00',
        'datetime_resolution': 'May 03, 2018 14:26:53',
        'stateId': states.find(state => state.value === 1).id,
        'typeId': types.find(type => type.value === 4).id,
        'authorId': members.find(member => member.firstname === 'Mercedes').id,
        'priorityId': priorities.find(priority => priority.value === 1).id,
        'importanceId': importances.find(importance => importance.value === 1).id,
        'locationId': locations.find(location => location.value === 3).id,
      },
      {
        'title': 'Miroir fissuré',
        'description': 'Le miroir s\'est fissuré suite à la maladresse d\'une cliente dans la chambre 253',
        'datetime_declaration': 'April 25, 2018 17:57:25',
        'datetime_deadline': 'April 28, 2018 17:00:00',
        'datetime_resolution': 'April 27, 2018 18:22:34',
        'stateId': states.find(state => state.value === 1).id,
        'typeId': types.find(type => type.value === 2).id,
        'authorId': members.find(member => member.firstname === 'Valérie').id,
        'priorityId': priorities.find(priority => priority.value === 1).id,
        'importanceId': importances.find(importance => importance.value === 1).id,
        'locationId': locations.find(location => location.value === 1).id,
      },
      {
        'title': 'Porte de chambre forcée',
        'description': 'Un client a forcé la porte de la chambre 234 avec sa tête',
        'datetime_declaration': 'May 13, 2018 09:25:35',
        'datetime_deadline': 'May 16, 2018 19:00:00',
        'datetime_resolution': 'May 20, 2018 14:12:43',
        'stateId': states.find(state => state.value === 1).id,
        'typeId': types.find(type => type.value === 2).id,
        'authorId': members.find(member => member.firstname === 'Valérie').id,
        'priorityId': priorities.find(priority => priority.value === 2).id,
        'importanceId': importances.find(importance => importance.value === 2).id,
        'locationId': locations.find(location => location.value === 1).id,
      },
      {
        'title': 'Tapisserie à refaire',
        'description': 'Il faut refaire la tapisserie de fond en comble dans la chambre 234',
        'datetime_declaration': 'April 01, 2018 12:45:23',
        'datetime_deadline': 'April 01, 2018 23:59:59',
        'stateId': states.find(state => state.value === -1).id,
        'typeId': types.find(type => type.value === 2).id,
        'authorId': members.find(member => member.firstname === 'Denis').id,
        'priorityId': priorities.find(priority => priority.value === 3).id,
        'importanceId': importances.find(importance => importance.value === 3).id,
        'locationId': locations.find(location => location.value === 1).id,
      },
      {
        'title': 'Literie à changer',
        'description': 'Toute la literie est à changer dans la chambre 165',
        'datetime_declaration': 'May 24, 2018 12:45:23',
        'datetime_deadline': 'May 28, 2018 08:00:00',
        'stateId': states.find(state => state.value === 0).id,
        'typeId': types.find(type => type.value === 2).id,
        'authorId': members.find(member => member.firstname === 'Nicholas').id,
        'priorityId': priorities.find(priority => priority.value === 2).id,
        'importanceId': importances.find(importance => importance.value === 2).id,
        'locationId': locations.find(location => location.value === 1).id,
      },
      {
        'title': 'Badge d\'accès détérioré',
        'description': 'Un client m\'a signalé que son badge d\'accès à sa chambre ne fonctionnait plus. Il s\'agit de la chambre 331',
        'datetime_declaration': 'May 16, 2018 16:48:23',
        'datetime_deadline': 'May 31, 2018 18:00:00',
        'datetime_resolution': 'May 20, 2018 08:27:49',
        'stateId': states.find(state => state.value === 1).id,
        'typeId': types.find(type => type.value === 2).id,
        'authorId': members.find(member => member.firstname === 'Stéphane').id,
        'priorityId': priorities.find(priority => priority.value === 2).id,
        'importanceId': importances.find(importance => importance.value === 1).id,
        'locationId': locations.find(location => location.value === 1).id,
      },
      {
        'title': 'Fenêtre fissurée',
        'description': 'Des enfants auraient jeté des cailloux sur la fenêtre de la chambre 101',
        'datetime_declaration': 'May 31, 2018 12:14:54',
        'datetime_deadline': 'June 03, 2018 18:00:00',
        'datetime_resolution': 'June 01, 2018 08:52:41',
        'stateId': states.find(state => state.value === 1).id,
        'typeId': types.find(type => type.value === 4).id,
        'authorId': members.find(member => member.firstname === 'Laëtitia').id,
        'priorityId': priorities.find(priority => priority.value === 2).id,
        'importanceId': importances.find(importance => importance.value === 1).id,
        'locationId': locations.find(location => location.value === 1).id,
      },
      {
        'title': 'Chambre à nettoyer d\'urgence',
        'description': 'La chambre 303 est à nettoyer d\'urgence !',
        'datetime_declaration': 'June 04, 2018 08:12:43',
        'datetime_deadline': 'June 04, 2018 18:00:00',
        'datetime_resolution': 'June 04, 2018 16:32:48',
        'stateId': states.find(state => state.value === 1).id,
        'typeId': types.find(type => type.value === 1).id,
        'authorId': members.find(member => member.firstname === 'Laurent').id,
        'priorityId': priorities.find(priority => priority.value === 3).id,
        'importanceId': importances.find(importance => importance.value === 3).id,
        'locationId': locations.find(location => location.value === 1).id,
      },
      {
        'title': 'Etagère cassée dans la chambre froide',
        'description': 'J\'ai cassé ce matin l\'étagère soutenant les grosses viandes',
        'datetime_declaration': 'May 14, 2018 11:15:33',
        'datetime_deadline': 'May 18, 2018 08:00:00',
        'datetime_resolution': 'May 17, 2018 12:52:38',
        'stateId': states.find(state => state.value === 1).id,
        'typeId': types.find(type => type.value === 3).id,
        'authorId': members.find(member => member.firstname === 'Cyril').id,
        'priorityId': priorities.find(priority => priority.value === 2).id,
        'importanceId': importances.find(importance => importance.value === 2).id,
        'locationId': locations.find(location => location.value === 8).id,
      },
      {
        'title': 'Manque de matériel pour cuisiner',
        'description': 'Je ne trouve plus mes casseroles pour faire ma pâtisserie !',
        'datetime_declaration': 'May 20, 2018 08:15:33',
        'datetime_deadline': 'May 27, 2018 08:00:00',
        'stateId': states.find(state => state.value === 0).id,
        'typeId': types.find(type => type.value === 3).id,
        'authorId': members.find(member => member.firstname === 'Mercotte').id,
        'priorityId': priorities.find(priority => priority.value === 2).id,
        'importanceId': importances.find(importance => importance.value === 1).id,
        'locationId': locations.find(location => location.value === 7).id,
      },
      {
        'title': 'Frigo qui fuit',
        'description': 'Le réfrigérateur où sont stockées les pâtisseries fraîches fuit',
        'datetime_declaration': 'May 26, 2018 08:15:33',
        'datetime_deadline': 'May 28, 2018 18:00:00',
        'stateId': states.find(state => state.value === 0).id,
        'typeId': types.find(type => type.value === 3).id,
        'authorId': members.find(member => member.firstname === 'Philippe').id,
        'priorityId': priorities.find(priority => priority.value === 3).id,
        'importanceId': importances.find(importance => importance.value === 1).id,
        'locationId': locations.find(location => location.value === 7).id,
      },
      {
        'title': 'Morceaux de verre au comptoir',
        'description': 'Un client a laissé tomber son verre dans la soirée, j\'ai ramassé les gros morceaux mais il en reste dans le tapis.',
        'datetime_declaration': 'May 14, 2018 11:56:32',
        'datetime_deadline': 'May 31, 2018 23:00:00',
        'datetime_resolution': 'May 21, 2018 15:18:58',
        'stateId': states.find(state => state.value === 1).id,
        'typeId': types.find(type => type.value === 3).id,
        'authorId': members.find(member => member.firstname === 'Denis').id,
        'priorityId': priorities.find(priority => priority.value === 2).id,
        'importanceId': importances.find(importance => importance.value === 2).id,
        'locationId': locations.find(location => location.value === 10).id,
      },
      {
        'title': 'Machine à café défectueuse',
        'description': 'Il y a un problème dans la machine à café du bar, elle ne distribue que de l\'eau.',
        'datetime_declaration': 'May 14, 2018 11:56:32',
        'datetime_deadline': 'May 31, 2018 23:00:00',
        'datetime_resolution': 'May 21, 2018 15:18:58',
        'stateId': states.find(state => state.value === 1).id,
        'typeId': types.find(type => type.value === 3).id,
        'authorId': members.find(member => member.firstname === 'Nicholas').id,
        'priorityId': priorities.find(priority => priority.value === 2).id,
        'importanceId': importances.find(importance => importance.value === 2).id,
        'locationId': locations.find(location => location.value === 10).id,
      },
      {
        'title': 'Chaise cassée au restaurant',
        'description': 'J\'ai retrouvé une chaise cassée au restaurant, peut être un client ou des enfants qui auraient joué avec..',
        'datetime_declaration': 'June 08, 2018 11:13:58',
        'datetime_deadline': 'June 17, 2018 20:00:00',
        'stateId': states.find(state => state.value === 0).id,
        'typeId': types.find(type => type.value === 1).id,
        'authorId': members.find(member => member.firstname === 'Stéphane').id,
        'priorityId': priorities.find(priority => priority.value === 1).id,
        'importanceId': importances.find(importance => importance.value === 1).id,
        'locationId': locations.find(location => location.value === 1).id,
      },
    ];

    const Issue = app.models.Issue;
    let promises = [];

    issues.forEach(issue => {
      promises.push(new Promise((res, rej) => {
        Issue.findOrCreate({
          where: {
            title: issue.title,
            description: issue.description,
            authorId: issue.authorId,
            typeId: issue.typeId,
          },
        }, issue, err => {
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
