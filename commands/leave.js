const {COMMAND_PREFIX, USER_PERMISSION} = require('../config.js');
const {searchBotRole} = require('../utils');

module.exports = {
  handler: function(botGuildMember, message, userPermission, args) {
    if (args.length != 1) {
      message.reply('Missing argument\nCorrect usage: ' + this.getUsage());
      return;
    }
    const wantedRole = args[0];

    let role = searchBotRole(botGuildMember, wantedRole);

    if (role == null) {
      message.reply(`Unknown group: ${wantedRole}`);
    } else {
      message.member.removeRole(role.id);
    }
  },
  getUsage: function(userPermission) {
    return `${COMMAND_PREFIX}leave <group>`;
  },
  permission: USER_PERMISSION
};
