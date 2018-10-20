const {COMMAND_PREFIX, USER_PERMISSION} = require('../config.js');
const {getBotRoles} = require('../utils');

module.exports = {
  handler: function(botGuildMember, message, userPermission, args) {
    let response = "Managed groups:\n";

    for (let role of getBotRoles(botGuildMember)) {
      response += role.name + '\n';
    }

    message.reply(response);
  },
  getUsage: function(userPermission) {
    return `${COMMAND_PREFIX}listgroups`;
  },
  permission: USER_PERMISSION
};
