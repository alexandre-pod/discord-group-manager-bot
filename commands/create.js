const {COMMAND_PREFIX, ADMIN_PERMISSION} = require('../config.js');
const {searchBotRole} = require('../utils');

module.exports = {
  handler: function(botGuildMember, message, userPermission, args) {
    if (args.length != 1) {
      message.reply('Missing argument\nCorrect usage: ' + this.getUsage());
      return;
    }
    const wantedRole = args[0];

    if (searchBotRole(botGuildMember, wantedRole) !== null) {
      message.reply(`A group named '${wantedRole}' already exists`);
      return;
    }

    message.guild.createRole({
      'name': wantedRole,
      'mentionable': true
    })
    .then(role => {
      botGuildMember.addRole(role.id);
      message.reply("group created");
    })
    .catch((err) => {
      console.error(err);
      message.reply("An error occured while trying to create the group");
    });
  },
  getUsage: function(userPermission) {
    return `${COMMAND_PREFIX}create <group>`;
  },
  permission: ADMIN_PERMISSION
};
