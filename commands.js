const fs = require('fs');

const commands = {
  /*
  * "cmdName": {
  *   getUsage: (userPermission) => "",
  *   handler: (botGuildMember, message, userPermission, args) => "",
  *   requiredPermission: 100
  * }
  */
};
module.exports = {
  commands,
  loadCommands
};

/*
 * cmdName String
 * handler Function : handler(botGuildMember, message, userPermission, args)
 * getUsage Function : getUsage(userPermission) -> String
*/
function registerCommand(cmdName, handler, getUsage, permission) {
  if (commands[cmdName]) {
    console.warn(`Overriding existing command ${cmdName}`);
  }

  commands[cmdName] = {
    getUsage, handler, requiredPermission: permission
  };
}
function loadCommands() {
  let files = fs.readdirSync('./commands');
  // get commands from files inside the ./commands folder
  for (let name of files) {
    const commandName = name.substr(0, name.lastIndexOf('.'));
    const commandData = require('./commands/' + name);
    registerCommand(commandName, commandData.handler, commandData.getUsage, commandData.permission);
  }
}
