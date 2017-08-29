const Discord = require('discord.js')
const giphy = require('giphy-api')('471ca289867340a9974b3254559f18ed');
const fs = require('fs');
const client = new Discord.Client();

exports.run = async (client, message, args, level) => { 
    const settings = message.guild ? client.settings.get(message.guild.id) : client.config.defaultSettings;
    if(args.length != 2) {
        message.channel.sendEmbed(new Discord.RichEmbed()
            .addField('Syntax Error!', `${settings.prefix}gif <Search Term> <Result Num>`)
            .setColor(0xff5454)
        );
        return;
    }
    if(isNaN(args[1])) {
        message.channel.sendEmbed(new Discord.RichEmbed()
            .addField('Error!', `Please enter a number for the result number`)
            .setColor(0xff5454)
        );
        return;
    }

    let num = parseInt(args[1])
    num -= 1
    if(num > 9 || num < 0) {
        message.channel.sendEmbed(new Discord.RichEmbed()
            .addField('Error!', `The result number must be between 1 and 10`)
            .setColor(0xff5454)
        );
        return;
    }

    giphy.search(args[0], function (err, res) {
        message.channel.send(`${res.data[num].url}`)
    });
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: 0
  };
  
  exports.help = {
    name: 'gif',
    description: 'Returns An gif from giphy',
    usage: 'gif [search term] [search result]',
    category: 'Fun',
  };