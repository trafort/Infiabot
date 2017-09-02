exports.run = async (client, message, args, level) => { 
  const code = args.join(" ");
  try {
    const evaled = eval(code);
    const clean = await client.clean(client, evaled);
    await message.channel.sendEmbed(new Discord.RichEmbed()
      .addField('Input:', `\`\`\`js\n${code}\n\`\`\``)
      .addField('Output:', `\`\`\`js\n${clean}\n\`\`\``)
      .setColor(0x5697ff)
    );
  } catch (err) {
      await message.channel.sendEmbed(new Discord.RichEmbed()
        .addField('Input:', `\`\`\`js\n${code}\n\`\`\``)
        .addField('Error!', `\`\`\`xl\n${await client.clean(client, err)}\n\`\`\``)
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
