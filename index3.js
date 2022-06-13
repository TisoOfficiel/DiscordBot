const Discord = require("discord.js");
const dotenv = require('dotenv');
const path = require('node:path');
dotenv.config();
const { readdirSync } = require("fs");
const client = new Discord.Client({
    intents:[
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MESSAGES,
        Discord.Intents.FLAGS.DIRECT_MESSAGES,
        Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS
        
    ],
    partials: ['MESSAGE','CHANNEL','REACTION']

});

    
const fs= require("fs");
const prefix = "!";
client.commands = new Discord.Collection();

const commands = readdirSync("./commands").filter(file => file.endsWith(".js"))

for( file of commands){
    const commandName = file.split('.')[0]
    const command = require(`./commands/${commandName}`)
    client.commands.set(commandName, command)
}


client.on('messageCreate', message =>{
    if(!message.content.startsWith(prefix) || message.author.bot)return;
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    const command =  client.commands.get(commandName)
    if(!command)return;
    
    command.run(client,message, args);
})


client.on('messageCreate', message =>{
    if(!message.content.startsWith(prefix) || message.author.bot)return;
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    const command =  client.commands.get(commandName)
    if(!command)return;
    
    command.run(client,message, args);
})


const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
   
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

client.login(process.env.DISCORD_TOKEN);
