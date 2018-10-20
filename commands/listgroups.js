const {COMMAND_PREFIX, USER_PERMISSION, TIMEOUT_MESSAGE} = require('../config.js');
const {getBotRoles, sendTemporaryMsgResponse} = require('../utils');

module.exports = {
  handler: function(botGuildMember, message, userPermission, args) {
    let response = "Managed groups:\n";

    for (let role of getBotRoles(botGuildMember)) {
      response += role.name + '\n';
    }

    sendTemporaryMsgResponse(message, response, TIMEOUT_MESSAGE);
  },
  getUsage: function(userPermission) {
    return `${COMMAND_PREFIX}listgroups`;
  },
  permission: USER_PERMISSION
};
