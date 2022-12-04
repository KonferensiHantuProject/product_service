// Rabbit MQ
const rabbitmq = require('../config/rabbitmq')

send = async (userId, productId, msg) => {

    // Instance For Rabbit MQ
    const broker = await rabbitmq.getInstance();

    let data = {
        userId: userId,
        productId: productId,
        msg: msg
    }

    // Sending to Rabbitmq
    broker.publish('store_product', JSON.stringify(data));

    return true
}

module.exports = {
    send
};