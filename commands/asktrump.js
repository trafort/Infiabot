Discord = require("discord.js")

exports.run = async (client, message, args, level) => { 
    var trump = require('react-trump');
    let question = args.join(' ')
    var exclamationPoints = 2; 
    var includeQuestion = false;
    var answer = trump.answer({ question, exclamationPoints, includeQuestion });
    message.channel.send(answer)
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "asktrump",
  category: "Fun",
  description: "Ask trump an question!",
  furtherDescription: "Ask trump anything and he will respond!",
  usage: "asktrump [question]"
};
