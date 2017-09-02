Discord = require("discord.js")

exports.run = async (client, message, args, level) => { 
  const msg = await message.channel.send("Pinging...");
  embed = (new Discord.RichEmbed()
    .addField('Pong!', `Latency is ${msg.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`)
    .setColor(0x5697ff)
  );
  msg.edit({embed});
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "ping",
  category: "Miscelaneous",
  description: "Pong! Checks delay time.",
  furtherDescription: "pONG! Useful for checking delay time and seeing if the bot is dead.",
  usage: "ping"
};
