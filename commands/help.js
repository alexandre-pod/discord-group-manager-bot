const {COMMAND_PREFIX, USER_PERMISSION} = require('../config.js');
const {commands} = require('../app.js');

module.exports = {
  handler: function(botGuildMember, message, userPermission, args) {
    let response = "List of commands:\n";
    for (let cmdName in commands) {
      const command = commands[cmdName];

      if (userPermission < command.requiredPermission) continue;

      response += command.getUsage() + '\n';
    }

    message.reply(response);
  },
  getUsage: function(userPermission) {
    return `${COMMAND_PREFIX}help`;
  },
  permission: USER_PERMISSION
};
