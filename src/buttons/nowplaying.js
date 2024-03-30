const { EmbedBuilder } = require('discord.js');
module.exports = async ({ client, inter, queue }) => { 
    if (!queue || !queue.isPlaying()) return inter.editReply({ content: `Não há música tocando no momento... tente novamente? ❌`, ephemeral: true });

    const track = queue.currentTrack;

    const methods = ['esativado', 'faixa', 'lista'];

    const timestamp = track.duration;
    
    const trackDuration = timestamp.progress == 'Infinity' ? 'infinity (ao vivo)' : track.duration;

    const progress = queue.node.createProgressBar();
    

    const embed = new EmbedBuilder()
    .setAuthor({ name: track.title,  iconURL: client.user.displayAvatarURL({ size: 1024, dynamic: true })})
    .setThumbnail(track.thumbnail)
    .setDescription(`Volume **${queue.node.volume}**%\nDuração **${trackDuration}**\nProgreso ${progress}\nModo loop **${methods[queue.repeatMode]}**\nSolicitado por ${track.requestedBy}`)
    .setFooter({ text: 'A música de qualidade é aqui - Feito por Cablade👨🏼‍💻', iconURL: inter.member.avatarURL({ dynamic: true })})
    .setColor('ff0000')
    .setTimestamp()

    inter.editReply({ embeds: [embed], ephemeral: true });
}
