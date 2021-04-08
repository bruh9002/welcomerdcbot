module.exports = {
    name:"welcomer",
    async run (client, message, args, db) {
        const channelId = await db.get(`welcomechannel_${message.guild.id}`)
    
        if(!message.member.hasPermission("MANAGE_GUILD")) {
            return message.channel.send(`You don't have permission to use this command.`)
        }
        let option = args.join(" ")
        if(!option) return message.channel.send(`Please provide an option (\`on - off \`)`)

        if(
            option.toLowerCase() !== "on" && 
            option.toLowerCase() !== "off"
        ) {
            return message.channel.send(`ERROR: Invalid second argument.`)
        }
        if(option.toLowerCase() == "on") {
            if(channelId !== "off" && channelId !== null) {
                return message.channel.send(`Welcomer is already enabled.`)
            }
            message.channel.send(`Please write down the welcome channel id to the chat.`)
            const filter = m => m.author.id === message.author.id;
            message.channel.awaitMessages(filter, {max: 1, time: 20000, errors:["time"]}).then(collected => {
                const msg = collected.first();
                let channel = client.channels.cache.get(msg.content);
                if(!channel) {
                    return message.channel.send("Invalid channel ID.")
                }
                db.set(`welcomechannel_${message.guild.id}`, channel.id);
                message.channel.send("Okay! Welcome channel set!")



            }).catch(() => {
                return message.channel.send(`You didn't reply in time.`)
            })
            
        }else {
            if(option.toLowerCase() == "off" ) {
                const channelId = await db.get(`welcomechannel_${message.guild.id}`)
                if(channelId === "off" ) {
                    return message.channel.send(`Welcomer is already disabled.`)
                }else {
                    db.set(`welcomechannel_${message.guild.id}`, "off")

                    message.channel.send(`Succesfully disabled welcomer.`)
                }
            }
        }
    }
}