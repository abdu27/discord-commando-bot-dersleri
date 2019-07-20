const { Command } = require('discord.js-commando');

module.exports = class cks extends Command {
    constructor(client) {
        super(client, {
            name: 'çıkış-mesaj-ayarla',
            group: 'ayarlar',
            memberName: 'çıkış-mesaj-ayarla',
            description: 'çıkış mesajını ayarlar.',
			aliases: ['çıkış-mesaj', 'çma'],
            guildOnly: true,
			throttling: {
                usages: 3,
                duration: 5
            },
            args: [
                {
                    key: 'yazi',
                    prompt: 'çıkış mesajı ne olsun?',
                    type: 'string'
                }
            ]
        });
    }
    
    hasPermission(msg) {
        if(!msg.guild) return this.client.isOwner(msg.author);
        return this.client.isOwner(msg.author) || msg.member.hasPermission('ADMINISTRATOR');
    }
    

    run(msg, args) {

        const { yazi } = args;
        this.client.provider.set(msg.guild, "girisCikisMesajKontrol", true)
        this.client.provider.set(msg.guild, 'cikisMesaj', yazi)
        return msg.reply(`Başarıyla çıkış mesjınız "${yazi}" olarak ayarlandı!`)

    }
};
