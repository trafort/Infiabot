const Discord = require('discord.js')
var request = require('request');

exports.run = async (client, message, args, level) => { 
    if(!args) {
        message.channel.send('61v3 m3 50m37h1n6 70 c0nv3r7!')
    }
    let text = args.join(" ")
    var leetspeak = require('leetspeak')
    let converted = leetspeak(text)
    message.channel.send(`\`\`\`${converted}\`\`\``)
};
  
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};
  
exports.help = {
    name: "leetspeak",
    category: "Fun",
    description: "c0nv3r75 y0ur 73x7 70 l3375p3@k",
    furtherDescription: "I convert your message into leetspeak!",
    usage: "leetspeak [text]"
};