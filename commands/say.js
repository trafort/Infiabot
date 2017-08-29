exports.run = (client, message, args) => {
    let msg = args.join(' ');
    message.channel.send(msg)
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
  };
  
  exports.help = {
    name: "say",
    category: "Fun",
    description: "I say whatever you want me to!",
    usage: "say [msg]"
  };