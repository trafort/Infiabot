const Discord = require('discord.js')
const request = require('request')

exports.run = async (client, message, args, level) => { 

    let name = args[0]
    let url = 'http://belikebill.azurewebsites.net/billgen-API.php?default=1&name=' + name
    if(args.length < 1) 
        url = 'http://belikebill.azurewebsites.net/billgen-API.php?default=1&name=bill'
    message.channel.sendEmbed(new Discord.RichEmbed()
        .setImage(url)
        .setColor(0x5697ff)
    ); 
};
  
  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['belikebill'],
    permLevel: 0
  };
  
  exports.help = {
    name: 'bill',
    category: "Fun",
    description: "Be like bill",
    furtherDescription: "Returns an random 'be like bill' meme. If you supply a name I'll use that instead of 'bill'",
    usage: "bill [name]"
  };