const Discord = require('discord.js')
var request = require('request');

exports.run = async (client, message, args, level) => { 
  if(args.length < 1 || !args) {
    message.channel.sendEmbed(new Discord.RichEmbed()
      .addField('Error!', `Give me someone to insult!`)
      .setColor(0xff5454)
    );
    return;
  }
  request('https://insult.mattbas.org/api/insult.json?who=' + args.join(' '), function(err, resp, body) {
    let json = JSON.parse(body);
    let insult = json.insult;
    message.channel.send(insult)
  })
};
  
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};
  
exports.help = {
    name: "insult",
    category: "Fun",
    description: "Insults the person >:D",
    furtherDescription: "I insult the mentioned person >:D",
    usage: "insult [person]"
};