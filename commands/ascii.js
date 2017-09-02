const Discord = require("discord.js")
const figlet = require('figlet');

exports.run = async (client, message, args, level) => { 
  figlet(args.join(' '), function(err, data) {
    if (err) 
      return console.log(err.stack)
    if(data.length > 2000) {
      return message.channel.send('```The output was too long!```')
    }
    message.channel.send(`\`\`\`${data}\`\`\``)
  });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "ascii",
  category: "Fun",
  description: "Turns your text into ascii art!",
  furtherDescription: "I turn your input into ascii art!",
  usage: "ascii [text]"
};
