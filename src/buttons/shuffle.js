const { EmbedBuilder } = require('discord.js');
module.exports = async ({ client, inter, queue }) => { 
    if (!queue || !queue.isPlaying()) return inter.editReply({ content: `Nenhuma música sendo reproduzida no momento... tente novamente? ❌`, ephemeral: true });

    if (!queue.tracks.toArray()[0]) return inter.editReply({ content: `Nenhuma música na fila depois da atual ${inter.member}... tente novamente? ❌`, ephemeral: true });

        await queue.tracks.shuffle();

        const ShuffleEmbed = new EmbedBuilder()
        .setColor('#2f3136')
        .setAuthor({name: `Fila embaralhada  ${queue.tracks.size} música(s)! ✅` })


       return inter.editReply({ embeds: [ShuffleEmbed], ephemeral: true});
}