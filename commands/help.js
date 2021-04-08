module.exports = {
    name:"help",
    async run (client, message, args, db) {
        const discord = require("discord.js");

        const embed = new discord.MessageEmbed()
        .setTitle("Help")
        .addField("`!welcomer`", "Sets the welcome channel. ")


        message.channel.send(embed)
    }
}