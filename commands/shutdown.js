
exports.run = async (client, message, args, level) => { 
    try {
      const commandUnloads = client.commands.filter(c => !!c.db).array();
      for (const c of commandUnloads) {
        await c.db.close();
      }
      await message.channel.send('Shutting down...');
      await client.destroy();
      process.exit();
    } catch (e) {
      console.log(e);
    }
  };
  
  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['restart', 'kys'],
    permLevel: 10
  };
  
  exports.help = {
    name: 'shutdown',
    description: 'This shuts down the bot.',
    furtherDescription: "Noooooo don't kill me D:",
    usage: 'shutdown',
    category: 'System',
  };