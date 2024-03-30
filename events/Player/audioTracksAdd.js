const { EmbedBuilder } = require('discord.js');

module.exports = (queue) => {
    if (!client.config.app.ExtraMessages) return

    const audioTracksAdd = new EmbedBuilder()
    .setAuthor({name: `Todas as músicas da playlist adicionadas à fila ✅`})
    .setColor('#2f3136')

queue.metadata.send({ embeds: [audioTracksAdd] })

}
