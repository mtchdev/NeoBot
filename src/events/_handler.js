const event = (event) => require(`./${event}`);
module.exports = client => {
    client.on('guildCreate', event('guildCreate'));
    client.on('guildDelete', event('guildRemove'));
    client.on('message', event('message'));
    client.on('guildMemberAdd', event('guildMemberAdd'));
};