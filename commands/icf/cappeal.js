const Discord = require('discord.js')
const {
    Command
} = require('discord.js-commando')
module.exports = class credits extends Command {
    constructor(client) {
        super(client, {
            name: 'cappeal',
            description: 'Handles specified target\'s citizenship appeal',
            group: 'icf',
            guildOnly: true,
            memberName: 'cappeal',
            args: [{
                    key: 'target',
                    prompt: 'Who\'s citizenship appeal do you wish to handle?',
                    type: 'string'
                },
                {
                    key: 'option',
                    prompt: 'Do you wish to `accept`/`deny`/`invprivate` this citizenship appeal?',
                    type: 'string',
                    validate: text => {
                        if(text == "accept" || text == "deny" || text == "invprivate") return true
                    }
                }
            ]
        })
    }

    hasPermission(message) {
        if (!message.member.roles.has('770493005522141214')) return 'Sorry :tired_face: You must be an ICF Agent :raised_hands:'
        return true
    }
    async run(message, args) {
        var webhook = new Discord.WebhookClient('772744510123016202', 'YXEBO99bb9VqOFjYra28bbgnmVsNbUA7jt3re7QbRvTlBzMZjp6-5spTjmBSy3ne7p5_')
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
            if (args.option == 'invprivate') {
                choice = 'Inventory Private'
            }
            const embed = new Discord.RichEmbed()
                .setTimestamp()
                .setTitle(`${args.target}'s Citizenship Appeal`)
                .setDescription(choice)
            webhook.send('', {
                username: 'Citizenship',
                embeds: [embed]
            })
            message.reply('Successfully sent your appeal message! 🤗')
    }
}