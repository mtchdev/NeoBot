const event = (event) => require(`./${event}`);
module.exports = client => {
    client.on('guildCreate', event('add'));
    client.on('guildDelete', event('remove'));
    client.on('message', event('message'));
};