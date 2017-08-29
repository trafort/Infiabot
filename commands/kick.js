const Discord = require('discord.js')

exports.run = (client, message, args) => {
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

    kickMember.kick().then(member => {
        message.channel.sendEmbed(new Discord.RichEmbed()
            .addField('Success!', `${kickMember} has been kicked!`)
            .setColor(0x5697ff)
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
    usage: "kick [User]"
  };