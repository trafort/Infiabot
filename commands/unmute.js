const Discord = require('discord.js')
const client = new Discord.Client();

exports.run = async (client, message, args, level) => { 
    const settings = message.guild ? client.settings.get(message.guild.id) : client.config.defaultSettings;
    let modlog = message.guild.channels.find("name", settings.modLogChannel);
    let reason = args.slice(1).join(' ')
    let toMute = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
    if(!toMute) {
        message.channel.sendEmbed(new Discord.RichEmbed()
            .addField('Error!', `Please Mention an user to mute!`)
            .setColor(0xff5454)
        );
        return;
    }
    if(!modlog) {
        message.channel.sendEmbed(new Discord.RichEmbed()
          .addField('Error!', `No mod-log channel named ${settings.modLogChannel} was found! do ${settings.prefix}set edit modLogChannel [channel name] to set it!`)
          .setColor(0xff5454)
        );
        return;
    }
    if(!message.guild.member(client.user).hasPermission("MANAGE_ROLES_OR_PERMISSIONS") || !message.guild.member(client.user).hasPermission("ADMINISTRATOR") ) {
        message.channel.sendEmbed(new Discord.RichEmbed()
            .addField('Error!', `I do not have the permissions to do this!`)
            .setColor(0xff5454)
        );
        return;
    }

    let role = message.guild.roles.find(r => r.name === "IB Muted")

    if(!toMute.roles.has(role.id)) {
        message.channel.sendEmbed(new Discord.RichEmbed()
            .addField('Error!', `This user is not muted!`)
            .setColor(0xff5454)
        );
        return;
    }

    await toMute.removeRole(role);

    message.channel.sendEmbed(new Discord.RichEmbed()
        .addField('Success!', `${toMute.user.tag} has been unmuted!`)
        .setColor(0x5697ff)
    );

    modlog.sendEmbed(new Discord.RichEmbed()
        .setAuthor('Mod-log entry | Unmute', message.author.avatarURL)
        .setThumbnail(toMute.user.avatarURL)
        .addField('User:', `${toMute.user.tag}`, true)
        .addField('Moderator:', `${message.author.tag}`, true)
        .setTimestamp()
        .setFooter(`User ID: ${toMute.user.id}`)
        .setColor(0x54ff54)
    );
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: 2
  };
  
  exports.help = {
    name: 'unmute',
    description: 'Unmutes the mentioned member',
    furtherDescription: "I'll Unmute the given person!",
    usage: 'unmute [mention]',
    category: 'Moderation'
  };