const hastebin = require('hastebin-gen');

exports.run = async(client, message, args, level) => {
  const code = args.join(" ");
  try {
    const evaled = eval(code);
    const clean = await client.clean(client, evaled);
    if (clean.length > 1024) {
      hastebin(clean, 'txt').then(link => {
        message.channel.sendEmbed(new Discord.RichEmbed()
          .addField('Input:', `\`\`\`js\n${code}\n\`\`\``)
          .addField('Output:', `\`\`\`The output was too long, so I've posted it to hastebin: ${link}\`\`\``)
          .setColor(0x5697ff)
        );
      }).catch(console.error);
      return;
    }
    await message.channel.sendEmbed(new Discord.RichEmbed()
      .addField('Input:', `\`\`\`js\n${code}\n\`\`\``)
      .addField('Output:', `\`\`\`js\n${clean}\n\`\`\``)
      .setColor(0x5697ff)
    );
  } catch (err) {
    let errClean = await client.clean(client, err)
    if (errClean.length > 1024) {
      hastebin(errClean, 'txt').then(link => {
        message.channel.sendEmbed(new Discord.RichEmbed()
          .addField('Input:', `\`\`\`js\n${code}\n\`\`\``)
          .addField('Output:', `\`\`\`The output was too long, so I've posted it to hastebin: ${link}\`\`\``)
          .setColor(0x5697ff)
        );
      }).catch(console.error);
      return;
    }
    await message.channel.sendEmbed(new Discord.RichEmbed()
      .addField('Input:', `\`\`\`js\n${code}\n\`\`\``)
      .addField('Error!', `\`\`\`xl\n${errClean}\n\`\`\``)
      .setColor(0x5697ff)
    );
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 10
};

exports.help = {
  name: "eval",
  category: "System",
  description: "Evaluates arbitrary javascript.",
  furtherDescription: "I'll evaluate basic javascript and discord.js stuff",
  usage: "eval [code]"
};