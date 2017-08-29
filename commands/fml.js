const request = require('snekfetch');
const HTMLParser = require('fast-html-parser');
const {RichEmbed} = require('discord.js');

exports.run = async (client, message, args, level) => { 
    if(message.deletable)
        message.delete
    const msg = await message.channel.send('Fetching story...');
    const res = await request.get('http://www.fmylife.com/random');
    const root = HTMLParser.parse(res.text);
    const article = root.querySelector('.block a');
    const downdoot = root.querySelector('.vote-down');
    const updoot = root.querySelector('.vote-up');
    const embed = new RichEmbed()
        .setTitle(`F*ck My Life...\n`)
        .setColor(0x32AAE1)
        .setDescription(`\n${article.childNodes[0].text}\n`)
        .addField('I agree, your life sucks:', updoot.childNodes[0].text, true)
        .addField('You deserved it:', downdoot.childNodes[0].text, true);
    if (article.childNodes[0].text.length < 5 ) {
        return msg.edit('Something went wrong, so you\'ll have to try again in a few moments. FML');
    }
    return msg.edit({embed});
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['fuckmylife', 'fmylife'],
  permLevel: 0
};

exports.help = {
  name: 'fml',
  description: 'Grabs a random "fml" story.',
  usage: 'fml',
  category: 'Fun',
};