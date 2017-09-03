const Discord = require('discord.js')
const client = new Discord.Client();
const moment = require("moment");
require("moment-duration-format");

exports.run = async (client, message, args, level) => { 
    
    let user;
    let mention = message.mentions.users.first();

    if(mention) {
        user = message.guild.member(message.mentions.users.first())
    } else {
        user = message.guild.member(message.author)
    }

    let game = ' ';
    let streaming = ' ';

    if(!user.presence.game) {
        game = 'Nothing'
        streaming = false
    } else {
        game = user.user.presence.game.name
        streaming = user.user.presence.game.streaming
    }

    let color = user.displayHexColor
    color = color.slice(1)
    color = `0x${color}`

    message.channel.sendEmbed(new Discord.RichEmbed()
        .setAuthor(`${user.user.tag}`, user.user.avatarURL)
        .addField('Created At:', `${user.user.createdAt}`, true)
        .addField('User ID', `${user.user.id}`, true)
        .addField('Is bot?', `${user.user.bot}`, true)
        .addField('Presence:', `${user.presence.status}`, true)
        .addField('Playing:', `${game}`, true)
        .addField('Streaming?:', `${streaming}`, true)
        .addField('Display Name:', `${user.displayName}`, true)
        .addField('Display color:', `${user.displayHexColor}`, true)
        .addField('Joined Server At:', `${user.joinedAt}`, true)
        .setThumbnail(`${user.user.avatarURL}`)
        .setColor(color)
    );
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: 0
  };
  
  exports.help = {
    name: 'userinfo',
    description: 'Returns some info about the mentioned user!',
    furtherDescription: "I'll return some information about the mentioned user! If you did not mention anyone, I'll return some info about you!",
    usage: 'userinfo [user]',
    category: 'Miscelaneous',
  };