module.exports = (msg, message) => {
    message.delete();
    message.channel.send({embed: {
        color: 15158332,
        title: "Error",
        description: `⚠ ${msg}`
    }}).then(msg =>{
        msg.delete(3500)
    });
}