const Discord = require('discord.js')
var request = require('superagent')

exports.run = async (client, message, args, level) => { 
    request.get('http://api.yomomma.info/')
    .end((err, res) => {
      if (!err && res.status === 200) {
        try {
          JSON.parse(res.text)
        } catch (e) {
          message.channel.sendMessage('The API didn\'t respond...')
          return
        }
        var joke = JSON.parse(res.text)
        message.channel.sendMessage(joke.joke)
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
    name: "yomama",
    category: "Fun",
    description: "Gets a random yomama joke",
    usage: "yomama"
};