const Discord = require('discord.js')
const math = require('mathjs');

exports.run = async (client, message, args) => {
    var result
    let args2 = message.content.split(" ").slice(1).join(" ");
    
    try {
            result = math.eval(args2)
        } catch (error) {
            console.log('Failed math calculation ' + args2 + '\nError: ' + error.stack)
            message.channel.sendEmbed(new Discord.RichEmbed()
                .addField('Error!', `Failed Calculation`)
                .setColor(0xff5454)
            );
            return;
            
        } finally {
            if (isNaN(parseFloat(result))) {
            message.channel.sendEmbed(new Discord.RichEmbed()
                .addField('Error!', `Calculation Error`)
                .setColor(0xff5454)
            );
            return;
        } else {
            message.channel.sendEmbed(new Discord.RichEmbed()
                .addField('Input:', `\`\`\`${args2}\`\`\``)
                .addField('Answer:', `\`\`\`${result}\`\`\``)
                .setColor(0x5697ff)
            );
            }
        }
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['solve'],
    permLevel: 0
  };
  
  exports.help = {
    name: "math",
    category: "Utility",
    description: "Solves a simple maths equation",
    furtherDescription: "I solve any simple maths equasion!",
    usage: "maths [expression]"
  };