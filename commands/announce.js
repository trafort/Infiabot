const Discord = require('discord.js')

function isHex(h) {
  var a = parseInt(h,16);
  return (a.toString(16) ===h.toLowerCase())
}

exports.run = async (client, message, args, level) => { 
    const settings = message.guild ? client.settings.get(message.guild.id) : client.config.defaultSettings;
    let content = message.content.split(' ').slice(1).join(' ').split(' | ')
    if(content.length < 3) {
      message.channel.sendEmbed(new Discord.RichEmbed()
        .addField('Syntax Error!', `${settings.prefix}announce [title] | [content] | [#color]`)
        .setColor(0xff5454)
      );
      return;
    }
    let title = content[0]
    let body = content[1]
    let color = content[2].slice(1)
    let isColor = isHex(color);
    console.log(color)
    let channel = message.guild.channels.find("name", `${settings.announcementChannel}`);
    console.log(settings.announcementChannel)

    if(!channel) {
      message.channel.sendEmbed(new Discord.RichEmbed()
        .addField('Error!', `I could not find a channel called ${settings.announcementChannel}. Please set your channel by doing ${settings.prefix}set edit announcementChannel [channel]`)
        .setColor(0xff5454)
      );
      return;
    }

    if(!isColor) {
      message.channel.sendEmbed(new Discord.RichEmbed()
        .addField('Error!', `#${color} is not a valid hex color!`)
        .setColor(0xff5454)
      );
      return;
    }

    channel.sendEmbed(new Discord.RichEmbed()
      .setTitle(title)
      .setDescription(body)
      .setColor(`0x${color}`)
    );
};
  
  exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['p'],
    permLevel: 3
  };
  
  exports.help = {
    name: "announce",
    category: "Utility",
    description: "Announces to the announcement channel",
    furtherDescription: "Announces an announcement as an embed in the announcement channel. Requires perm level 3",
    usage: "announce [title] | [content] | [#color]"
  };