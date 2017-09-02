const Discord = require('discord.js')
const imdb = require('imdb');
const nameToImdb = require("name-to-imdb");

exports.run = async (client, message, args, level) => { 
  let args2 = args.join(' ')
  let msg = await message.channel.send('Grabbing info...')
  nameToImdb({ name: args2 }, function(err, res, inf) { 
    let name = res
    if(err) {
        message.channel.sendEmbed(new Discord.RichEmbed()
            .addField('Error!', `Please make sure the search term is correct!`)
            .setColor(0xff5454)
        );
        return;
    }
    imdb(name, function(err, data) {
        if(err || !data.title) {
            message.channel.sendEmbed(new Discord.RichEmbed()
                .addField('Error!', `An error occured`)
                .setColor(0xff5454)
            );
            return;
        }
        if(data) {
          const embed = new Discord.RichEmbed()
            .setTitle(`Info for ${data.title}`)
            .addField('Year:', `${data.year}`, true)
            .addField('Rating:', `${data.contentRating}`, true)
            .addField('Length:', `${data.runtime}`, true)
            .addField('Description:', `${data.description}`, true)
            .addField('Rating:', `${data.rating}/10`, true)
            .addField('Genre(s):', `${data.genre.join(', ')}`, true)
            .addField('Director:', `${data.director}`, true)
            .addField('Metascore:', `${data.metascore}/100`, true)
            .addField('Writer:', `${data.writer}`, true)
            .setThumbnail(data.poster)
            .setColor(0x5697ff)
          msg.edit({embed});
        }
    });
});
};
  
  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
  };
  
  exports.help = {
    name: "imdb",
    category: "Utility",
    description: "Searches for an show/movie on imdb and returns that info",
    furtherDescription: "I search for an Movie/TV show on imdb and return the results in a nice embed",
    usage: "imbd [name]"
  };