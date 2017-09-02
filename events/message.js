
module.exports = (client, message) => {

  if (message.author.bot) return;

  const settings = message.guild
    ? client.settings.get(message.guild.id)
    : client.config.defaultSettings;


  message.settings = settings;


  if (message.content.indexOf(settings.prefix) !== 0) return;


  const args = message.content.slice(settings.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();


  const level = client.permlevel(message);

  const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));

  if (cmd && !message.guild && cmd.conf.guildOnly)
    return message.channel.send("This command is unavailable via private message. Please run this command in a guild.");

  if (cmd && level >= cmd.conf.permLevel) {
    client.log("log", ` ${message.author.username} (${message.author.id}) ran command ${cmd.help.name}`, "CMD");
    cmd.run(client, message, args, level);
  }

};
