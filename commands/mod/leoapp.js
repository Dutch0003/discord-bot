const Discord = require('discord.js')
const {
    Command
} = require('discord.js-commando')
module.exports = class credits extends Command {
    constructor(client) {
        super(client, {
            name: 'leoapp',
            description: 'Handles specified target\'s leo application',
            group: 'mod',
            guildOnly: true,
            memberName: 'leopapp',
            args: [{
                    key: 'target',
                    prompt: 'Who\'s leo application would you like to handle?',
                    type: 'string'
                },
                {
                    key: 'option',
                    prompt: 'Do you wish to `accept`/`deny` this leo application?',
                    type: 'string',
                    validate: text => {
                        if(text == "accept" || text == "deny" ) return true
                    }
                }
            ]
        })
    }

    hasPermission(message) {
        if (!message.member.roles.has('777941889927479327')) return 'Sorry :tired_face: You must be an Moderator :raised_hands:'
        return true
    }
    async run(message, args) {
        var webhook = new Discord.WebhookClient('779206580587593740', 'P3v-ya-1vJv9acRpEbScOgQBmqpvZCVBC725waVMLsxAHbfQsUQV_EfMPqGbSZ7E9k1k')
        var nickname
        if (message.member.nickname) {
            nickname = message.member.nickname
        } else {
            nickname = message.author.username
        }
            var choice
            if (args.option == 'accept') {
                choice = 'Accepted'
            }
            if (args.option == 'deny') {
                choice = 'Denied'
            }
            const embed = new Discord.RichEmbed()
                .setTimestamp()
                .setTitle(`${args.target}'s LEO Application`)
                .setDescription(choice)
            webhook.send('', {
                username: 'Moderation',
                embeds: [embed]
            })
            message.reply('Successfully sent your leo application review!')
    }
}