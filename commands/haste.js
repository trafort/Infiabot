const hastebin = require('hastebin-gen');

exports.run = (client, msg, args) => {
        let haste = args.slice(1).join(" ")
        let type = args[0]
        if (!args[0]) { 
            return console.log('err');
        }
        hastebin(haste, type).then(r => {
            msg.channel.sendEmbed(new Discord.RichEmbed()
                .addField(':white_check_mark: Posted text to Hastebin at this URL:', `${r}`)
                .setColor(0x5697ff)
            );
        }).catch(console.error);
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['hastebin'],
    permLevel: 0
  };
  
  exports.help = {
    name: "haste",
    category: "Utility",
    description: "Posts code to Hastebin",
    usage: "hastebin [language] [code]"
  };