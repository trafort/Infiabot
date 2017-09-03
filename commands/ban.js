const Discord = require('discord.js')

exports.run = async (client, message, args, level) => { 
  const settings = message.guild ? client.settings.get(message.guild.id) : client.config.defaultSettings;
  let mention = message.guild.member(message.mentions.users.first());
  let banPerms = message.guild.member(client.user).hasPermission('BAN_MEMBERS')
  let reason = args.slice(1).join(' ')
  let modlog = message.guild.channels.find("name", settings.modLogChannel);
  if(args.length < 2) {
    message.channel.sendEmbed(new Discord.RichEmbed()
      .addField('Syntax Error!', `${settings.prefix}ban [user] [reason]`)
      .setColor(0xff5454)
    );
    return;
  }
  if(!modlog) {
    message.channel.sendEmbed(new Discord.RichEmbed()
      .addField('Error!', `No mod-log channel named ${settings.modLogChannel} was found! do ${settings.prefix}set edit modLogChannel [channel name] to set it!`)
      .setColor(0xff5454)
    );
    return;
  }
  if (!mention) {
    message.channel.sendEmbed(new Discord.RichEmbed()
      .addField('Error!', `Please Mention an user to kick!`)
      .setColor(0xff5454)
    );
  } else {
    if (!banPerms) {
      message.channel.sendEmbed(new Discord.RichEmbed()
        .addField('Error!', `I don't have the pemission to do that!`)
        .setColor(0xff5454)
      );
    } else {
      let bannable = message.guild.member(mention).bannable
      if (!bannable) {
        message.channel.sendEmbed(new Discord.RichEmbed()
          .addField('Error!', `That user is not bannable!`)
          .setColor(0xff5454)
        );
      } else {
        message.guild.ban(mention)
        message.channel.sendEmbed(new Discord.RichEmbed()
          .addField('Success!', `${mention.user.tag} has been banned!`)
          .setColor(0x5697ff)
        );
        modlog.sendEmbed(new Discord.RichEmbed()
          .setAuthor('Mod-log entry | Ban', message.author.avatarURL)
          .setThumbnail(mention.user.avatarURL)
          .addField('User:', `${mention.user.tag}`, true)
          .addField('Moderator:', `${message.author.tag}`, true)
          .addField('Reason:', `${reason}`, true)
          .setTimestamp()
          .setFooter(`User ID: ${mention.user.id}`)
          .setColor(0xff2a16)
        );
        mention.send(`You have been banned in the server ${mention.guild.name} by moderator ${message.author.tag} for reason:\n${reason}`)
      }
    }
  }
};
  
  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 3
  };
  
  exports.help = {
    name: "ban",
    category: "Moderation",
    description: "Bans the mentioned user",
    furtherDescription: "I will kick and ban the mentioned user and log it to the modlog channel. Requires permlevel 3",
    usage: "ban [user] [reason]"
  };