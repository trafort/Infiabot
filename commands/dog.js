const Discord = require('discord.js')
var request = require('superagent')

exports.run = async (client, message, args, level) => { 
  request.get('https://random.dog/woof.json')
  .end((err, res) => {
    if (!err && res.status === 200) {
      message.channel.send(res.body.url)
    } else {
      Logger.error(`Got an error: ${err}, status code: ${res.status}`)
    }
  })
};
  
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['doggo'],
    permLevel: 0
};
  
exports.help = {
    name: "dog",
    category: "Fun",
    description: "Returns a random doggo!",
    usage: "dog"
};