const Discord = require('discord.js')
const client = new Discord.Client();

exports.run = async (client, message, args, level) => { 
    const settings = message.guild ? client.settings.get(message.guild.id) : client.config.defaultSettings;
    let modlog = message.guild.channels.find("name", settings.modLogChannel);
    let reason = args.slice(1).join(' ')
    let toWarn = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])

    if(args.length < 2) {
        message.channel.sendEmbed(new Discord.RichEmbed()
          .addField('Syntax Error!', `${settings.prefix}warn [user] [reason]`)
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

    if(!toWarn) {
        message.channel.sendEmbed(new Discord.RichEmbed()
            .addField('Error!', `Please Mention an user to warn!`)
            .setColor(0xff5454)
        );
        return;
    }

    modlog.sendEmbed(new Discord.RichEmbed()
        .setAuthor('Mod-log entry | Warn', message.author.avatarURL)
        .setThumbnail(toWarn.user.avatarURL)
        .addField('User:', `${toWarn.user.tag}`, true)
        .addField('Moderator:', `${message.author.tag}`, true)
        .addField('Reason:', `${reason}`, true)
        .setTimestamp()
        .setFooter(`User ID: ${toWarn.user.id}`)
        .setColor(0xff9502)
    );

    toWarn.send(`You have been warned in the server ${toWarn.guild.name} by moderator ${message.author.tag} for reason:\n${reason}`)
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: 2
  };
  
  exports.help = {
    name: 'warn',
    description: 'I dm the person to warn them! Then I log it in modlog',
    furtherDescription: "I'll arn the parson and log it to the modlog channel! Perm level 2 required!",
    usage: 'warn [mention] [reason]',
    category: 'Moderation'
  };