const Discord = require('discord.js')
var request = require('request');

exports.run = async (client, message, args, level) => { 
    request('https://yesno.wtf/api/', function(err, resp, body) {
        let data = JSON.parse(body)
        message.channel.sendEmbed(new Discord.RichEmbed()
            .setImage(data.image)
            .setColor(0x5697ff)
        );
    })
};
  
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};
  
exports.help = {
    name: "yesorno",
    category: "Fun",
    description: "Returns a gif that displays yes or no",
    description: "I return a gif that displays yes or no",
    usage: "yesorno"
};