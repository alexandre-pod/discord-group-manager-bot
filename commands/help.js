const {COMMAND_PREFIX, USER_PERMISSION, TIMEOUT_MESSAGE} = require('../config.js');
const {commands} = require('../app.js');
const {sendTemporaryMsgResponse} = require('../utils');

module.exports = {
  handler: function(botGuildMember, message, userPermission, args) {
    let response = "List of commands:```\n";
    for (let cmdName in commands) {
      const command = commands[cmdName];

      if (userPermission < command.requiredPermission) continue;

      response += command.getUsage() + '\n';
    }

    sendTemporaryMsgResponse(message, response + '```', TIMEOUT_MESSAGE);
  },
  getUsage: function(userPermission) {
    return `${COMMAND_PREFIX}help`;
  },
  permission: USER_PERMISSION
};
