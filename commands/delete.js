const {COMMAND_PREFIX, ADMIN_PERMISSION} = require('../config.js');
const {searchBotRole} = require('../utils');

module.exports = {
  handler: function(botGuildMember, message, userPermission, args) {
    if (args.length != 1) {
      message.reply('Missing argument\nCorrect usage: ' + this.getUsage());
      return;
    }
    const wantedRole = args[0];


    let role = searchBotRole(botGuildMember, wantedRole);

    if (role === null) {
      message.reply(`Unknown group '${wantedRole}'`);
      return;
    }

    role.delete()
    .then(deleted => {
      message.reply(`group '${deleted.name}' deleted`);
    })
    .catch((err) => {
      console.error(err);
      message.reply("An error occured while trying to deleting the group");
    });
  },
  getUsage: function(userPermission) {
    return `${COMMAND_PREFIX}delete <group>`;
  },
  permission: ADMIN_PERMISSION
};
