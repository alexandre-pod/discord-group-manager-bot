// Check the presence of the config.js file
var fs = require('fs');
if (!fs.existsSync('./config.js')) {
  console.error("You need to rename the file 'config_template.js' to 'config.js'");
  process.exit(1);
}

if (require('./config.js').BOT_SECRET == '<YOUR_BOT_TOKEN>') {
  console.error("You need to put your bot token in 'config.js'");
  process.exit(1);
}


const {BOT_SECRET, COMMAND_PREFIX, USER_PERMISSION, ADMIN_PERMISSION} = require('./config.js');

const Discord = require('discord.js');
const client = new Discord.Client();

const commandsManager = require('./commands');
const commands = commandsManager.commands;

module.exports = {
  COMMAND_PREFIX,
  USER_PERMISSION,
  ADMIN_PERMISSION,
  commands
};

commandsManager.loadCommands();



client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (!RegExp('^' + COMMAND_PREFIX).test(msg.content)) return;

  // prevent bot to execute commands
  if (msg.author.bot) return;

  // Check the availability of the guild before reading data
  // see: https://discord.js.org/#/docs/main/stable/class/Guild
  if (!msg.guild.available) return;

  const botGuildMember = msg.guild.member(msg.guild.client.user);

  const commandParts = msg.content.slice(COMMAND_PREFIX.length).split(/\s/);
  const cmdName = commandParts[0];
  const args = commandParts.slice(1);

  const command = commands[cmdName];

  if (command === undefined) return;


  const userPermission = msg.member.hasPermission("ADMINISTRATOR") ? ADMIN_PERMISSION : USER_PERMISSION;

  if (userPermission >= command.requiredPermission) {
    try {
      command.handler.bind(command)(botGuildMember, msg, userPermission, args);
    } catch (e){
      console.error(e);
      msg.reply("Unexpected error");
    }
  } else {
    msg.reply("you are not permitted to execute this command");
  }
});

client.login(BOT_SECRET);
