const Discord = require("discord.js");
const { Command } = require("discord.js-commando");
const Trello = require("trello");
const request = require("request-promise");
var trello = new Trello(
  "b5dc90bcb5d54169f0259164",
  "4758130f229efb38df34b1330141f47a0c526e"
);

module.exports = class gtban extends Command {
  constructor(client) {
    super(client, {
      name: "gtban",
      aliases: ["gametban", "remotetban"],
      group: "mod",
      memberName: "gtban",
      description: "TBans a user from the game",
      guildOnly: true,
      args: [
        {
          type: "string",
          prompt: "What is the Roblox username?",
          key: "username"
        },
        {
          type: "string",
          prompt: "What is the reason for temp banning this user?",
          key: "reason"
        }
      ]
    });
  }
  hasPermission(msgObject) {
    const MainServer = msgObject.client.guilds.get("777676131621011497");
    if (msgObject.guild.id == 777676131621011497) {
      if (msgObject.member.roles.find(role => role.name === "Moderator")) {
        return true;
      } else if (msgObject.member.roles.find(role => role.name === "Admin")) {
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
  async run(msgObject, { username, reason }) {
    const editMessage = await msgObject.reply(
      `Coolio!! Let's get on with this and ban \`${username}\``
    );
    let data = await request({
      uri: `https://api.roblox.com/users/get-by-username?username=${username}`,
      json: true,
      simple: false
    });
    if (data.errorMessage) {
      return editMessage.edit(
        "Sorry 😣! You haven't entered a valid Roblox username!"
      );
    } else {
      editMessage.edit(`Ooooh, we've got their UserID as \`${data.Id}\`!`);
      let authorData = await request({
        uri: `https://verify.eryn.io/api/user/${msgObject.author.id}`,
        json: true,
        simple: false
      });
      editMessage.edit(
        `Ooooh, we've also got your UserID as \`${authorData.robloxId}\`!`
      );
      editMessage.edit(
        `Congrats 🙌! Your command will be executed in-game shortly!`
      );
      trello.addCard(
        `${editMessage.channel.id} ${editMessage.id} ${authorData.robloxId} tban ${data.Id} ${reason}`,
        "",
        "5e52881f69f20046d66f3f61"
      );
    }
  }
};
