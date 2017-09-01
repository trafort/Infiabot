Discord = require("discord.js")
var Pokedex = require('pokedex-promise-v2');
var P = new Pokedex();

exports.run = async (client, message, args, level) => { 
    P.getPokemonByName(args.join(' ')) 
        .then(function(response) {
            //abilities
            let abilities = [];
            for(i in response.abilities) { abilities.push(response.abilities[i].ability.name) }
            abilitiesString = abilities.join(', ')
            //types
            let types = [];
            for(i in response.types) {
              types.push(response.types[i].type.name)
            }
            let typesString = types.join(', ')
            //moves
            let moves = [];
            for(i in response.moves) {
              if(i < 20)
                  moves.push(response.moves[i].move.name);
            }
            let movesString = moves.join(', ')
            
            message.channel.sendEmbed(new Discord.RichEmbed()
              .setTitle(`Info about ${response.name}`)
              .addField(`Species:`, `${response.species.name}`, true)
              .addField(`Height:`, `${response.height}`, true)
              .addField(`Weight:`, `${response.weight}`, true)
              .addField(`ID:`, `${response.id}`, true)
              .addField(`Type(s):`, `${typesString}`, true)
              .addField(`Move(s) (Top 20):`, `${movesString}`, true)
              .addField(`Abilitie(s):`, `${abilitiesString}`, true)
              .setThumbnail(response.sprites.front_default)
              .setColor(0x5697ff)
            );
    })
    .catch(function(error) {
      message.channel.sendEmbed(new Discord.RichEmbed()
        .addField('Error!', `There was an error! Please make sure that you're inputting an valid pokemon`)
        .setColor(0xff5454)
      );
    });
}


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['pokemon'],
  permLevel: 0
};

exports.help = {
  name: "pokedex",
  category: "Fun",
  description: "Returns info about a pokemon",
  usage: "pokedex [pokemon/id]"
};
