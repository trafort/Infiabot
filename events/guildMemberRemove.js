module.exports = (client, member) => {
    const settings = client.settings.get(member.guild.id);

    let modlog = member.guild.channels.find("name", settings.modLogChannel);

    if(!modlog) return;

    client.user.setPresence({ game: { name: `with ${client.users.size} users | i.help`, type: 0 } });
    
    modlog.sendEmbed(new Discord.RichEmbed()
      .setAuthor('Mod-log entry | User Leave', member.user.avatarURL)
      .setThumbnail(member.user.avatarURL)
      .addField('User:', `${member.user.tag}`, true)
      .setTimestamp()
      .setFooter(`User ID: ${member.user.id}`)
      .setColor(0xff2d2d)
    );
}