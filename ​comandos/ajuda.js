const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ajuda')
        .setDescription('Exibe a lista completa de comandos do Bot-EB'),

    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setColor('#006600')
            .setTitle('🔰 Central de Ajuda — Bot-EB')
            .setDescription('Confira a lista de comandos disponíveis:')
            .addFields(
                { name: 'ℹ️ Informações', value: '`/ajuda` - Ajuda\n`/hierarquia` - Estrutura de patentes\n`/patente` - Consulta patente' },
                { name: '🛠️ Utilidades', value: '`/ping` - Latência do bot\n`/anunciar` - Comunicado oficial (Admin)' }
            )
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    }
};
