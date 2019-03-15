module.exports = (msg, message) => {
    message.channel.send({embed: {
        color: 3066993,
        title: "Success",
        description: `✅ ${msg}`
    }});
}