Discord = require("discord.js")
const { inspect } = require("util");

exports.run = async (client, message, [action, key, ...value], level) => { 

  const settings = client.settings.get(message.guild.id);

  console.log(settings)

  if (action === "edit") {
    if (!key) {
      await message.channel.sendEmbed(new Discord.RichEmbed()
        .addField('Error!', `Please specify a key to edit...`)
        .setColor(0xff5454)
      );
      return;
    }
    if (!settings[key]) {
      await message.channel.sendEmbed(new Discord.RichEmbed()
        .addField('Error!', `That key does not exist!`)
        .setColor(0xff5454)
      );
      return;
    }
    if (value.length < 1) {
      await message.channel.sendEmbed(new Discord.RichEmbed()
        .addField('Error!', `Please specify a new value`)
        .setColor(0xff5454)
      );
      return;
    }

    settings[key] = value.join(" ");

    client.settings.set(message.guild.id, settings);
     message.channel.sendEmbed(new Discord.RichEmbed()
      .addField('Success!', `${key} successfully edited to ${value.join(" ")}`)
      .setColor(0x5697ff)
    );
  } else
  if (action === "get") {
    if (!key) {
       message.channel.sendEmbed(new Discord.RichEmbed()
        .addField('Error!', `Please specify a key to view`)
        .setColor(0xff5454)
      );
      return;
    } 
    if (!settings[key]) {
      await message.channel.sendEmbed(new Discord.RichEmbed()
        .addField('Error!', `This key does not exist in the settings`)
        .setColor(0xff5454)
      )
    }
    message.reply(`The value of ${key} is currently ${settings[key]}`);
  } else {
    message.channel.send(inspect(settings), {code: "json"});
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["setting", "settings", "conf"],
  permLevel: 3
};

exports.help = {
  name: "set",
  category: "System",
  description: "View or change settings for your server.",
  usage: "set [view/get/edit] [key] [value]"
};
