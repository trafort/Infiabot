const Discord = require("discord.js")
const fs = require('fs')
var f = fs.readFileSync('./data-/respects.txt')

exports.run = async(client, message, args, level) => {
  f += 1
  console.log(f.length)
  fs.writeFileSync('./data-/respects.txt', f)
  message.channel.sendEmbed(new Discord.RichEmbed()
    .addField(':pray: You have paid respects to the mighty InfiniBot', `${f.length} respects have been paid so far`)
    .setColor(0x5697ff)
  );
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "f",
  category: "Fun",
  description: "Press f to pay respects",
  furtherDescription: "Respect me >:D",
  usage: "f"
};