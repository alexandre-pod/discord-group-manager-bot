module.exports = {
  getBotRoles,
  searchBotRole,
  answerSuccess,
  answerError,
  sendTemporaryMsgResponse,
};

function *getBotRoles(botGuildMember) {
  for (let role of botGuildMember.roles.values()) {
    if (role.name == "@everyone") continue;
    if (role.managed) continue;

    yield role;
  }
}

function searchBotRole(botGuildMember, roleName) {
  for (let role of getBotRoles(botGuildMember)) {
    if (role.name == roleName) {
      return role;
    }
  }
  return null;
}

function answerSuccess(message, details="") {
  message.react("✅");
}

function answerError(message, details="Unknown error") {
  console.debug(`answer error: ${details}`);
  console.debug(`message: ${message.content}`);
  message.react("🚫");
}

function sendTemporaryMsgResponse(message, response, timeout=1000) {
  message.reply(response)
    .then(sent => {
      setTimeout(sent.delete.bind(sent), timeout);
    })
    .catch(console.error);
}
