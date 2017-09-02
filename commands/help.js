const Discord = require('discord.js')

exports.run = (client, message, args, level) => {
  function isOdd(num) {
    if (num === 0) return false;
  
    return (num & -num) === 1;
  }
  let categories = [
    'Fun',
    'Image',
    'Miscelaneous',
    'Moderation',
    'System',
    'Utility'
  ]
  let categoriesDesc = [
    'Bored? Here are a few fun commands for you to play with!',
    'Image manipulation commands that messes with your avatar',
    'Miscelaneous Commands',
    'Commands to help you moderate the server',
    'System Commands',
    'Utility Commands'
  ]
  let emojiNum = 0;
  let emoji;
  let categoriesHelp;
  for(i in categories) {
    if(isOdd(i)) {emoji = ':small_blue_diamond:'} else {emoji = ':small_orange_diamond:'}
    int = parseInt(i)
    categoriesHelp += `${emoji} [${int}] ${categories[i]}\n${' '.repeat(12)}${categoriesDesc[i]}\n`
  }
  categoriesHelp = categoriesHelp.split('undefined')
  const settings = message.guild ? client.settings.get(message.guild.id) : client.config.defaultSettings;
  const myCommands = message.guild ? client.commands.filter(cmd => cmd.conf.permLevel <= level) : client.commands.filter(cmd => cmd.conf.permLevel <= level &&  cmd.conf.guildOnly !== true);
  const commandNames = myCommands.keyArray();
  const sorted = myCommands.sort((p, c) => p.help.category > c.help.category ? 1 : -1);
  let currentCategory;
  let output;
  if(!args[0]) {
    message.channel.sendEmbed(new Discord.RichEmbed()
      .setAuthor('Help | Categories', client.user.avatarURL)
      .setDescription(categoriesHelp)
      .setColor(0x5697ff)
      .setFooter(`Do ${settings.prefix}help [number/command] for further help!`)
    );
  } else if (!isNaN(args[0])) {
    let num = parseInt(args[0])
    if(num > categories.length) {
      message.channel.sendEmbed(new Discord.RichEmbed()
        .addField('Error!', `That's not a valid category`)
        .setColor(0xff5454)
      );
      return;
    }
    let commandCategory = categories[num];
    sorted.forEach( c => {
      if(isOdd(emojiNum)) {emoji = ':small_blue_diamond:'} else {emoji = ':small_orange_diamond:'}
      const cat = commandCategory.toProperCase();
      if (c.help.category == cat) 
        output += `${emoji} ${settings.prefix}${c.help.name}\n${' '.repeat(12)}${c.help.description}\n`
      emojiNum++
    });
    if(!output) return message.channel.send(`You do not have enough permissions for that. Do ${settings.prefix}mylevel to see you're permission level. Set the Mod and Admin roles by doing ${settings.prefix}set`);
    output = output.split('undefined')
    message.channel.sendEmbed(new Discord.RichEmbed()
      .setAuthor(`Help | ${commandCategory.toProperCase()}`, client.user.avatarURL)
      .setDescription(output)
      .setColor(0x5697ff)
      .setFooter(`Do ${settings.prefix}help [command] for further help!`)
    );
  } else {
    let command = args[0]
    if (client.commands.has(command)) {
      command = client.commands.get(command);
      if (level < command.conf.permLevel) return;
      message.channel.sendEmbed(new Discord.RichEmbed()
        .setAuthor(`Help | ${command.help.name.toProperCase()}`, client.user.avatarURL)
        .setDescription(`${command.help.furtherDescription}\nUsage: ${command.help.usage}`)
        .setColor(0x5697ff)
      );
    } else {

    }
  }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["h", "halp", "?"],
    permLevel: 0
};

exports.help = {
    name: "help",
    category: "System",
    description: "Displays all the available commands for your permission level.",
    furtherDescription: "This command. Duh.",
    usage: "help [command]"
};
