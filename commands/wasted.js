const Discord = require('discord.js')
var Jimp = require("jimp");

exports.run = async (client, message, args, level) => { 
    let msg = await message.channel.send('Generating...')
    if(message.mentions.users.size < 1) {
        Jimp.read(message.author.avatarURL).then(function (photo) {
            photo.resize(512, 512).grayscale().gaussian(2)
            Jimp.read('./img/wasted.png').then(function (lenna) {
                photo.composite(lenna,0,0)
                photo.getBuffer(Jimp.MIME_PNG, function (err, image) { 
                    msg.delete();
                    message.channel.send({files:[{attachment:image,name:"file.png"}]}) 
                })
            })
        })
    } else if (message.mentions.users.size > 1) {
        message.channel.sendEmbed(new Discord.RichEmbed()
            .addField('Error!', `Please mention a single user!`)
            .setColor(0xff5454)
        );
        return;
    } else {
        let mention = message.guild.member(message.mentions.users.first());
        Jimp.read(mention.user.avatarURL).then(function (photo) {
            photo.resize(512, 512).grayscale().gaussian(2)
            Jimp.read('./img/wasted.png').then(function (lenna) {
                photo.composite(lenna,0,0)
                photo.getBuffer(Jimp.MIME_PNG, function (err, image) { 
                    msg.delete();
                    message.channel.send({files:[{attachment:image,name:"file.png"}]}) 
                })
            })
        })
    }
};
  
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: 0
};
  
exports.help = {
    name: "wasted",
    category: "Image",
    description: "Wasted...",
    furtherDescription: "I put wasted over someone's avatar! If no mention is provided, I'll wasted-ify you!",
    usage: "wasted [@user]"
};