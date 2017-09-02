const Discord = require('discord.js')
const client = new Discord.Client();

exports.run = async (client, message, args, level) => { 
    if(args.length < 1) {
        message.channel.sendEmbed(new Discord.RichEmbed()
            .addField('Error!', `Please give me a message to send to my master!`)
            .setColor(0xff5454)
        );
        return;
    }
    let feedback = args.join(' ')
    let master = client.users.get(client.config.ownerID);
    let author = `${message.author.tag}`
    const response = await client.awaitReply(message, `\`\`\`Are you sure you would like to send \n'${feedback}'? \nAny innapropriate/joke feedback will result in a ban from using the bot. \nReply wth yes to send.\`\`\``);
    if(response != 'yes')
        return message.channel.send('Canceled');
    master.send(`${author} sent the feedback of ${feedback}`)
    message.channel.sendEmbed(new Discord.RichEmbed()
        .addField('Success!', `\`${feedback}\` has been sent to my master!`)
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
    name: 'feedback',
    description: 'Sends feedback to the programmer of this bot',
    furtherDescription: "I'll send my master some feedback! Note: Any joke/innapropriate messages will result in an ban from the bot!",
    usage: 'feedback [feedback]',
    category: 'Miscelaneous',
  };