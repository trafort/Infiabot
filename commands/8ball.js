const Discord = require('discord.js')
var request = require('request');

exports.run = async (client, message, args, level) => { 
    request('https://8ball.delegator.com/magic/JSON/test', function(err, resp, body) {
        let data = JSON.parse(body)
        let awn = data['magic'].answer
        let type = data['magic'].type
        function emoji(data) {
            if(type === 'Affirmative') {
                return ':ok_hand:'
            }
            if(type === 'Neutral') {
                return ':thinking:'
            }
            if(type === 'Contrary') {
                return ':no_entry_sign:'
            }
        }

        message.channel.sendEmbed(new Discord.RichEmbed()
            .addField(':crystal_ball: 8ball', `${awn} ${emoji(type)}`)
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
    name: "8ball",
    category: "Fun",
    description: "Ask the magical 8ball any question...",
    usage: "8ball [question]"
};