module.exports.warning = (msg, message) => {
    message.channel.send({embed: {
        color: 15158332,
        title: "Error",
        description: `⚠ ${msg}`
    }}).then(msg =>{
        msg.delete(3500)
    });
}