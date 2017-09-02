exports.run = async (client, message, args) => {
    if(args.length < 1) {
        message.channel.sendEmbed(new Discord.RichEmbed()
            .addField('Error!', `Please give me an string to reverse!`)
            .setColor(0xff5454)
        );
        return;
    }
    let reverse = args.join(' ').split('').reverse().join('');
    message.channel.send(reverse);
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
  };
  
  exports.help = {
    name: "reverse",
    category: "Fun",
    description: "Reverses the given string",
    furtherDescription: "Reverses the string that you input!",
    usage: "reverse [string]"
  };