const Discord = require('discord.js')
const client = new Discord.Client();
const moment = require("moment");
require("moment-duration-format");

exports.run = async (client, message, args, level) => { 
    let guild = message.guild;
    let members = guild.members;
    let roles = guild.roles;
    let onlineMembers = 0;
    let rolesPrint = '';
    //const duration = moment.duration(guild.created).format(" D [days], H [hrs], m [mins], s [secs], ms [ms]");
    members.forEach(m => {
        if(m.presence.status === 'online' || m.presence.status === 'idle' || m.presence.status === 'dnd') {
            onlineMembers++
        }
    });

    roles.forEach(r => {
        rolesPrint += `${r.name}, `;
    })

    message.channel.sendEmbed(new Discord.RichEmbed()
        .setAuthor(`${guild.name}`, guild.iconURL)
        .setDescription(`Since ${guild.createdAt}.`)
        .addField('Members', `${onlineMembers}/${guild.memberCount}`, true)
        .addField('Channels', `${guild.channels.size}`, true)
        .addField('Owner', `${guild.owner.user.tag}`, true)
        .addField('Region', `${guild.region.toProperCase()}`, true)
        .addField('Roles:', `${rolesPrint}`, true)
        .setThumbnail(`${guild.iconURL}`)
        .setColor(0x5697ff)
    );
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: 0
  };
  
  exports.help = {
    name: 'serverinfo',
    description: 'Returns some info about this guild',
    furtherDescription: "I'll return some information about this guild in a nice embed!",
    usage: 'serverinfo',
    category: 'Miscelaneous',
  };