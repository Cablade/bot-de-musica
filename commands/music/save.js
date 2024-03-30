const { EmbedBuilder } = require("discord.js");
const { useMainPlayer, useQueue  } = require('discord-player');

module.exports = {
    name: 'save',
    description: 'salve a música atual!',
    voiceChannel: true,

    async execute({ inter }) {
        const player = useMainPlayer()

        const queue = useQueue(inter.guild);

        if (!queue) return inter.editReply({ content: `Não há música tocando no momento ${inter.member}... tentar novamente? ❌`, ephemeral: true });

        inter.member.send({
            embeds: [
                new EmbedBuilder()
                    .setColor('#2f3136')
                    .setTitle(`:arrow_forward: ${queue.currentTrack.title}`)
                    .setURL(queue.currentTrack.url)
                    .addFields(
                        { name: ':hourglass: Duração:', value: `\`${queue.currentTrack.duration}\``, inline: true },
                        { name: 'Música por:', value: `\`${queue.currentTrack.author}\``, inline: true },
                        { name: 'Visualizações :eyes:', value: `\`${Number(queue.currentTrack.views).toLocaleString()}\``, inline: true },
                        { name: 'URL da música:', value: `\`${queue.currentTrack.url}\`` }
                    )
                    .setThumbnail(queue.currentTrack.thumbnail)
                    .setFooter({text:`do servidor ${inter.member.guild.name}`, iconURL: inter.member.guild.iconURL({ dynamic: false })})
            ]
        }).then(() => {
            return inter.editReply({ content: `Enviei o título da música por mensagens privadas ✅`, ephemeral: true });
        }).catch(error => {
            return inter.editReply({ content: `Não consigo enviar uma mensagem privada... tentar novamente? ❌`, ephemeral: true });
        });
    },
};