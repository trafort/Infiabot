const snek = require('snekfetch')

module.exports = async client => {

  await client.wait(1000);

  client.user.setPresence({ game: { name: `with ${client.users.size} users | i.help`, type: 0 } });

  client.log("log", ` Ready to serve ${client.users.size} users in ${client.guilds.size} servers.`, "Ready!");


  snek.post(`https://list.passthemayo.space/api/bots/${client.user.id}/`)
    .set("Authorization", '31521f29b1e73b65fbbaa115a1bc36381c7e6607010bee28e2a326c0498ddc4fec148369005035cd0426f87391efe9f8156363cb7d12db9612bc31ee22a4cb5d') 
    .send({ server_count: client.guilds.size })
    .then(console.log(`[PASSTHEMAYO] Posted stats!`))
    .catch((err) => {
       console.log(`[error] [STATS] There was an error while making this process!\n${err.stack}`)
    })


  client.guilds.filter(g => !client.settings.has(g.id)).forEach(g => client.settings.set(g.id, client.config.defaultSettings));
};
