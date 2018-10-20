const {COMMAND_PREFIX, USER_PERMISSION} = require('../config.js');
const {searchBotRole, answerError, answerSuccess} = require('../utils');

module.exports = {
  handler: function(botGuildMember, message, userPermission, args) {
    if (args.length != 1) {
      answerError(message, `Missing argument\nCorrect usage: ${this.getUsage()}`);
      return;
    }
    const wantedRole = args[0];

    let role = searchBotRole(botGuildMember, wantedRole);

    if (role == null) {
      answerError(message, `Unknown group: ${wantedRole}`);
    } else {
      message.member.removeRole(role.id)
        .then(_ => answerSuccess(message))
        .catch(_ => answerError(message));
    }
  },
  getUsage: function(userPermission) {
    return `${COMMAND_PREFIX}leave <group>`;
  },
  permission: USER_PERMISSION
};
