const Discord = require('discord.js')
const client = new Discord.Client();

exports.run = async (client, message, args, level) => { 
    client.generateInvite(['ADMINISTRATOR', 'SEND_MESSAGES', 'MANAGE_GUILD', 'MENTION_EVERYONE'])
    .then(link => {
        message.channel.sendEmbed(new Discord.RichEmbed()
            .addField('Invite me to your server!', link)
            .setURL(link)
            .setColor(0x5697ff)
        );
    });
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: 0
};
  
  exports.help = {
    name: 'invite',
    description: 'Invite Me! :D',
    usage: 'invite',
    category: 'Info',
};