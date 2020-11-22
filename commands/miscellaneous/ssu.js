const Discord = require("discord.js");
const { Command } = require("discord.js-commando");
const request = require("request-promise");
module.exports = class changelog extends Command {
  constructor(client) {
    super(client, {
      name: "ssu",
      aliases: ["startup"],
      group: "miscellaneous",
      memberName: "ssu",
      description: "Posts a server startup to the #announcements channel",
      ownerOnly: true,
                              throttling: {
        usages: 1,
        duration: 8000
      },
      args: [
        {
          type: "string",
          prompt: "What are the notes for the ssu?",
          key: "notes"
        }
      ]
    });
  }
  hasPermission(msgObject) {
    const MainServer = msgObject.client.guilds.get("777676131621011497");
    if (msgObject.guild.id == 777676131621011497) {
      if (msgObject.member.roles.find(role => role.name === "Admin")) {
        return true;
      } else if (
        msgObject.author == this.client.users.get("753778820733206629")
      ) {
        return true;
      } else if (msgObject.member.roles.find(role => role.name == "Moderator")) {
        return true;
      }
      
      return "Sorry 😣! You must be a Moderator or Admin!";
    } else {
      return (
        "Sorry :persevere:! You must use this command in the " +
        MainServer.name +
        "!"
      );
    }
  }
  async run(msgObject, { notes }) {
    let channel = this.client.guilds
      .get("777676131621011497")
      .channels.find("id", "777940236025593867");
    let Embed = new Discord.RichEmbed()
      .setColor("#e58049")
      .setAuthor(
        `${msgObject.member.displayName}`,
        `${msgObject.author.avatarURL}`
      )
      .setTitle(`Server Startup`)
      .setDescription(`${msgObject.author} is conducting a server startup!`)
      .addField(
        `:link: Link`,
        `[New Haven County](https://www.roblox.com/games/4553950954/New-Haven-County)`
      )
      .addField(`:book: Notes`, `${notes}`)
      .setTimestamp();
    channel.send("@here", Embed);

    msgObject.reply(`Congrats 🙌! You have announced a server startup!`);
  }
};