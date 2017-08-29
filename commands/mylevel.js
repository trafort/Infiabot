exports.run = async (client, message, args, level) => {
  await message.channel.sendEmbed(new Discord.RichEmbed()
    .addField('Level:', `Your permission level is: ${level}`)
    .setColor(0x5697ff)
  );
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "mylevel",
  category: "Miscelaneous",
  description: "Tells you your permission level for the current guild.",
  usage: "mylevel"
};
