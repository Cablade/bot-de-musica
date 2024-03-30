const { QueueRepeatMode } = require('discord-player');
module.exports = async ({  inter, queue }) => { 

    const methods = ['desativado', 'faixa', 'lista'];

    if (!queue || !queue.isPlaying()) return inter.editReply({ content: `Nenhuma música sendo reproduzida no momento... tente novamente? ❌`, ephemeral: true });

    const repeatMode = queue.repeatMode

    if (repeatMode === 0) queue.setRepeatMode( QueueRepeatMode.TRACK)

    if (repeatMode === 1 ) queue.setRepeatMode( QueueRepeatMode.QUEUE)

    if (repeatMode === 2) queue.setRepeatMode( QueueRepeatMode.OFF)
    
    return inter.editReply({ content: `loop foi definido como**${methods[queue.repeatMode]}**.✅`})



}