const Discord = require('discord.js')
var Jimp = require("jimp");

exports.run = async (client, message, args, level) => { 
    if(message.mentions.users.size < 1) {
        Jimp.read(message.author.avatarURL, function (err, image) {
            if(err) { console.log(err.stack) }
            image.invert()
            image.getBuffer(Jimp.MIME_PNG, function (err, image) { message.channel.send({files:[{attachment:image,name:"file.png"}]}) })
        });
    } else if (message.mentions.users.size > 1) {
        message.channel.sendEmbed(new Discord.RichEmbed()
            .addField('Error!', `Please mention a single user!`)
            .setColor(0xff5454)
        );
        return;
    } else {
        let mention = message.guild.member(message.mentions.users.first());
        Jimp.read(mention.user.avatarURL, function (err, image) {
            if(err) { console.log(err.stack) }
            image.invert()
            image.getBuffer(Jimp.MIME_PNG, function (err, image) { message.channel.send({files:[{attachment:image,name:"file.png"}]}) })
        });
    }
};
  
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: 0
};
  
exports.help = {
    name: "inverse",
    category: "Image",
    description: "Inverses a person's avatar",
    furtherDescription: "I inverse the mentioned person's avatar! If no mention is provided, I'll inverse your avatar.",
    usage: "inverse [@user]"
};