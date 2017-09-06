var StatsD = require('node-dogstatsd').StatsD;
var dogstatsd = new StatsD();

dogstatsd.increment(1)

if (process.version.slice(1).split(".")[0] < 8) throw new Error("Node 8.0.0 or higher is required. Update Node on your system.");

const Discord = require("discord.js");
const fs = require('fs')

const { promisify } = require("util");
const readdir = promisify(require("fs").readdir);
const PersistentCollection = require("djs-collection-persistent");

class InfiniBot extends Discord.Client {
  constructor(options) {
    super(options);

    this.config = require("./config.json");

    this.commands = new Discord.Collection();
    this.aliases = new Discord.Collection();

    this.settings = new PersistentCollection({name: "settings"});
    this.infinicoins = new PersistentCollection({name: "infinicoins"});
  }
}

const client = new InfiniBot();

require("./modules/functions.js")(client);

const init = async () => {

  const cmdFiles = await readdir("./commands/");
  client.log("log", `Loading a total of ${cmdFiles.length} commands.`);
  cmdFiles.forEach(f => {
    try {
      const props = require(`./commands/${f}`);
      if (f.split(".").slice(-1)[0] !== "js") return;
      client.log("log", `Loading Command: ${props.help.name}. 👌`);
      client.commands.set(props.help.name, props);
      props.conf.aliases.forEach(alias => {
        client.aliases.set(alias, props.help.name);
      });
    } catch (e) {
      client.log(`Unable to load command ${f}: ${e.stack}`);
    }
  });

  const evtFiles = await readdir("./events/");
  client.log("log", `Loading a total of ${evtFiles.length} events.`);
  evtFiles.forEach(file => {
    const eventName = file.split(".")[0];
    const event = require(`./events/${file}`);
    client.on(eventName, event.bind(null, client));
    delete require.cache[require.resolve(`./events/${file}`)];
  });

  client.login(client.config.token);

};

init();

process.on('unhandledRejection', error => {
  console.error(`Uncaught Promise Error: \n${error.stack}`);
});