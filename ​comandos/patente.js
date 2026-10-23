const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('patente')
        .setDescription('Consulta a patente militar de um membro')
        .addUserOption(option =>
            option.setName('militar')
                .setDescription('Militar a ser consultado')
                .setRequired(false)),

    async execute(interaction) {
        const targetUser = interaction.options.getUser('militar') || interaction.user;

        const embed = new EmbedBuilder()
            .setColor('#004400')
            .setTitle('🪖 Identificação Militar')
            .addFields(
                { name: '👤 Militar', value: `${targetUser}`, inline: true },
                { name: '🎖️ Patente', value: '**Recruta / Em análise**', inline: true }
            )
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    }
};
