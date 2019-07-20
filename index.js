const { CommandoClient, SQLiteProvider } = require('discord.js-commando');
path = require('path'),
moment = require('moment'),
sqlite = require('sqlite');

const ayarlar = require('./data/ayarlar.json');

const client = new CommandoClient({
    commandPrefix: ayarlar.PREFIX,
    unknownCommandResponse: false,
    owner: ayarlar.SAHIP,
    disableEveryone: false
});

client.registry
    .registerDefaultTypes()
    .registerGroups([
		['sunucu', 'Sunucu Komutları'],
		['bot', 'Bot Komutları'],
		['ayarlar', 'Ayarlar'],
		['admin', 'Admin'],
    ])
    .registerDefaultGroups()
    .registerDefaultCommands()
    .registerCommandsIn(path.join(__dirname, 'commands'));

	sqlite.open(path.join(__dirname, "database.sqlite3")).then((db) => {
		client.setProvider(new SQLiteProvider(db));
	});

client.on('ready', () => {
  client.user.setActivity("DISCORD COMMANDO BOT DERSLERI!", { type: "WATCHING"});       
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] LOG: Aktif, Komutlar yüklendi!`);
});

client.on('error', err => {
	console.log(err)
});


client.on("guildMemberAdd", async member => {

  const kontrolet = client.provider.get(member.guild, "girisCikisMesajKontrol")

  if (kontrolet === false || !kontrolet ){
    const kanal = client.provider.get(member.guild, 'girisCikisKanal');
    if (!kanal) return;

    member.guild.channels.get(kanal).send(`:inbox_tray: | ${member.toString()} adlı kişi aramıza katıldı!`);
  } else {

    if (kontrolet === true) {

      const mesaj = client.provider.get(member.guild, "girisMesaj")
      if (!mesaj) return;
      const kanal = client.provider.get(member.guild, 'girisCikisKanal');
      if (!kanal) return;

      mesajj = mesaj.replace(/kullanici/, member.toString())

      member.guild.channels.get(kanal).send(mesajj)

    }
  }

})


client.on("guildMemberRemove", async member => {

  const kontrolet = client.provider.get(member.guild, "girisCikisMesajKontrol")

  if (kontrolet === false || !kontrolet ){
    const kanal = client.provider.get(member.guild, 'girisCikisKanal');
    if (!kanal) return;

    member.guild.channels.get(kanal).send(`:outbox_tray: | ${member.toString()} adlı kişi aramızdan ayrıldı!`);
  } else {

    if (kontrolet === true) {

      const mesaj = client.provider.get(member.guild, "cikisMesaj")
      if (!mesaj) return;
      const kanal = client.provider.get(member.guild, 'girisCikisKanal');
      if (!kanal) return;

      mesajj = mesaj.replace(/kullanici/, member.toString())

      member.guild.channels.get(kanal).send(mesajj)

    }
  }

})

client.login(ayarlar.TOKEN);