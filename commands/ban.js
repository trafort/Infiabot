const Discord = require('discord.js')

exports.run = async (client, message, args, level) => { 
  let mention = message.mentions.users.first()
  let banPerms = message.guild.member(client.user).hasPermission('BAN_MEMBERS')
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
          .addField('Success!', `${member} has been kicked!`)
          .setColor(0x5697ff)
        );
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
    usage: "ban [user]"
  };