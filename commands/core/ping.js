const ms = require('ms');

module.exports = {
    name: 'ping',
    description: "Obtenha o ping do bot!",
    async execute({ client, inter }) {

        const m = await inter.editReply("Ping?")
        inter.editReply(`Pong! Latência: ${Math.round(client.ws.ping)}ms 🛰️, Ultima latência calculada:  ${ms(Date.now() - client.ws.shards.first().lastPingTimestamp, { long: true })} atrás.`)

    },
};