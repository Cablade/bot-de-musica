module.exports = async ({  inter, queue }) => { 
    if (!queue || !queue.isPlaying()) return inter.editReply({ content: `Nenhuma música sendo reproduzida no momento... tente novamente? ❌`, ephemeral: true });

    if (!queue.history.previousTrack) return inter.editReply({ content: `Não havia música tocando antes ${inter.member}... tentar novamente ? ❌`, ephemeral: true });

    await queue.history.back();

    inter.editReply({ content:`Reproduzindo a faixa **anterior** ✅`, ephemeral: true});
}
