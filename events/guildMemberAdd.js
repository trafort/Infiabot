module.exports = (client, member) => {

  const settings = client.settings.get(member.guild.id);

  let modlog = member.guild.channels.find("name", settings.modLogChannel);

  modlog.sendEmbed(new Discord.RichEmbed()
    .setAuthor('Mod-log entry | User Join', member.user.avatarURL)
    .setThumbnail(member.user.avatarURL)
    .addField('User:', `${member.user.tag}`, true)
    .setTimestamp()
    .setFooter(`User ID: ${member.user.id}`)
    .setColor(0x42f4cb)
  );

  if (settings.welcomeEnabled === "false") return;

  const welcomeMessage = settings.welcomeMessage.replace("{{user}}", member.user.tag);

  member.client.channels.find('name', settings.welcomeChannel).send(welcomeMessage).catch(console.error);
};
