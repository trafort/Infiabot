exports.run = async (client, message, args, level) => {// eslint-disable-line no-unused-vars
  if (!args || args.size < 1) return message.reply("Must provide a command to reload. Derp.");

  let command;
  if (client.commands.has(args[0])) {
    command = client.commands.get(args[0]);
  } else if (client.aliases.has(args[0])) {
    command = client.commands.get(client.aliases.get(args[0]));
  }
  if (!command) {
    await message.channel.sendEmbed(new Discord.RichEmbed()
      .addField('Error!', `The command \`${args[0]}\` doesn't seem to exist!`)
      .setColor(0xff5454)
    );
    return;
  } 
  command = command.help.name;

  delete require.cache[require.resolve(`./${command}.js`)];
  const cmd = require(`./${command}`);
  client.commands.delete(command);
  client.aliases.forEach((cmd, alias) => {
    if (cmd === command) client.aliases.delete(alias);
  });
  client.commands.set(command, cmd);
  cmd.conf.aliases.forEach(alias => {
    client.aliases.set(alias, cmd.help.name);
  });
  message.channel.sendEmbed(new Discord.RichEmbed()
    .addField('Success!', `The command \`${command}\` has been reloaded`)
    .setColor(0x5697ff)
  );
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['r'],
  permLevel: 10
};

exports.help = {
  name: "reload",
  category: "System",
  description: "Reloads a command",
  furtherDescription: "Reloads an given command. Useful for development!",
  usage: "reload [command]"
};
