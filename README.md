# discord-group-manager-bot

A Discord Bot allowing users to join and leave specific groups

## Getting Started


* Rename the file `config_template` to `config.js`
* Put the token of your bot in the file `config.js`
* Run `npm install`
* Start the bot with `npm start`


### Prerequisites

You need to have a Discord Application with a Bot.
Here the steps to follow if you don't have one:

* Create an application on [https://discordapp.com/developers/applications/](https://discordapp.com/developers/applications/)
* Add a Bot to your application
* Add the bot to your server by following  [https://discordapp.com/oauth2/authorize?client_id=<CLIENT_ID>&scope=bot&permissions=268435456](https://discordapp.com/oauth2/authorize?client_id=<CLIENT_ID>&scope=bot&permissions=268435456)

### Installing

* Rename the file `config_template` to `config.js`
* Put the token of your bot in the file `config.js`
* Run `npm install`
* Start the bot with `npm start`


## Bot commands

Each command start with `COMMAND_PREFIX`, that you can setup in `config.js`, the default value is `!`

All the bot commands are written in the `commands` folder. Here the list:

* `!help` List all the available commands
* `!listgroups` List the groups managed by the bot
* `!join <group>` Add the role nammed `group` to the user using the command
* `!leave <group>` Remove the role nammed `group` to the user using the command


The following commands can be performed by user having administrator permissions:

* `!create <group>` Create a role nammed `group` to the server and add it to the bot
* `!delete <group>` Delete the role nammed `group` from the server

### Group managed

The groups managed by the bot are all the roles assigned to it.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
