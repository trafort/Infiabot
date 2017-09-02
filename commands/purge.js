const Discord = require('discord.js')

exports.run = async (client, message, args) => {
    let deletePerms = message.guild.member(client.user).hasPermission('MANAGE_MESSAGES');
    let amount = args[0];
    if(!deletePerms) {
        message.channel.sendEmbed(new Discord.RichEmbed()
            .addField('Error!', `I do not have the permissions to do this!`)
            .setColor(0xff5454)
        );
        if(message.deletable) 
            message.delete()
        return;
    }
    if(isNaN(amount)) {
        message.channel.sendEmbed(new Discord.RichEmbed()
            .addField('Error!', `Please enter a number!`)
            .setColor(0xff5454)
        );
        if(message.deletable) 
            message.delete()
        return;
    }
    amount = parseInt(amount);
    if(amount < 2) {
        message.channel.sendEmbed(new Discord.RichEmbed()
            .addField('Error!', `The minimum amount of messages that can be deleted is 2!`)
            .setColor(0xff5454)
        );
        if(message.deletable) 
            message.delete()
        return;
    }
    if(amount > 100) {
        message.channel.sendEmbed(new Discord.RichEmbed()
            .addField('Error!', `The maximum amount of messages that can be deleted is 100!`)
            .setColor(0xff5454)
        );
        if(message.deletable) 
            message.delete()
        return;
    }
    if(message.deletable) 
        message.delete()
    message.channel.fetchMessages({ limit: amount }).then(deleteMsgs => {
        message.channel.bulkDelete(deleteMsgs)
        message.channel.sendEmbed(new Discord.RichEmbed()
            .addField('Success!', `${args[0]} messages have been deleted!`)
            .setColor(0x5697ff)
        ); 
    });
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['clear', 'clean', 'delete'],
    permLevel: 2
  };
  
exports.help = {
    name: "purge",
    category: "Moderation",
    description: "Deletes the given ammount of messages",
    furtherDescription: "I delete the given amount of messages and log it to the modlog channel",
    usage: "purge [amount]"
};