const Discord = require('discord.js')

exports.run = (client, message, args) => {
    const settings = message.guild ? client.settings.get(message.guild.id) : client.config.defaultSettings;
    let mention = message.guild.member(message.mentions.users.first());
    let banPerms = message.guild.member(client.user).hasPermission('BAN_MEMBERS')
    let reason = args.slice(1).join(' ')
    let modlog = message.guild.channels.find("name", settings.modLogChannel);
    if(args.length < 2) {
        message.channel.sendEmbed(new Discord.RichEmbed()
          .addField('Syntax Error!', `${settings.prefix}kick [user] [reason]`)
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
    if(message.mentions.users.size === 0) {
        message.channel.sendEmbed(new Discord.RichEmbed()
            .addField('Error!', `Please mention an user!`)
            .setColor(0xff5454)
        );
        return;
    }
    let kickMember = message.guild.member(message.mentions.users.first())
    if(!kickMember) {
        message.channel.sendEmbed(new Discord.RichEmbed()
            .addField('Error!', `That user does not exist.`)
            .setColor(0xff5454)
        );
        return
    }
    if(!message.guild.member(client.user).hasPermission("KICK_MEMBERS")) {
        message.channel.sendEmbed(new Discord.RichEmbed()
            .addField('Error!', `I do not have the permissions to do this!`)
            .setColor(0xff5454)
        );
        return;
    }
    
    kickMember.user.send(`You have been kicked in the server ${kickMember.guild.name} by moderator ${message.author.tag} for reason:\n${reason}`)

    kickMember.kick().then(member => {
        message.channel.sendEmbed(new Discord.RichEmbed()
            .addField('Success!', `${kickMember} has been kicked!`)
            .setColor(0x5697ff)
        );
        modlog.sendEmbed(new Discord.RichEmbed()
            .setAuthor('Mod-log entry | Kick', message.author.avatarURL)
            .setThumbnail(mention.user.avatarURL)
            .addField('User:', `${mention.user.tag}`, true)
            .addField('Moderator:', `${message.author.tag}`, true)
            .addField('Reason:', `${reason}`, true)
            .setTimestamp()
            .setFooter(`User ID: ${mention.user.id}`)
            .setColor(0xff4635)
        );
    });
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: 2
  };
  
  exports.help = {
    name: "kick",
    category: "Moderation",
    description: "Kicks the mentioned member",
    furtherDescription: "I kick the mentioned member and log it in the modlog channel",
    usage: "kick [User]"
  };