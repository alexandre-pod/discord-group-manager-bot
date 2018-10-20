const {COMMAND_PREFIX, ADMIN_PERMISSION} = require('../config.js');
const {searchBotRole, answerError, answerSuccess} = require('../utils');

module.exports = {
  handler: function(botGuildMember, message, userPermission, args) {
    if (args.length == 0) {
      answerError(message, `Missing argument\nCorrect usage: ${this.getUsage()}`);
      return;
    }
    const wantedRole = args.join(' ');


    let role = searchBotRole(botGuildMember, wantedRole);

    if (role === null) {
      answerError(message, `Unknown group '${wantedRole}'`);
      return;
    }

    role.delete()
    .then(deleted => {
      answerSuccess(message);
    })
    .catch((err) => {
      console.error(err);
      answerError(message, "An error occured while trying to deleting the group");
    });
  },
  getUsage: function(userPermission) {
    return `${COMMAND_PREFIX}delete <group>`;
  },
  permission: ADMIN_PERMISSION
};
