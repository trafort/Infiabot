const Discord = require('discord.js')
const fs = require('fs');

exports.run = async (client, message, args) => {

    let command;
    if (client.commands.has(args[0])) {
      command = client.commands.get(args[0]);
    } else if (client.aliases.has(args[0])) {
      command = client.commands.get(client.aliases.get(args[0]));
    }
    if (!command) {
        message.channel.sendEmbed(new Discord.RichEmbed()
            .addField('Error!', `The command \`${args[0]}\` doesn't seem to exist...`)
            .setColor(0xff5454)
        );
        return;
    } 

    command = command.help.name;

    let body = fs.readFileSync(`./commands/${command}.js`)

    if(body.length < 2000) {
        message.channel.send(`\`\`\`js\n${body}\n\`\`\``)
    } else {
        message.channel.send({ files: [`./commands/${command}.js`] });
    }
  };
  
  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 10
  };
  
  exports.help = {
    name: "sendcode",
    category: "System",
    description: "Sends the code of the command",
    usage: "sendcode [command]"
  };