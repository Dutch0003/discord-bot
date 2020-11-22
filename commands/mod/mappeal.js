const Discord = require('discord.js')
const {
    Command
} = require('discord.js-commando')
module.exports = class credits extends Command {
    constructor(client) {
        super(client, {
            name: 'mappeal',
            description: 'Handles specified target\'s moderation appeal',
            group: 'mod',
            guildOnly: true,
            memberName: 'mappeal',
            args: [{
                    key: 'target',
                    prompt: 'Who\'s moderation appeal do you wish to handle?',
                    type: 'string'
                },
                {
                    key: 'option',
                    prompt: 'Do you wish to `accept`/`deny` this moderation appeal?',
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
        var webhook = new Discord.WebhookClient('777951720294449192', '9DbLwdUkPcfpgCchUrzoJgN-BL5ERBcyohK-J-5O7dxXN2fRvwJ9W9MaBIC5ceXS2_zk')
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
                .setTitle(`${args.target}'s Moderation Appeal`)
                .setDescription(choice)
            webhook.send('', {
                username: 'Moderation',
                embeds: [embed]
            })
            message.reply('Successfully sent your appeal message! 🤗')
    }
}