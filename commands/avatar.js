const Discord = require('discord.js')
const client = new Discord.Client();

exports.run = async (client, message, args, level) => { 
    if(message.mentions.users.size < 1) {
        message.channel.sendEmbed(new Discord.RichEmbed()
            .addField('Error!', `Please mention a user!`)
            .setColor(0xff5454)
        );
        return;
    }
    if(message.mentions.users.size > 1) {
        message.channel.sendEmbed(new Discord.RichEmbed()
            .addField('Error!', `Please mention a single user!`)
            .setColor(0xff5454)
        );
        return;
    }
    let user = message.guild.member(message.mentions.users.first());
    message.channel.sendEmbed(new Discord.RichEmbed()
        .setImage(user.user.avatarURL)
        .setColor(0x5697ff)
    );
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: 0
  };
  
  exports.help = {
    name: 'avatar',
    description: 'Returns the person\'s avatar',
    usage: 'avatar [mention]',
    category: 'Miscelaneous',
  };