const { Command } = require('discord.js-commando');

module.exports = class kanal extends Command {
    constructor(client) {
        super(client, {
            name: 'giriş-çıkış-kanal-ayarla',
            group: 'ayarlar',
            memberName: 'giriş-çıkış-kanal-ayarla',
            description: 'girş çıkış kanalı ayarlar.',
			aliases: ['gmk'],
            guildOnly: true,
						throttling: {
                usages: 3,
                duration: 5
            },
            args: [
                {
                    key: 'kanal',
                    prompt: 'Hangi kanal giriş çıkış kanalı olarak kullanılsın?',
                    type: 'channel'
                }
            ]
        });
    }
    
    hasPermission(msg) {
        if(!msg.guild) return this.client.isOwner(msg.author);
        return this.client.isOwner(msg.author) || msg.member.hasPermission('ADMINISTRATOR');
    }
    

    run(msg, args) {

        const { kanal } = args;
        msg.guild.settings.set('girisCikisKanal', kanal.id)
        return msg.reply(`Başarıyla giriş çıkış kanalı <#${kanal.id}> olarak ayarlandı!`)

    }
};
