const client = new Discord.Client();

exports.run = async (client, message, args, level) => { 
    var write = 0;
    var urban = require('urban'),
        word = urban(args.join(' '));
    word.first(function(json) {
        if(json.definition.length < 1) return message.channel.send('Something went wrong...\n errcode: 0');
        if(!json.example) return message.channel.send('Something went wrong...\n errcode: 1');
        if(!json.author) return message.channel.send('Something went wrong...\n errcode: 2');
        if(!json.thumbs_up) return message.channel.send('Something went wrong...\nerr code: 3');
        if(!json.thumbs_down) return message.channel.send('Something went wrong...\nerr code: 4');
        message.channel.sendEmbed(new Discord.RichEmbed()
            .addField(`Definition of ${json.word}`, `${json.definition}`, true)
            .addField(`Example`, `${json.example}`, true)
            .addField(`Author`, `${json.author}`, true)
            .addField(`Rating`, `:thumbsup: ${json.thumbs_up} :thumbsdown: ${json.thumbs_down}`, true)
            .setColor(0x5697ff)
        );
    });
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: 0
  };
  
  exports.help = {
    name: 'urban',
    description: 'Searches urban dictionary for an word and returns the info',
    usage: 'urban [word]',
    category: 'Fun',
  };