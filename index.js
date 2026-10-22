
const { Client, GatewayIntentBits, SlashCommandBuilder, REST, Routes, EmbedBuilder } = require('discord.js');

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

const commands = [
  new SlashCommandBuilder()
    .setName('ajuda')
    .setDescription('Mostra os comandos do Bot-EB'),

  new SlashCommandBuilder()
    .setName('hierarquia')
    .setDescription('Mostra a hierarquia do Exército Brasileiro'),

  new SlashCommandBuilder()
    .setName('patente')
    .setDescription('Consulta a patente de um militar')
    .addUserOption(option =>
      option.setName('membro')
        .setDescription('Militar que deseja consultar')
        .setRequired(false)
    ),

  new SlashCommandBuilder()
    .setName('anunciar')
    .setDescription('Publica um anúncio oficial')
    .addStringOption(option =>
      option.setName('mensagem')
        .setDescription('Texto do anúncio')
        .setRequired(true)
    )
].map(command => command.toJSON());

client.once('ready', async () => {
  console.log(`Bot conectado: ${client.user.tag}`);

  const token = process.env.DISCORD_TOKEN;
  const appId = process.env.CLIENT_ID;
  const guildId = process.env.GUILD_ID;

  if (token && appId && guildId) {
    try {
      const rest = new REST({ version: '10' }).setToken(token);
      await rest.put(
        Routes.applicationGuildCommands(appId, guildId),
        { body: commands }
      );
      console.log('Comandos registrados no servidor.');
    } catch (error) {
      console.error('Erro ao registrar comandos:', error.message);
    }
  }
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'ajuda') {
    await interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle('🇧🇷 Bot-EB | Central de Comandos')
          .setDescription(
            '`/ajuda` — Lista de comandos\n' +
            '`/hierarquia` — Hierarquia do EB\n' +
            '`/patente` — Consultar patente\n' +
            '`/anunciar` — Anúncio oficial'
          )
          .setColor(0x216B35)
      ],
      ephemeral: true
    });
  }

  if (interaction.commandName === 'hierarquia') {
    await interaction.reply(
      '🇧🇷 A hierarquia ainda precisa ser configurada pela administração.'
    );
  }

  if (interaction.commandName === 'patente') {
    const membro = interaction.options.getUser('membro')
      || interaction.user;

    await interaction.reply(
      `A ficha de ${membro} ainda não foi cadastrada no banco de dados.`
    );
  }

  if (interaction.commandName === 'anunciar') {
    if (!interaction.memberPermissions?.has('ManageGuild')) {
      return interaction.reply({
        content: 'Você não tem permissão para publicar anúncios oficiais.',
        ephemeral: true
      });
    }

    const mensagem = interaction.options.getString('mensagem');

    await interaction.reply({
      content: `📢 **ANÚNCIO OFICIAL DO EB**\n\n${mensagem}`,
      allowedMentions: { parse: [] }
    });
  }
});

client.login(process.env.DISCORD_TOKEN);
