module.exports = {
  getBotRoles,
  searchBotRole
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
