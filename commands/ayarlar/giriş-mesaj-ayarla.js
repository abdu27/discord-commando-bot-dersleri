const { Command } = require('discord.js-commando');

module.exports = class grs extends Command {
    constructor(client) {
        super(client, {
            name: 'giriş-mesaj-ayarla',
            group: 'ayarlar',
            memberName: 'giriş-mesaj-ayarla',
            description: 'Giriş mesajını ayarlar.',
			aliases: ['giriş-mesaj', 'gma'],
            guildOnly: true,
			throttling: {
                usages: 3,
                duration: 5
            },
            args: [
                {
                    key: 'yazi',
                    prompt: 'Giriş mesajı ne olsun?',
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
        this.client.provider.set(msg.guild, 'girisMesaj', yazi)
        return msg.reply(`Başarıyla giriş mesjınız "${yazi}" olarak ayarlandı!`)

    }
};
