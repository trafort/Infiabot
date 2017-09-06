module.exports = (client, guild) => {
  client.settings.delete(guild.id);

  let channel = client.channels.get('353769372722003968')

  client.user.setPresence({ game: { name: `with ${client.users.size} users | i.help`, type: 0 } });
  
    channel.sendEmbed(new Discord.RichEmbed()
      .setAuthor('Client-log entry | Guild Leave', guild.iconURL)
      .setThumbnail(guild.iconURL)
      .addField('Guild:', `${guild.name}`, true)
      .addField('Owner:', `${guild.owner} (${guild.ownerID})`, true)
      .setTimestamp()
      .setFooter(`Guild ID: ${guild.id}`)
      .setColor(0xff4c4c)
    )
};
