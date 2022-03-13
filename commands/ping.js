module.exports = {
	name: 'ping',
	description: 'Sprawdź ping bota',
	async execute(client, message, args) {
        message.channel.send(`🏓Latency is ${Date.now() - message.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`);
}
}