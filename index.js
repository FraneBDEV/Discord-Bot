const { Client, Intents, Collection, MessageEmbed } = require('discord.js');
const fs = require('fs')
const client = new Client({ intents: 32767, });
client.login("token");
const prefix = '.'

client.commands = new Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log(`Zalogowano jako ${client.user.tag}`)
}) 

client.on('messageCreate', async message => {
	if(message.author.bot) return
	if(message.author.id === client.user.id) return
    if (!message.content.startsWith(prefix)) return;
	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();	
	if (!client.commands.has(command)) return;
	try {
		client.commands.get(command).execute(client, message, args, prefix, fs);
	} catch (error) {
        console.log(error)
		message.reply('Nie udało mi się wywołać tej komendy.');
	}


});