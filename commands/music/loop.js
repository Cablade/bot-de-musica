const { QueueRepeatMode, useMainPlayer, useQueue } = require('discord-player');
const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'loop',
    description: 'habilitar ou desabilitar a repetição de músicas ou da fila inteira',
    voiceChannel: true,
    options: [
        {
        name: 'ação',
        description: 'qual ação você deseja realizar no loop',
        type: ApplicationCommandOptionType.String,
        required: true,
        choices: [
            { name: 'Queue', value: 'enable_loop_queue' },
            { name: 'Disable', value: 'disable_loop'},
            { name: 'Song', value: 'enable_loop_song' },
            { name: 'autoplay', value: 'enable_autoplay' },
        ],
    }
    ],
    execute({ inter }) {
        const player = useMainPlayer()

        const queue = useQueue(inter.guild);
        let BaseEmbed = new EmbedBuilder()
        .setColor('#2f3136')

        if (!queue || !queue.isPlaying()) return inter.editReply({ content: `Não há música tocando no momento ${inter.member}... tentar novamente? ❌`, ephemeral: true });
        switch (inter.options._hoistedOptions.map(x => x.value).toString()) {
            case 'enable_loop_queue': {
                if (queue.repeatMode === QueueRepeatMode.TRACK) return inter.editReply({ content:`Você deve primeiro desabilitar a música atual no modo de loop (/loop Desabilitar) ${inter.member}... tentar novamente? ❌`, ephemeral: true });

                const success = queue.setRepeatMode(QueueRepeatMode.QUEUE);
                
                BaseEmbed.setAuthor({ name: success ? `Algo deu errado ${inter.member}... tentar novamente? ❌` : `Modo de repetição habilitado, toda a fila será repetida infinitamente 🔁` })

                return inter.editReply({ embeds: [BaseEmbed] });
                
            }
            case 'disable_loop': {
                if (queue.repeatMode === QueueRepeatMode.OFF) return inter.editReply({ content:`Você deve primeiro habilitar o modo de loop (/loop Fila ou /loop Música) ${inter.member}... tentar novamente? ❌`, ephemeral: true });
                
                const success = queue.setRepeatMode(QueueRepeatMode.OFF);

                BaseEmbed.setAuthor({ name: success ? `Algo deu errado ${inter.member}... tentar novamente? ❌` : `Modo de repetição desabilitado, a fila não será mais repetida 🔁`})

                return inter.editReply({ embeds: [BaseEmbed] });
                
            }
            case 'enable_loop_song': {
                if (queue.repeatMode === QueueRepeatMode.QUEUE) return inter.editReply({ content:`Você deve primeiro desabilitar a música atual no modo de loop (/loop Desabilitar) ${inter.member}... tentar novamente? ❌`, ephemeral: true });

                const success = queue.setRepeatMode(QueueRepeatMode.TRACK);

                BaseEmbed.setAuthor({ name: success ? `Algo deu errado ${inter.member}... tentar novamente? ❌` : `Modo de repetição habilitado, a música atual será repetida infinitamente (você pode terminar o loop com /loop desabilitar)` })

                return inter.editReply({ embeds: [BaseEmbed] });
                
            }
            case 'enable_autoplay': {
                if (queue.repeatMode === QueueRepeatMode.AUTOPLAY) return inter.editReply({ content:`Você deve primeiro desabilitar a música atual no modo de loop (/loop Desabilitar) ${inter.member}... tentar novamente? ❌`, ephemeral: true });

                const success = queue.setRepeatMode(QueueRepeatMode.AUTOPLAY);

                BaseEmbed.setAuthor({ name: success ? `Algo deu errado ${inter.member}... tentar novamente? ❌` : `Autoplay habilitado, a fila será automaticamente preenchida com músicas semelhantes à atual 🔁` })

                return inter.editReply({ embeds: [BaseEmbed] });

            }
        }
       
    },
};