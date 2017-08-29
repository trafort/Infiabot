const Discord = require('discord.js')
const weather = require('weather-js');

exports.run = async (client, message, args, level) => { 
    let args2 = args.join(' ')
    weather.find({search: args2, degreeType: 'C'}, function(err, result) {
        if(err) {
            console.log(err);
            message.channel.sendEmbed(new Discord.RichEmbed()
                .addField('Error!', `An error has occured`)
                .setColor(0xff5454)
            );
            return;
        }

        if(!result[0]) {
            message.channel.sendEmbed(new Discord.RichEmbed()
                .addField('Error!', `That doesn't seem to be an valid location...`)
                .setColor(0xff5454)
            );
            return;
        }
       
        let date = result[0].current.date.split('-')
        message.channel.sendEmbed(new Discord.RichEmbed()
            .setTitle(`Weather for ${result[0].location.name} at ${result[0].current.shortday}, ${date[2]}/${date[1]}/${date[0]}, ${result[0].current.observationtime}`)
            .addField('Temperature:', `${result[0].current.temperature}°C`, true)
            .addField('Humidity', `${result[0].current.humidity}%`, true)
            .addField('Wind:', `${result[0].current.windspeed}`, true)
            .setThumbnail(result[0].current.imageUrl)
            .setColor(0x5697ff)
        );
    });
};
  
  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
  };
  
  exports.help = {
    name: "weather",
    category: "Utility",
    description: "Displays Weather for imputed location",
    usage: "weather [location]"
  };