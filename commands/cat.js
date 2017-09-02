const Discord = require('discord.js')
var request = require('superagent')

exports.run = async (client, message, args, level) => { 
    request.get('http://random.cat/meow')
    .end((err, res) => {
      if (!err && res.status === 200) {
        message.channel.sendEmbed(new Discord.RichEmbed()
          .setImage(res.body.file)
          .setColor(0x5697ff)
        );
      } else {
        Logger.error(`Got an error: ${err}, status code: ${res.status}`)
      }
    })
};
  
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};
  
exports.help = {
    name: "cat",
    category: "Fun",
    description: "Returns a random cat!",
    furtherDescription: "I'll return a random cat from http://random.cat/meow",
    usage: "cat"
};