const event = (event) => require(`./${event}`);
module.exports = client => {
    client.on('message', event('message'));
};