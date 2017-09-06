
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

  if(!cmd) return;

  if (cmd && !message.guild && cmd.conf.guildOnly)
    return message.channel.send("This command is unavailable via private message. Please run this command in a guild.");

  if (level >= cmd.conf.permLevel) {
    client.log("log", ` ${message.author.username} (${message.author.id}) ran command ${cmd.help.name}`, "CMD");
    let log = client.channels.get('353803211389403136')
    log.sendEmbed(new Discord.RichEmbed()
      .setAuthor(`Command-log entry | Command Run | ${cmd.help.name.toProperCase()}`, message.author.avatarURL)
      .setThumbnail(message.author.avatarURL)
      .addField('User:', `${message.author.tag}`, true)
      .addField('Command:', `${cmd.help.name.toProperCase()}`, true)
      .addField('Server:', `${(message.channel.type === "dm" ? "DM" : message.guild.name)}`, true)
      .addField('Channel:', `${(message.channel.type === "dm" ? "DM" : message.channel.name)}`, true)
      .addField('Args', `${(args.length < 1 ? "No Args" : args.join(' '))}`, true)
      .addField('Perm. Level', `${(message.channel.type === "dm" ? "DM" : level)}`, true)
      .setTimestamp()
      .setFooter(`Guild ID: ${(message.channel.type === "dm" ? "DM" : message.guild.id)} | User ID: ${message.author.id}`)
      .setColor(0x42f4cb)
    )
    cmd.run(client, message, args, level);
  } else {
    message.author.send(`**[CMD]** Sorry, But you do not have the right permissions to run **[${cmd.help.name.toProperCase()}]**. This command requires permission level **${cmd.conf.permLevel}** and you are permission level **${level}**.`)
    let log = client.channels.get('353803211389403136')
    log.sendEmbed(new Discord.RichEmbed()
      .setAuthor(`Command-log entry | Command Run | ${cmd.help.name.toProperCase()}`, message.author.avatarURL)
      .setThumbnail(message.author.avatarURL)
      .addField('User:', `${message.author.tag}`, true)
      .addField('Command:', `${cmd.help.name.toProperCase()}`, true)
      .addField('Server:', `${(message.channel.type === "dm" ? "DM" : message.guild.name)}`, true)
      .addField('Channel:', `${(message.channel.type === "dm" ? "DM" : message.channel.name)}`, true)
      .addField('Args', `${(args.length < 1 ? "No Args" : args.join(' '))}`, true)
      .addField('Perm. Level', `${(message.channel.type === "dm" ? "DM" : level)}`, true)
      .setTimestamp()
      .setFooter(`Guild ID: ${(message.channel.type === "dm" ? "DM" : message.guild.id)} | User ID: ${message.author.id}`)
      .setColor(0xf44242)
    )
  }

};
