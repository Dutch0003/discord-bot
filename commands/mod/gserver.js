const Discord = require("discord.js");
const { Command } = require("discord.js-commando");
const Trello = require("trello");
const request = require("request-promise");
module.exports = class getservercommand extends Command {
  constructor(client) {
    super(client, {
      name: "getserver",
      aliases: ["gserver", "gameserver", "server"],
      group: "mod",
      memberName: "getserver",
      description: "Retrieves information about a given player's server",
      guildOnly: true,
      args: [
        {
          type: "string",
          prompt: "Server/User?",
          key: "serverUser",
          default: ""
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
  async run(msgObject, { serverUser }) {
    let data = await request({
      uri: `https://games.roblox.com/v1/games/979209050/servers/Public?sortOrder=Asc&limit=100`,
      json: true,
      simple: false
    }).catch(err => {
      msgObject.reply("Sorry 😣! There are currently no running servers!");
    });
    if (!serverUser) {
      let embed = new Discord.RichEmbed()
        .setAuthor("")
        .setTitle("Servers")
        .setTimestamp();
      let Servers = 0;
      data.data.forEach(Data => {
        Servers = Servers + 1;
        embed.addField(
          `Server ${Data.playing}/${Data.maxPlayers} ${Data.id}`,
          `[Server Link](https://www.roblox.com/games/979209050/New-Haven-CountyjobId=${Data.id})`
        );
      });
      embed.setDescription(`There are currently ${Servers} servers.`);
      if (Servers === 0) {
        msgObject.reply("Sorry 😣! There are currently no running servers!");
      } else {
        msgObject.channel.send(embed);
      }
    } else {
      var trello = new Trello(
        "b5dc90fsdfsfsf9f0259164",
        "47581301fdsfsf47a0c526e"
      );
      let Servers = 0;
      let valid = false;
      data.data.forEach(Data => {
        Servers = Servers + 1;
        if (Data.id === serverUser) {
          valid = true;
        }
      });
      if (Servers === 0) {
        msgObject.reply("Sorry 😣! There are currently no running servers!");
      } else {
        if (!valid) {
          msgObject.reply("Sorry :persevere:! This server does not exist!");
        } else {
          trello.addCard(
            `${msgObject.channel.id} ${msgObject.id} ${serverUser}`,
            "",
            "5e5a96342b90e254f6ca5e3e"
          );
        }
      }
    }
  }
};
